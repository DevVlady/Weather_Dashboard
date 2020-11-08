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
            url: `   ${searchValue}    `,
            dataType: "json",
        }).then(function(data){
            //History link for the search (.push)

            //Local storage set item

            //Used to empty out the data after every search so its not dumped on top of one another
            $("#today").empty();
        })
    }
















})