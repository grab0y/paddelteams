document.addEventListener("DOMContentLoaded", function() {
  // Function to show the modal when the button is clicked
  document.getElementById('showMatchModalBtn').addEventListener('click', function() {
    $('#matchModal').modal('show');
  });

  // Calculate min and max dates
  var today = new Date();
  var minDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  var maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 2);
  var maxDateString = maxDate.toISOString().split('T')[0];

  // Set min and max attributes of the date input field
  var dateInput = document.getElementById('day');
  dateInput.setAttribute('min', minDate);
  dateInput.setAttribute('max', maxDateString);

  // Check if date is valid and disable input if not
  dateInput.addEventListener('input', function() {
    if (dateInput.validity.badInput) {
      dateInput.disabled = true;
    } else {
      dateInput.disabled = false;
    }
  }); 
}); 