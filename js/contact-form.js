function validateForm() {
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("message");

  // Reset borders
  name.style.border = "3px solid transparent";
  email.style.border = "3px solid transparent";
  message.style.border = "3px solid transparent";

  // Reset speech bubbles
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("messageError").innerHTML = "";

  // Validate name, email, and message
  if (name.value === "") {
    name.style.border = "3px solid red";
    document.getElementById("nameError").innerHTML = "This field cannot be blank";
    return;
  }

  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.style.border = "3px solid red";
    document.getElementById("emailError").innerHTML = "Please provide a valid email";
    return;
  }

  if (message.value === "") {
    message.style.border = "3px solid red";
    document.getElementById("messageError").innerHTML = "This field cannot be blank";
    return;
  }

  // If all validations pass, submit the form
  submitForm();
}
function submitForm() {
// Get form data
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var message = document.getElementById("message").value;

// Use AJAX to submit the form to the local Python server on port 4000
var xhr1 = new XMLHttpRequest();
xhr1.open("POST", "https://honestups.com:4007", true);
xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var formData1 = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;
xhr1.send(formData1);

// Use AJAX to submit the form to the local Python server on port 4010
var xhr2 = new XMLHttpRequest();
xhr2.open("POST", "https://honestups.com:4008", true);
xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var formData2 = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;
xhr2.send(formData2);

// Optionally handle responses if needed
xhr1.onload = function () {
  if (xhr1.status == 200) {
    console.log("Form submitted to port 4007");
  }
};

xhr2.onload = function () {
  if (xhr2.status == 200) {
    console.log("Form submitted to port 4008");
  }
};

// On successful submission, hide the form and show the thank-you message
document.getElementById("contactForm").style.display = "none";
document.getElementById("thankYouMessage").style.display = "block";
}