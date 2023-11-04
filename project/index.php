<!DOCTYPE html>
<?php session_start();

// remove all session variables
// session_unset();
//
// // destroy the session
// session_destroy();

// Check if the cookie is set and not empty
if (isset($_COOKIE['user']) && !empty($_COOKIE['user'])) {


   $name = $_COOKIE['user'];

   $_SESSION['admin'] = $name;






} else {

}



?>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/media/HU-Logo.png" />

    <link rel="stylesheet" href="css/cart.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/header-fixed.css" />
    <link rel="stylesheet" href="css/social-widget.css" />
    <link rel="stylesheet" href="css/podium.css" />
    <link rel="stylesheet" href="css/new-nav-cart.css" />

    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css"
    />

    <title>Honest Ups</title>
  </head>
  <body>
    <!-- nav -->
    <header>
      <div id="logo">
        <img src="/media/HU-Logo" alt="Logo" />
        <a href="javascript:void(0);" onclick="redirect()">Honest Ups</a>
      </div>

      <span class="close-button" onclick="closeSiteHeader()">X</span>
      <nav id="main-nav">
        <a href="about.html">About</a>
        <a href="news.html">News</a>
        <a href="faq.html">FAQs</a>
        <a href="contact.html">Contact</a>
      </nav>
      <!-- <div id="cart-icon" class="relative"> -->

      <div class="cart-icon-button">
        <span class="bx bxs-trophy" id="cart-icon" data-quantity="0"></span>
      </div>
      <!-- </div> -->
    </header>
    <div id="site-header" style="padding-top: 10vh">
      <div class="username-container">
        <i class="bx bxs-trophy" id="tab-trophy" data-quantity="0"></i>

       <?php

       // Check if the session variable is set
       if (isset($_SESSION['admin'])) {
           echo $_SESSION['admin'] ;
       } else {
           echo '<span class="username" id="showFormBtn">sign in/sign up</span>';
       }



        ?>




      </div>
      <div class="icons-container">
        <div class="relative site-tab active-tab">
          <span class="">Site</span>
        </div>
        <div class="relative cart-tab">
          <span class="">Cart</span>
        </div>
        <div class="relative reward-tab">
          <span class="">Rewards</span>
        </div>
      </div>

      <!-- site links -->
      <div class="links-container active-container">
        <a href="about.html">About</a>
        <a href="news.html">News</a>
        <a href="faq.html">FAQs</a>
        <a href="contact.html">Contact</a>
      </div>

      <!-- cart -->
      <div class="cart-container">
        <h2 class="cart-title">Stuff to Buy:</h2>
        <!-- Content -->
        <div class="cart-content"></div>
        <!-- Total -->
        <div class="total">
          <div class="total-title">Total</div>
          <div class="total-price">$0</div>
        </div>
        <!-- Buy Button -->
        <button type="button" class="btn-buy">Pay Now</button>
      </div>

      <!-- rewards -->
      <div class="rewards-container">
        <h2 class="reward-title">Rewards:</h2>
        <div class="reward-content"></div>
      </div>

      <div class="widget-container widget-active">
        <div class="widget-toggle"></div>
        <div class="social">
          <a href="#" class="button-link facebook">facebook</a>
          <a href="#" class="button-link instagram">instagram</a>
          <a href="#" class="button-link linkedin">linkedin</a>
          <!-- <a href="#" class="button-link twitter">twitter</a>-->
        </div>
      </div>
    </div>
    <!-- popup start -->

    <!-- popup end -->



    <div class="divider-div">
      <!-- sidebar -->

      <section class="sidebar">
        <div class="container leaderboard-container">
          <div class="title">
            <span>Leaderboard</span>
          </div>

          <div class="row">
            <span>Rank</span>
            <span>Name</span>
            <span>Record</span>
          </div>

          <div class="leaderboard-items">
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#4</div>
              </div>

              <span>Name</span>
              <span>123</span>
            </div>
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#5</div>
              </div>
              <span>1</span>
              <span>Name</span>
            </div>
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#6</div>
              </div>
              <span>10000</span>
              <span>2</span>
            </div>
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#7</div>
              </div>
              <span>Name</span>
              <span>123</span>
            </div>
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#8</div>
              </div>
              <span>Name</span>
              <span>123</span>
            </div>
            <div class="row">
              <div class="trophy-container">
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#9</div>
              </div>
              <span>Name</span>
              <span>123</span>
            </div>
          </div>

          <button class="showBtn">Show More</button>
        </div>
      </section>

      <!-- phone size sidebar  -->
      <div id="slideOut">
        <!--   // Tab -->
        <div class="slideOutTab">
          <div>
            <p>i am tab.</p>
          </div>
        </div>
        <div class="modal-content">
          <section class="sidebar sidebar-mobile">
            <div class="container leaderboard-container">
              <div class="title">
                <span>Leaderboard</span>
              </div>

              <div class="row">
                <span>Rank</span>
                <span>Name</span>
                <span>Record</span>
              </div>

              <div class="leaderboard-items">
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#4</div>
                  </div>

                  <span>Name</span>
                  <span>123</span>
                </div>
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#5</div>
                  </div>
                  <span>1</span>
                  <span>Name</span>
                </div>
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#6</div>
                  </div>
                  <span>10000</span>
                  <span>2</span>
                </div>
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#7</div>
                  </div>
                  <span>Name</span>
                  <span>123</span>
                </div>
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#8</div>
                  </div>
                  <span>Name</span>
                  <span>123</span>
                </div>
                <div class="row">
                  <div class="trophy-container">
                    <i class="bx bxs-trophy trophy-icon"></i>
                    <div class="trophy-text">#9</div>
                  </div>
                  <span>Name</span>
                  <span>123</span>
                </div>
              </div>

              <button class="showBtn">Show More</button>
            </div>
          </section>
          <div class="modal-footer"></div>
        </div>
      </div>
      <!-- // Scroll content -->

      <!-- main  -->
      <div class="main-side">
        <!-- podium section  -->
        <section class="podium-section">
          <div class="container">
            <div class="podium-container" id="podium1">
              <div class="podium">
                <div class="firework"></div>
                <div class="drape-rect"></div>
                <div class="drape-triangle"></div>
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#1</div>
              </div>
              <span>John Smith</span>
            </div>

            <div class="podium-container" id="podium2">
              <div class="podium">
                <div class="drape-rect"></div>
                <div class="drape-triangle"></div>
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#2</div>
              </div>
              <span>Samantha Johnson</span>
            </div>
            <div class="podium-container" id="podium3">
              <div class="podium">
                <div class="drape-rect"></div>
                <div class="drape-triangle"></div>
                <i class="bx bxs-trophy trophy-icon"></i>
                <div class="trophy-text">#3</div>
              </div>
              <span>Alexander Rodriguez</span>
            </div>
          </div>
        </section>

        <!-- tiktok iframe section -->
        <section class="tiktok-section">
          <div class="container">
            <div>
              <blockquote
                class="tiktok-embed"
                cite="https://www.tiktok.com/@pahardii/video/7170999670242610459"
                data-video-id="7170999670242610459"
                style="max-width: 605px"
              >
                <section>
                  <a
                    target="_blank"
                    title="@pahardii"
                    href="https://www.tiktok.com/@pahardii?refer=embed"
                    >@pahardii</a
                  >
                  Enjoy nature without music 🎵❤️<a
                    title="foryoupage"
                    target="_blank"
                    href="https://www.tiktok.com/tag/foryoupage?refer=embed"
                    >#foryoupage</a
                  >
                  <a
                    title="viralvideo"
                    target="_blank"
                    href="https://www.tiktok.com/tag/viralvideo?refer=embed"
                    >#viralvideo</a
                  >
                  <a
                    title="trending"
                    target="_blank"
                    href="https://www.tiktok.com/tag/trending?refer=embed"
                    >#trending</a
                  >
                </section>
              </blockquote>
              <script async src="https://www.tiktok.com/embed.js"></script>
            </div>
            <div class="text">
              <h3>Honest Up challenge</h3>
              <p>
                To enter the pushup challenge, post and un-cut video of you
                doing the most pushups with our product and showing the score
                and tagging @Honestups. <br />
                <br />
                For other submissions of this challenge, submit them
                <a href="#">here</a> <br />
                <br />
                <a href="" class="book"
                  ><box-icon type="solid" color="red" name="book-alt"></box-icon
                  >Check out the rule book</a
                >
              </p>
            </div>
          </div>
        </section>

        <!-- product video display section  -->
        <section class="product-section">
          <div class="container">
            <div><iframe src="" frameborder="0"></iframe></div>
            <div class="text">
              <h3>Honest Ups</h3>
              <p>
                Get ready to maximize health when you get your Honest Ups
                workout buddy to coach you through at home workouts. Beat your
                friends with our competition referee feature that lets an
                impartial third party determine the most atheltic one in the
                squad.
              </p>
              <button class="button">Buy Today!</button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- reddit iframe section  -->
    <section class="reddit-section">
      <div class="container">
        <blockquote class="reddit-embed-bq" data-embed-height="502">
          Posts from the
          <a href="https://www.reddit.com/r/HonestUps/">honestups</a><br />
          community on Reddit
        </blockquote>
        <script
          async=""
          src="https://embed.reddit.com/widgets.js"
          charset="UTF-8"
        ></script>
      </div>
    </section>

    <!-- footer  -->
    <footer>
      <div class="sitemap">
        <a href="Info.html">Info</a>
        <a href="about.html">About Us</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="contact.html">Contact Us</a>
        <a href="faq.html">FAQs</a>
        <a href="privacy.html">Terms of Use</a>

        <!--
        <a href="news">News</a>
        <a href="shop.html">Products</a>
        <a href="blog.html">Blog</a>
        <a href="services.html">Services</a>
        <a href="support.html">Support</a>
        <a href="carreers.html">Careers</a>
        <a href="testimonials">Testimonials</a>
        <a href="training.html">Training</a>
        <a href="login.html">Login</a>-->
      </div>
    </footer>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <div class="form-container" id="formContainer">
       <span class="close-icon" onclick="hideForm()"><i class="fas fa-times"></i></span> <!-- Close icon -->
      <h2 style="font-family: "Montserrat", sans-serif;">Create an account for 10% off!</h2>

