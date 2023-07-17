const inputField = document.getElementById("input-field");
const saveInput = document.getElementById("save-btn");
const ulElement = document.getElementById("unordered-inputs");
const saveTab = document.getElementById("save-tab");
const deleteAll = document.getElementById("delete-btn");
let urls = [];

//we use parse cause it's a string and we want it back as an array
const localStorageurls = JSON.parse(localStorage.getItem("urlsSaved"));

//if localStorageurls is not null (truthy value)
if (localStorageurls) {
  urls = localStorageurls;
  //renderApp again so it's going to show up when you refresh the page
  renderApp(urls);
}

deleteAll.addEventListener("dblclick", function () {
  //clearing the local storage
  localStorage.clear();
  urls = [];
  //renderApp on an empty array
  renderApp(urls);
});

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //push the currentTab url which is an object to urls array
    urls.push(tabs[0].url);
    //save in local storage
    localStorage.setItem("urlsSaved", JSON.stringify(urls));
    //renderApp
    renderApp(urls);
  });
});
saveInput.addEventListener("click", function () {
  let inputValue = inputField.value;
  urls.push(inputValue);
  //Creating a local storage so the urls saved it doesn't go when you refresh the page
  //JSON.stringify to change the array to string since local storage only accepts strings
  localStorage.setItem("urlsSaved", JSON.stringify(urls));
  renderApp(urls);
  inputField.value = "";
});

function renderApp(urlsSent) {
  let listedItems = "";
  for (let i = 0; i < urlsSent.length; i++) {
    listedItems += `
    <li>
        <a target='_blank' href='${urlsSent[i]}'>
            ${urlsSent[i]}
        </a>
    </li>
`;
  }
  ulElement.innerHTML = listedItems;
}
