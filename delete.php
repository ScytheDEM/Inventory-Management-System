<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.html');
    exit();
}

$username = $_SESSION['username'];
$dataFile = 'data/' . $username . '.txt';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $itemName = htmlspecialchars($input['name']);
    $itemImagePath = htmlspecialchars($input['imagePath']);

    if (file_exists($dataFile)) {
        $items = file($dataFile, FILE_IGNORE_NEW_LINES);
        $newItems = [];

        foreach ($items as $item) {
            list($name, $imagePath, $note) = explode('|', $item);
            if ($name !== $itemName || $imagePath !== $itemImagePath) {
                $newItems[] = $item;
            } else {
                // Optionally delete the image file from the server
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
        }

        file_put_contents($dataFile, implode("\n", $newItems));
        echo 'Item deleted successfully.';
    } else {
        echo 'Data file not found.';
    }
} else {
    echo 'Invalid request method.';
}
?>
