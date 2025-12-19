// auth.js

// 1️⃣ Create default admin if no users exist
const defaultUsers = [
  { id: 1, name: "Admin", email: "admin@naijahomes.com", password: "admin123", role: "admin" }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// ------------------------
// Existing auth functions
// login(), signup(), requireAuth(), getCurrentUser(), logout(), etc.
// ------------------------



// Get current logged-in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Logout user
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/pages/login.html";
}

// Protect page by role
function requireAuth(requiredRole = null) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "/pages/login.html";
    return;
  }
  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied");
    window.location.href = "/pages/index.html";
  }
}

// LOGIN FUNCTION
function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "/pages/index.html";
}

// SIGNUP FUNCTION
function signup(name, email, password, role) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("Email already registered. Please login.");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "/pages/login.html";
}
