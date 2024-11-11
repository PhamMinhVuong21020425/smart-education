function saveAnswer(radio, courseId, examId) {
  const questionId = radio.name;
  const answerId = radio.value;

  fetch(`/courses/${courseId}/exam/${examId}/save-answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId, answerId }),
  })
    .then(response => response.json())
    .then(data => console.log('Answer saved:', data))
    .catch((error) => console.error('Error:', error));
}

function confirmSubmit() {
  if(!confirm("Are you sure you want to submit this exam?")) {
    return false;
  }
  document.getElementById('examForm').submit();
}

// Initialize timer
document.addEventListener('DOMContentLoaded', function() {
  const timerElement = document.getElementById('timer');
  const examForm = document.getElementById('examForm');
  const timeLimit = parseInt(timerElement.dataset.timeLimit);
  const startTime = parseInt(timerElement.dataset.startTime);

  function calculateTimeLeft() {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const endTime = startTime + (timeLimit * 60); // End time in seconds
    return Math.max(0, endTime - now); // Ensure we don't go negative
  }

  let timeLeft = calculateTimeLeft();

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 300) { // Last 5 minutes
      timerElement.classList.add('animate-pulse');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      examForm.submit();
    }
    timeLeft--;
  }

  // Update timer immediately and then every second
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // Save timer state in localStorage
  function saveTimerState() {
    localStorage.setItem('examTimeLeft', timeLeft);
  }

  // Save timer state every 5 seconds
  setInterval(saveTimerState, 5000);

  // Handle page visibility change
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      const savedTime = localStorage.getItem('examTimeLeft');
      if (savedTime) {
        timeLeft = parseInt(savedTime);
        updateTimer();
      }
    }
  });
});
