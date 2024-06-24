document.addEventListener('DOMContentLoaded', function() {
    // check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // select the sign-in/sign-out button and the auth status span
    const signInButton = document.getElementById('signin');
    const authStatus = document.getElementById('auth-status');

    // if the user is logged in, change the button text to Sign Out and display the username
    if (isLoggedIn === 'true') {
        const username = localStorage.getItem('username');
        signInButton.textContent = 'Sign Out';
        signInButton.href = 'logout.html'; // set href to logout.html

        // display the username in the navigation bar
        const usernameDisplay = document.createElement('span');
        usernameDisplay.id = 'username-display';
        usernameDisplay.textContent = `logged in as ${username}`;
        authStatus.appendChild(usernameDisplay);

        // load and display the inventory items
        fetchInventoryItems(username);
    }

    // function to fetch and display inventory items
    function fetchInventoryItems(username) {
        fetch(`data/${username}.txt`) // fetch inventory data for the given username
            .then(response => response.text()) // convert the response to text
            .then(data => {
                const inventoryList = document.getElementById('inventory-list');
                const items = data.trim().split('\n'); // split the data into individual items

                items.forEach(item => {
                    const [name, imagePath] = item.split('|'); // split each item into name and image path
                    const itemElement = document.createElement('div'); // create a div element for each item
                    itemElement.className = 'inventory-item'; // set the class name for styling
                    itemElement.innerHTML = `
                        <h3>${name}</h3>
                        <img src="${imagePath}" alt="${name}" />
                    `; // set the inner HTML of the item element with name and image
                    inventoryList.appendChild(itemElement); // append the item element to the inventory list
                });
            })
            .catch(error => {
                console.error('error fetching inventory items:', error); // log any errors that occur during fetching
            });
    }
});
