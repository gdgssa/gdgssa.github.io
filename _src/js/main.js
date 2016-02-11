(function(){
  'use strict';
  
    window.onload = function () { 
      window.scrollTo(0,0); 
        window.onscroll = function () { 
          var doc = document.body, 
          scrollPosition = doc.scrollTop,
          pageSize = (doc.clientHeight - window.innerHeight),
          percentageScrolled = Math.floor((scrollPosition / pageSize) * 100); 
          
          if (percentageScrolled > 50){
            document.querySelector('.transparent').className = 'blue';
            document.querySelector('.new-logo').style.display = '';
          } 

          else{
            document.querySelector('.blue').className = 'transparent';
            document.querySelector('.new-logo').style.display = 'none';
          }

        }; 
    };
})();