let url = "https://how-do-it.com/wp-content/uploads/2018/03/Grumpy-Cat-9.jpg";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ url });
  console.log(`the url is ${url}`);
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "Send Message to the BackEnd"){
//     chrome.storage.sync.get("url", url_input => {
//       console.log(url_input)
//     })
//   }
// })

// let url = "https://how-do-it.com/wp-content/uploads/2018/03/Grumpy-Cat-9.jpg";
