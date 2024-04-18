document.addEventListener("DOMContentLoaded", () => {
    const onlineBtn = document.getElementById('onlineBtn');
    const offlineBtn = document.getElementById('offlineBtn');

    onlineBtn.addEventListener('click', () => updateAvailability(true));
    offlineBtn.addEventListener('click', () => updateAvailability(false));

    function updateAvailability(status) {
        const availabilityInput = document.getElementById('availabilityInput');
        availabilityInput.value = status.toString(); // Convert boolean to string
        document.getElementById('availabilityForm').submit();
    }
});