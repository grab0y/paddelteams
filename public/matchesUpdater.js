// utils/dashboardUpdater.js

// Function to fetch and update table data
async function fetchAndUpdateTable() {
    try {
        const response = await fetch('/dashboard/table');
        const html = await response.text();
        // Replace the content of the table with the updated HTML
        document.getElementById('dashboardTable').innerHTML = html;
    } catch (error) {
        console.error('Error fetching updated table data:', error);
    }
}

// Function to handle manual refresh
function handleRefreshButtonClick() {
    // Fetch and update table data when the refresh button is clicked
    fetchAndUpdateTable();
}

// Function to automatically refresh table data at regular intervals
function autoRefreshTable(interval) {
    setInterval(fetchAndUpdateTable, interval);
}

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the refresh button
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', handleRefreshButtonClick);
    } else {
        console.error('Refresh button not found.');
    }

    // Set interval for auto-refreshing table data (every 5 minutes in this example)
    autoRefreshTable(5 * 60 * 1000); // 5 minutes in milliseconds
});

// Fetch and update table data initially when the page loads
fetchAndUpdateTable();
