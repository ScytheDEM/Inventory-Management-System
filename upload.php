<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.html');
    exit();
}

$username = $_SESSION['username'];
$uploadDir = 'uploads/' . $username . '/';
$dataFile = 'data/' . $username . '.txt';

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $itemName = htmlspecialchars($_POST['item_name']);
    $itemNote = htmlspecialchars($_POST['item_note']);
    $itemImage = $_FILES['item_image'];

    if ($itemImage['error'] == UPLOAD_ERR_OK) {
        $tmpName = $itemImage['tmp_name'];
        $imageName = basename($itemImage['name']);
        $targetFile = $uploadDir . $imageName;

        if (move_uploaded_file($tmpName, $targetFile)) {
            $itemData = $itemName . '|' . $targetFile . '|' . $itemNote . "\n";
            file_put_contents($dataFile, $itemData, FILE_APPEND);
            header('Location: tracking.html');
            exit();
        } else {
            echo "Error moving uploaded file to target directory.";
        }
    } else {
        switch ($itemImage['error']) {
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
