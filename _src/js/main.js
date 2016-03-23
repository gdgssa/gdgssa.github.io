(function(win, doc){
  'use strict';
  
    onload = function () { 
      scrollTo(0, 0); 
      onscroll = function () { 
        var $bgColor = $('#bgColor');
        var $gdgLogo = $('#logo-container');
        var $colorHeader = $('.teal');
        var pageSize = (doc.body.clientHeight - win.innerHeight);
        var percentageScrolled = Math.floor((doc.body.scrollTop / pageSize) * 100); 
                
        if (percentageScrolled < 20)
          $colorHeader.addClass('transparent');
        else {
          $bgColor.removeClass('transparent');
          $bgColor.addClass('teal');
          $gdgLogo.show();
        }
      }; 
    };
})(window, document);