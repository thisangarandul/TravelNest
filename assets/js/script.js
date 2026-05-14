// Destination Data
const destinations = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    type: "cultural",
    costLevel: "high",
    image: "assets/Image/Japan.jpg",
    description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
    attractions: ["Fushimi Inari Taisha", "Kinkaku-ji", "Arashiyama Bamboo Grove"],
    dailyCost: 150
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    type: "relaxation",
    costLevel: "high",
    image: "assets/Image/Santorini.jpg",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
    attractions: ["Oia Sunsets", "Red Beach", "Akrotiri Ruins"],
    dailyCost: 200
  },
  {
    id: 3,
    name: "Banff National Park",
    country: "Canada",
    continent: "North America",
    type: "nature",
    costLevel: "medium",
    image: "assets/Image/Banff National Park.jpg",
    description: "Banff National Park is Canada's oldest national park, located in the Rocky Mountains. The park features mountainous terrain, with numerous glaciers and ice fields, dense coniferous forest, and alpine landscapes.",
    attractions: ["Lake Louise", "Moraine Lake", "Icefields Parkway"],
    dailyCost: 120
  },
  {
    id: 4,
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    type: "adventure",
    costLevel: "medium",
    image: "assets/Image/Machu Picchu.jpg",
    description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it's renowned for its sophisticated dry-stone walls.",
    attractions: ["Inca Trail", "Sun Gate", "Temple of the Sun"],
    dailyCost: 100
  },
  {
    id: 5,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    type: "relaxation",
    costLevel: "low",
    image: "assets/Image/Bali.jpg",
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    attractions: ["Ubud Monkey Forest", "Tegallalang Rice Terrace", "Uluwatu Temple"],
    dailyCost: 50
  },
  {
    id: 6,
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    type: "cultural",
    costLevel: "medium",
    image: "assets/Image/Rome.jpg",
    description: "Rome is the capital city of Italy. It is also the capital of the Lazio region, the center of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale.",
    attractions: ["Colosseum", "Pantheon", "Trevi Fountain"],
    dailyCost: 130
  },
  {
    id: 7,
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    type: "nature",
    costLevel: "medium",
    image: "assets/Image/Cape Town.jpg",
    description: "Cape Town is a port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain. Slowly rotating cable cars climb to the mountain's flat top.",
    attractions: ["Table Mountain", "Cape of Good Hope", "Robben Island"],
    dailyCost: 90
  },
  {
    id: 8,
    name: "New York City",
    country: "USA",
    continent: "North America",
    type: "cultural",
    costLevel: "high",
    image: "assets/Image/New York City.jpg",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
    attractions: ["Statue of Liberty", "Central Park", "Times Square"],
    dailyCost: 250
  }
];

// Utility: Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollAnimations();
  initNewsletter();

  // Page Specific Initializations based on elements present
  if (document.getElementById("quote-container")) initHome();
  if (document.getElementById("explorer-grid")) initExplorer();
  if (document.getElementById("planner-form")) initPlanner();
  if (document.getElementById("generator-form")) initGenerator();
  if (document.getElementById("mood-grid")) initMood();
  if (document.getElementById("feedback-form")) initFeedback();
});

// --- Common Functions ---

function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navbar = document.querySelector(".navbar");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load
}

function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;
      if (email) {
        let subs = JSON.parse(localStorage.getItem("newsletterSubs")) || [];
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem("newsletterSubs", JSON.stringify(subs));
          alert("Subscribed successfully!");
          form.reset();
        } else {
          alert("You are already subscribed.");
        }
      }
    });
  }
}

// --- Home Page ---
function initHome() {
  // Quotes Rotation
  const quotes = [
    "“The world is a book and those who do not travel read only one page.”",
    "“Not all those who wander are lost.”",
    "“Travel makes one modest. You see what a tiny place you occupy in the world.”",
    "“To travel is to discover that everyone is wrong about other countries.”"
  ];
  
  const quoteContainer = document.getElementById("quote-container");
  if (quoteContainer) {
    quotes.forEach((q, i) => {
      const p = document.createElement("p");
      p.className = "quote" + (i === 0 ? " active" : "");
      p.innerText = q;
      quoteContainer.appendChild(p);
    });

    let currentQuote = 0;
    const quoteEls = quoteContainer.querySelectorAll(".quote");
    
    setInterval(() => {
      quoteEls[currentQuote].classList.remove("active");
      currentQuote = (currentQuote + 1) % quoteEls.length;
      quoteEls[currentQuote].classList.add("active");
    }, 4000);
  }

  // Destination of the Day (seeded by day of year)
  const dodContainer = document.getElementById("dod-container");
  if (dodContainer) {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const dod = destinations[dayOfYear % destinations.length];
    
    dodContainer.innerHTML = `
      <img src="${dod.image}" alt="${dod.name}" class="dod-img">
      <div class="dod-content">
        <h3>${dod.name}, ${dod.country}</h3>
        <p style="margin: 1rem 0;">${dod.description.substring(0, 100)}...</p>
        <a href="explorer.html" class="btn btn-primary">Explore More</a>
      </div>
    `;
  }
}

