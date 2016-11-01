//http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=dc6zaTOxFJmzC"

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
]

//grab what the user typed
$("#submitButton").on('click', function() {
var userInput = $("#userInput").val().trim();
	topics.push(userInput);
	$("#userInput").val("");
	return false;
});

//add a button for each array item with text, but remove previous buttons first
$("#buttons").empty();
for (var i = 0; i < topics.length; i++) {
	var newButton = $("<button>");
	newButton.text(topics[i]);
	newButton.attr('data-name', topics[i]);
	$("#buttons").append(newButton);
}


$('button').on('click', function(){
	var buttonText = $(this).data('name');

//API consumption
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
		giphyImg.attr('src', results[i].images.fixed_height_still.url);

		$("#populatedGifs").append(giphyImg);
		$("#populatedGifs").append(p);

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

		})
	}

})
});
