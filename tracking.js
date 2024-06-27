document.addEventListener('DOMContentLoaded', function() {
    // event listener for when the DOM content is loaded
    // see all this code??? this is a ticking time bomb waiting to explode, dont know how it works but it does 

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    // retrieves the value of 'isLoggedIn' from the local storage

    const signInButton = document.getElementById('signin');
    // retrieves the element with the id 'signin'

    const authStatus = document.getElementById('auth-status');
    // retrieves the element with the id 'auth-status'

    const exportButton = document.getElementById('export-button');
    // retrieves the element with the id 'export-button'

    if (isLoggedIn === 'true') {
        // checks if the user is logged in

        const username = localStorage.getItem('username');
        // retrieves the value of 'username' from the local storage

        signInButton.textContent = 'Sign Out';
        // sets the text content of the signInButton to 'Sign Out'

        signInButton.href = 'logout.html';
        // sets the href attribute of the signInButton to 'logout.html'

        const usernameDisplay = document.createElement('span');
        // creates a new span element

        usernameDisplay.id = 'username-display';
        // sets the id attribute of the usernameDisplay span element to 'username-display'

        usernameDisplay.textContent = `logged in as ${username}`;
        // sets the text content of the usernameDisplay span element to 'logged in as {username}'

        authStatus.appendChild(usernameDisplay);
        // appends the usernameDisplay span element to the authStatus element

        fetchInventoryItems(username);
        // calls the fetchInventoryItems function with the username as an argument
    }

    function fetchInventoryItems(username) {
        // function to fetch inventory items for a given username

        fetch(`data/${username}.txt`)
            // fetches the inventory data for the given username

            .then(response => response.text())
            // converts the response to text

            .then(data => {
                // handles the fetched data

                const inventoryList = document.getElementById('inventory-list');
                // retrieves the element with the id 'inventory-list'

                const items = data.trim().split('\n');
                // trims and splits the fetched data into an array of items

                items.forEach(item => {
                    // iterates over each item in the items array

                    const [name, imagePath, note] = item.split('|');
                    // destructures the item into name, imagePath, and note using the '|' delimiter

                    if (name && imagePath && note) {
                        // checks if all the required fields are present

                        const itemElement = document.createElement('div');
                        // creates a new div element

                        itemElement.className = 'inventory-item';
                        // sets the class name of the itemElement to 'inventory-item'

                        itemElement.innerHTML = `
                            <h3>${name}</h3>
                            <img src="${imagePath}" alt="${name}" class="thumbnail" />
                            <p>${note}</p>
                            <button class="delete-button">Delete</button>
                        `;
                        // sets the inner HTML of the itemElement with the item details

                        itemElement.querySelector('.thumbnail').addEventListener('click', () => {
                            // adds a click event listener to the thumbnail image

                            openModal(imagePath);
                            // calls the openModal function with the imagePath as an argument
                        });

                        itemElement.querySelector('.delete-button').addEventListener('click', () => {
                            // adds a click event listener to the delete button

                            deleteInventoryItem(username, name, imagePath);
                            // calls the deleteInventoryItem function with the username, name, and imagePath as arguments

                            itemElement.remove();
                            // removes the itemElement from the DOM
                        });

                        inventoryList.appendChild(itemElement);
                        // appends the itemElement to the inventoryList element
                    }
                });

                exportButton.disabled = false;
                // enables the exportButton

                exportButton.addEventListener('click', () => exportInventory(items));
                // adds a click event listener to the exportButton that calls the exportInventory function with the items array as an argument
            })
            .catch(error => {
                // handles any errors during fetching

                console.error('error fetching inventory items:', error);
                // logs the error message to the console
            });
    }

    function deleteInventoryItem(username, name, imagePath) {
        // function to delete an inventory item

        fetch('delete.php', {
            // sends a POST request to 'delete.php'

            method: 'POST',
            // specifies the HTTP method as POST

            headers: {
                'Content-Type': 'application/json'
            },
            // sets the request headers

            body: JSON.stringify({ username, name, imagePath })
            // converts the data to JSON and sets it as the request body
        })
        .then(response => response.text())
        // converts the response to text

        .then(data => {
            // handles the response data

            console.log(data);
            // logs the response data to the console
        })
        .catch(error => {
            // handles any errors during deletion

            console.error('error deleting inventory item:', error);
            // logs the error message to the console
        });
    }

    function openModal(imagePath) {
        // function to open a modal with an image

        const modal = document.createElement('div');
        // creates a new div element

        modal.className = 'modal';
        // sets the class name of the modal div element to 'modal'

        modal.innerHTML = `
            <span class="close-button">&times;</span>
            <img class="modal-content" src="${imagePath}" />
        `;
        // sets the inner HTML of the modal div element with the image details

        document.body.appendChild(modal);
        // appends the modal div element to the body of the document

        modal.querySelector('.close-button').addEventListener('click', () => {
            // adds a click event listener to the close button

            modal.remove();
            // removes the modal div element from the DOM
        });
    }

    function exportInventory(items) {
        // function to export the inventory items

        const content = items.join('\n');
        // joins the items array into a string with newline separators

        const blob = new Blob([content], { type: 'text/plain' });
        // creates a new Blob object with the content string and MIME type 'text/plain'

        const url = URL.createObjectURL(blob);
        // creates a URL for the blob object

        const a = document.createElement('a');
        // creates a new anchor element

        a.href = url;
        // sets the href attribute of the anchor element to the URL

        a.download = 'inventory.txt';
        // sets the download attribute of the anchor element to 'inventory.txt'

        a.click();
        // programmatically clicks the anchor element to trigger the download

        URL.revokeObjectURL(url);
        // releases the URL object
    }
});
