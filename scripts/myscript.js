console.log(1);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender);
    console.log(request);
    // console.log(sendResponse);
    if (request.selected) {
      listenToSelected(request.selected);
    }
    if (request.listenAllPAge) {
      lintenAllPage();
    }
  });

var listenToSelected = function(selected) {
  var $selected = $('.' + selected);
  if ($selected.length < 1) {
    chrome.extension.sendRequest({
      message: "找不到所选定的元素"
    }, function(response) {
      console.log(response.farewell);
    });
  }
};

var lintenAllPage =  function() {

};
