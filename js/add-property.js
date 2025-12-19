const editId = localStorage.getItem("editPropertyId");
if (editId) {
  const property = properties.find(p => p.id === parseInt(editId));
  if (property) {
    document.getElementById("title").value = property.title;
    document.getElementById("location").value = property.location;
    document.getElementById("price").value = property.price;
    // Image preview or file input can be handled here
  }
}

// On form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value; // path or file handling

  if (editId) {
    // Update property
    const index = properties.findIndex(p => p.id === parseInt(editId));
    properties[index] = { ...properties[index], title, location, price, image };
    localStorage.removeItem("editPropertyId");
  } else {
    // Add new property
    const id = Date.now();
    properties.push({ id, title, location, price, image });
  }

  localStorage.setItem("properties", JSON.stringify(properties.filter(p => p.id > 3)));
  window.location.href = "listing.html";
});
