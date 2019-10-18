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

    // $("#myInput").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     $("#myTable tr").filter(function() {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    // });
    

    var current;
    $(document).on("click", "td", function(e) {
        if(current !== $(this) && current != null) {
            //set row
            var $r = current.closest('tr');
            var row = $r.attr('id');
            var arr = [];
            $r.each(function(e) {
                var x = $(this).children();
                var isFirst = true;
                x.each(function() {
                    if(isFirst) {
                        isFirst = false;
                    } else {
                        arr.push($(this).text());
                    }
                });
            });

            json[row].firstname = arr[0];
            json[row].lastname = arr[1];
            json[row].email = arr[2];
            json[row].location = arr[3].toLowerCase();
            json[row].phone = arr[4];
            json[row].address["communication"] = arr[5];
            json[row].address["permanent"] = arr[6];
            json[row].marks["english"] = arr[7];
            json[row].marks["science"] = arr[8];
            json[row].marks["computers"] = arr[9];
            json[row].marks["hardware"] = arr[10];
        }
        if($(this).attr("contentEditable") == true){
            $(this).attr("contentEditable","false");
        } else {
            $(this).attr("contentEditable","true");
            current = $(this);
        }
    });
});

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = $("myInput");
    filter = input.val().toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
function formBtn() {
    var fn = $('#FNInput').val() + "";
    var ln = $('#LNInput').val()  + "";
    var e = $('#EInput').val() + "";
    var l = $('#LInput').val() + "";
    var p = $('#PInput').val() + "";
    var c = $('#CInput').val() + "";
    var per = $('#PerInput').val() + "";
    var eng = $('#EngInput').val() + "";
    var s = $('#SInput').val() + "";
    var comp = $('#CompInput').val() + "";
    var hard = $('#HardInput').val() + "";
    var pars = JSON.parse('{"firstname":"'+fn+'","lastname":"'+ln+'","email":"'+e+'","location":"'+l+'","phone":"'+p+'","address":{"communication":"'+c+'","permanent":"'+per+'"},"marks":{"english":"'+eng+'","science":"'+s+'","computers":"'+comp+'","hardware":"'+hard+'"}}');
    json.push(pars);
}

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
            str += data[i].location[j];
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