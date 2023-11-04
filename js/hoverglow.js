
function toggleFuzzyGlow() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (window.innerWidth < 770) {
      button.classList.add('fuzzy-glow');
    } else {
      button.classList.remove('fuzzy-glow');
    }
  });
}

function detectScreenSize() {
  toggleFuzzyGlow(); // Initial check on load
  window.addEventListener('resize', toggleFuzzyGlow);
}

// Add an event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', detectScreenSize);

/*Tabs*/
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
