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
















})