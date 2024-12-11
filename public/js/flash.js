// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Hide the success message after 3 seconds
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000); // 3000ms = 3 seconds
  }

  // Hide the error message after 3 seconds
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000); // 3000ms = 3 seconds
  }
});