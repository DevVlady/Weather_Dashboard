//Document ready function
$(document).ready(function () {

    $("#search-button").on("click", function (event) {
        event.preventDefault();
        //Search value variable
        var searchValue = $("#search-value").val();
        //Pulling the search with a value
        $("#search-value").val("");
        //Array for cities
        var citiesSearch = [];

        //Get item from local storage
        citiesSearch = JSON.parse(localStorage.getItem("citiesSearch")) || [];
        //History link for the search (.push)
        citiesSearch.push(searchValue);
        //Set item to local storage
        localStorage.setItem("citiesSearch", JSON.stringify(citiesSearch));

        //Calling the SearchWeather function with a searchValue
        searchWeather(searchValue);
    });

    //Latitude and longitude
    let lat = "";
    let lon = "";

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
            lat = data.coord.lat;
            lon = data.coord.lon;

            //Used to empty out the data after every search so its not dumped on top of one another
            $("#today").empty();

            //Created a card where the weather info will be appended to in the HTML file
            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card oneday");
            var condition = $("<p>").addClass("card-text").text(`Weather Conditions: ${data.weather[0].main}`);
            var icon = (`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
            var temp = $("<p>").addClass("card-text").text(`Temperature: ${data.main.temp} \u00B0F`);
            var tempLow = $("<p>").addClass("card-text").text(`Low Temp: ${data.main.temp_min} \u00B0F`);
            var tempHigh = $("<p>").addClass("card-text").text(`High Temp: ${data.main.temp_max} \u00B0F`);
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed} MPH`);
            var humid = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity} %`);
            //Crating a variable which will then be appended to the html file
            var cardBody = $("<div>").addClass("card-body hmdt");

            //Appending all variables/tags created above to the card in HTML
            cardBody.append(title, icon, condition, temp, tempLow, tempHigh, wind, humid);
            card.append(cardBody);
            $("#today").append(card);
            uvIndex();
            forecastWeather(searchValue);
        })
    }

    //Function to provide UV index
    function uvIndex() {
        //Ajax used to obtain the UV index api //TODO:Need lat & lon and unites after the API??
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=8e7b50e448721200d703d303ab7dc6a5`,
            dataType: "json",
        })
        .then(function (data) {
            //Creating the variable for the UV index
            var uvIndex = $("<p>").addClass("card-text").text(`UV-Index: ${data.value}`);
            var button = $("<button>").addClass("btn uIndex");
            button.append(uvIndex)
            $(".hmdt").append(button);
            //Console log data to get Uv-Index path
            console.log(data)
            //Show UV-Index in different colors based on number
            if (data.value < 3) {
                $(".uIndex").addClass("low");
            }
            else if (data.value <= 6) {
                $(".uIndex").addClass("moderate");
            }
            else if (data.value < 8) {
                $(".uIndex").addClass("high");
            }
            else if (data.value < 11) {
                $(".uIndex").addClass("veryHigh");
            }
            else if (data.value > 11) {
                $(".uIndex").addClass("extreme");
            }
        })
    }

    //Function to display the 5 day forecast
    //TODO: Use a for loop to loop over all forecast by specs
    function forecastWeather(searchValue) {
        //Ajax used to obtain the 5 day forecast with api
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=8e7b50e448721200d703d303ab7dc6a5&units=imperial`,
            dataType: "json",
        })
        .then(function (data) {
            console.log(data)
            //Created the for loop to loop through the forecast
            for (var i = 4; i < data.list.length; i+= 8) {
                //Setting date format using variables & strings
                var setDate = data.list[i].dt_txt;
                setDate = setDate.split("-");
                var month = setDate[1];
                var day = setDate[2].slice(0, 2);
                var year = setDate[0];
                var icon = (`<img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">`);
                var title = $("<h5>").addClass("card-title").text(`Date: ${month} /${day} / ${year}`);
                var card = $("<div>").addClass("card col-md-2 fiveday");
                var temp = $("<p>").addClass("card-text").text(`Temp: ${data.list[i].main.temp} \u00B0F`);
                var humid = $("<p>").addClass("card-text").text(`Humidity: ${data.list[i].main.humidity} %`);
                var wind = $("<p>").addClass("card-text").text(`Wind: ${data.list[i].wind.speed} MPH`);
                //Card variable where all the info will be appended into
                var cardBody = $("<div>").addClass("card-body");
                //Append the cardbody into the card and all the info in the card body
                cardBody.append(title, icon, temp, humid, wind)
                card.append(cardBody);
                $("#today").append(card);
            }
        })
    }

    //TODO:Build a function to obtain search history & print it
    function citiesSearched() {
        // var citiesLocalStorage = JSON.parse(localStorage.getItem("citiesSearch")) || [];
        //Loop to display the cities searched within the array
        for (var i = 0; i < citiesLocalStorage.length; i++) {
            citiesFromLocal = citiesLocalStorage[i];
            $("#cities-list").append("<div>" + "<button class='itemList btn btn-primary' >" + citiesFromLocal + "</button>");
        }
    }
    citiesSearched();

    $("#cities-list").on("click", ".itemList", function(event){
        event.preventDefault();
        var searchedCity = ($(this).text());
        searchWeather(searchedCity);
    })

})