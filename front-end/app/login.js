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
    const response = await axios.post(`${BASEURL}/entry/signUp/`, { userName, password, email });
    showLogin();
  } catch (error) {
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
    window.location.replace(response.data);
  } catch (error) {
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
