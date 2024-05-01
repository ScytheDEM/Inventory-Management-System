// login.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        
        // Get username and password from form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Example database of users (Replace with your own)
        const users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' }
            // Add more users as needed
        ];

        // Check if user exists in the database
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // User found, set logged-in status and redirect to homepage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            // Display error message or handle invalid login
            alert('Invalid username or password');
        }
    });
});
