
var destinations = [
    'cleo 45c mitchell street ec1v 3qz',
    'euston station'
];

function createSearches(word) {
    var startingPoint = word.selectionText;
    
    chrome.storage.sync.get(['destinations'], function (result) {
        result.destinations.forEach(function (destination) {
            chrome.tabs.create({ url: 'https://google.co.uk/search?q=' + startingPoint + ' to ' + destination });
        })
    });

}

chrome.contextMenus.create({
    title: 'Check distances!',
    contexts: ['selection'],
    onclick: createSearches
});