// --- Explorer Page ---
function initExplorer() {
  const grid = document.getElementById("explorer-grid");
  const searchInput = document.getElementById("search-dest");
  const filterContinent = document.getElementById("filter-continent");
  const modalOverlay = document.getElementById("dest-modal");
  const modalClose = document.getElementById("modal-close");
  const modalContentDiv = document.getElementById("modal-content-body");

  const renderCards = (data) => {
    grid.innerHTML = "";
    if (data.length === 0) {
      grid.innerHTML = "<p>No destinations found.</p>";
      return;
    }
    data.forEach(dest => {
      const card = document.createElement("div");
      card.className = "dest-card reveal active";
      card.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" class="dest-img">
        <div class="dest-info">
          <div class="dest-name">${dest.name}</div>
          <div class="dest-country">${dest.country}</div>
        </div>
      `;
      card.addEventListener("click", () => openModal(dest));
      grid.appendChild(card);
    });
  };

  const filterData = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const continent = filterContinent.value;
    
    const filtered = destinations.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(searchTerm) || d.country.toLowerCase().includes(searchTerm);
      const matchContinent = continent === "all" || d.continent === continent;
      return matchSearch && matchContinent;
    });
    
    renderCards(filtered);
  };

  searchInput.addEventListener("input", filterData);
  filterContinent.addEventListener("change", filterData);

  const openModal = (dest) => {
    modalContentDiv.innerHTML = `
      <div class="modal-header">
        <img src="${dest.image}" alt="${dest.name}">
      </div>
      <div class="modal-body">
        <h2 class="modal-title">${dest.name}, ${dest.country}</h2>
        <p><strong>Continent:</strong> ${dest.continent} | <strong>Type:</strong> <span style="text-transform:capitalize">${dest.type}</span></p>
        <p style="margin: 1.5rem 0;">${dest.description}</p>
        
        <h3>Top Attractions</h3>
        <ul style="list-style:disc; padding-left: 2rem; margin: 1rem 0;">
          ${dest.attractions.map(a => `<li>${a}</li>`).join('')}
        </ul>
        
        <h3>Travel Cost Estimate</h3>
        <table class="cost-table">
          <tr><th>Item</th><th>Est. Daily Cost</th></tr>
          <tr><td>Accommodation & Food</td><td>$${dest.dailyCost}</td></tr>
          <tr><td>Activities</td><td>$${Math.round(dest.dailyCost * 0.4)}</td></tr>
          <tr><td><strong>Total Daily</strong></td><td><strong>$${dest.dailyCost + Math.round(dest.dailyCost * 0.4)}</strong></td></tr>
        </table>
        
        <button class="btn btn-secondary" style="margin-top: 2rem;" onclick="saveToWishlist(${dest.id})">Add to Wishlist</button>
      </div>
    `;
    modalOverlay.classList.add("active");
  };

  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove("active");
  });

  // Initial render
  renderCards(destinations);
}

window.saveToWishlist = function(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;
  
  let wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];
  if (!wishlist.find(item => item.id === id)) {
    wishlist.push(dest);
    localStorage.setItem("travelWishlist", JSON.stringify(wishlist));
    alert(`${dest.name} added to your wishlist!`);
  } else {
    alert(`${dest.name} is already in your wishlist.`);
  }
}

// --- Planner Page ---
function initPlanner() {
  const form = document.getElementById("planner-form");
  const resultBox = document.getElementById("planner-result");
  const fillBar = document.getElementById("budget-fill");
  const resultText = document.getElementById("result-text");
  
  // Populate dropdown
  const destSelect = document.getElementById("plan-dest");
  destinations.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.innerText = d.name;
    destSelect.appendChild(opt);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const destId = parseInt(destSelect.value);
    const days = parseInt(document.getElementById("plan-days").value);
    const totalBudget = parseInt(document.getElementById("plan-budget").value);
    
    const dest = destinations.find(d => d.id === destId);
    
    // Calculate required budget
    const requiredDaily = dest.dailyCost + (dest.dailyCost * 0.4);
    const requiredTotal = requiredDaily * days;
    
    let percentage = (totalBudget / requiredTotal) * 100;
    if (percentage > 100) percentage = 100;
    
    resultBox.classList.add("active");
    
    let color = "var(--success)";
    let msg = `Great! Your budget of $${totalBudget} is sufficient for ${days} days in ${dest.name}.`;
    
    if (percentage < 50) {
      color = "var(--danger)";
      msg = `Warning: Your budget is quite low for ${dest.name}. You might need around $${requiredTotal}.`;
    } else if (percentage < 100) {
      color = "var(--secondary)";
      msg = `You're close! You might need to travel on a tight budget. Estimated required: $${requiredTotal}.`;
    }

    resultText.innerText = msg;
    
    setTimeout(() => {
      fillBar.style.width = percentage + "%";
      fillBar.style.backgroundColor = color;
    }, 100);

    // Save trip option
    const saveBtn = document.getElementById("save-trip-btn");
    saveBtn.onclick = () => {
      let trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
      trips.push({ destName: dest.name, days, budget: totalBudget, date: new Date().toISOString() });
      localStorage.setItem("savedTrips", JSON.stringify(trips));
      alert("Trip saved successfully!");
    };
  });
}

