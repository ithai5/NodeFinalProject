const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const button = document.getElementById('signup-button');
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
function checkingInput() { //valid user input
    let checks = [
        firstName.value.length>1, lastName.value.length>1, emailRegex.test(email.value), password.value === rePassword.value, password.value.length > 7
    ];
        !checks.includes(false)? button.disabled = false : button.disabled = true;
}