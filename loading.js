// loading.js
function showLoading() {
    // Show loading animation
    document.querySelector('.loader').style.display = 'flex';
  
    // After 3 seconds, hide the loading animation
    setTimeout(function() {
      document.querySelector('.loader').style.display = 'none'; // Hide loading animation
    }, 3000); // 3 seconds delay
}