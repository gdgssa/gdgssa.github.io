(function(){
  'use strict';
  
    window.onload = function () { 
      window.scrollTo(0,0); 
        window.onscroll = function () { 
          var doc = document.body, 
          scrollPosition = doc.scrollTop,
          pageSize = (doc.clientHeight - window.innerHeight),
          percentageScrolled = Math.floor((scrollPosition / pageSize) * 100); 
          
          console.log('Scroll: ', percentageScrolled);
          if (percentageScrolled > 20){
            document.querySelector('.transparent').className = 'teal';
            document.querySelector('.new-logo').style.display = '';
          } 

          else{
            document.querySelector('.teal').className = 'transparent';
            document.querySelector('.new-logo').style.display = 'none';
          }

        }; 
    };
})();