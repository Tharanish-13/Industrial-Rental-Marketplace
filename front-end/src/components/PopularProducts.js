import React, { useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/EquipmentPage.css'; // Assuming external CSS is used

const PopularProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Heavy Duty Excavator",
      image: "/assets/Excavator.png",
      category: "Construction Equipment",
      rating: 4.8,
      rentals: 128,
      price: 29,
      status: "Available",
      location: "New York",
      district: "la",
      minRentalDays: 5
    },
    {
      id: 2,
      name: "Industrial Forklift",
      image: "/assets/stacker.png",
      category: "Material Handling",
      rating: 4.9,
      rentals: 156,
      price: 19,
      status: "Available",
      location: "Chicago",
      district: "la",
      minRentalDays: 3
    },
    {
      id: 3,
      name: "Power Generator",
      image: "/assets/pop-generator.png",
      category: "Power Equipment",
      rating: 4.7,
      rentals: 98,
      price: 14,
      status: "In Use",
      location: "San Francisco",
      district: "la",
      minRentalDays: 7
    },
    {
      id: 4,
      name: "Mobile Crane",
      image: "/assets/crane.png",
      category: "Construction Equipment",
      rating: 4.6,
      rentals: 112,
      price: 39,
      status: "Available",
      location: "Dallas",
      district: "la",
      minRentalDays: 2
    },
    {
      id: 5,
      name: "Scissor Lift",
      image: "/assets/siccors.png",
      category: "Access Equipment",
      rating: 4.8,
      rentals: 143,
      price: 24,
      status: "Available",
      location: "Los Angeles",
      district: "la",
      minRentalDays: 4
    },
    {
      id: 6,
      name: "Bulldozer",
      image: "/assets/buldozer.png",
      category: "Construction Equipment",
      rating: 4.9,
      rentals: 167,
      price: 44,
      status: "In Use",
      location: "Miami",
      district: "la",
      minRentalDays: 6
    },
    {
      id: 7,
      name: "Bulldozer",
      image: "/assets/buldozer.png",
      category: "Construction Equipment",
      rating: 4.9,
      rentals: 167,
      price: 44,
      status: "In Use",
      location: "Miami",
      district: "la",
      minRentalDays: 6
    }
  ]);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="popular-products">
      <h2>Popular Equipment</h2>
      <p className="section-subtitle">Most frequently rented equipment by our customers</p>
      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="products-scroll" ref={scrollContainerRef}>
          {products.map((product) => (
            <div key={product.id} className="equipment-card">
              {/* Content of each card */}
              <div className="heart-border">
                <div className={`favorite-icon ${product.id ? "active" : ""}`}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={product.id ? "#FF0000" : "#FFFFFF"}
                    stroke={product.id ? "none" : "#000000"}
                    strokeWidth="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <h4>{product.name}</h4>
              <p className="equipment-type">{product.category}</p>
              <img src={product.image} alt={product.name} className="equipment-image" />
              <div className="equipment-location">
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{product.location}, {product.district}</span>
              </div>
              <div className="equipment-rentaldays">
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
                Min. Rental Days - {product.minRentalDays} days
              </div>
              <p className="equipment-price">₹{product.price} / day</p>
              <button className="rent-now-button">Rent Now</button>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;