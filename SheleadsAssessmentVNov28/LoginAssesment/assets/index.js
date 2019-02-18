// Back-end code (not meant for front end to edit without permission)

var oid = '';

//Enter Assessment Name
var assessment = "STEMAssesment";

function setUpFormSubmission() {

    var firebaseUser = firebase.auth().currentUser;
    var username = sessionStorage.getItem("Username");
	var organization = sessionStorage.getItem("Organization");



    var formData = {
      [assessment]: {
        Info: { },
        Questions: { }
      }
    };


		$('.screen .screen_content').each(function( index ) {
			var Question_text = $(this).find('.quiz_question').text().trim();
			var options_text = {};
			var response_text = '';
			if($(this).find('.options').length){
				$(this).find('.options ul li').each(function( index ) {
					if($(this).find('img').length){
						options_text[index+1] = $(this).find('img').attr('data-value');
					if($(this).hasClass('active')){
						response_text = $(this).find('img').attr('data-value');
					}
					}else{
						options_text[index+1]  = $(this).text().trim();
						if($(this).hasClass('active')){
						response_text = $(this).text().trim();

						}
					}
				});
			}else{
				options_text = 'none';
				response_text = $(this).find('.reponseInput').val();

			}
			formData[assessment]["Questions"]["Q"+(index+1)] = {
        Question: Question_text,
        Options: options_text,
        Responses: {
			username: response_text
		}
      };


		});


	jQuery.each(formData[assessment].Questions, function(i, val) {
	  //Please comment line 63 to 70 after initial questions are loaded
		firebase
	   .database()
		.ref("Organizations/"+ organization +"/Assessments/"+assessment+"/Questions/"+(i)+"/Question")
		.set(val.Question);
		firebase
	   .database()
		.ref("Organizations/"+ organization +"/Assessments/"+assessment+"/Questions/"+(i)+"/Options")
		.set(val.Options);
		///ONLY HAVE BELOW CODE ONCE THE QUESTIONS ARE LOADED INTO THE DATABASE
		firebase
	   .database()
		.ref("Organizations/"+ organization +"/Assessments/"+assessment+"/Questions/"+(i)+"/Responses/"+username).set(val.Responses.username);
});

}

function right_characters(textbox,x)
{
  // making sure of valid inputs
  var forbidden_characters = "";
  console.log(textbox);
  if(x === 1)
  {
    forbidden_characters = /[^a-z]/gi;
  }
  else if (x === 2)
  {
    forbidden_characters = /[^a-z0-9 ]/gi;
  }
  else if (x === 3)
  {
    forbidden_characters = /[^0-9]/gi;
  }
  var textbox_value = textbox.value.replace(forbidden_characters, "");
  // detecting swearwords:

  var swearwords = ["FUCK", "BITCH", "SLUT", "WHORE", "ANUS", "STUPID", "IDIOT",
                    "DUMB", "DICK", "PUSSY", "BOOBS", "BOOBIES", "SHIT",
                    "PISS", "DOUCHE", "NIGGER", "NIGGA"];
  var user_input = textbox_value.split('');
  for(var starting_char = 0; starting_char < textbox_value.length; starting_char++)
  {
    for(var last_char = textbox_value.length; last_char > starting_char; last_char--)
    {
      var passed_input = new Array(0);
      for (var char = starting_char; char < last_char; char++)
      {
        passed_input.push(user_input[char]);
        for(var i = 0; i < swearwords.length; i++)
        {
          var forbid_word = new RegExp('\\b' + swearwords[i] + '\\b', 'gi');
         // var forbid_word = swearwords[i];
          if (forbid_word.exec(passed_input.join('')))
          {
            for(var start = starting_char; start < last_char; start++)
            {
              user_input[start]="";
            }
          }
        }
      }
    }
  }
  textbox.value = user_input.join('');
}
