async function fetchBrews() {
    console.log("Fetching brews...");
    const response = await fetch('http://localhost:3000/brews');
    console.log("Response received:", response);

    const brews = await response.json();
    console.log("Parsed brews data:", brews);

    const list = document.getElementById('brewList');
    list.innerHTML = '';
    brews.forEach(brew => {
        console.log("Processing brew:", brew);

        const listItem = document.createElement('li');
        listItem.textContent = `${brew[1]}: ${brew[2]} (${brew[4]}°C, ${brew[5]}s) - ${brew[7]}`;
        list.appendChild(listItem);
    });
    console.log("Brew list updated on UI");
}
async function logBrew(event) {
    event.preventDefault();
    const brew = {
        brew_method: document.getElementById('brewMethod').value,
        bean_origin: document.getElementById('beanOrigin').value,
        grind_size: document.getElementById('grindSize').value,
        temperature: parseInt(document.getElementById('temperature').value),
        brew_time: parseInt(document.getElementById('brewTime').value),
        notes: document.getElementById('notes').value,
        rating: parseInt(document.getElementById('rating').value)
    };
    await fetch('http://localhost:3000/brews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brew)
    });
    fetchBrews();
}

document.getElementById('brewForm').addEventListener('submit', logBrew);
fetchBrews();