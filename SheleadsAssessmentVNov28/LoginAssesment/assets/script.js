

window.onload=function()
{
     localStorage.clear();
     setTimeout( removeLoader, 1000); //wait for page load PLUS 0.7 seconds.
     animation();
};
function removeLoader()
{
   $("#loadingDiv").fadeOut(500, function()
   {
       // fadeOut complete. Remove the loading div
       $("#loadingDiv").remove(); //makes page more lightweight
       $("#loading_screen").remove();
   });
   }
function animation()
{
 var animations =
     [
       //object            animations        duration         Delay
       ["ball_2",           "zoomIn",         "1.1s",         "0.15s"],
       ["ball_1",           "zoomIn",         "1s",           "0.3s"],
       ["ball_3",           "zoomIn",         "1.8s",         "0.4s"],
	    ["ball_4",           "zoomIn",         "1.8s",         "0.4s"]
     ]



 // Animations start here
 for (i = 0; i < animations.length; i++)
 {
   var object = document.getElementById(animations[i][0]);
   object.style.visibility="hidden";
 }
 for (i = 0; i < animations.length; i++)
 {
   var object = document.getElementById(animations[i][0]);
   object.style.visibility="visible";
   object.style.animationDuration = animations[i][2];
   object.style.animationDelay = animations[i][3];
   object.className += " animated " + animations[i][1];
 }
 }
 
function animationReplay()
{
$('.ball').removeClass('zoomIn animated');
 setTimeout( animation, 200);

}

function getNextScreen(caller){
	animationReplay();
	$(caller).closest('.screen').find('.options ul li').removeClass('active');
	$(caller).addClass('active');
	if($(caller).closest('.screen').next('.screen').length){
			$(caller).closest('.screen').removeClass('active');
			$(caller).closest('.screen').addClass('inactive');
		$(caller).closest('.screen').next('.screen').removeClass('inactive');
		 setTimeout(function(){ $(caller).closest('.screen').next('.screen').addClass('active'); },200);
	}else{
		setUpFormSubmission();
		$('.screen').removeClass('active');
		$('.screen').addClass('inactive');
		$('.thankyouscreen').addClass('active');
	}
	
}

function getPrevScreen(caller){
	animationReplay();
	if($(caller).closest('.screen').prev('.screen').length){
			$(caller).closest('.screen').removeClass('active');
	$(caller).closest('.screen').addClass('inactive');
		$(caller).closest('.screen').prev('.screen').removeClass('inactive');
		 setTimeout(function(){ $(caller).closest('.screen').prev('.screen').addClass('active'); },200);
	}else{
		
	}
	
}

function handleEnter(e,caller){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that rusn
           getNextScreen(caller);
        }
    }
	