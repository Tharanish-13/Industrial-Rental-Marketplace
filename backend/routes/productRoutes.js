const express = require('express');
const path = require('path');
const router = express.Router();
const RentalRequest = require('../models/RentalRequest');
const Product = require('../models/Product');
const PersonalDetails = require('../models/PersonalDetails');
const { authenticate } = require('../middleware/authMiddleware'); // Ensure this path is correct

// Import the upload middleware
const uploadMiddleware = require('../middleware/upload-middleware');

// Create a new product
router.post('/', authenticate, uploadMiddleware, async (req, res) => {
  try {
    
    if (!req.files || !req.files['image']) {
      return res.status(400).json({ message: "At least one product image is required." });
    }

    let specifications = [];
    if (req.body.specifications) {
      try {
        specifications = JSON.parse(req.body.specifications).map(spec => ({
          key: spec.key,
          value: spec.value
        }));
      } catch (error) {
        return res.status(400).json({ message: "Invalid specification format. Please provide a valid JSON." });
      }
    }

    // Create the product instance
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      rentalDays: req.body.rentalDays,
      price: req.body.price,
      compareAtPrice: req.body.compareAtPrice,
      location: req.body.location,
      district: req.body.district,
      city: req.body.city,
      pincode: req.body.pincode,
      available: req.body.available === 'true',
      quantity: parseInt(req.body.quantity) || 1,
      images: req.files['image'].map(file => path.join('uploads', 'products', file.filename)),
      specification: specifications,
      userId: req.user._id
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: err.message || 'Failed to create product' });
  }
});


router.put('/:productId', authenticate, uploadMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Parse the specifications (if provided)
    let specifications = [];
    if (req.body.specifications) {
      try {
        specifications = JSON.parse(req.body.specifications).map(spec => ({
          key: spec.key,
          value: spec.value
        }));
      } catch (error) {
        return res.status(400).json({ message: "Invalid specification format. Please provide a valid JSON." });
      }
    }

    // If specifications already exist, you might want to merge them or overwrite them
    if (specifications.length > 0) {
      // Option 1: Overwrite existing specifications
      product.specification = specifications;
    } else {
      // Option 2: Leave existing specifications as is (if empty specifications array)
      product.specification = product.specifications || [];
    }

    // Update other fields
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.subCategory = req.body.subCategory;
    product.rentalDays = req.body.rentalDays;
    product.price = req.body.price;
    product.compareAtPrice = req.body.compareAtPrice;
    product.location = req.body.location;
    product.district = req.body.district;
    product.city = req.body.city;
    product.pincode = req.body.pincode;
    product.available = req.body.available === 'true';
    product.quantity = parseInt(req.body.quantity) || 1;

    if (req.files && req.files['image']) {
      product.images = req.files['image'].map(file => path.join('uploads', 'products', file.filename));
    }

    // Save the updated product
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: err.message || 'Failed to update product' });
  }
});




router.delete('/:productId', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(400).json({ message: err.message || 'Failed to delete product' });
  }
});

// Serve uploaded files
router.get('/uploads/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', type, filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    }
  });
});

// Get available products
router.get('/available', async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (err) {
    console.error('Error fetching available products:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get user's products  
router.get('/my-products', authenticate, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/rental-requests', authenticate, async (req, res) => {
  try {
    const { date, status, category } = req.query;
    let filter = {};

    // User-based filtering
    if (req.user) {
      if (req.user.supplierId) {
        filter.supplierId = req.user._id;
      }
      if (req.user.customerId) {
        filter.customerId = req.user._id;
      }
    }

    // Query parameter filtering
    if (date) {
      filter.fromDate = { $gte: new Date(date) };
    }
    if (status) {
      filter.status = status;
    }
    if (category) {
      filter.category = category;
    }

    const rentalRequests = await RentalRequest.find(filter)
      .populate('productId', 'name description price')
      .populate('customerId', 'firstName lastName email')
      .populate('supplierId', 'firstName lastName email');

    if (!rentalRequests.length) {
      return res.status(404).json({ 
        success: false,
        message: "No rental requests found." 
      });
    }

    res.status(200).json({
      success: true,
      message: "Rental requests retrieved successfully.",
      data: rentalRequests,
    });

  } catch (error) {
    console.error("Error fetching rental requests:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching rental requests.",
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/rental-requests', authenticate, async (req, res) => {
  try {
    const { productId, selectedAddress, fromDate, fromTime, endDate, endTime } = req.body;

    // Validate request data
    if (!productId || !selectedAddress || !fromDate || !endDate || !fromTime || !endTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate dates
    if (new Date(fromDate) > new Date(endDate)) {
      return res.status(400).json({ message: "End date must be after the start date." });
    }

    // Find the product to get the supplier ID
    const product = await Product.findById(productId);
    const personal = await PersonalDetails.findOne({ user: req.user._id });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (!product.userId) {
      return res.status(400).json({ message: "Supplier information is missing for this product." });
    }
    if (!personal || !personal.phoneNumber) {
      return res.status(404).json({ message: "User personal details or phone number not found." });
    }

    // Create a rental request
    const rentalRequest = new RentalRequest({
      productId,
      customerId: req.user._id, // Retrieved from the authenticate middleware
      supplierId: product.userId, // Supplier ID from the product model
      selectedAddress,
      phoneNumber: personal.phoneNumber,
      fromDate,
      fromTime,
      endDate,
      endTime,
    });

    await rentalRequest.save();

    // Optional: Populate response with additional details
    const populatedRentalRequest = await RentalRequest.findById(rentalRequest._id)
      .populate('productId', 'name description')
      .populate('supplierId', 'firstName lastName');

    res.status(201).json({ message: "Rental request created successfully.", rentalRequest: populatedRentalRequest });
  } catch (error) {
    console.error("Error creating rental request:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
});

router.put('/rental-requests/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status
    const validStatuses = ['pending', 'rejected', 'payment', 'shipped', 'delivered', 'returned'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    // Find the rental request
    const rentalRequest = await RentalRequest.findById(id);
    if (!rentalRequest) {
      return res.status(404).json({ message: "Rental request not found." });
    }

    // Check if the logged-in user is the supplier of the product
    if (rentalRequest.supplierId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to modify this rental request." });
    }

    // Update the rental request status
    rentalRequest.status = status;
    await rentalRequest.save();

    // Return updated rental request
    res.status(200).json({ message: "Rental request status updated successfully.", rentalRequest });
  } catch (error) {
    console.error("Error updating rental request status:", error);
    res.status(500).json({ message: "An error occurred while updating the rental request status.", error: error.message });
  }
});



module.exports = router;
