$('.js-listen-class').off().on('click', function() {
  var selectClass = $('#text-input').val();
  sendMessage({selected: selectClass});
});

$('#linten-page').off().on('click', function() {
  sendMessage({listenAllPAge: true});
});

var sendMessage = function(message) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log(response);
    });
  });
};

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

    if (request.message) {
      sendResponse({
        farewell: "收到了找不到的报错信息"
      });
      showErrorMessage(request.message);
    } else {
      sendResponse({}); // snub them.
    }
  });

  var showErrorMessage = function(message) {
    debugger
    $('#showErrorMessage').html(message);
  };
