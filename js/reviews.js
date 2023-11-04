const ratings = JSON.parse(localStorage.getItem('ratings')) || [5, 3, 12, 29, 45];
const lastSubmissionDate = localStorage.getItem('lastSubmissionDate') || null;
let reviews = JSON.parse(localStorage.getItem('sharedReviews')) || [
   {
      userName: 'Dee',
      selectedProduct: 'Boot Blazers',
      reviewText: "The Boot Blazers sizing was spot on and they are compact enough to fit into my boots without pinching my feet. Happily, my feet are noticeably warmer.",
      rating: 5
      
  },
  {
    userName: 'Tom F',
    selectedProduct: 'Boot Blazers',
    reviewText: 'Took 4 days to arrive and didnt get here in time for my ski trip.',
    rating: 1
  },
  {
    userName: 'Ryan Smith',
    selectedProduct: 'Variety Pack',
    reviewText: ' I got my insoles in the mail the other day and I think there comfortable and reflect a noticable amount of heat back into my boots!',
    rating: 5
  },

  {
    userName: 'C',
    selectedProduct: 'Boot Blazers',
    reviewText: ' I put Boot Blazers in my winter boots about a year ago & actually forgot they were there! I like that they arent bulky but keep my feet warm.',
    rating: 5
  },
  {
    userName: 'Mikayla',
    selectedProduct: 'Boot Blazers',
    reviewText: 'Good product for the money!',
    rating: 5
  },
  {
    userName: 'Dylan',
    selectedProduct: 'Boot Blazers',
    reviewText: 'Worked good but i had to cut them to get the perfect fit.',
    rating: 4
  },
  {
    userName: 'Jasmine',
    selectedProduct: 'Boot Blazers',
    reviewText: 'I like how it made my ugg boots more comfy!',
    rating: 5
  },
  {
    userName: 'Brent',
    selectedProduct: 'Variety Pack',
    reviewText: 'Not satisfied with the variety.',
    rating: 2
  },
  {
    userName: 'John',
    selectedProduct: 'Boot Blazers',
    reviewText: 'This is a great product!',
    rating: 5
  },
  {
    userName: 'RMS',
    selectedProduct: 'Boot Blazers',
    reviewText: 'Good for the $20.',
    rating: 5
  },
  {
    userName: 'Andy',
    selectedProduct: 'Boot Blazers',
    reviewText: 'they are ok, the foam flattens out after about a month or so but the reflectivity works really good',
    rating: 4
  },
  {
    userName: 'Dave',
    selectedProduct: 'Boot Blazers',
    reviewText: 'Best product in the universe. But im biased because its my product!',
    rating: 5
  }
];
  // Set the initial reviews array in local storage
localStorage.setItem('sharedReviews', JSON.stringify(reviews));


function updateChart() {
  const total = ratings.reduce((acc, value) => acc + value, 0);
  document.getElementById('total').innerText = `Reviews: ${total}`;

  for (let i = 0; i < ratings.length; i++) {
    const bar = document.getElementById(`bar${i + 1}`);
    const label = document.getElementById(`label${i + 1}`);
    const height = total === 0 ? 0 : (ratings[i] / total) * 100;

    bar.style.height = `${height}%`;
    label.innerText = `${Math.round((ratings[i] / total) * 100)}%`;
  }
}
function canSubmit() {
    if (!lastSubmissionDate) {
      return true;
    }
    const today = new Date().toLocaleDateString();
    return today !== lastSubmissionDate;
  }
  function submitReview(userName, selectedProduct, reviewText, rating) {
    if (!canSubmit()) {
      alert("You can only submit one rating.");
      return;
    }
  
    const newReview = {
      userName,
      selectedProduct,
      reviewText,
      rating
    };
  
    reviews.unshift(newReview);
    console.log(newReview);
  
    // Save the updated reviews array to localStorage
    localStorage.setItem('sharedReviews', JSON.stringify(reviews));
  
    updateReviewBoxes(() => {
      showFirstReviews();
    });
  }

  












