import "./styles/style.css";
// import { selectComponent } from "./js/selectComponent";

const BASEURL = "http://localhost:3000";
const urlInput = document.getElementById("url_input");
const submitBtn = document.getElementById("submitBtn");
const answerDiv = document.getElementById("answer");
const statisticsDiv = document.getElementById("statistics");


submitBtn.addEventListener("click", postUrl);

async function postUrl() {
  try {
    const response = await axios.post(`${BASEURL}/api`, {
      "longUrl" : urlInput.value
    });
    const shortUrl = response.data;

    answerDiv.style.display = "block";
    answerDiv.textContent = shortUrl;
    statisticsDiv.style.display = "flex";


    urlInput.value = "";
  } catch (error) {
    console.log(error);
    urlInput.value = "";
  }
}