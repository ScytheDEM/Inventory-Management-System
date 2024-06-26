<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action == 'register') {
        // Registration action
        $name = $_POST['name'];
        $username = $_POST['username'];
        $password = $_POST['password'];

        $debugInfo = array();

        // Open the file for both reading and writing
        $file = fopen("logins.txt", "a+");

        if ($file === false) {
            $debugInfo[] = "Error opening the logins.txt file.";
            echo json_encode(array("status" => "error", "message" => "Error opening the logins.txt file.", "debug" => $debugInfo));
            exit;
        } else {
            $debugInfo[] = "Opened logins.txt successfully.";
        }

        // Check if username already exists
        $userExists = false;
        while (($line = fgets($file)) !== false) {
            list($storedName, $storedUsername, $storedPassword) = explode(",", trim($line));
            if ($username == $storedUsername) {
                $userExists = true;
                $debugInfo[] = "Username '$username' already exists.";
                break;
            }
        }

        if ($userExists) {
            echo json_encode(array(
                "status" => "error",
                "message" => "Username already exists",
                "debug" => $debugInfo
            ));
        } else {
            $newUser = "$name,$username,$password\n";

            if (fwrite($file, $newUser) === false) {
                $debugInfo[] = "Error writing to logins.txt file.";
                echo json_encode(array(
                    "status" => "error",
                    "message" => "Error writing to logins.txt file.",
                    "debug" => $debugInfo
                ));
            } else {
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['username'] = $username;
                $debugInfo[] = "User '$username' successfully registered.";
                echo json_encode(array(
                    "status" => "success",
                    "username" => $username,
                    "message" => "Registration successful!",
                    "debug" => $debugInfo
                ));
            }
        }

        fclose($file);

    } else {
        // Default action (e.g., login)
        $username = $_POST['username'];
        $password = $_POST['password'];

        $debugInfo = array();

        // Open the file for reading
        $file = fopen("logins.txt", "r");

        if ($file === false) {
            $debugInfo[] = "Error opening the logins.txt file.";
            echo json_encode(array("status" => "error", "message" => "Error opening the logins.txt file.", "debug" => $debugInfo));
            exit;
        } else {
            $debugInfo[] = "Opened logins.txt successfully for reading.";
        }

        $loggedIn = false;

        // Check each line in the file
        while (($line = fgets($file)) !== false) {
            list($storedName, $storedUsername, $storedPassword) = explode(",", trim($line));
            
            // Add debug information
            $debugInfo[] = "Checking credentials: $storedUsername, $storedPassword";
            
            if ($username == $storedUsername && $password == $storedPassword) {
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['username'] = $username;
                $loggedIn = true;
                $debugInfo[] = "Login successful for user '$username'.";
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
} else {
    echo json_encode(array(
        "status" => "error",
        "message" => "Invalid request method",
        "debug" => array("Expected POST method.")
    ));
}
?>
