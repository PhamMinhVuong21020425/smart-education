document.getElementById('dropdownToggle').addEventListener('click', function () {
  var menu = document.getElementById('dropdownMenu');
  menu.classList.toggle('hidden');
});

// Add event listener to the document to close dropdown when clicking outside
document.addEventListener('click', function(event) {
  var dropdownToggle = document.getElementById('dropdownToggle');
  var dropdownMenu = document.getElementById('dropdownMenu');

  if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add('hidden');
  }
});
