<?php
session_start(); // start the session to enable session variables

if (!isset($_SESSION['username'])) { // check if the 'username' session variable is not set
    header('Location: login.html'); // redirect the user to the login page
    exit(); // stop further execution of the script
}

$username = $_SESSION['username']; // retrieve the value of the 'username' session variable
$dataFile = 'data/' . $username . '.txt'; // set the path to the data file based on the username

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // check if the request method is POST
    $input = json_decode(file_get_contents('php://input'), true); // retrieve the JSON data from the request body and decode it into an associative array
    $itemName = htmlspecialchars($input['name']); // retrieve the 'name' field from the input data and sanitize it
    $itemImagePath = htmlspecialchars($input['imagePath']); // retrieve the 'imagePath' field from the input data and sanitize it

    if (file_exists($dataFile)) { // check if the data file exists
        $items = file($dataFile, FILE_IGNORE_NEW_LINES); // read the contents of the data file into an array, with each line as an element
        $newItems = []; // create an empty array to store the updated items

        foreach ($items as $item) { // iterate over each item in the data file
            list($name, $imagePath, $note) = explode('|', $item); // split the item into its components using the '|' delimiter
            if ($name !== $itemName || $imagePath !== $itemImagePath) { // check if the item's name or imagePath does not match the input data
                $newItems[] = $item; // add the item to the newItems array
            } else {
                // optionally delete the image file from the server
                if (file_exists($imagePath)) { // check if the image file exists
                    unlink($imagePath); // delete the image file from the server
                }
            }
        }

        file_put_contents($dataFile, implode("\n", $newItems)); // write the updated items back to the data file, joining them with newline characters
        echo 'Item deleted successfully.'; // output a success message
    } else {
        echo 'Data file not found.'; // output an error message if the data file does not exist
    }
} else {
    echo 'Invalid request method.'; // output an error message if the request method is not POST
}
?>