<form class="" action="logaction.php" method="post" enctype="multipart/form-data">





      <label for="name" style="font-weight:normal;">User name :</label>
      <input type="text" id="name" name="name" required>

      <label for="email" style="font-weight:normal;">Email :</label>
      <input type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

      <label for="password" style="font-weight:normal;">Password : <span id="passwordMessage" style="color: red;"></span> </label>


      <input type="password" id="password" name="password" required>



       <div class="checkbox-container">
       <input type="checkbox" name="check" value="true" id="keep-signed-in" class="checkbox">
       <label for="keep-signed-in" class="label" style="font-weight:normal;">Keep me signed in for one year /</label>
       </div>
<br>
       <button type="submit" name="submit" value="submit" id="submitBtn">Submit</button>
</form>

      <div class="social-buttons">
  <a href="auth/callback.php?request=google" class="social-button google-button">Google</a>
  <a href="auth/callback.php?request=facebook" class="social-button facebook-button">Facebook</a>
  <a href="auth/callback.php?request=twitter" class="social-button twitter-button">Twitter</a>
    </div>
    </div>













    <script src="js/header.js"></script>
    <script src="js/social-widget.js"></script>
    <script src="js/podium.js"></script>
    <script src="js/slider.js"></script>
    <script src="js/leaderboard.js"></script>
    <script src="js/main.js"></script>
    <script src="js/headerTab.js"></script>
    <script src="js/rewards.js"></script>

    <!-- code for handling rewards  -->
    <script>
      document
        .querySelector(".login-form")
        .addEventListener("submit", function (event) {
          let loginPop = document.querySelector(".login-popup");
          let username = document.querySelector(".username-input").value;

          event.preventDefault(); // prevent the form from submitting

          addRewards({ id: 4, code: "WELCOME" + username });

          // Create a new element for the success message
          let popupText = document.querySelector(".popup-text");
          popupText.classList.toggle("success");
          popupText.innerHTML = "10% off coupon added!";

          // Hide the form
          document.querySelector(".login-form").style.display = "none";

          // Remove the success message after 3 seconds
          setTimeout(function () {
            popupText.classList.add("fade");
            loginPop.classList.remove("slide-popup");
          }, 3000);
        });

      document.addEventListener("click", function (event) {
        let loginPop = document.querySelector(".login-popup");

        // Check if the click event's target is the popup or a descendant of the popup
        if (!loginPop.contains(event.target)) {
          // If it's not, close the popup
          loginPop.classList.remove("slide-popup");
        }
      });

      const slider = () => {
        let loginPop = document.querySelector(".login-popup");
        loginPop.classList.add("slide-popup");
      };

      slider();
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">


      <script>
        document.getElementById('showFormBtn').addEventListener('click', function() {
          document.getElementById('formContainer').classList.toggle('show');
        });

        document.getElementById('submitBtn').addEventListener('click', function() {
          // Handle form submission here
          // For demonstration purposes, just alert the values
          var name = document.getElementById('name').value;
          var email = document.getElementById('email').value;

        });
        function hideForm() {
        document.getElementById("formContainer").style.display = "none";
        }
      </script>

      <script>
      document.addEventListener("DOMContentLoaded", function() {
          // Get password input field and password message span
          const passwordInput = document.getElementById("password");
          const passwordMessage = document.getElementById("passwordMessage");

          // Add event listener to password input field
          passwordInput.addEventListener("input", function() {
              // Check if password length is less than 6 characters
              if (passwordInput.value.length < 6) {
                  // Show error message
                  passwordMessage.innerHTML = "Your password must be at least 6 characters long.";
              } else {
                  // Clear error message
                  passwordMessage.textContent = "";
              }
          });
      });
      </script>
  </body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


<script type="text/javascript">
  $(document).ready(function() {
    // Extracting values from form fields or any other source
    var name = '<?php echo $_SESSION["name"]; ?>'; // Replace #name with the actual ID of the name field
    var email = '<?php echo $_SESSION["admin_email"]; ?>'; // Replace #email with the actual ID of the email field
    var password = '<?php echo $_SESSION["pass"]; ?>'; // Replace #password with the actual ID of the password field

    // Constructing the data to be sent to Google Sheets
    var myData = {
        'name': name,
        'email': email,
        'pass': password
    };

    var url = 'https://script.google.com/macros/s/AKfycbw5oTjfBYdP7TEqqIprT-CLHl4YS3djjXKKjnBRqKZbkfs_7CODZ8NWv96rwNwMGoqG/exec';

    // Sending data to Google Sheets using AJAX
    $.ajax({
        url: url,
        method: 'POST',
        data: myData,
        success: function(data) {
            console.log(data);
        }
    });
});

</script>
