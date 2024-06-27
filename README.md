# Inventory Tracking System

This project is an Inventory Tracking System that allows users to upload and track inventory items, including item names and images. Users can log in, add items to their inventory, and view their inventory items on a tracking page.

## Purpose

The purpose of this inventory system is to provide a simple yet effective way for users to manage their inventory items, including uploading images and item names. This system can be useful for small businesses or individuals who need to keep track of their inventory.

## Features

- User authentication (login/logout)
- Upload items with names and images
- View inventory items in a list
- Export inventory data to a text file

## Prerequisites

- [XAMPP](https://www.apachefriends.org/index.html) - A local server environment
- [Visual Studio Code](https://code.visualstudio.com/) - A code editor

## Installation

### Step 1: Install XAMPP

1. **Download XAMPP**: Go to the [XAMPP download page](https://www.apachefriends.org/index.html) and download the installer for your operating system.
2. **Install XAMPP**: Run the installer and follow the on-screen instructions to install XAMPP on your computer.
3. **Start XAMPP**: Open the XAMPP Control Panel and start the Apache and MySQL modules.

### Step 2: Set Up the Project

1. **Download the project**: Clone or download the project repository to your local machine.
2. **Move the project to XAMPP's `htdocs` directory**: Copy the project folder to the `htdocs` directory inside your XAMPP installation directory. For example, on Windows, this might be `C:\xampp\htdocs\inventory-system`.

### Step 3: Configure the Project

1. **Create required directories**: Ensure the `uploads` and `data` directories exist within the project directory. If they don't exist, create them manually.
2. **Set permissions**: Make sure the `uploads` and `data` directories have the appropriate permissions for reading and writing. This is crucial for the PHP script to function correctly.

### Step 4: Install Visual Studio Code

1. **Download Visual Studio Code**: Go to the [Visual Studio Code download page](https://code.visualstudio.com/) and download the installer for your operating system.
2. **Install Visual Studio Code**: Run the installer and follow the on-screen instructions to install Visual Studio Code on your computer.

## Usage

1. **Start the XAMPP server**: Open the XAMPP Control Panel and ensure the Apache and MySQL modules are running.
2. **Access the website**: Open your web browser and go to `http://localhost/inventory-system` (or the appropriate path if you named the project folder differently).
3. **Login**: Use the login page to log in with your credentials.
4. **Add items**: Use the form on the tracking page to add inventory items, including an item name and image.
5. **View items**: The inventory items will be displayed on the tracking page.
6. **Export inventory**: Use the export button to download your inventory data as a text file.

## File Structure

- `login.html`: Login page for the users.
- `tracking.html`: Main page to add and view inventory items.
- `upload.php`: PHP script to handle file uploads and data storage.
- `tracking.js`: JavaScript to handle DOM interactions and fetching inventory data.
- `uploads/`: Directory to store uploaded images.
- `data/`: Directory to store inventory data files.

## Troubleshooting

- **Error moving uploaded file to target directory**: Ensure the `uploads/` directory has the correct permissions for writing files.
- **Error fetching inventory items**: Check the console for detailed error messages and ensure the `data/` directory exists and has the correct permissions.

## License

This project is licensed under the MIT License. 

PLEASE CONTACT aliclonsdale@gmail.com FOR USAGE DETAILS!
