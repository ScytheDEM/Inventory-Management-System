document.addEventListener('DOMContentLoaded', function() {
    // handle dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle'); // get the dark mode toggle element by its ID
    const body = document.body; // get the body element of the document

    // check if dark mode is enabled in localStorage
    if (localStorage.getItem('darkMode') === 'true') { // check if the 'darkMode' key in localStorage is set to 'true'
        darkModeToggle.checked = true; // set the dark mode toggle to checked
        body.classList.add('dark-mode'); // add the 'dark-mode' class to the body element
    }

    darkModeToggle.addEventListener('change', function() {
        if (darkModeToggle.checked) { // check if the dark mode toggle is checked
            body.classList.add('dark-mode'); // add the 'dark-mode' class to the body element
            localStorage.setItem('darkMode', 'true'); // set the 'darkMode' key in localStorage to 'true'
        } else {
            body.classList.remove('dark-mode'); // remove the 'dark-mode' class from the body element
            localStorage.setItem('darkMode', 'false'); // set the 'darkMode' key in localStorage to 'false'
        }
    });

    // display current date and time
    function updateDateTime() {
        const dateTimeElement = document.getElementById('date-time'); // get the date-time element by its ID
        const now = new Date(); // create a new Date object representing the current date and time
        const formattedDateTime = now.toLocaleString(); // format the date and time as a string
        dateTimeElement.textContent = formattedDateTime; // set the text content of the date-time element to the formatted date and time
    }

    // update date and time every second
    setInterval(updateDateTime, 1000); // call the updateDateTime function every 1000 milliseconds (1 second)

    // initial call to display the date and time immediately
    updateDateTime(); // call the updateDateTime function to display the date and time immediately
});

// this also is questionable, beta feature ofc but still, why would you need to store the dark mode in local storage???? i hate web design never touching it again after HSC