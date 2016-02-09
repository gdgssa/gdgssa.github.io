(function(){
  'use strict';
  
    window.onload = function () { 
      window.scrollTo(0,0); 
        window.onscroll = function () { 
          var doc = document.body, 
          scrollPosition = doc.scrollTop,
          pageSize = (doc.clientHeight - window.innerHeight),
          percentageScrolled = Math.floor((scrollPosition / pageSize) * 100); 
          
          if (percentageScrolled > 65){
            document.querySelector('.transparent').className = 'blue';
          } 

          else{
            document.querySelector('.blue').className = 'transparent';
          }

        }; 
    };
})();