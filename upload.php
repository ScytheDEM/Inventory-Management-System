<?php
session_start(); // start a new or resume an existing session

if (!isset($_SESSION['username'])) { // check if the 'username' key is not set in the session
    header('Location: login.html'); // redirect the user to the login page
    exit(); // stop further execution of the script
}

$username = $_SESSION['username']; // get the value of 'username' from the session
$uploadDir = 'uploads/' . $username . '/'; // set the directory path for uploading files based on the username
$dataFile = 'data/' . $username . '.txt'; // set the file path for storing data based on the username

if (!file_exists($uploadDir)) { // check if the upload directory doesn't exist
    mkdir($uploadDir, 0777, true); // create the upload directory with read, write, and execute permissions for everyone
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // check if the request method is POST
    $itemName = htmlspecialchars($_POST['item_name']); // get the value of 'item_name' from the POST data and sanitize it
    $itemImage = $_FILES['item_image']; // get the uploaded file information from the 'item_image' field in the POST data

    if ($itemImage['error'] == UPLOAD_ERR_OK) { // check if the uploaded file has no errors
        $tmpName = $itemImage['tmp_name']; // get the temporary file path of the uploaded file
        $imageName = basename($itemImage['name']); // get the original name of the uploaded file
        $targetFile = $uploadDir . $imageName; // set the target file path for moving the uploaded file

        if (move_uploaded_file($tmpName, $targetFile)) { // move the uploaded file to the target directory
            $itemData = $itemName . '|' . $targetFile . "\n"; // prepare the data to be stored in the data file
            file_put_contents($dataFile, $itemData, FILE_APPEND); // append the item data to the data file
            header('Location: tracking.html'); // redirect the user to the tracking page
            exit(); // stop further execution of the script
        } else {
            echo "Error moving uploaded file to target directory."; // display an error message if the file couldn't be moved
        }
    } else {
        switch ($itemImage['error']) { // handle different types of upload errors
            case UPLOAD_ERR_INI_SIZE:
                echo "The uploaded file exceeds the upload_max_filesize directive in php.ini.";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.";
                break;
            case UPLOAD_ERR_PARTIAL:
                echo "The uploaded file was only partially uploaded.";
                break;
            case UPLOAD_ERR_NO_FILE:
                echo "No file was uploaded.";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo "Missing a temporary folder.";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo "Failed to write file to disk.";
                break;
            case UPLOAD_ERR_EXTENSION:
                echo "A PHP extension stopped the file upload.";
                break;
            default:
                echo "Unknown upload error.";
                break;
        }
    }
}
?>
