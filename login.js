// login.js

async function handleLoginFormSubmit(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const logins = fetchLogins();
    const isValid = logins.some(([storedUsername, storedPassword]) =>
        storedUsername.trim() === username.trim() &&
        storedPassword.trim() === password.trim()
    );
  
    if (isValid) {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
  
        // Redirect to home.html after a slight delay
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 100); // Adjust delay as needed (in milliseconds)
    } else {
        const userExists = logins.some(([storedUsername]) => storedUsername.trim() === username.trim());
  
        if (!userExists) {
            const createAccount = confirm("The user has not been detected. Do you want to create a new user?");
            if (createAccount) {
                addNewUser(username);
                alert('Account created successfully with default password "123". Please log in with your new credentials.');
            }
        } else {
            alert('Invalid username or password!');
        }
    }
}
