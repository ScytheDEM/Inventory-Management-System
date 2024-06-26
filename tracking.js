document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const signInButton = document.getElementById('signin');
    const authStatus = document.getElementById('auth-status');
    const exportButton = document.getElementById('export-button');

    if (isLoggedIn === 'true') {
        const username = localStorage.getItem('username');
        signInButton.textContent = 'Sign Out';
        signInButton.href = 'logout.html';

        const usernameDisplay = document.createElement('span');
        usernameDisplay.id = 'username-display';
        usernameDisplay.textContent = `logged in as ${username}`;
        authStatus.appendChild(usernameDisplay);

        fetchInventoryItems(username);
    }

    function fetchInventoryItems(username) {
        fetch(`data/${username}.txt`)
            .then(response => response.text())
            .then(data => {
                const inventoryList = document.getElementById('inventory-list');
                const items = data.trim().split('\n');

                items.forEach(item => {
                    const [name, imagePath, note] = item.split('|');
                    
                    if (name && imagePath && note) {
                        const itemElement = document.createElement('div');
                        itemElement.className = 'inventory-item';
                        itemElement.innerHTML = `
                            <h3>${name}</h3>
                            <img src="${imagePath}" alt="${name}" class="thumbnail" />
                            <p>${note}</p>
                            <button class="delete-button">Delete</button>
                        `;

                        itemElement.querySelector('.thumbnail').addEventListener('click', () => {
                            openModal(imagePath);
                        });

                        itemElement.querySelector('.delete-button').addEventListener('click', () => {
                            deleteInventoryItem(username, name, imagePath);
                            itemElement.remove();
                        });

                        inventoryList.appendChild(itemElement);
                    }
                });

                exportButton.disabled = false;
                exportButton.addEventListener('click', () => exportInventory(items));
            })
            .catch(error => {
                console.error('Error fetching inventory items:', error);
            });
    }

    function deleteInventoryItem(username, name, imagePath) {
        fetch('delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, name, imagePath })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error deleting inventory item:', error);
        });
    }

    function openModal(imagePath) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="close-button">&times;</span>
            <img class="modal-content" src="${imagePath}" />
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-button').addEventListener('click', () => {
            modal.remove();
        });
    }

    function exportInventory(items) {
        const content = items.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
});
