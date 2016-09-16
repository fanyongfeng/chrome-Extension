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
    sendMessage({
      message: "找不到所选定的元素"
    });
  } else {
    listenClassSelected(selected);
  }
};

var listenClassSelected = function(selected) {
  var html;
  return (function(selected) {
    setInterval(function() {
      newHtml = $('.' + selected).html();
      if (html !== '' && html !== newHtml) {
        $('.' + selected).trigger('click');
        sendMeessage({
          getStart: true
        });
        palyMp3();
        clearInterval();
      }
    }, 300);
  })(selected);

};

var canSelectedDom = {
  a: 'a',
  button: 'button'
};

var setInt = {};

var containeText = ['加入', '抢购', '购买', '秒杀', '立即', '刷新'];
var keyslength = containeText.length;

var setTimeRun = function(text, index) {
  return (function(index) {
    setInt[index] = setInterval(function() {
      for (var dom in canSelectedDom) {
        // console.log($(dom + ':contains(' + text + ')'));
        var DOM = $(dom + ':contains(' + text + ')');
        console.log(DOM);
        if (DOM.length > 0) {
          $(dom + ':contains(' + text + ')').trigger('click');
          $(dom + ':contains(' + text + ')')[0].click();
          console.log('$("' + dom + ':contains(' + text + ')").trigger("click");');
          if (text !== '刷新') {
            sendMeessage({
              getStart: true
            });
            palyMp3();
            // alert(JSON.stringify(setInt));
            clearInterval(setInt[index]);
          }
        } else {
          console.log(dom + ':contains(' + text + ')');
        }
      }
    }, 300);
  })(index);
};

var sendMeessage = function(message) {
  chrome.extension.sendRequest(message, function(response) {});
};

var lintenAllPage = function() {
  $.each(containeText, function(index, item) {
    return (function(item, index) {
      setTimeRun(item, index);
    })(item, index);
  });
};

var palyMp3 = function() {
  var aimei = chrome.extension.getURL('../aimei.mp3');
  if ($('#bgMusic').length < 1) {
    $('body').append('<audio id="bgMusic" src="' + aimei + '" autoplay="autoplay"></audio>');
  }
};
