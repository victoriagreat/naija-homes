const listingGrid = document.getElementById("listingGrid");
const filterBtn = document.getElementById("filterBtn");
const locationFilter = document.getElementById("locationFilter");
const maxPriceFilter = document.getElementById("maxPriceFilter");

// Display properties
function displayProperties(data) {
  listingGrid.innerHTML = "";

  data.forEach(property => {
    listingGrid.innerHTML += `
      <div class="property-card">
        <img src="${property.image}" alt="${property.title}">
        <div class="content">
          <h3>${property.title}</h3>
          <p>${property.location}</p>
          <p><strong>${property.price}</strong></p>
          <a href="property.html?id=${property.id}">View Details</a>
        </div>
      </div>
    `;
  });
}

// Initial display
displayProperties(properties);

// Filter logic
filterBtn.addEventListener("click", () => {
  let locationValue = locationFilter.value.toLowerCase();
  let maxPriceValue = maxPriceFilter.value;

  const filtered = properties.filter(property => {
    let priceNumber = parseInt(property.price.replace(/₦|,/g, ""));

    return (
      property.location.toLowerCase().includes(locationValue) &&
      (maxPriceValue === "" || priceNumber <= maxPriceValue)
    );
  });

  displayProperties(filtered);
});

// Assuming currentUser is already set
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// DELETE
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    if (confirm("Are you sure you want to delete this property?")) {
      properties = properties.filter(p => p.id !== id);
      localStorage.setItem("properties", JSON.stringify(properties.filter(p => p.id > 3))); 
      // Filter out default properties from storage
      location.reload();
    }
  });
});

// EDIT
document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.dataset.id);
    localStorage.setItem("editPropertyId", id);
    window.location.href = "add-property.html"; // redirect to add/edit page
  });
});

