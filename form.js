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

    // addDeleteListeners();
}

chrome.storage.sync.get('destinations', function (result) {
    if (typeof result.destinations === 'undefined') {
        chrome.storage.sync.set(({ destinations: [] }));

        chrome.storage.sync.get('destinations', function(result) {
            result.destinations.forEach(function (destination) {
                createTableRow(destination);
            })
        })
    } else {
        chrome.storage.sync.get('destinations', function(result) {
            result.destinations.forEach(function (destination) {
                createTableRow(destination);
            })
        })
    }

    addDeleteListeners();
});

document.getElementById('add').addEventListener('click', function () {
    var textInput = document.getElementById('input').value;

    createTableRow(textInput);
    addDeleteListeners();

    chrome.storage.sync.get('destinations', function (result) {
        var destinations = result.destinations;

        destinations.push(textInput);

        chrome.storage.sync.set({ destinations: destinations });
    });
});

// var deleteButtons = document.getElementsByClassName('btn-danger');

// console.log(Array.from(deleteButtons));

// Array.from(deleteButtons).forEach(function(element) {
//     console.log(element);
//     element.addEventListener('click', function() {
//         console.log(this);
//     });
// })

function addDeleteListeners() {
    var deleteButtons = document.getElementsByClassName('btn-danger');

    console.log(deleteButtons);

    for (var i = 0; i < deleteButtons.length; i++) {
        console.log(deleteButtons[i]);
    }

    
    // Array.from(document.getElementsByClassName('btn-danger')).forEach(function(button) {
    //     console.log(button);
    // });
    // document.getElementsByClassName('btn-danger').forEach(function(element) {
    //     element.addEventListener('click', function() {
    //         console.log(this);
    //     });
    // })
}