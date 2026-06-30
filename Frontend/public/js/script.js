const API_URL = "http://localhost:3000/api/users"; // Replace with your backend API URL

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#registerUser").value.trim();
    const email = document.querySelector("#registerEmail").value.trim();
    const password = document.querySelector("#registerPassword").value;

    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful. You can now login.");
      window.location.href = "index.html";
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  });
}

if (loginForm) {
  loginForm.reset();
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#loginUser").value.trim();
    const password = document.querySelector("#loginPassword").value;

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token); // Store the JWT token in local storage
      alert("Login successful");
      window.location.href = "student.html";
    } else {
      alert(`Login failed: ${data.message}`);
    }
  });
}
