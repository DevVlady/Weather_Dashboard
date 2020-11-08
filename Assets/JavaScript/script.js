//Document ready function
$(document).ready(function (){

    $("#search-button").on("click", function(){
        //Search value variable
        var searchValue = $("#search-value").val();
        //Pulling the search with a value
        $("#search-value").val("");
        //Calling the SearchWeather function with a searchValue
        searchWeather(searchValue);
    })

    //Function to pull in date when info is put into the search input field
    function searchWeather (searchValue) {
        //Ajax used to obtain the weather api
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8e7b50e448721200d703d303ab7dc6a5`,
            dataType: "json",
        }).then(function(data){
            //History link for the search (.push)

            //Local storage set item

            //Used to empty out the data after every search so its not dumped on top of one another
            $("#today").empty();
            //Created a card where the weather info will be appended to in the HTML file
            var title = $("<h3>").addClass("card-title").text(_______);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${_______}`);
            var humid = $("<p>").addClass("card-text").text(`Humidity: ${_________}`);

            var cardBody = $("<div>").addClass("card-body");

            //Appending all variables/tags created above to the card in HTML
            cardBody.append(title, wind, humid); //Attach any other specifications of variables are created above
            card.append(cardBody);
            $("#today").append(card);
        })
    }
















})