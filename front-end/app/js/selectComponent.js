import { resultComponent } from "./resultComponent";
import { parseUA } from "./parseUA";

export function selectComponent(options = []) {
  const selectElement = document.createElement("select");

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.text = option.text;
    optionElement.value = option.value;
    if (!option.value) {
      optionElement.selected = true;
      optionElement.disabled = true;
    }
    selectElement.add(optionElement, null);
  });

  selectElement.addEventListener("change", async (e) => {
    const message = await parseUA(e.target.value);
    const oldResult = document.querySelector(".result");
    const newResult = resultComponent(message);

    if (oldResult) {
      oldResult.parentElement.replaceChild(newResult, oldResult);
    } else {
      document.querySelector("#root").append(newResult);
    }
  });

  return selectElement;
}
