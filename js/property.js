// CONFIRM JS IS LOADED
console.log("property.js loaded");

// GET CONTAINER
const detailsContainer = document.getElementById("propertyDetails");

if (!detailsContainer) {
  console.error("propertyDetails container not found");
}

// CHECK PROPERTIES DATA
console.log("properties available:", properties);

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const propertyId = Number(params.get("id"));

console.log("URL:", window.location.search);
console.log("Property ID:", propertyId);

// VALIDATE ID
if (!propertyId) {
  detailsContainer.innerHTML = `
    <h2>No property selected</h2>
    <p>Please go back and select a property.</p>
  `;
} else {
  // FIND PROPERTY
  const property = properties.find(p => Number(p.id) === propertyId);

  console.log("Found property:", property);

  if (!property) {
    detailsContainer.innerHTML = `
      <h2>Property not found</h2>
      <p>The property you are looking for does not exist.</p>
    `;
  } else {
    // RENDER PROPERTY
    detailsContainer.innerHTML = `
      <img src="${property.image}" alt="${property.title}" style="max-width:100%; border-radius:8px;">

      <div class="property-info">
        <h1>${property.title}</h1>
        <p class="price">${property.price}</p>
        <p class="location">${property.location}</p>

        <p>
          This beautiful property is located in ${property.location}.
          It offers comfort, security, and modern facilities suitable
          for families and professionals.
        </p>

        <div class="property-actions">
          <button class="btn-primary" id="payBtn">Pay Now</button>
          <button class="btn-outline">Book Inspection</button>
        </div>
      </div>
    `;

    // PAYSTACK BUTTON
    const payBtn = document.getElementById("payBtn");

    if (payBtn) {
      payBtn.addEventListener("click", () => {

        let price = property.price.replace(/₦|,/g, "");
        let amountInKobo = Number(price) * 100;

        if (isNaN(amountInKobo)) {
          alert("Invalid price amount");
          return;
        }

        if (typeof PaystackPop === "undefined") {
          alert("Paystack not loaded");
          return;
        }

        let handler = PaystackPop.setup({
          key: "pk_test_a5e39580cd81887a2dcf84a347404d02765dd760", // REPLACE WITH YOUR PUBLIC KEY
          email: "user@email.com",
          amount: amountInKobo,
          currency: "NGN",
          ref: "MYJIA_" + Math.floor(Math.random() * 1000000000),

          callback: function (response) {
            alert("Payment successful! Ref: " + response.reference);
          },

          onClose: function () {
            alert("Payment cancelled");
          }
        });

        handler.openIframe();
      });
    }
  }
}

const user = JSON.parse(localStorage.getItem("currentUser"));

if (user?.role === "agent") {
  document.querySelector(".property-actions").innerHTML += `
    <button class="btn-outline">Edit Property</button>
  `;
}

if (user?.role === "admin") {
  document.querySelector(".property-actions").innerHTML += `
    <button class="btn-danger">Delete Property</button>
  `;
}

