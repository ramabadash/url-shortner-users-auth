import './styles/login.css';

const BASEURL = '';
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const showLoginBtn = document.getElementById('show-login');
const loginBtnNew = document.getElementById('login-btn-new');
const userNameInputLogin = document.getElementById('userName-input-login');
const passwordInputLogin = document.getElementById('password-input-login');

const showSignUp = document.getElementById('show-signUp');
const signUpButton = document.getElementById('signup-btn-new');
const userNameSignUp = document.getElementById('userName-input-signup');
const emailSignUp = document.getElementById('email-input-signup');
const passwordSignUp = document.getElementById('password-input-signup');

// Switch screens
//Show signUp
showSignUp.addEventListener('click', () => {
  signupForm.classList.toggle('hide');
  loginForm.classList.toggle('hide');
});
//Show login
showLoginBtn.addEventListener('click', showLogin);
function showLogin() {
  signupForm.classList.toggle('hide');
  loginForm.classList.toggle('hide');
}

//Login events

//SignUp
signUpButton.addEventListener('click', signUp);
async function signUp() {
  try {
    const userName = userNameSignUp.value;
    const email = emailSignUp.value;
    const password = passwordSignUp.value;
    // Validate inputs
    const isValidDetails = validateUserDetails(userName, password, email);
    if (isValidDetails !== true) {
      clearSignUpInputs();
      errorMessege(isValidDetails, signupForm);
      return;
    }
    const response = await axios.post(`${BASEURL}/entry/signUp/`, { userName, password, email });
    clearSignUpInputs();
    showLogin();
  } catch (error) {
    clearSignUpInputs();
    errorMessege(error.response.data.error, signupForm);
  }
}
//Login
loginBtnNew.addEventListener('click', login);
async function login() {
  try {
    console.log('login');
    const userName = userNameInputLogin.value;
    const password = passwordInputLogin.value;
    const response = await axios.post(`${BASEURL}/entry/login/`, {
      userName,
      password,
    });
    clearLoginInputs();
    window.location.replace(response.data);
  } catch (error) {
    clearLoginInputs();
    errorMessege(error.response.data.error, loginForm);
  }
}

/*---------- ERROR HANDLER ----------*/
//Display Error massege
function errorMessege(messege, element) {
  const errorElem = document.createElement('div');
  errorElem.textContent = `Sorry ${messege}, please try again! ❌`;
  errorElem.classList.add('error-messege');
  element.appendChild(errorElem);
  setTimeout(() => errorElem.remove(), 5000);
}
/*---------- DOM RELATED ----------*/
function clearSignUpInputs() {
  userNameSignUp.value = '';
  emailSignUp.value = '';
  passwordSignUp.value = '';
}
function clearLoginInputs() {
  userNameInputLogin.value = '';
  passwordInputLogin.value = '';
}

/*---------- Validators ----------*/
//Vlidate user details
function validateUserDetails(username, password, email) {
  if (!validateEmail(email)) {
    return 'Not valid Email';
  } else if (!validateUserName(username)) {
    return 'Not valid userName';
  } else if (!validatePassword(password)) {
    return 'Not A strong password';
  } else {
    return true;
  }
}

//Validate Email
function validateEmail(emailAdress) {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Regex: valid email
  return emailAdress.match(regexEmail);
}

//Validate userName
function validateUserName(username) {
  const usernameRegex = /^[a-zA-Z0-9]+$/; //Regex: At least 1 UperCase letter  + 1 lowerCase letter + Number
  return usernameRegex.test(username);
}

//Validate paswword
function validatePassword(password) {
  let pattern = new RegExp('^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$'); //Regex: At least 8 characters with at least 2 numericals
  return pattern.test(password);
}
