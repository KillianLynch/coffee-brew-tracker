async function fetchBrews() {
    try {
        const response = await fetch('/brews');
        const brews = await response.json();
        console.log("Parsed brews data:", brews);

        const list = document.getElementById('brewList');
        list.innerHTML = '';

        brews.forEach(brew => {
            console.log("Processing brew:", brew);

            const listItem = document.createElement('div');
            listItem.classList.add('brew-card');

            // Format date
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const loggedDate = brew.TIMESTAMP ? new Date(brew.TIMESTAMP).toLocaleDateString(undefined, dateOptions) : '';

            // Create the HTML content including all fields
            // Inside your brews.js loop
            const notes = brew.NOTES ? `<div class="info-row"><span><strong>Notes:</strong> ${brew.NOTES}</span></div>` : '';

            listItem.innerHTML = `
            <div class="brew-card-details">
                <div class="main-info">
                    <div class="brew-title">${brew.BREW_METHOD}</div>
                    <div class="brew-subtitle">${brew.BEAN_ORIGIN}</div>
                </div>
                <div class="secondary-info">
                    <div class="info-row">
                        <span><strong>Grind Size:</strong> ${brew.GRIND_SIZE}</span>
                        <span><strong>Temperature:</strong> ${brew.TEMPERATURE}°C</span>
                    </div>
                    <div class="info-row">
                        <span><strong>Brew Time:</strong> ${brew.BREW_TIME}s</span>
                        <span><strong>Rating:</strong> ${brew.RATING}/10</span>
                    </div>
                    ${notes}
                    <!-- Place the logged-date div here -->
                    <div class="logged-date">
                        <span><strong>Logged on:</strong> ${loggedDate}</span>
                    </div>
                </div>
            </div>
        `;           
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching brews:', error);
    }
}

// Fetch the brews when the page loads
fetchBrews();