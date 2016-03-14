(function(){
  'use strict';
  
    window.onload = function () { 
      window.scrollTo(0, 0); 
      window.onscroll = function () { 
        var doc = document.body; 
        var scrollPosition = doc.scrollTop;
        var pageSize = (doc.clientHeight - window.innerHeight);
        var percentageScrolled = Math.floor((scrollPosition / pageSize) * 100); 
        
        var bgColor = $('#bgColor');
        var gdgLogo = $('#logo-container');
        var colorHeader = $('.teal');

        gdgLogo.hide();
        
        if (percentageScrolled < 20){
          colorHeader.addClass('transparent');
        } else {
          bgColor.removeClass('transparent');
          bgColor.addClass('teal');
          gdgLogo.show();
        }

      }; 
    };
})();