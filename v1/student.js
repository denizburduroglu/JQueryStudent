var json;
var page = [];
var rowNum;

$(document).ready(function() {
    $.when($.ajax({
        dataType: 'json',
        url: 'data.json',
        success: function(data) {
            json = data;
        }
    })).done(function() {
        console.log("finished loading");
        rowNum = $('#recordNum').val();
        console.log(rowNum);

        for(var i = 0; i < rowNum; i++) {
            page.push(json[i]);
        }

        loadData(page);
        
    });
    
    //Load data whenever rowNum changes
    $('#recordNum').change(function() {
        rowNum = $('#recordNum').val();
        page = [];
        for(var i = 0; i < rowNum; i++) {
            page.push(json[i]);
        }
        console.log(page);
        loadData(page);
    })
    
});

function showRow(i) {
    console.log("Show row: " + i);
    
}

function editRow(i) {
    console.log("Edit row: " + i);
    console.log(page[i].firstname);
    var tdChildren = $("#"+ i).children();
    
    tdChildren[0].attr("contenteditable", "true");
    // 



}

function deleteRow(i) {
    console.log("Delete row: " + i);
}


function loadData(data) {
    
    $('.dataTable').DataTable({
        dom: "Bfrtip",
        columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            { data: "first_name" },
            { data: "last_name" },
            { data: "position" },
            { data: "office" },
            { data: "start_date" },
            { data: "first_name" },
            { data: "last_name" },
            { data: "position" },
            { data: "office" },
            { data: "start_date" }
        ],
        select: {
            style: 'os',
            selector: 'td:first-child'
        }
        // buttons: [
        //     { extend: "create", editor:editor },
        //     { extend: "edit", editor: editor },
        //     { extend: "remove", editor: editor}
        // ]
    });
    // var str = "";
    // for(let i = 0; i < data.length; i++) {
    //     //add fn, ln, email
    //     str += "<tr id='" + i + "'>" + "<td>" + data[i].firstname + "</td>" 
    //     + "<td>" + data[i].lastname + "</td>"
    //     + "<td>" + data[i].email + "</td>" 
    //     + "<td>";
    //     //add location with space
    //     for(let j = 0; j < data[i].location.length; j++) {
    //         str += data[i].location[j] + " ";
    //     }
    //     //phone
    //     str += "</td>" 
    //     + "<td>" + data[i].phone + "</td>";
    //     // for in will get index, or in this case, the keys of the object to be used to get values
    //     for(let s in data[i].address) {
    //         str += '<td>' + data[i].address[s] + '</td>';
    //     }
    //     //same case, for in will get keys, then use to get values
    //     for(let s in data[i].marks) {
    //         str += '<td>' + data[i].marks[s] + '</td>';
    //     }

    //     //Once data is compiled add buttons


    //     //END
    //     str += "</tr>";
    // }

    // //console.log(str);

    // $('.dataTable').append(str);
    
}