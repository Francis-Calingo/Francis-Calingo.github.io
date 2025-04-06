// Example: Highlight nav link on click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function() {
    document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Add interactive map
var map = L.map('map').setView([43.65107, -79.347015], 10); // Toronto coords
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add dynamic tabs

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const tabId = this.getAttribute("data-tab");

    // Remove 'active' from all tabs and contents
    tabLinks.forEach(l => l.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    // Add 'active' to the clicked tab and matching content
    this.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  });
});

// Enable dark mode

const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
