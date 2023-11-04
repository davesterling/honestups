window.addEventListener("message", (event) => {
    const data = event.data;
    if (data && data.redirectUrl) {
      // Redirect the parent window to the Stripe Checkout URL
      window.location.href = data.redirectUrl;
    }
  });


    function adjustIframeHeight() {
    const iframe = document.getElementById('embeddedIframe');
    if (iframe) {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
  }

  // Call the function when the iframe content has loaded
  window.addEventListener('load', adjustIframeHeight);

  // Call the function whenever the window is resized
  window.addEventListener('resize', adjustIframeHeight);