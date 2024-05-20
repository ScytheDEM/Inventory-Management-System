<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST["username"]; // Get the value of the "username" field from the submitted form
    $password = $_POST["password"]; // Get the value of the "password" field from the submitted form

    // Validate username and password (you can add more validation logic here)
    if ($username && $password) { // Check if both username and password are not empty
        // Check if the user exists in the text file
        $file = fopen("logins.txt", "r"); // Open the "logins.txt" file in read mode
        $isValid = false; // Initialize a flag to track if the user is valid
        while (($line = fgets($file)) !== false) { // Read each line of the file
            list($storedUsername, $storedPassword) = explode(",", $line); // Split the line into username and password using comma as delimiter
            if (trim($storedUsername) === $username && trim($storedPassword) === $password) { // Check if the stored username and password match the submitted values
                $isValid = true; // Set the flag to true if the user is valid
                break; // Exit the loop since a match is found
            }
        }
        fclose($file); // Close the file

        // If the user doesn't exist, create a new account
        if (!$isValid) { // Check if the user is not valid
            $file = fopen("logins.txt", "a"); // Open the "logins.txt" file in append mode
            fwrite($file, "$username,$password\n"); // Write the new username and password to the file
            fclose($file); // Close the file
            $isValid = true; // Set the flag to true since a new account is created
        }

        // Redirect based on validation result
        if ($isValid) { // Check if the user is valid
            // Login successful, redirect to home page
            header("Location: home.html"); // Redirect the user to the home page
            exit; // Stop further execution of the script
        } else {
            // Invalid username or password, redirect back to login page with error message
            header("Location: login.html?error=invalid_credentials"); // Redirect the user back to the login page with an error message
            exit; // Stop further execution of the script
        }
    }
}
?>
