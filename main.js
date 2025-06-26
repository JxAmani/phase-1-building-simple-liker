// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Provided function to simulate a server call
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  const errorMessage = document.getElementById('modal-message');

  // Hide the modal initially
  errorModal.classList.add('hidden');

  // Select all the like heart elements
  const likeHearts = document.querySelectorAll('.like-glyph');

  // Add click event listeners to each heart
  likeHearts.forEach(heart => {
    heart.addEventListener('click', () => {
      mimicServerCall()
        .then(() => {
          // Toggle the heart based on current state
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          } else {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove('activated-heart');
          }
        })
        .catch(error => {
          // Show the modal with the error message
          errorModal.classList.remove('hidden');
          errorMessage.textContent = error;

          // Hide the modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});
