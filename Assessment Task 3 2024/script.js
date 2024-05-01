document.addEventListener("DOMContentLoaded", function() {
    // Load items from text file
    fetch("items.txt")
        .then(response => response.text())
        .then(data => {
            const items = data.split("\n");
            const itemList = document.getElementById("item-list");
            itemList.innerHTML = items.map(item => `<div class="item">${item}</div>`).join("");
        });

    // Add event listener for "Add Item" button
    document.getElementById("add-item-btn").addEventListener("click", function() {
        const itemName = prompt("Enter item name:");
        if (itemName) {
            // Append new item to text file
            fetch("items.txt", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: itemName + "\n"
            })
            .then(() => location.reload()); // Reload page to reflect changes
        }
    });
});

// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Check if a user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // User is logged in, update UI
        const welcomeMessage = document.createElement('div');
        welcomeMessage.textContent = `Welcome back, ${loggedInUser.username}!`;
        document.getElementById('navbar-right').appendChild(welcomeMessage);

        // Hide login and signup buttons
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
    }
});

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed');
}

// script.js

// Function to handle the login button click
function handleLogin() {
    alert("Log in button clicked!"); // Replace this with your login logic
}

// Function to handle the sign up button click
function handleSignUp() {
    alert("Sign up button clicked!"); // Replace this with your sign up logic
}

// Add event listeners to the login and sign up buttons
document.getElementById("login-btn").addEventListener("click", handleLogin);
document.getElementById("signup-btn").addEventListener("click", handleSignUp);

document.addEventListener('DOMContentLoaded', function () {
    // Check if a user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // User is logged in, update UI
        const welcomeMessage = document.createElement('div');
        welcomeMessage.textContent = `Welcome back, ${loggedInUser.username}!`;
        document.getElementById('navbar-right').appendChild(welcomeMessage);

        // Hide login and signup buttons
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
    }
});