// --- Generator Page ---
function initGenerator() {
  const form = document.getElementById("generator-form");
  const resultBox = document.getElementById("generator-result");
  const genDestDiv = document.getElementById("generated-dest");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("gen-type").value;
    const cost = document.getElementById("gen-cost").value;

    let filtered = destinations;
    if (type !== "any") filtered = filtered.filter(d => d.type === type);
    if (cost !== "any") filtered = filtered.filter(d => d.costLevel === cost);

    resultBox.classList.add("active");

    if (filtered.length === 0) {
      genDestDiv.innerHTML = "<p>No destinations match your criteria. Try different options!</p>";
    } else {
      const randomDest = filtered[Math.floor(Math.random() * filtered.length)];
      
      genDestDiv.innerHTML = `
        <div style="text-align:center;">
          <img src="${randomDest.image}" alt="${randomDest.name}" style="width:100%; height:250px; object-fit:cover; border-radius:1rem; margin-bottom:1rem;">
          <h3>${randomDest.name}, ${randomDest.country}</h3>
          <p style="margin-top:0.5rem">${randomDest.description}</p>
          <button class="btn btn-primary" style="margin-top: 1rem;" onclick="saveToWishlist(${randomDest.id})">Save to Wishlist</button>
        </div>
      `;
    }
  });
}

// --- Mood Page ---
function initMood() {
  const moodCards = document.querySelectorAll(".mood-card");
  let currentAudio = null;
  let currentCard = null;

  moodCards.forEach(card => {
    card.addEventListener("click", () => {
      const soundSrc = card.getAttribute("data-sound");
      
      if (currentAudio && currentCard === card) {
        // Toggle pause/play
        if (currentAudio.paused) {
          currentAudio.play();
          card.classList.add("playing");
        } else {
          currentAudio.pause();
          card.classList.remove("playing");
        }
      } else {
        if (currentAudio) {
          currentAudio.pause();
          if(currentCard) currentCard.classList.remove("playing");
        }
        
        // For project purposes, if local audio files don't exist, we mock it or use an empty audio
        // In reality, you'd point to real MP3s. Using a silent base64 or public mock for safety without errors.
        currentAudio = new Audio(soundSrc);
        currentAudio.loop = true;
        // Handle play error gracefully (e.g. invalid URL)
        currentAudio.play().catch(e => console.log("Audio play prevented or file missing:", e));
        
        card.classList.add("playing");
        currentCard = card;
      }
    });
  });

  renderWishlist();
}

function renderWishlist() {
  const wishlistDiv = document.getElementById("wishlist-container");
  if (!wishlistDiv) return;

  const wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];
  const visited = JSON.parse(localStorage.getItem("travelVisited")) || [];

  if (wishlist.length === 0) {
    wishlistDiv.innerHTML = "<p>No destinations planned yet.</p>";
    return;
  }

  wishlistDiv.innerHTML = "";
  wishlist.forEach(dest => {
    const isVisited = visited.includes(dest.id);
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <div>
        <strong>${dest.name}</strong> - ${dest.country}
      </div>
      <div>
        <button class="btn ${isVisited ? 'btn-success' : 'btn-outline'}" onclick="toggleVisited(${dest.id})" style="padding: 0.25rem 0.75rem; font-size:0.875rem;">
          ${isVisited ? 'Visited ✓' : 'Mark Visited'}
        </button>
      </div>
    `;
    wishlistDiv.appendChild(item);
  });
}

window.toggleVisited = function(id) {
  let visited = JSON.parse(localStorage.getItem("travelVisited")) || [];
  if (visited.includes(id)) {
    visited = visited.filter(vId => vId !== id);
  } else {
    visited.push(id);
  }
  localStorage.setItem("travelVisited", JSON.stringify(visited));
  renderWishlist(); // Re-render
}

// --- Feedback Page ---
function initFeedback() {
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("success-msg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fb-name").value;
      const email = document.getElementById("fb-email").value;
      const msg = document.getElementById("fb-msg").value;

      let feedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
      feedbacks.push({ name, email, msg, date: new Date().toISOString() });
      localStorage.setItem("userFeedbacks", JSON.stringify(feedbacks));

      form.reset();
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Close others
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      // Toggle current
      item.classList.toggle("active");
    });
  });
}

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
