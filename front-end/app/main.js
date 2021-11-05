import "./styles/style.css";

/*---------- VARIIABLES DECLARATION ----------*/
const BASEURL = "http://localhost:3000";
const errorDiv = document.getElementById("error-display");

//Nav-bar
const homeBtn = document.getElementById("home-nevBar");
const homeDiv = document.querySelector(".input-container");
const statsNavBarBtn = document.getElementById("stats-nevBar");
const statsDiv = document.getElementById("statistics");
const usersBtn = document.getElementById("users-nevBar");
const usersDiv = document.getElementById("usres-div");

//UserName
const loginBtn = document.getElementById("login-btn");
const swichBtn = document.getElementById("swich-btn");
const userNameInput = document.getElementById("userName-input");

//Answer
const urlInput = document.getElementById("url_input");
const submitBtn = document.getElementById("submitBtn");
const answerDiv = document.getElementById("answer");

//Stats
// const statisticsDiv = document.getElementById("statistics");
const statInput = document.getElementById("stat_input");
const statsBtn = document.getElementById("statsBtn");
const statsInfoDiv = document.getElementById("statistics-info");
const idInfo = document.getElementById("id");
const originalUrlInfo = document.getElementById("originalUrl");
const redirectCountInfo = document.getElementById("redirectCount");
const creationDateInfo = document.getElementById("creationDate");

//User managment
const helloHeader = document.getElementById("hello-user");

/*---------- EVENT LISTENERS ----------*/
loginBtn.addEventListener("click", ()=> {
  userNameInput.setAttribute('disabled', true);
});
swichBtn.addEventListener("click", ()=> {
  userNameInput.removeAttribute('disabled');
});

submitBtn.addEventListener("click", postUrl);
statsBtn.addEventListener("click", getStats);

homeBtn.addEventListener("click", ()=> {
  homeDiv.classList.toggle("hide");
  homeBtn.classList.toggle("active");
});

statsNavBarBtn.addEventListener("click", ()=> {
  statsDiv.classList.toggle("hide");
  statsNavBarBtn.classList.toggle("active");
});

usersBtn.addEventListener("click", ()=> {
  if (!userNameInput.value) {
    errorMessege("You must enter a username for this service", errorDiv);
    return;
  }
  usersDiv.classList.toggle("hide");
  usersBtn.classList.toggle("active");
  helloHeader.textContent = `Hello ${userNameInput.value} !`;
})

/*---------- NETWORK ----------*/
//A url shortcut request
async function postUrl() {
  try {
    cleanStats();
    const response = await axios.post(`${BASEURL}/api`, {
      "longUrl" : urlInput.value,
      "userName": userNameInput.value || "info" //Sends User name or the General Data name
    });
    const shortUrl = response.data;

    //Show answer = 
    answerDiv.style.display = "block";
    answerDiv.textContent = `${shortUrl}`;
    //Append close button
    const closeAnsBtn = createElement("button", "❌", "close-btn");
    closeAnsBtn.addEventListener("click", cleanAnswerUrl);
    answerDiv.appendChild(closeAnsBtn);

    urlInput.value = "";
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
    urlInput.value = "";
  }
}

//Request statistics for short url
async function getStats() {
  try {
    cleanAnswerUrl();
    cleanStats();
    const userName = userNameInput.value || "info";
    const shortUrl = statInput.value;
    const splitUrlArr = shortUrl.split("/");
    const urlId = splitUrlArr[splitUrlArr.length -1];
    const response = await axios.get(`${BASEURL}/statistic/${userName}/${urlId}`);
    const statsObj = response.data;

    document.querySelectorAll(".stats-label").forEach((element)=> element.classList.toggle("hide"));
    creationDateInfo.textContent = `${statsObj.creationDate}`;
    redirectCountInfo.textContent = `${statsObj.redirectCount}`;
    originalUrlInfo.textContent = `${statsObj.originalUrl}`;
    idInfo.textContent = `${statsObj.id} `;

    statInput.value = "";
  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
    statInput.value = "";
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
//
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}
//Clean old information in stats area
function cleanStats() {
  document.querySelectorAll(".stats-label").forEach((element)=> element.classList.add("hide"));
  creationDateInfo.textContent = "";
  redirectCountInfo.textContent = "";
  originalUrlInfo.textContent = "";
  idInfo.textContent = "";
}
//Clean old information in answer area
function cleanAnswerUrl() {
  answerDiv.style.display = "none";
  answerDiv.textContent = "";
}
