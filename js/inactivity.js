// time is 10 seconds
const TITLE_TIME_INTERVAL = 10 * 1000
const POPUP_SHOW_TIME = 10 * 1000
const titlePopup = document.querySelector(".speech.title-attached")


const titleInactivityTime = () => {
  var time;

  window.onload = resetTimer;
  resetTimer()

  function showPopup() {
    titlePopup.style.display = "block"

    setTimeout(() => {
      titlePopup.style.display = "none"
      resetTimer()
    }, POPUP_SHOW_TIME)
  }

  function resetTimer() {
    clearTimeout(time);
    titlePopup.style.display = "none"
    time = setTimeout(showPopup, TITLE_TIME_INTERVAL)
  }
};


//inactivity time is 8 seconds
const CART_TIME_INTERVAL = 8 * 1000
const cartPopup = document.querySelector(".speech.cart-attached")


const cartInactivityTime = () => {
  var time;
  resetTimer()

  // DOM Events
  document.onmousemove = resetTimer;
  document.onmousedown = resetTimer;
  document.ontouchstart = resetTimer;
  document.onclick = resetTimer;
  document.onkeydown = resetTimer;
  document.addEventListener('scroll', resetTimer, true);



  function showPopup() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"))

    if (cartItems.length >= 1) {
      cartPopup.style.display = "block"
    }
  }

  function resetTimer() {
    clearTimeout(time);
    cartPopup.style.display = "none"
    time = setTimeout(showPopup, CART_TIME_INTERVAL)
  }
};



window.onload = function () {
  if (titlePopup) {
    titleInactivityTime();
  }
  if (cartPopup) {
    cartInactivityTime()
  }
}