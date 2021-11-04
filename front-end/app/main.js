import "./styles/style.css";
// import { selectComponent } from "./js/selectComponent";

/*---------- VARIIABLES DECLARATION ----------*/
const BASEURL = "http://localhost:3000";
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

/*---------- EVENT LISTENERS ----------*/
submitBtn.addEventListener("click", postUrl);
statsBtn.addEventListener("click", getStats);

/*---------- NETWORK ----------*/
//A url shortcut request
async function postUrl() {
  try {
    cleanStats();
    const response = await axios.post(`${BASEURL}/api`, {
      "longUrl" : urlInput.value
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
    errorMessege(error.response.data.error);
    urlInput.value = "";
  }
}

//Request statistics for short url
async function getStats() {
  try {
    cleanAnswerUrl();
    cleanStats();
    const shortUrl = statInput.value;
    const splitUrlArr = shortUrl.split("/");
    const urlId = splitUrlArr[splitUrlArr.length -1];
    const response = await axios.get(`${BASEURL}/statistic/${urlId}`);
    const statsObj = response.data;

    creationDateInfo.textContent = `Creation Date:  ${statsObj.creationDate}`;
    redirectCountInfo.textContent = `The number of times the link was used: ${statsObj.redirectCount}`;
    originalUrlInfo.textContent = `Original Url: ${statsObj.originalUrl}`;
    idInfo.textContent = `ID: ${statsObj.id} `;

    statInput.value = "";
  } catch (error) {
    errorMessege(error.response.data.error);
    statInput.value = "";
  }
}


/*---------- ERROR HANDLER ----------*/
//Display Error massege
function errorMessege(messege) {
  const errorElem = document.createElement('div');
  errorElem.textContent = `Sorry ${messege}, please try again! ❌`;
  errorElem.classList.add('error-messege');
  const inputContainer = document.querySelector(".input-container");
  inputContainer.appendChild(errorElem);
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
