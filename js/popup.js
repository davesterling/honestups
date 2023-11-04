
// Function to open the product popup
function openProductPopup(productId) {
  const popup = document.getElementById('popup-' + productId);

  if (popup) {
      popup.style.display = 'flex';
  }
}






document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(event) {
      const closeButton = event.target.closest('.popup-close-button');
      if (closeButton) {
          const popupId = closeButton.getAttribute('data-popup-id');
          closeProductPopup(popupId);
      }
  });

  function closeProductPopup(popupId) {
      const popup = document.getElementById(popupId);
      if (popup) {
          popup.style.display = 'none';
      }
  }
});

  // Add click event listener to the product box
  document.getElementById('001').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product1');
    }
  });
  
  document.getElementById('002').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product2');
    }
  });

  document.getElementById('003').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product3');
    }
  });

  document.getElementById('004').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product4');
    }
  });
 
  document.getElementById('005').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product5');
    }
  });
 
  document.getElementById('006').addEventListener('click', function(event) {
    const target = event.target;
  
    // Check if the clicked element or any of its ancestors have the class 'add-cart'
    if (!target.closest('.add-cart')) {
      openProductPopup('product6');
    }
  });
 



















