var destinationsArray = [];

var div = document.getElementById('destinations');

function createTableRow(text) {
    var tbody = document.getElementsByTagName('tbody')[0];

    var tr = document.createElement('tr');
    var tdText = document.createElement('td');
    var tdDeleteButton = document.createElement('td');
    var text = document.createTextNode(text);
    var button = document.createElement('button');
    var deleteButtonX = document.createTextNode('x');

    button.classList.add('btn', 'btn-sm', 'btn-danger');

    button.appendChild(deleteButtonX);
    tdDeleteButton.appendChild(button);
    tdText.appendChild(text);

    tr.appendChild(tdText);
    tr.appendChild(tdDeleteButton);

    tbody.appendChild(tr);

    addDeleteListeners();
}

function deleteFromChromeStorage(thing) {
    chrome.storage.sync.get('destinations', function(result) {
        var newDestinations = result.destinations;
        var indexOfThing = newDestinations.indexOf(thing);

        newDestinations.splice(indexOfThing, 1);

        chrome.storage.sync.set(({ destinations: newDestinations }));
    })
}

chrome.storage.sync.get('destinations', function (result) {
    if (typeof result.destinations === 'undefined') {
        chrome.storage.sync.set(({ destinations: [] }));

        createRows();
    } else {
        createRows();
    }

});

document.getElementById('add').addEventListener('click', function () {
    var textInput = document.getElementById('input').value;

    createTableRow(textInput);

    chrome.storage.sync.get('destinations', function (result) {
        var destinations = result.destinations;

        destinations.push(textInput);

        chrome.storage.sync.set({ destinations: destinations });
    });
});

function addDeleteListeners() {
    var deleteButtons = document.getElementsByClassName('btn-danger');

    Array.from(deleteButtons).forEach(function(button) {
        button.addEventListener('click', function() {
            var name = this.parentNode.parentNode.firstChild.innerHTML;
            deleteFromChromeStorage(name);

            this.parentNode.parentNode.remove();
        })
    })
}

function createRows() {
    chrome.storage.sync.get('destinations', function(result) {
        result.destinations.forEach(function (destination) {
            createTableRow(destination);
        })
    })
}

