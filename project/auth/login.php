<?php include("top.php"); ?>
		<!--Sliders Section--> 
		<section>
			<div class="bannerimg cover-image bg-background3" data-image-src="assets/images/banners/banner2.jpg">
				<div class="header-text mb-0">
					<div class="container">
						<div class="text-center text-white">
							<h1 class="">Login</h1>
							<ol class="breadcrumb text-center">
								<li class="breadcrumb-item"><a href="#">Home</a></li>
								<li class="breadcrumb-item"><a href="#">User</a></li>
								<li class="breadcrumb-item active text-white" aria-current="page">Login</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--/Sliders Section-->

		<!--Section-->
		<section class="sptb">
			<div class="container customerpage">
				<div class="row">
					<div class="single-page" >
						<div class="col-lg-5 col-xl-4 col-md-6 d-block mx-auto">
							<div class="wrapper wrapper2">
								<div class="card-body">
									<div class="btn-list text-center">
										<a href="../auth/callback.php?request=facebook" class="btn btn-icon btn-facebook">
											<span class="fa fa-facebook "></span>
										</a>
										<a href="../auth/callback.php?request=google" class="btn btn-icon btn-google">
											<span class="fa fa-google bg-google"></span>
										</a>
										<a href="https://twitter.com/" class="btn  btn-icon btn-twitter">
											<span class="fa fa-twitter bg-twitter"></span>
										</a>
									</div>
								</div>
								<hr class="divider">
								<form action="logaction.php" method="post" enctype="multipart/form-data" class="card-body" tabindex="500">
									<div class="mail">
										<input type="email" name="n1">
										<label>Mail or Username</label>
									</div>
									<div class="passwd">
										<input type="password" name="n22">
										<label>Password</label>
									</div>
									<div class="submit">
										<button type="submit" value="submit" name="submit" class="btn btn-primary btn-block" href="#">Login</button>
									</div>

									<p class="text-dark mb-0">Don't have account?<a href="register.html" class="text-primary ml-1">Sign UP</a></p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--/Section-->

		<!-- Newsletter-->
		<?php include("newsletter.php"); ?>
		<!--/Newsletter-->

		<!--Footer Section-->
	<?php include("footer.php"); ?>
		<!--Footer Section-->

		<!-- Back to top -->
		<a href="#top" id="back-to-top"><i class="fa fa-angle-double-up"></i></a>

		<!-- JQuery js-->
		<script src="assets/js/jquery-3.2.1.min.js"></script>

		<!-- Bootstrap js -->
		<script src="assets/plugins/bootstrap/js/popper.min.js"></script>
		<script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>

		<!--JQueryVehiclerkline Js-->
		<script src="assets/js/jquery.sparkline.min.js"></script>

		<!-- Circle Progress Js-->
		<script src="assets/js/circle-progress.min.js"></script>

		<!-- Star Rating Js-->
		<script src="assets/plugins/rating/jquery.rating-stars.js"></script>

		<!--Owl Carousel js -->
		<script src="assets/plugins/owl-carousel/owl.carousel.js"></script>

		<!--Horizontal Menu-->
		<script src="assets/plugins/horizontal/horizontal.js"></script>

		<!--JQuery TouchSwipe js-->
		<script src="assets/js/jquery.touchSwipe.min.js"></script>

		<!--Select2 js -->
		<script src="assets/plugins/select2/select2.full.min.js"></script>
		<script src="assets/js/select2.js"></script>

		<!-- sticky Js-->
		<script src="assets/js/sticky.js"></script>

		<!-- Cookie js -->
		<script src="assets/plugins/cookie/jquery.ihavecookies.js"></script>
		<script src="assets/plugins/cookie/cookie.js"></script>

		<!-- Custom scroll bar Js-->
		<script src="assets/plugins/scroll-bar/jquery.mCustomScrollbar.concat.min.js"></script>

		<!-- Swipe Js-->
		<script src="assets/js/swipe.js"></script>

		<!--Owl-Carousel Js-->
		<script src="assets/js/owl-carousel.js"></script>

		<!-- Custom Js-->
		<script src="assets/js/custom.js"></script>
	</body>
</html>
