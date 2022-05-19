
const bouton = document.getElementById("button_image");
chrome.storage.sync.get("url", ({ url }) => {
  bouton.style.backgroundImage = "url(" + url + ")";
});

const submit_button = document.querySelector("#submit_button");

submit_button.addEventListener("click", async () => {
  let url_input = document.getElementById("url_input").value;
  bouton.style.backgroundImage = "url(" + url_input + ")";
  console.log(url_input);

  chrome.storage.sync.get(["url"], function (result) {
    console.log(result);
    console.log(result.url);
    result.url = url_input;
    console.log(result.url);
    chrome.storage.sync.set({ url: result.url });
  });

  bouton.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["change-image.js"],
    });
  });
});
