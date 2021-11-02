import "./styles/style.css";
import { selectComponent } from "./js/selectComponent";

const app = document.querySelector("#root");
const options = [
  {
    value: "",
    text: "Select",
  },
  {
    value: "ip",
    text: "Get IP",
  },
  {
    value: "device",
    text: "Get Device",
  },
  {
    value: "os",
    text: "Get Operating System",
  },
  {
    value: "browser",
    text: "Get Browser",
  },
];

const select = selectComponent(options);
app.append(select);
