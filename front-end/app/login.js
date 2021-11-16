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
