var titleDiv = ''; 
// Ajax call to wunderground's API
function fetchData() {
    titleDiv.innerHTML = ''; 
    var itemLookUp = document.getElementById('getItem').value;
    // create XMLHttpRequest object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    // readyState 4 means the request is complete
    // status 200 means was successful
    if (this.readyState == 4 && this.status == 200) {
        // construct object
        responseData = JSON.parse(this.responseText);
        processData();
    }
    };
    xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + itemLookUp, true);
    itemLookUp = ''; 
    xhttp.send();
    // reset input
    document.getElementById('getItem').value = '';
}

// process request data
function processData() {
    // remove most of the page's top margin
    document.getElementById('top').className = 'center marginTopTwo';
    titleDiv = document.getElementById('bookTitle');
    // show title div
    document.getElementById('bookTitleText').className = 'showText';
    // loop through response array of objects
    for (var i = 0; i < responseData.items.length; i++) {
        // reference to current array's object
        var item = responseData.items[i];
        // Title
        titleDiv.innerHTML += item.volumeInfo.title + '<br><br>';
        // if there is a description display it
        if (item.volumeInfo.description){
            titleDiv.innerHTML += item.volumeInfo.description +'<br><br>';
        } else {
            titleDiv.innerHTML += '<br>';
        }
    }
}

// eventlisteners 
document.getElementById('processData').addEventListener('click', fetchData, false);