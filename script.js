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
  zoom: 6,
  scrollWheelZoom: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

// Create custom icons for education and work
var educationIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png', 
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

var workIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Education and Upskilling pop-ups

// Add a marker at York University with a popup
L.marker([43.7738, -79.5019], {icon: educationIcon}).addTo(map)
  .bindPopup("<b>York University</b><br>HBSc. in Applied Mathematics and Statistics (Graduated June 2022)");

// Add a marker at University of Waterloo with a popup
L.marker([43.47239437493424, -80.54481468831173], {icon: educationIcon}).addTo(map)
  .bindPopup("<b>University of Waterloo</b><br>Professional Certificate-Data Science, online (Expected May 2025)");

// Add a marker at M2M Tech with a popup
L.marker([49.18588632043763, -122.80036884565341], {icon: educationIcon}).addTo(map)
  .bindPopup("<b>M2M Tech</b><br>DataTalent Upskilling Certificate, online (February 2025)");

// Add a marker at University of Toronto with a popup
L.marker([43.66857820867307, -79.39617062275501], {icon: educationIcon}).addTo(map)
  .bindPopup("<b>University of Toronto</b><br>Specialization-GIS, Mapping, and Spatial Analysis, online (January 2025)");

// Add a marker at Collège La Cité with a popup
L.marker([45.43961655932119, -75.62685051889041], {icon: educationIcon}).addTo(map)
  .bindPopup("<b>Collège La Cité</b><br>Programme Explore Program - Français langue seconde, French As A Second Language Certificate (Completed July 2022)");


// Employment pop-ups

// Add a marker at Elections Canada with a popup
L.marker([45.428762896043075, -75.71424320354681], {icon: workIcon}).addTo(map)
  .bindPopup("<b>Elections Canada</b><br>Monitoring Agent (August 2024–Present)");

// Add a marker at Great Canadian Casino Resort Toronto with a popup
L.marker([43.71521, -79.60377], {icon: workIcon}).addTo(map)
  .bindPopup("<b>Great Canadian Casino Resort Toronto</b><br>Site Auditor (August 2022–August 2024)");

// Add a marker at Mathnasium with a popup
L.marker([43.70937973367912, -79.24831744597088], {icon: workIcon}).addTo(map)
  .bindPopup("<b>Mathnasium Canada</b><br>Math Instructor (August 2021-August 2022)");

// Add a marker at Bethune College (York U) with a popup
L.marker([43.77317, -79.50881], {icon: workIcon}).addTo(map)
  .bindPopup("<b>York University</b><br>Academic Assistance Peer Lead (May 2019–May 2020)");

// Add a marker at House of Commons of Canada with a popup
L.marker([45.42315506167389, -75.70029169984227], {icon: workIcon}).addTo(map)
  .bindPopup("<b>House of Commons of Canada</b><br>Parliamentary Intern (May 2019–June 2019)");

// Add a marker at Home Depot with a popup
L.marker([43.67164636033204, -79.46949887480902], {icon: workIcon}).addTo(map)
  .bindPopup("<b>Home Depot Canada</b><br>Front End Associate-Lot, Cashier, Customer Service) (September 2017–August 2022)");

// Territories Layer on Map

function getColorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360; // unique hue from hash
  return `hsl(${hue}, 75%, 85%)`;    // soft pastel style
}

// Create an empty territory layer group
let territoryLayer = L.layerGroup();

// Fetch and add Territory GeoJSON from Native Land
fetch("https://native-land.ca/api/index.php?maps=territories")
  .then(res => res.json())
  .then(data => {
    const territoryLayer = L.geoJSON(data, {
      style: function (feature) {
        const name = feature.properties.Name || "Territory";
        return {
          color: '#3e64ff',           // Outline color (theme accent)
          weight: 1.5,
          fillColor: getColorForName(name),
          fillOpacity: 0.45
        };
      },
      onEachFeature: function (feature, layer) {
        const name = feature.properties.Name || "Indigenous Territory";
        const lat = layer.getBounds().getCenter().lat.toFixed(5);
        const lng = layer.getBounds().getCenter().lng.toFixed(5);

        const tooltipContent = `
          <div>
            <strong>${name}</strong><br>
            <a href="https://whose.land/en/location/${lat},${lng}" target="_blank">
              View on Whose.Land →
            </a>
          </div>
        `;

        layer.bindTooltip(tooltipContent, {
          sticky: true,
          direction: "top",
          className: "territory-tooltip"
        });
        // 👉 Add hover style effects here:
layer.on('mouseover', function () {
  this.setStyle({ weight: 3, color: '#1f3fbf' });
  this.bringToFront(); // make sure it's on top
});

layer.on('mouseout', function () {
  this.setStyle({ weight: 1.5, color: '#3e64ff' });
});
      }
    });

    // Layer control
    L.control.layers({}, {
      "Indigenous Territories": territoryLayer
    }, {
      collapsed: false,
      position: "topright"
    }).addTo(map);

    // Show the layer by default
    territoryLayer.addTo(map);
  });

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



//DOM Content Loaded

document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Highlight nav link
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 🔹 Dynamic tabs
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

  // 🔹 Resume scroll animation
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
  checkVisibility();

    // 🔹 Readings scroll animation
  const readingCard = document.querySelectorAll('.reading-card');

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.8;

    readingCard.forEach(block => {
      const blockTop = block.getBoundingClientRect().top;
      if (blockTop < triggerBottom) {
        block.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();

  // 🔹 Dark/light mode toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (toggleBtn) {
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});

function toggleReview(button) {
      var review = button.nextElementSibling;

      if (review.style.display === "none" || review.style.display === "") {
        review.style.display = "none";
        button.textContent = "Show Review";
      } else {
        review.style.display = "block";
        button.textContent = "Hide Review";
      }
    }
