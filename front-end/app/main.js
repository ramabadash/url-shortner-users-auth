import './styles/style.css';
import './styles/login.css';

/*---------- VARIIABLES DECLARATION ----------*/
// const BASEURL = "http://localhost:3000";
const BASEURL = '';
const errorDiv = document.getElementById('error-display');

//Nav-bar
const homeBtn = document.getElementById('home-nevBar');
const homeDiv = document.querySelector('.input-container');
const statsNavBarBtn = document.getElementById('stats-nevBar');
const usersBtn = document.getElementById('users-nevBar');
const usersDiv = document.getElementById('usres-div');

//UserName
const loginBtn = document.getElementById('login-btn');
const swichBtn = document.getElementById('swich-btn');
const userNameInput = document.getElementById('userName-input');

//Answer
const urlInput = document.getElementById('url_input');
const submitBtn = document.getElementById('submitBtn');
const answerDiv = document.getElementById('answer');

//Stats
const statsDiv = document.getElementById('statistics');
const statInput = document.getElementById('stat_input');
const statsBtn = document.getElementById('statsBtn');
const idInfo = document.getElementById('id');
const originalUrlInfo = document.getElementById('originalUrl');
const redirectCountInfo = document.getElementById('redirectCount');
const creationDateInfo = document.getElementById('creationDate');

//User managment
const helloHeader = document.getElementById('hello-user');
const customUrlInput = document.getElementById('custom-url_input');
const customWordInput = document.getElementById('custom-word_input');
const customSubmitBtn = document.getElementById('custom-submitBtn');
const historyDiv = document.getElementById('history-info');
const historyBtn = document.getElementById('history-btn');

//Form
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

/*---------- LOGIN EVENTS ----------*/
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

function showPage() {
  document.querySelector('.entry-form').style.display = 'none';
  document.querySelector('#page').style.display = 'block';
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
    console.log(error);
  }
}
//Login
loginBtnNew.addEventListener('click', login);
async function login() {
  try {
    const userName = userNameInputLogin.value;
    const password = passwordInputLogin.value;
    const response = await axios.post(`${BASEURL}/entry/login/`, {
      userName,
      password,
    });
    console.log(response.data);
    showPage();
    userNameInput.value = userName;
  } catch (error) {
    errorMessege(error.response.data.error, loginForm);
  }
}

/*---------- EVENT LISTENERS ----------*/
//Network events
submitBtn.addEventListener('click', postUrl);
statsBtn.addEventListener('click', getStats);
customSubmitBtn.addEventListener('click', postCustomUrl);
historyBtn.addEventListener('click', generateHistoryToDom);

//Nav-bar events
homeBtn.addEventListener('click', () => {
  //Show & Hide elements
  homeDiv.classList.remove('hide');
  statsDiv.classList.add('hide');
  usersDiv.classList.add('hide');
  //Active & De-active nav-bar buttons
  homeBtn.classList.add('active');
  statsNavBarBtn.classList.remove('active');
  usersBtn.classList.remove('active');
  //Clear old data from other divs
  cleanStats();
  cleanAnswerUrl();
  clearHistoryFromDom();
});

statsNavBarBtn.addEventListener('click', () => {
  //Show & Hide elements
  statsDiv.classList.remove('hide');
  homeDiv.classList.add('hide');
  usersDiv.classList.add('hide');
  //Active & De-active nav-bar buttons
  statsNavBarBtn.classList.add('active');
  homeBtn.classList.remove('active');
  usersBtn.classList.remove('active');
  //Clear old data from other divs
  cleanStats();
  cleanAnswerUrl();
  clearHistoryFromDom();
});

usersBtn.addEventListener('click', () => {
  if (!userNameInput.value) {
    errorMessege('You must enter a username for this service', errorDiv);
    return;
  }
  helloHeader.textContent = `Hello ${userNameInput.value} !`;
  //Show & Hide elements
  usersDiv.classList.remove('hide');
  homeDiv.classList.add('hide');
  statsDiv.classList.add('hide');
  //Active & De-active nav-bar buttons
  usersBtn.classList.add('active');
  homeBtn.classList.remove('active');
  statsNavBarBtn.classList.remove('active');
  //Clear old data from other divs
  cleanStats();
  cleanAnswerUrl();
  clearHistoryFromDom();
});
//Get userName by token
window.addEventListener('load', getUserName);

