<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $debugInfo = array();

    // Open the file
    $file = fopen("logins.txt", "r");

    if ($file === false) {
        $debugInfo[] = "Error opening the logins.txt file.";
        die(json_encode(array("status" => "error", "message" => "Error opening the logins.txt file.", "debug" => $debugInfo)));
    }

    $loggedIn = false;

    // Check each line in the file
    while (($line = fgets($file)) !== false) {
        list($storedUsername, $storedPassword) = explode(",", trim($line));
        
        // Add debug information
        $debugInfo[] = "Checking credentials: $storedUsername, $storedPassword";
        
        if ($username == $storedUsername && $password == $storedPassword) {
            $_SESSION['isLoggedIn'] = true;
            $_SESSION['username'] = $username;
            $loggedIn = true;
            break;
        }
    }

    fclose($file);

    if ($loggedIn) {
        echo json_encode(array(
            "status" => "success",
            "username" => $username,
            "message" => "Login successful!",
            "debug" => $debugInfo
        ));
    } else {
        $debugInfo[] = "Invalid username or password.";
        echo json_encode(array(
            "status" => "error",
            "message" => "Invalid username or password",
            "debug" => $debugInfo
        ));
    }
}
?>
