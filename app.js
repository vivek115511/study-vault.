// Run this when the page loads
document.addEventListener('DOMContentLoaded', loadVault);

function saveResource() {
    const title = document.getElementById('titleInput').value;
    const link = document.getElementById('linkInput').value;
    const subject = document.getElementById('subjectSelect').value;

    if (!title || !link) {
        alert("Please enter both a title and a link!");
        return;
    }

    // Create a new resource object
    const newResource = {
        id: Date.now(),
        title: title,
        link: link,
        subject: subject
    };

    // Get existing resources from local storage (or start empty)
    let vault = JSON.parse(localStorage.getItem('studyVault')) || [];
    
    // Add the new item to the list
    vault.push(newResource);

    // Save back to local storage
    localStorage.setItem('studyVault', JSON.stringify(vault));

    // Clear the inputs
    document.getElementById('titleInput').value = '';
    document.getElementById('linkInput').value = '';

    // Refresh the display
    loadVault();
}

function loadVault() {
    const grid = document.getElementById('resourceGrid');
    grid.innerHTML = ''; // Clear current display

    let vault = JSON.parse(localStorage.getItem('studyVault')) || [];

    // Loop through saved items and create HTML cards for them
    vault.forEach(item => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <span style="font-size: 12px; color: #94a3b8;">${item.subject}</span>
            <h4 style="margin: 8px 0;">${item.title}</h4>
            <a href="${item.link}" target="_blank">Open Link ↗</a>
            <button onclick="deleteResource(${item.id})" style="margin-top: 10px; padding: 4px 8px; background: #ef4444; border: none; border-radius: 4px; cursor: pointer; display: block;">Delete</button>
        `;
        grid.appendChild(card);
    });
}

function deleteResource(id) {
    let vault = JSON.parse(localStorage.getItem('studyVault')) || [];
    vault = vault.filter(item => item.id !== id); // Remove the matched ID
    localStorage.setItem('studyVault', JSON.stringify(vault));
    loadVault(); // Refresh
}
