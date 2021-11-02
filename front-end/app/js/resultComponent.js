export function resultComponent(text = "") {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const nextNode = document.createTextNode(text);

  h1.appendChild(nextNode);
  div.className = "result";
  div.appendChild(h1);

  return div;
}
