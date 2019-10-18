var json;
var page = [];
var rowNum;
var edit
$(document).ready(function(){
    $.when($.ajax({
        dataType: 'json',
        url: 'data.json',
        success: function(data) {
            json = data;
        }
    })).done(function() {
        //console.log("finished loading");
        rowNum = $('#recordNum').val();
        //console.log(rowNum);

        for(var i = 0; i < rowNum; i++) {
            page.push(json[i]);
        }

        loadData(page);
        hide();
        //console.log(page);
    });

    //Load data whenever rowNum changes
    $('#recordNum').change(function() {
        rowNum = $('#recordNum').val();
        page = [];
        for(var i = 0; i < rowNum; i++) {
            page.push(json[i]);
        }
        //console.log(page);
        loadData(page);
        hide();
    })


    var current;
    $(document).on("click", "td", function(e) {
        if(current !== $(this) && current != null) {
            //set value
            var val = current.html();
            var regex = /(\d+)/;
            var result = regex.exec(current.attr("id"));
            var row = result[0];
            regex = /([A-z]+)/;
            result = regex.exec(current.attr("id"));
            var key = result[0];
            [
                {
                    "firstname" : "Stephan",
                    "lastname" : "Yu",
                    "email" : "stephan@itlize.com",
                    "location" : ,
                    "phone" : "2021231234",
                    "address" : {
                        "communication": "Itlize, Piscataway, New Jersey",
                        "permanent" : "China"
                    },
                    "marks" : {
                        "english" : "70",
                        "science" : "80",
                        "computers" : "90",
                        "hardware" : "80"
                    }
                }
            ]
        
            console.log(json[row].p);
        }
        if($(this).attr("contentEditable") == true){
            $(this).attr("contentEditable","false");
        } else {
            $(this).attr("contentEditable","true");
            current = $(this);
        }
    });
});

function hide() {
    $('td:nth-child(n+9):nth-child(-n+12)').hide();
    $('.marks').hide();
}
function showMore() {
    $('td:nth-child(n+9):nth-child(-n+12)').toggle();
    $('.marks').toggle();
}

function deleteRow() {
    for(let i = 0; i < page.length; i++) {
        if($('#cb'+ i).is(':checked')) {
            $('#'+i).remove();
            json.splice(i, 1);
        }
    }
}

function editValues() {
    console.log("edit values");
}

function loadData(data) {
    var str = "";
    for(let i = 0; i < data.length; i++) {
        //add fn, ln, email
        str += "<tr id='" + i + "'>";
        str += "<td><input type='checkbox' id='cb"+ i + "'/></td>"
        + "<td id='firstname" + i + "'>" + data[i].firstname + "</td>" 
        + "<td id='lastname" + i + "'>" + data[i].lastname + "</td>"
        + "<td id='email" + i +"'>" + data[i].email + "</td>" 
        + "<td id='location" + i + "'>";
        //add location with space
        for(let j = 0; j < data[i].location.length; j++) {
            str += data[i].location[j] + " ";
        }
        //phone
        str += "</td>" 
        + "<td id='phone" + i + "'>" + data[i].phone + "</td>";
        // for in will get index, or in this case, the keys of the object to be used to get values

        for(let s in data[i].address) {
            str += "<td id='" + s + i + "'>" + data[i].address[s] + "</td>";
        }
        //same case, for in will get keys, then use to get values
        for(let s in data[i].marks) {
            str += "<td id='" + s + i + "'>" + data[i].marks[s] + "</td>";
        }

        //END
        str += "</tr>";
    }

    //console.log(str);
    $('#dataTable').empty();
    $('#dataTable').append(str);
    
}