<?php
session_start(); // starts a new or resumes an existing session

if (!isset($_SESSION['username'])) { // checks if the 'username' key is not set in the session
    header('Location: login.html'); // redirects the user to the login page
    exit(); // terminates the script execution
}

$username = $_SESSION['username']; // retrieves the value of the 'username' key from the session
$uploadDir = 'uploads/' . $username . '/'; // constructs the directory path for uploading files based on the username
$dataFile = 'data/' . $username . '.txt'; // constructs the file path for storing data based on the username

if (!file_exists($uploadDir)) { // checks if the upload directory does not exist
    mkdir($uploadDir, 0777, true); // creates the upload directory with read, write, and execute permissions for everyone
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // checks if the request method is POST
    $itemName = htmlspecialchars($_POST['item_name']); // retrieves and sanitizes the value of the 'item_name' field from the POST data
    $itemNote = htmlspecialchars($_POST['item_note']); // retrieves and sanitizes the value of the 'item_note' field from the POST data
    $itemImage = $_FILES['item_image']; // retrieves the uploaded file information from the 'item_image' field

    if ($itemImage['error'] == UPLOAD_ERR_OK) { // checks if the uploaded file has no errors
        $tmpName = $itemImage['tmp_name']; // retrieves the temporary filename of the uploaded file
        $imageName = basename($itemImage['name']); // retrieves the original filename of the uploaded file
        $targetFile = $uploadDir . $imageName; // constructs the target file path for moving the uploaded file

        if (move_uploaded_file($tmpName, $targetFile)) { // moves the uploaded file to the target directory
            $itemData = $itemName . '|' . $targetFile . '|' . $itemNote . "\n"; // constructs the data to be stored in the data file
            file_put_contents($dataFile, $itemData, FILE_APPEND); // appends the item data to the data file
            header('Location: tracking.html'); // redirects the user to the tracking page
            exit(); // terminates the script execution
        } else {
            echo "Error moving uploaded file to target directory."; // displays an error message if the uploaded file cannot be moved
        }
    } else {
        switch ($itemImage['error']) { // handles different types of upload errors
            case UPLOAD_ERR_INI_SIZE:
                echo "The uploaded file exceeds the upload_max_filesize directive in php.ini."; // displays an error message for exceeding the maximum file size allowed by the server configuration
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form."; // displays an error message for exceeding the maximum file size specified in the HTML form
                break;
            case UPLOAD_ERR_PARTIAL:
                echo "The uploaded file was only partially uploaded."; // displays an error message for a partial file upload
                break;
            case UPLOAD_ERR_NO_FILE:
                echo "No file was uploaded."; // displays an error message for no file being uploaded
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo "Missing a temporary folder."; // displays an error message for a missing temporary folder
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo "Failed to write file to disk."; // displays an error message for a failed write operation
                break;
            case UPLOAD_ERR_EXTENSION:
                echo "A PHP extension stopped the file upload."; // displays an error message for a PHP extension stopping the file upload
                break;
            default:
                echo "Unknown upload error."; // displays an error message for an unknown upload error
                break;
        }
    }
}
?>
