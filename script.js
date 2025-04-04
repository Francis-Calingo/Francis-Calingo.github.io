// Example: Highlight nav link on click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function() {
    document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

var map = L.map('map').setView([43.65107, -79.347015], 10); // Toronto coords
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
