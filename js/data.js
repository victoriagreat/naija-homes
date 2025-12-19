// DEFAULT PROPERTIES
const defaultProperties = [
  { id: 1, title: "3 Bedroom Apartment", location: "Lekki, Lagos", price: "₦2,500,000", image: "images/house1.jpg" },
  { id: 2, title: "Luxury Duplex", location: "Ikoyi, Lagos", price: "₦15,000,000", image: "images/image2.jpg" },
  { id: 3, title: "Mini Flat", location: "Yaba, Lagos", price: "₦1,200,000", image: "images/image3.jpg" }
];

// AGENT-ADDED PROPERTIES
const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

// MERGED LIST
let properties = [...defaultProperties, ...storedProperties];