/*---------- NETWORK ----------*/
// Get userName
async function getUserName() {
  try {
    const response = await axios.get(`${BASEURL}/entry/username`);
    userNameInput.value = response.data;
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}
//Get User History
async function getUserHistory() {
  try {
    cleanAnswerUrl();
    cleanStats();
    const userName = userNameInput.value;
    const response = await axios.get(`${BASEURL}/users/history/${userName}`);
    const historyArr = response.data;

    return historyArr;
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}
//Make custom URL
async function postCustomUrl() {
  try {
    cleanStats();
    const response = await axios.post(`${BASEURL}/users`, {
      longUrl: customUrlInput.value,
      userName: userNameInput.value || 'info', //Sends User name or the General Data name,
      customWord: customWordInput.value,
    });
    const shortUrl = response.data;
    generateAnswerToDom(shortUrl);

    customUrlInput.value = '';
    customWordInput.value = '';
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
    customUrlInput.value = '';
    customWordInput.value = '';
  }
}

//A url shortcut request
async function postUrl() {
  try {
    cleanStats();
    const response = await axios.post(`${BASEURL}/api`, {
      longUrl: urlInput.value,
      userName: userNameInput.value || 'info', //Sends User name or the General Data name
    });
    const shortUrl = response.data;
    generateAnswerToDom(shortUrl); //Show answeron DOM

    urlInput.value = '';
  } catch (error) {
    console.log(error);
    errorMessege(error.response.data.error, errorDiv);
    urlInput.value = '';
  }
}

//Request statistics for short url
async function getStats() {
  try {
    cleanAnswerUrl();
    cleanStats();
    const userName = userNameInput.value || 'info';
    const shortUrl = statInput.value;
    //Take only the id from the url
    const splitUrlArr = shortUrl.split('/');
    const urlId = splitUrlArr[splitUrlArr.length - 1];
    //API request
    const response = await axios.get(`${BASEURL}/statistic/${userName}/${urlId}`);
    const statsObj = response.data;
    //Append text to the elements
    document.querySelectorAll('.stats-label').forEach((element) => element.classList.toggle('hide'));
    creationDateInfo.textContent = `${statsObj.creationDate}`;
    redirectCountInfo.textContent = `${statsObj.redirectCount}`;
    originalUrlInfo.textContent = `${statsObj.originalUrl}`;
    idInfo.textContent = `${statsObj.id} `;

    statInput.value = '';
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
    statInput.value = '';
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
//Copy any text to clipBord
function copyText(text) {
  //Create temp input ekem with that text
  const tempInput = document.createElement('input');
  tempInput.setAttribute('value', text);
  document.body.appendChild(tempInput);

  // Select the temp text field
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(tempInput.value); //Copy the text inside the text field

  tempInput.remove(); //Remove temp input
}

//Generate answer to dom
function generateAnswerToDom(shortUrl) {
  //Show answer
  answerDiv.style.display = 'block';
  answerDiv.textContent = `${shortUrl}`;

  //Append close button
  const closeAnsBtn = createElement('button', '✖', 'close-btn');
  closeAnsBtn.addEventListener('click', cleanAnswerUrl);
  answerDiv.appendChild(closeAnsBtn);

  //append copy button
  const copyAnsBtn = createElement('button', 'COPY', 'copy-btn');
  copyAnsBtn.addEventListener('click', () => {
    copyText(shortUrl);
  });
  answerDiv.appendChild(copyAnsBtn);
}
//Generate histiry elements for the user base on the API response of "getUserHistory()"
async function generateHistoryToDom() {
  try {
    clearHistoryFromDom();
    const historyArr = await getUserHistory(); //Sent API request
    //Empty history
    if (historyArr.length === 0) {
      const noHistoryElem = createElement('div', 'No history', 'error-messege');
      historyDiv.appendChild(noHistoryElem);
    } else {
      //Has history - generate elements
      for (const dataObj of historyArr) {
        const historyPartDiv = createElement('div', '', 'history-part');
        const shortUrlElem = createElement('label', dataObj.date, 'history-date');
        const dateElem = createElement('label', dataObj.shortUrl, 'history-url');
        historyPartDiv.appendChild(shortUrlElem);
        historyPartDiv.appendChild(dateElem);
        historyDiv.appendChild(historyPartDiv);
      }
    }
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}
//
function clearHistoryFromDom() {
  document.querySelectorAll('#history-info>div').forEach((elem) => elem.remove());
}
//General create element function
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}
//Clean old information in stats area
function cleanStats() {
  document.querySelectorAll('.stats-label').forEach((element) => element.classList.add('hide'));
  creationDateInfo.textContent = '';
  redirectCountInfo.textContent = '';
  originalUrlInfo.textContent = '';
  idInfo.textContent = '';
}
//Clean old information in answer area
function cleanAnswerUrl() {
  answerDiv.style.display = 'none';
  answerDiv.textContent = '';
}
