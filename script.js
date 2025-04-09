// Highlight active nav link (minimalist Distill-style)
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Initialize Leaflet map (customized subtle tone)
const map = L.map('map', {
  center: [43.65107, -79.347015], // Toronto
  zoom: 50,
  scrollWheelZoom: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

// Add a marker at York University with a popup
L.marker([43.7738, -79.5019]).addTo(map)
  .bindPopup("<b>York University</b><br>HBSc. in Applied Mathematics and Statistics (Graduated June 2022)") // Popup content
  .openPopup();

// Add a marker at York University (Bethune College) with a popup
L.marker([43.77317, -79.50881]).addTo(map)
  .bindPopup("<b>York University</b><br> Academic Assistance Peer Lead (May 2019-May 2020)") // Popup content
  .openPopup();

// Add a marker at Great Canadian Casino Resort Toronto with a popup
L.marker([43.71521, -79.60377]).addTo(map)
  .bindPopup("<b>Great Canadian Casino Resort Toronto</b><br>Site Auditor (August 2022-August 2024)") // Popup content
  .openPopup();

// Dynamic Tab Switching
const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetTab = link.dataset.tab;

    tabLinks.forEach(tab => tab.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    link.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});


// JavaScript to add visibility on scroll
document.addEventListener("DOMContentLoaded", function() {
  const resumeBlocks = document.querySelectorAll('.resume-block');

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.8;

    resumeBlocks.forEach(block => {
      const blockTop = block.getBoundingClientRect().top;
      if (blockTop < triggerBottom) {
        block.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // To check visibility when page loads
});

// JavaScript for Light and Dark Mode
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (!toggleBtn) return; // Avoid errors if button isn't found

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  }

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
