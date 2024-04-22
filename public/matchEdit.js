// Function to open the modal and pass the match ID
function openEditPopup(matchId) {
    // Set the match ID in the modal form (optional, if needed)
    document.getElementById('matchId').value = matchId;
    document.getElementById('matchId1').value = matchId;

    // Open the modal
    $('#editModal').modal('show');
}

function checker() {
    if (window.confirm("¿Estás seguro?")) {
      console.log("User confirmed"); // Log confirmation
      return true; // Proceed with form submission
    } else {
      console.log("User canceled"); // Log cancellation
      return false; // Cancel form submission
    }
  }