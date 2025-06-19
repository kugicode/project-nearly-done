// Assigning input and button elements to variables for easier use later
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const registerbtn = document.getElementById('registerbtn');
const para = document.getElementById('registerMsg');

const logUsername = document.getElementById('loginUsername');
const logPassword = document.getElementById('loginPassword');
const loginbtn = document.getElementById('loginbtn');
const text = document.getElementById('loginMsg');

// When the register button is clicked, run this block
registerbtn.addEventListener('click', () => {
    let username = regUsername.value.trim();
    let password = regPassword.value.trim();

    // If either input is empty, show a message and exit
    if (!username || !password) {
        para.textContent = "You need to enter a username and password pls...";
        clearMess();
        return;
    }

    // Regex: password must be at least 8 characters and include a number
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // If password doesn't match strength rules, show message and exit
    if (!strongPassword.test(password)) {
        para.textContent = "Password is meant to have at least 8 character with a single number.";
        clearMess();
        return;
    }

    // Get existing users from localStorage, or start with an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // If username is already taken, show message and exit
    if (users.some(user => user.username === username)) {
        para.textContent = "Username is already taken, pls try another username.";
        clearMess();
        return;
    }

    // Add new user to the array
    users.push({ username, password });

    // Convert the array to a string and save it in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    // Show success message
    para.textContent = "You have registered!";
    clearMess();

    // Clear input fields after successful registration
    regUsername.value = "";
    regPassword.value = "";
});

// Clears the registration message after a short delay
function clearMess(delay = 3000) {
    setTimeout(() => {
        para.textContent = "";
    }, delay);
}

// When the login button is clicked, run this block
loginbtn.addEventListener('click', () => {
    let logUser = logUsername.value.trim();
    let logPass = logPassword.value.trim();

    // If either field is empty, show a message and exit
    if (!logUser || !logPass) {
        text.textContent = "Please enter a username and password to login...";
        return;
    }

    // Get saved users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Look for a user that matches both username and password
    const foundUser = users.find(user =>
        user.username === logUser && user.password === logPass
    );

    // Show result message depending on whether a match was found
    if (foundUser) {
        text.textContent = "Welcome back! You have logged in!";
    } else {
        text.textContent = "User not found.";
        return;
    }
});