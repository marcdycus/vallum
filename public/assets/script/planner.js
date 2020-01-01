$(function() {
    $.ajax("/plans", {
        type: "GET"
    }).then(function (data) {
        // organize data onto page
        // grab all table divs
    });

    $("#addTable").on("click", function (event) {
        // add new div for table

        var content = $("#content");
        var newTable = "<div class='itemTable'>"
        newTable += "<div class='tableHead'><button class='modify'>&#9998;</button>"
        newTable += "<p>Table Name</p><button class='delete'>&#215;</button></div>"
        newTable += "<button class='addItem'>&#43;</button></div>";

        content.append(newTable);
        // each table should have buttons
        // to delete and modify and add new item
        // append to content div
        // reload location
    });

    $(document).on("click", ".addItem", function (event) {
        // append to div
    });

    $(document).on("click", ".modify", function (event) {
        // modify [this] text
    });

    document.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("Text", event.target.id);
        event.dataTransfer.setData("burgerId", $(event.target).find("button").data("burgerid"));
        event.dataTransfer.setData("newState", $(event.target).find("button").data("newstate"));
    });
    document.addEventListener("dragover", function (event) {
        console.log("hello2");
        event.preventDefault();
    });

    document.addEventListener("drop", function (event) {
       
        event.preventDefault();
       
        
    });

    $(document).on("click", ".delete", function (event) {
        // delete either the individual, or the whole table
    });

    $(document).on("click", "#delete", function (event) {
        // pop up model asking to confirm if you are sure
        // deletes whole page 
        // appends link to that page ??
    });


});

//   // CREATE NEW ITEM
//   $('#newItemSubmit').on('click', function(event) {
//     event.preventDefault();
//     let newItem = {
//       plan: $('#itemInput').val().trim(),
//       in_table: false
//     };
//     $.ajax('/plans', {
//       type: 'POST',
//       data: JSON.stringify(newItem),
//       dataType: 'json',
//       contentType: 'application/json'
//     }).then(function() {
//       console.log('created new item');
//       location.reload();
//     });
//     console.log(newItem);
//   });