function submitRating() {
    const checkedInput = document.querySelector('.rating input:checked');
    const userName = document.getElementById('userName').value;
    const selectedProduct = document.getElementById('productDropdown').value;
    const reviewText = document.getElementById('reviewInput').value;
  
    const maxLength = 300;
    if (reviewText.length > maxLength) {
      alert(`Review is too long. Please limit your review to ${maxLength} characters.`);
      return;
    }
  
    if (checkedInput && userName && selectedProduct && reviewText) {
      const ratingValue = parseInt(checkedInput.value, 10);
      ratings[ratingValue - 1]++;



      localStorage.setItem('sharedReviews', JSON.stringify(reviews));
     
      localStorage.setItem('lastSubmissionDate', new Date().toLocaleDateString());
      updateChart();
  
      const rating = checkedInput ? parseInt(checkedInput.value, 10) : 0;
      submitReview(userName, selectedProduct, reviewText, rating);
  















      // Clear the form after submission, including the star inputs
      document.getElementById('userName').value = '';
      document.getElementById('productDropdown').value = '';
      document.getElementById('reviewInput').value = '';
  
      // Uncheck all radio buttons for star ratings
      const radioInputs = document.querySelectorAll('.rating input');
      radioInputs.forEach((input) => {
        input.checked = false;
      });
    } else {
      alert("Please fill in all fields before submitting.");
    }
  }
  

function updateReviewBoxes(callback) {
  const reviewBoxesContainer = document.getElementById('reviewBoxes');
  reviewBoxesContainer.innerHTML = '';

  reviews.forEach((review, index) => {
    const reviewBox = document.createElement('div');
    reviewBox.classList.add('review-box');

    const ratingElement = document.createElement('div');
    ratingElement.classList.add('review-rating');
    ratingElement.innerText = `Rating: ${review.rating} ★`;

    const nameElement = document.createElement('div');
    nameElement.classList.add('review-name');
    nameElement.innerText = `Name: ${review.userName}`;

    const textElement = document.createElement('div');
    textElement.classList.add('review-text');
    textElement.innerText = review.reviewText;

    const productElement = document.createElement('div');
    productElement.classList.add('review-product');
    productElement.innerText = ` ${review.selectedProduct}`;

    reviewBox.appendChild(ratingElement);
    reviewBox.appendChild(nameElement);
    reviewBox.appendChild(textElement);
    reviewBox.appendChild(productElement);

    reviewBoxesContainer.appendChild(reviewBox);
  });

  localStorage.setItem('sharedReviews', JSON.stringify(reviews));

  // Wait for localStorage to update before triggering the callback
  setTimeout(() => {
    callback();
  }, 0);
}

const reviewsContainer = document.getElementById('reviewBoxes');
const viewMoreButton = document.getElementById('viewMore');
const reviewsPerPage = 5;
let startIndex = 0;


function showMoreReviews() {
  const endIndex = startIndex + reviewsPerPage;
  const reviewBoxes = document.querySelectorAll('.review-box');

  for (let i = startIndex; i < endIndex && i < reviewBoxes.length; i++) {
    reviewBoxes[i].style.display = 'flex';
  }

  startIndex = endIndex;

  if (startIndex >= reviewBoxes.length) {
    viewMoreButton.style.display = 'none';
  }
}

function updateReviewFunctions() {
  const storedReviews = localStorage.getItem('sharedReviews');
  reviews = storedReviews ? JSON.parse(storedReviews) : [];
  showFirstReviews();
}

function initializeReviewFunctions() {
  const storedReviews = localStorage.getItem('sharedReviews');
  reviews = storedReviews ? JSON.parse(storedReviews) : [];

  updateReviewBoxes(() => {
    showMoreReviews();
    viewMoreButton.addEventListener('click', showMoreReviews);
    
  });


}

function showFirstReviews() {
  const reviewBoxes = document.querySelectorAll('.review-box');

  for (let i = 0; i < reviewsPerPage && i < reviewBoxes.length; i++) {
    reviewBoxes[i].style.display = 'flex';
  }

  startIndex = reviewsPerPage;

  if (startIndex >= reviewBoxes.length) {
    viewMoreButton.style.display = 'none';
  }
}

initializeReviewFunctions();
updateChart();
