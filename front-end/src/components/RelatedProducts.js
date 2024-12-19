import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RelatedProducts.css";

const equipmentData = [
  { id: 1, name: "Concrete Hammer", type: "Driller", location: "Coimbatore, TN", rentaldays: "Minimum Rental Days : 10", price: 300, image: "/home-slide4.jpg" },
  { id: 2, name: "Forklift Electric Stacker", type: "Driller", location: "Coimbatore, TN", rentaldays: "Minimum Rental Days : 10", price: 500, image: "/home-slide4.jpg" },
  { id: 3, name: "Voltas Electric Forklift", type: "Driller", location: "Coimbatore, TN", rentaldays: "Minimum Rental Days : 10", price: 300, image: "/home-slide4.jpg" },
  { id: 4, name: "Concrete Mixer", type: "Driller", location: "Chennai, TN", rentaldays: "Minimum Rental Days : 10", price: 400, image: "/home-slide4.jpg" },
  { id: 5, name: "Circular Saw", type: "Driller", location: "Bangalore, KA", rentaldays: "Minimum Rental Days : 10", price: 350, image: "/home-slide4.jpg" },
];

const EquipmentPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const handleRentNow = (id) => {
    navigate(`/equipment/${id}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <div className="equipment-page">
      <main className="content">
        <div className="equipment-grid">
          {equipmentData.map((item) => (
            <div className="equipment-card" key={item.id}>
              <div className="heart-border">
                <div
                  className={`favorite-icon ${favorites[item.id] ? "active" : ""}`}
                  onClick={() => toggleFavorite(item.id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={favorites[item.id] ? "#FF0000" : "none"}
                    stroke={favorites[item.id] ? "none" : "#000000"}
                    strokeWidth="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <h4>{item.name}</h4>
              <p className="equipment-type">{item.type}</p>
              <img src={item.image} alt={item.name} className="equipment-image" />
              <div className="equipment-location">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{item.location}</span>
              </div>
              <div className="equipment-rentaldays">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
                {item.rentaldays}
              </div>
              <p className="equipment-price">₹{item.price} / day</p>
              <button onClick={() => handleRentNow(item.id)} className="rent-now-button">
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EquipmentPage;
