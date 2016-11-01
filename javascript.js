var topics = [
"Avatar: The Last Airbender",
"Appa",
"Momo",
"Aang",
"Toph",
"Sokka",
"Katara",
"Earthbending",
"Waterbending",
"Firebending",
"Airbending",
"Metalbending",
"Lavabending",
];

//function to render the topics in the current array as buttons
function renderButtons () {

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.text(topics[i]);
		newButton.attr('data-name', topics[i]);
		$("#buttons").append(newButton);
	}
};

//call that function
renderButtons();

//submit function
$("#submitButton").on('click', function() {

	//grab what the user typed and pushes to topics array without refreshing page
	var userInput = $("#userInput").val().trim();
	topics.push(userInput);
	$("#userInput").val("");

	//remove previous buttons then reload all the buttons again with updated array items
	$("#buttons").empty();
	renderButtons();

})

//API
$('button').on('click', function(){

	//retrieve button text info to put in query
	var buttonText = $(this).data('name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		var results = response.data;
		console.log(results);

		//for loop for populating gifs and ratings
		for (var i = 0; i < results.length; i++) {

			var rating = results[i].rating;
			var p = $('<p>').text("Rating: " + rating);

			var giphyImg = $("<img>");
			giphyImg.addClass("gifs");
			giphyImg.attr('data-state', 'still')
			giphyImg.attr('src', results[i].images.fixed_height_still.url);

			$("#populatedGifs").prepend(giphyImg);
			$("#populatedGifs").prepend(p);
		}

	});

});

//function for animating still gifs
$(".gifs").on('click', function(){
	var state = $(this).attr('data-state')

	if (state === "still") {
		$(this).attr('data-state', 'animate')
		$(this).attr('src', results[i].images.fixed_height.url)
	}

	if (state === "animate") {
		$(this).attr('data-state', 'still')
		$(this).attr('src', results[i].images.fixed_height_still.url)
	}

});