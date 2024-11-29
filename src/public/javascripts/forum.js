function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

function showReplyForm(formId) {
  const replyForm = document.getElementById(formId);
  replyForm.classList.remove('hidden');
}

function hideReplyForm(formId) {
  const replyForm = document.getElementById(formId);
  replyForm.classList.add('hidden');
}

function toggleCommentReplies(elementId, button) {
  const replies = document.getElementById(elementId);
  replies.classList.toggle('hidden');

  if (replies.classList.contains('hidden')) {
    button.textContent = `Show ${button.textContent.split(' ')[1]} replies`;
  } else {
    button.textContent = `Hide ${button.textContent.split(' ')[1]} replies`;
  }
}

function toggleEditCommentForm(commentId) {
  const editForm = document.getElementById(`edit_comment_form_${commentId}`);
  editForm.classList.toggle('hidden');

  const content = document.getElementById(`content_${commentId}`);
  content.classList.toggle('hidden');
}

async function updateComment(commentId) {
  const form = document.getElementById(`edit_comment_form_${commentId}`);
  const textarea = form.querySelector('textarea');
  const saveButton = form.querySelector('button[id="button_save"]');
  const commentText = document.getElementById(`content_${commentId}`);

  // Validate content
  if (!textarea.value.trim()) {
    alert('Comment cannot be empty');
    return;
  }

  // Disable save button to prevent multiple submissions
  saveButton.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: textarea.value.trim()
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // If response is successful
    form.classList.add('hidden');
    commentText.textContent = textarea.value.trim();
    commentText.classList.remove('hidden');
  } catch (error) {
    console.error('Error:', error);
    alert('Network error. Please check your connection.');
  } finally {
    saveButton.disabled = false;
  }
}

async function deleteComment(commentId, parentCommentId) {
  if (!confirm('Are you sure you want to delete this comment?')) {
    return;
  }

  try {
    const form = document.getElementById(`delete_comment_form_${commentId}`);
    const response = await fetch(form.action, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Update comment count
    const buttonCommentCount = document.getElementById(`button_hide_${parentCommentId}`);
    if (buttonCommentCount) {
      buttonCommentCount.textContent = `Hide ${parseInt(buttonCommentCount.textContent.split(' ')[1]) - 1} replies`;
    }

    // If response is successful
    const comment = document.getElementById(`comment_${commentId}`);
    comment.remove();
  } catch (error) {
    console.error('Error:', error);
  }
}
