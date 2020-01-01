$(function() {
    $.ajax("/plans", {
        type: "GET"
    }).then(function (data) {
        // organize data onto page
        // grab all table divs
    });

    $("#addTable").on("click", function (event) {
        // add new div for table
        // for loop for each table to have an individual id

        var content = $("#content");
        var newTable = "<div class='itemTable'>"
        newTable += "<div class='tableHead'><button class='modify'>&#9998;</button>"
        newTable += "<button class='delete'>&#215;</button><p class='modifyThis'>Table Name</p></div>"
        newTable += "<div class='itemsArea'></div>"
        newTable += "<button class='addItem'>&#43;</button></div>";

       

        content.append(newTable);
        // reload location
    });

    $(document).on("click", ".addItem", function (event) {
        var table = $(".itemsArea"); // change to append to individual table id, not class
        var newItem = "<div class='item'><button class='modify'>&#9998;</button>"
        newItem += "<button class='delete'>&#215;</button>";
        newItem += "<p class='modifyThis'>Item name/description</p></div>"
        
        
        table.append(newItem);
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
//   $('.addItem').on('click', function(event) {
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
