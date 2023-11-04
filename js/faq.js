
    function toggleAccordion(element) {
      element.classList.toggle('expanded');
    }
    
    function toggleAccordion(element) {
  const faqs = document.querySelectorAll('.faq');

  // Iterate over all faq elements
  faqs.forEach((faq) => {
    if (faq === element) {
      // Toggle the 'expanded' class for the clicked faq
      faq.classList.toggle('expanded');
    } else {
      // Remove the 'expanded' class for other faqs
      faq.classList.remove('expanded');
    }
  });
}
