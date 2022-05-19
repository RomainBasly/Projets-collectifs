console.log("coucou j'en ai plein le cou");

let images = document.getElementsByTagName('img');

chrome.storage.sync.get(["url"], function (result) {
console.log(result);
console.log(images);

for (image of images) {
    image.setAttribute("data-srcset", result.url);
    image.setAttribute("src", result.url);
    image.setAttribute("srcset", result.url);
    console.log(result)
}
});