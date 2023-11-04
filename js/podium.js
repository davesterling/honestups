document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("podium3").style.animation =
    "popInAnimation 0.5s forwards";
  setTimeout(function () {
    document.getElementById("podium2").style.animation =
      "popInAnimation 0.5s forwards";
  }, 3000); // Start pop in animation for podium 2 after 3 seconds
  setTimeout(function () {
    document.getElementById("podium1").style.animation =
      "popInAnimation 0.5s forwards";
  }, 6000); // Start pop in animation for podium 3 after 6 seconds

  // Start floating animation for all podiums after all have popped in
  setTimeout(function () {
    document.querySelectorAll(".podium-container").forEach(function (podium) {
      podium.style.animation = "floatAnimation 6s infinite alternate";
      podium.style.opacity = "1";
    });
  }, 9000); // Start floating animation after 9 seconds
});
