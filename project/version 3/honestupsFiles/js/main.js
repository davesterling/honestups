// Cart Open Close
let cartIcon = document.querySelector("#cart-icon");

const viewCart = document.querySelector(".overlay-add-popup button");
const closeCartPopup = document.querySelector("#close-cart-popup");

// Making Add to cart
// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
  console.log("ready not");
} else {
  console.log("calling ready");
  ready();
}

viewCart.onclick = () => {
  cart.classList.add("active");
  const popupel = document.querySelector(".overlay-add-popup");
  popupel.style.display = "none";
};

closeCartPopup.onclick = () => {
  const popupel = document.querySelector(".overlay-add-popup");
  popupel.style.display = "none";
};

function ready() {
  console.log("called ready");
  // Remove Item From Cart
  document.querySelectorAll(".cart-remove").forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  // Quantity Change
  document.querySelectorAll(".cart-quantity").forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });

  document.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("add-cart")) {
      addCartClicked(event);
      event.stopPropagation();
      event.preventDefault();
    }
  });

  loadCartItems();
}

// Sample implementation of the functions
function removeCartItem(event) {
  // Your logic to remove an item from the cart
  console.log("Item removed from cart");
}

function quantityChanged(event) {
  // Your logic for handling quantity changes
  console.log("Quantity changed");
}

function addCartClicked(event) {
  // Your logic for handling "add to cart" button clicks
  console.log("Add to cart clicked");
}

// Initialize the functions when the document is ready
document.addEventListener("DOMContentLoaded", ready);

// Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  saveCartItems();
  updateCartIcon();
}
// Quantity Change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  saveCartItems();
  updateCartIcon();
}

function showAddedPopup() {
  var timeout;
  const popupel = document.querySelector(".overlay-add-popup");
  popupel.style.display = "flex";

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    popupel.style.display = "none";
  }, 5000);
}

function addCartClicked(event) {
  console.log("Product Added To Cart");
  var button = event.target;
  var shopProducts = button.closest(".product-popup");
  var title, price, productImg;

  if (shopProducts) {
    // Inside the popup
    shopProducts = button.closest(".product-popup");
    title = shopProducts.querySelector(".popup-title").innerText;
    price = shopProducts.querySelector(".price").innerText;
    productImg = shopProducts.querySelector(".popup-image img").src;
  } else {
    // Inside the product box
    shopProducts = button.closest(".product-box");
    title = shopProducts.querySelector(".product-title").innerText;
    price = shopProducts.querySelector(".price").innerText;
    productImg = shopProducts.querySelector(".product-img").src;
  }

  addProductToCart(title, price, productImg);
  updatetotal();
  saveCartItems();
  updateCartIcon();
  showAddedPopup();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      // Find the parent container (assuming 'detail-box' is the parent)
      const cartItem = cartItemsNames[i].closest(
        ".detail-box, .product-popup"
      ).parentNode;

      // Log information to the console for debugging
      console.log("Cart item:", cartItem);

      // Check if the cart item exists
      if (cartItem) {
        // Find the quantity input within the cart item
        const quantityInput = cartItem.querySelector(".cart-quantity");

        // Log information to the console for debugging
        console.log("Quantity input:", quantityInput);

        // Check if the quantity input exists
        if (quantityInput) {
          // If the item is already in the cart, increment the quantity
          quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
          // Handle the case where the quantity input is not found
          console.error("Quantity input not found in the cart item.");
        }
      } else {
        // Handle the case where the cart item is not found
        console.error("Cart item not found.");
      }
      return;
    }
  }

  var cartBoxContent = `
  <img src="${productImg}" alt="" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input
      type="number"
      name=""
      id=""
      value="1"
      class="cart-quantity"
    />
  </div>




  <!-- Remove Item -->
  <i class="bx bx-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  saveCartItems();
  updateCartIcon();
}

// Update Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  // If price contain some cents
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  // Save Total To LocalStorage
  localStorage.setItem("cartTotal", total);
}

// Keep Item in cart when page refresh with localstorage
function saveCartItems() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cartItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    cartBox = cartBoxes[i];
    var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

    var item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Loads In Cart
function loadCartItems() {
  var cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      var cartBoxes = document.getElementsByClassName("cart-box");
      var cartBox = cartBoxes[cartBoxes.length - 1];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
  var cartTotal = localStorage.getItem("cartTotal");
  if (cartTotal) {
    document.getElementsByClassName("total-price")[0].innerText =
      "$" + cartTotal;
  }
  updateCartIcon();
}

// Quantity In Cart Icon
function updateCartIcon() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var rewardCards = document.getElementsByClassName("reward-card");
  var quantity = 0;

  quantity += cartBoxes.length;
  quantity += rewardCards.length;

  var cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);

  var trophyIcon = document.getElementById("tab-trophy");

  numberWithCommas(cartIcon);
}

function numberWithCommas(element) {
  var quantity = element.getAttribute("data-quantity");
  var formattedQuantity = quantity
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  element.setAttribute("data-quantity", formattedQuantity);
}
// Clear Cart Item After Successful Payment
function clearCart() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  cartContent.innerHTML = "";
  updatetotal();
  localStorage.removeItem("cartItems");
}

// Generate a random confirmation number
var confirmation = generateConfirmationNumber();

//Use AJAX to submit the form to the local Python server on port 4040
var xhr1 = new XMLHttpRequest();
xhr1.open("POST", "https://bootblazers.com:4004", true);
xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
var formData1 = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
  email
)}&message=${encodeURIComponent(message)}&confirmation=${encodeURIComponent(
  confirmation
)}`;
xhr1.send(formData1);
//Use AJAX to submit the form to the local Python server on port 4040
var xhr2 = new XMLHttpRequest();
xhr2.open("POST", "https://bootblazers.com:4005", true);
xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// Include confirmation number in form data
var formData2 = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
  email
)}&message=${encodeURIComponent(message)}&confirmation=${confirmation}`;
xhr2.send(formData2);

// Optionally handle responses if needed
xhr2.onload = function () {
  if (xhr2.status == 200) {
    console.log("Form submitted to port 4004");
    sendCartItemsToServers();
  }
};

function generateConfirmationNumber() {
  // Generate a random confirmation number with 7 digits
  return Math.floor(1000000 + Math.random() * 9000000);
}

function sendCartItemsToServers() {
  // Get cart items from localStorage
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));

  // Send cart items to Python server on port 4020
  sendCartItemsToServer(4020, { cartItems: cartItems });

  // Send cart items to Python server on port 4030
  //sendCartItemsToServer(4030, { cartItems: cartItems });
}

function sendCartItemsToServer(port, data) {
  // Use fetch API to submit the cart items to the local Python server on the specified port
  fetch(`http://localhost:${port}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Cart items sent to port ${port} successfully!`);
        // Optionally, you can perform additional actions after sending to each server
      } else {
        console.error(`Failed to send cart items to port ${port}.`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
