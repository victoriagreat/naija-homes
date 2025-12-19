const grid = document.getElementById("propertyGrid");

properties.forEach(property => {
  grid.innerHTML += `
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
