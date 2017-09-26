var movie_list = ["Wedding Crashers", "Jay and Silent Bob", "Deep Blue Sea", "Grandma\'s Boy", "The Goonies"];

function add_buttons() {
        $(".button-area").empty();
    for (var i = 0; i < movie_list.length; i++) {
        $(".button-area").append("<button class='aributton'>" + movie_list[i] + "</button>");
        console.log(movie_list[i]);
    };
};

function get_gifs(movie) {
    console.log(movie);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=4604176cdfcd4cee9af08803ffeedf63&limit=12";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).done(function(response) {
       console.log(response);
       var data = response.data;
        for (var x = 0; x < data.length; x++) {
            var rating = data[x].rating;
            var still = data[x].images.original_still.url;
            var animate = data[x].images.original.url;

            console.log(rating);
            console.log(still);
            console.log(animate);
            var divimages = $("<div class='imgblock'></div>");

           divimages.append("<div class='rating'>Rating: " + rating + "</div>");
            var gify = $("<img>");
            gify.attr("class", "gifimg")
            gify.attr("data-still", still);
            gify.attr("data-animate", animate);
            gify.attr("data-state", "still");
            gify.attr("src", still);
            divimages.append(gify);
            $(".gify-area").append(divimages);
        };
    });
};


add_buttons();


$(document).on("click", "#add-movie", function () {
    event.preventDefault();

    if ($("#movie-input").val().trim() != "" && movie_list.indexOf($("#movie-input").val().trim()) === -1) {
        var usrmovie = $("#movie-input").val().trim();
        console.log(usrmovie);
        movie_list.push(usrmovie);
        $("#movie-input").val("");
        add_buttons();
    };
});


$(document).on("click", ".aributton", function() {
    console.log("Buttons work");
    console.log($(this).text());
    var movie = $(this).text().trim();
    $(".gify-area").empty();
    get_gifs(movie);


});

$(document).on("click", ".gifimg", function () {
    var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


});



