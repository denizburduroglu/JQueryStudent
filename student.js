
$(document).ready(function() {
    console.log("hi children");
    var myUrl = 'data.json';
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: proxy + myUrl,
        complete:function(data) {
            console.log(data);
        }
    })
})