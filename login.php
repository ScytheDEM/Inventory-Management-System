<?php
session_start(); // start a new or resume an existing session

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // check if the request method is POST
    $username = $_POST['username']; // get the value of the 'username' field from the POST data
    $password = $_POST['password']; // get the value of the 'password' field from the POST data

    $debugInfo = array(); // create an empty array to store debug information

    // open the file
    $file = fopen("logins.txt", "r"); // open the file named 'logins.txt' in read mode

    if ($file === false) { // check if there was an error opening the file
        $debugInfo[] = "error opening the logins.txt file."; // add debug information
        die(json_encode(array("status" => "error", "message" => "error opening the logins.txt file.", "debug" => $debugInfo))); // return an error response with debug information
    }

    $loggedIn = false; // initialize a variable to track if the user is logged in

    // check each line in the file
    while (($line = fgets($file)) !== false) { // read each line from the file
        list($storedUsername, $storedPassword) = explode(",", trim($line)); // split the line into username and password using comma as the delimiter
        
        // add debug information
        $debugInfo[] = "checking credentials: $storedUsername, $storedPassword"; // add debug information about the credentials being checked
        
        if ($username == $storedUsername && $password == $storedPassword) { // check if the provided username and password match the stored credentials
            $_SESSION['isLoggedIn'] = true; // set the 'isLoggedIn' session variable to true
            $_SESSION['username'] = $username; // set the 'username' session variable to the provided username
            $loggedIn = true; // set the 'loggedIn' variable to true
            break; // exit the loop since the credentials are valid
        }
    }

    fclose($file); // close the file

    if ($loggedIn) { // check if the user is logged in
        echo json_encode(array(
            "status" => "success",
            "username" => $username,
            "message" => "login successful!",
            "debug" => $debugInfo
        )); // return a success response with the username and debug information
    } else {
        $debugInfo[] = "invalid username or password."; // add debug information
        echo json_encode(array(
            "status" => "error",
            "message" => "invalid username or password",
            "debug" => $debugInfo
        )); // return an error response with debug information
    }
}
?>
