document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('upload-form');
  const fileInput = document.getElementById('file');
  const uploadModal = document.getElementById('upload-progress-modal');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const cancelUploadBtn = document.getElementById('cancel-upload');

  const errorModal = document.getElementById('error-modal');
  const errorMessage = document.getElementById('error-message');
  const closeErrorModalBtn = document.getElementById('close-error-modal');
  const confirmErrorBtn = document.getElementById('confirm-error');

  const courseID = form.getAttribute('data-course-id');
  const currentLessonPage = form.getAttribute('data-current-page');

  // Function to show error modal
  function showErrorModal(message) {
    errorMessage.textContent = message;
    errorModal.classList.remove('hidden');
  }

  // Close error modal functions
  function closeErrorModal() {
    errorModal.classList.add('hidden');
  }

  closeErrorModalBtn.addEventListener('click', closeErrorModal);
  confirmErrorBtn.addEventListener('click', closeErrorModal);

  // Allowed file types
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/mp4', 'video/mpeg', 'video/quicktime',
    'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/webm', 'audio/ogg'
  ];

  // Maximum file size (200MB)
  const MAX_FILE_SIZE = 200 * 1024 * 1024;

  // File input change event listener
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      e.target.value = ''; // Clear the file input
      showErrorModal('Invalid file type. Please upload images, PDFs, documents, videos, or audio files.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      e.target.value = ''; // Clear the file input
      showErrorModal('File is too large. Maximum file size is 200MB.');
      return;
    }
  });

  // Form submit event listener
  form.addEventListener('submit', async (e) => {
    const file = fileInput.files[0];

    // Additional client-side validation before upload
    if (!file) {
      const currentUrl = window.location.href;
      const isEdit = currentUrl.includes('update');
      if (!isEdit) {
        e.preventDefault();
        showErrorModal('Please select a file to upload.');
      }
      return;
    }

    e.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    // Show upload modal
    uploadModal.classList.remove('hidden');

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        progressBar.style.width = `${percentComplete}%`;
        progressText.textContent = `${percentComplete}% uploaded`;
      }
    };

    // Upload complete
    xhr.onload = () => {
      uploadModal.classList.add('hidden');
      if (xhr.status === 200) {
        // Redirect to course manage
        window.location.replace(`/courses/${courseID}/manage?lessonPage=${currentLessonPage}#lesson`);
      } else {
        alert('Error: Upload failed');
      }
    };

    // Upload error
    xhr.onerror = () => {
      uploadModal.classList.add('hidden');
      alert('Error: Upload failed');
    };

    // Cancel upload
    cancelUploadBtn.addEventListener('click', () => {
      xhr.abort();
      uploadModal.classList.add('hidden');
    });

    // Send request
    xhr.open('POST', form.action, true);
    xhr.send(formData);
  });
});
