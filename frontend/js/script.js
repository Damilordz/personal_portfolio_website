// JavaScript for the typing effect
const textElement = document.getElementById("typed-text");
const texts = [
  "I am a Full Stack Web Developer.",
  "I love to code and build things.",
  "I am passionate about learning new technologies.",
  "I enjoy solving problems and creating solutions.",
  "I am dedicated to delivering high-quality results.",
];
let index = 0;
let textIndex = 0;
let isTyping = true;

function type() {
  if (isTyping) {
    textElement.textContent += texts[textIndex][index];
    index++;
    if (index >= texts[textIndex].length) {
      isTyping = false;
      setTimeout(erase, 1000); // Wait for 1 second before starting erasing
      return;
    }
    setTimeout(type, 150); // Typing speed
  }
}

function erase() {
  const currentText = textElement.textContent;
  if (!isTyping && currentText.length > 0) {
    textElement.textContent = currentText.substring(0, currentText.length - 1);
    setTimeout(erase, 150); // Erasing speed
  } else {
    index = 0;
    isTyping = true;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 1000); // Wait for 1 second before typing again
  }
}

// Start typing
type();

// Get references to the navigation links and sections
const navLinks = document.querySelectorAll(".nav-menu a");
const skillsSection = document.querySelector(".skills");
const skillCards = document.querySelectorAll(".skill-cards .card");
const portfolioSection = document.querySelector(".portfolio");
const projectCards = document.querySelectorAll(".portfolio-wrap .card");

// Function to animate skill cards
function animateSkillCards() {
  skillCards.forEach((card) => {
    card.classList.add("animate");
  });
}

// Function to animate project cards
function animateProjectCards() {
  projectCards.forEach((card) => {
    card.classList.add("animate");
  });
}

// Intersection Observer for skills section
const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillCards();
        observer.unobserve(skillsSection); // Stop observing after the first animation
      }
    });
  },
  { threshold: 0.2 }
);

// Intersection Observer for portfolio section
const portfolioObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProjectCards();
        observer.unobserve(portfolioSection); // Stop observing after the first animation
      }
    });
  },
  { threshold: 0.1 }
);

// Observe the sections
skillsObserver.observe(skillsSection);
portfolioObserver.observe(portfolioSection);

// Add click event listener to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Get the target section
    const targetSection = document.querySelector(e.target.hash);

    // Animate the target section
    if (targetSection === skillsSection) {
      animateSkillCards();
      skillsObserver.unobserve(skillsSection); // Stop observing after the first animation
    } else if (targetSection === portfolioSection) {
      animateProjectCards();
      portfolioObserver.unobserve(portfolioSection); // Stop observing after the first animation
    }

    // Smooth scroll to the target section
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  });
});

/**
 * Back to top button
 */
const backToTopButton = document.querySelector(".back-to-top");

// Function to toggle back-to-top button visibility
function toggleBackToTopButton() {
  if (window.scrollY > window.innerHeight) {
    backToTopButton.classList.add("visible");
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
    backToTopButton.classList.remove("visible");
  }
}

// Event listener for scroll event
window.addEventListener("scroll", toggleBackToTopButton);

// Initial check on page load
toggleBackToTopButton();


// Toggle Nav bar
const navMenu = document.querySelector(".toggle-nav-bar");
const sideNav = document.getElementById("side-nav");

// Function to toggle Nav Bar
const toggleNav = () => {
  sideNav.classList.toggle("mobile-nav-active");
  navMenu.classList.toggle("fa-bars");
  navMenu.classList.toggle("fa-xmark");
  document.body.classList.toggle("no-scroll");
};

// Add event listener to toggle Nav
navMenu.addEventListener("click", toggleNav);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (sideNav.classList.contains("mobile-nav-active")) {
      toggleNav();
    }
  });
});

// Portfolio Cards Hover Effect for Mobile
document.addEventListener("DOMContentLoaded", () => {
  const portfolioCards = document.querySelectorAll(".portfolio-wrap .card");

  portfolioCards.forEach((card) => {
    card.addEventListener("touchstart", () => {
      card
        .querySelector(".portfolio-hover-options")
        .classList.add("hover-active");
    });

    card.addEventListener("touchend", () => {
      setTimeout(() => {
        card
          .querySelector(".portfolio-hover-options")
          .classList.remove("hover-active");
      }, 500);
    });
  });
});
