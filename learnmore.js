// fade in image on scroll
document.addEventListener('scroll', function () {
  const image = document.querySelector('.fade-in-image'); // select the image element with class 'fade-in-image'
  const imagePosition = image.getBoundingClientRect().top; // get the top position of the image relative to the viewport
  const screenPosition = window.innerHeight / 1.3; // calculate the position of the screen based on the viewport height
  
  if (imagePosition < screenPosition) { // check if the image is within the screen position
    image.classList.add('visible'); // add the 'visible' class to the image element
  }
});
