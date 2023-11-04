const widgetToggle = document.querySelector('.widget-toggle');
const social = document.querySelector('.social');

widgetToggle.addEventListener('click', function() {
  social.classList.toggle('active');
});