//Document ready function
// $(document).ready(function () {

    $("#search-button").on("click", function () {
        //Search value variable
        var searchValue = $("#search-value").val();
        //Pulling the search with a value
        $("#search-value").val("");
        //Calling the SearchWeather function with a searchValue
        searchWeather(searchValue);
    });

    //Function to pull in date when info is put into the search input field
    function searchWeather(searchValue) {
        //Ajax used to obtain the weather api
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8e7b50e448721200d703d303ab7dc6a5&units=imperial`,
            dataType: "json",
        })
        .then(function (data) {
            console.log(data);
            //History link for the search (.push)

            //Local storage set item

            //Used to empty out the data after every search so its not dumped on top of one another
            $("#today").empty();
            //Created a card where the weather info will be appended to in the HTML file
            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var condition = $("<p>").addClass("card-text").text(`Weather Conditions: ${data.weather.description}`);
            var temp = $("<p>").addClass("card-text").text(`Temperature: ${data.main.temp}`);
            var tempLow = $("<p>").addClass("card-text").text(`Low Temp: ${data.main.temp_min}`);
            var tempHigh = $("<p>").addClass("card-text").text(`High Temp: ${data.main.temp_max}`);
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed}`);
            var humid = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity}`);

            var cardBody = $("<div>").addClass("card-body");

            //Appending all variables/tags created above to the card in HTML
            cardBody.append(title, condition, temp, tempLow, tempHigh, wind, humid);
            card.append(cardBody);
            $("#today").append(card);
        })
    }

    //Function to provide UV index
    function uvIndex() {
        //Ajax used to obtain the UV index api //TODO:Need lat & lon and unites after the API??
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}${searchValue}&appid=8e7b50e448721200d703d303ab7dc6a5`,
            dataType: "json",
        })
        .then(function (data) {

            cardBody.append();
            card.append(cardBody);
            $("#today").append(card);
        })
    }


    //Function to display the 5 day forecast
    function forecastWeather() {
        //Ajax used to obtain the UV index api
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=8e7b50e448721200d703d303ab7dc6a5&units=imperial`,
            dataType: "json",
        })
        .then(function (data) {

            cardBody.append();
            card.append(cardBody);
            $("#today").append(card);
        })
    }






// })