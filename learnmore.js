// Fade in image on scroll
document.addEventListener('scroll', function () {
    const image = document.querySelector('.fade-in-image');
    const imagePosition = image.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
  
    if (imagePosition < screenPosition) {
      image.classList.add('visible');
    }
  });
  