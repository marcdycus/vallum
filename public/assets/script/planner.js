// APPEND EXISTING TABLES
$(function () {
    $.ajax("/tables", {
        type: "GET"
    }).then(function (data) {
        // organize data onto page
        // var allTables = $(".itemTable");
        var content = $("#content");
        var tables = data.tables;
        var len = tables.length;

        for (let i = 0; i < len; i++) {
            var newTable = "<div class='itemTable' data-tableID=" + tables[i].tableId + " style='background-color:" + tables[i].color_code + ";'"
            newTable += "><div class='tableHead'><button class='modify-table' modifyId=" + tables[i].tableId + " data-toggle='modal' data-target='#tableEditor'>&#9998;</button>"
            newTable += "<button class='delete-table' deleteId=" + tables[i].tableId + ">&#215;</button><p class='modifyThis'>" + tables[i].title + "</p></div>"
            newTable += "<div id='droptarget' class='itemsArea'></div>"
            newTable += "<button class='addItem' addId=" + tables[i].tableId + ">&#43;</button><button data-grabId=" + tables[i].tableId + " class='expand'>&#8675;</button></div>";
            content.append(newTable);
        }

        // grab all table divs
    });

    $(document).on("click", ".expand", function (event) {
        event.preventDefault();
        var id = $(this).attr("data-grabId");
        var appendArea = $(this).siblings(".itemsArea");
        console.log(appendArea);
            $.ajax("/plans/", {
                type: "GET"
            }).then(function (data) {
                var plans = data.plans;
                var allPlans = plans.length;
                for (let j = 0; j < allPlans; j++) {
                    if (plans[j].tableId == id) {
                    var newItem = "<div id='dragtarget' draggable='true' class='item' data-planid=" + plans[j].planId + " data-tableId=" + plans[j].tableId + " style='background-color:" + plans[j].color_code + "'><button class='modify-item' tableId=" + plans[j].tableId + " modifyId=" + plans[j].planId + " data-toggle='modal' data-target='#itemEditor'>&#9998;</button>"
                    newItem += "<button delete-id=" + plans[j].planId + " class='delete-item'>&#215;</button>";
                    newItem += "<p class='modifyThis' tableId=" + plans[j].tableId + " modifyId=" + plans[j].planId + ">" + plans[j].plan + "</p><p>" + plans[j].description + "</p></div>";
                    $(appendArea).append(newItem);
                    }
                }
            });
        });

    // ADD NEW TABLES
    $("#addTable").on("click", function (event) {
        event.preventDefault();

        var newTableData = {
            title: 'Choose a plan title!',
        };

        $.ajax("/tables", {
            type: "POST",
            data: JSON.stringify(newTableData),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("added new item with id ", newTableData);

            location.reload();

        });
    });

    $(document).on("click", ".addItem", function (event) {
        // var table = $(".itemsArea");
        var parentId = $(this).parent().attr("data-tableid"); // change to append to individual table id, not class
        // var newItem = "<div class='item'><button class='modify'>&#9998;</button>"
        // newItem += "<button class='delete'>&#215;</button>";
        // newItem += "<p class='modifyThis'>Item name/description</p></div>"

        var newPlanData = {
            plan: 'Plan title',
            description: 'description goes here',
            tableId: parentId
        }

        $.ajax("/plans/", {
            type: "POST",
            data: JSON.stringify(newPlanData),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("added new item with id ", parentId);
            location.reload();
        });

        // console.log(tableId);
        // table.append(newItem);
    });

    $(document).on("click", ".delete-table", function (event) {
        // delete either the individual, or the whole table
        var idToDelete = $(this).attr("deleteId");
        console.log(idToDelete);

        $.ajax("/tables/" + idToDelete, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted id ", idToDelete);
            location.reload();
        })
    });

    $(document).on("click", ".delete-item", function (event) {
        // delete either the individual, or the whole table
        var idToDelete = $(this).attr("delete-id");
        console.log(idToDelete);

        $.ajax("/plans/" + idToDelete, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted id ", idToDelete);
            location.reload();
        })
    });

    // OPEN MODAL
    $(document).on("click", ".modify-table", function (event) {

        var tableId = $(this).attr("modifyId");
        var saveButton = $("#saveTable");

        saveButton.attr("tableId", tableId);

        $("#tableEditor").show();

    });

    $(document).on("click", ".modify-item", function (event) {

        var itemId = $(this).attr("modifyId");
        var tableId = parseInt($(this).attr("tableId"));
        console.log(tableId);
        var saveButton = $("#saveItem");

        saveButton.attr("itemId", itemId);
        saveButton.attr("tableId", tableId)
        $("#itemEditor").show();
    });

    // CLOSE MODAL
    $(document).on("click", ".close", function (event) {
        $("#tableEditor").hide();
    });

    // UPDATE TABLE NAME and COLOR
    $(document).on("click", "#saveTable", function (event) {
        event.preventDefault();

        var tableId = $(this).attr("tableId");
        var titleInput = $("#editTitle").val().trim();
        var colorChoice = $("input[name='inlineRadioOptions']:checked").val();
        console.log(colorChoice);
        var colorCode;

        switch (colorChoice) {
            case "option1":
                colorCode = "#e7717d";
                break;
            case "option2":
                colorCode = "#c2cad0";
                break;
            case "option3":
                colorCode = "#c2b920";
                break;
            case "option4":
                colorCode = "#7e685a";
                break;
            case "option5":
                colorCode = "#afd275";
                break;
            case "option6":
                colorCode = "#66fcf1";
                break;
            case "option7":
                colorCode = "#123c69";
                break;
            case "option8":
                colorCode = "#ffcb9a";
                break;
            default:
                colorCode = "white";
        }
        console.log(colorCode);

        var updatedTable = {
            title: titleInput,
            color_code: colorCode
        };

        $.ajax("/tables/" + tableId, {
            type: "PUT",
            data: JSON.stringify(updatedTable),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("updated tableId ", tableId);
            location.reload();
        })
    });

    $(document).on("click", "#saveItem", function (event) {
        event.preventDefault();

        var planId = $(this).attr("itemId");
        var tableId = $(this).attr("tableId");
        var plan = $("#editItemTitle").val().trim();
        var description = $("#editDescription").val().trim();
        var colorChoice = $("input[name='inlineRadioOptions']:checked").val();
        var colorCode;
        console.log(this);
        switch (colorChoice) {
            case "option1":
                colorCode = "#e7717d";
                break;
            case "option2":
                colorCode = "#c2cad0";
                break;
            case "option3":
                colorCode = "#c2b920";
                break;
            case "option4":
                colorCode = "#7e685a";
                break;
            case "option5":
                colorCode = "#afd275";
                break;
            case "option6":
                colorCode = "#66fcf1";
                break;
            case "option7":
                colorCode = "#123c69";
                break;
            case "option8":
                colorCode = "#ffcb9a";
                break;
            default:
                colorCode = "white";
        }
        // console.log(colorCode);

        var updatedPlan = {
            plan: plan,
            description: description,
            tableId: tableId,
            color_code: colorCode
        };

        $.ajax("/plans/" + planId, {
            type: "PUT",
            data: JSON.stringify(updatedPlan),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("updated planId ", planId);
            location.reload();
        });
    });


    document.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("Text", event.target.id);
        event.dataTransfer.setData("tableId", $(event.target).data("tableid"));
        event.dataTransfer.setData("planId", $(event.target).data("planid"));
        event.dataTransfer.setData("colorCode", $(event.target).data("[style='background-color]"));
        
    });
    document.addEventListener("dragover", function (event) {
        // console.log("hello2");
        event.preventDefault();
        // console.log(event.target);
        // if (event.target == $(event.target).attr('.itemsArea')) {
        // console.log("yes");
        // }
    });

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        var targetId = $(event.target).parent().attr("data-tableid");


        
        var elemId = event.dataTransfer.getData("Text");
        var planId = event.dataTransfer.getData("planId");
        var colorCode = event.dataTransfer.getData("colorCode");

        var newId;
        
        if (event.target.id == "droptarget") {
            newId = parseInt(targetId);

            event.target.appendChild(document.getElementById(elemId));

           
            newTableId = {
                plan: 'test1',
                description: 'test2',
                tableId: newId,
                color_code: colorCode
            };
            // console.log(targetId);
            // console.log(thisId);
            $.ajax("/plans/" + planId, {
                type: "PUT",
                data: JSON.stringify(newTableId),
                dataType: 'json',
                contentType: 'application/json'
            }).then(function() {
                // location.reload();
            }); 
        }

    });

    // DELETE TABLE
    $(document).on("click", ".delete", function (event) {
        // delete either the individual, or the whole table
        var idToDelete = $(this).attr("deleteId");
        console.log(idToDelete);

        $.ajax("/tables/" + idToDelete, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted id ", idToDelete);
            location.reload();
        })
    });

    // MODAL TO CONFIRM DELETION
    $(document).on("click", "#deletePage", function (event) {
        // pop up model asking to confirm if you are sure
        $("#deleteAll").show();
        // deletes whole page 
        // appends link to that page ??
    });


    // DELETE EVERYTHING
    // $("#confirmDelete").on("click", function() {
    //     $.ajax("/tables", {
    //         type: "DELETE"
    //     }).then(function() {
    //         console.log("deleted all records");
    //         location.reload();
    //     })
    // });

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

// $(function () {
//     $.ajax("/tables", {
//         type: "GET"
//     }).then(function (data) {
//         // organize data onto page
//         var content = $("#content");
//         var tables = data.tables;
//         var len = tables.length;
//         for (let i = 0; i < len; i++) {
//             var appendArea = $(".itemsArea");
//             var newTable = "<div class='itemTable' data-tableid=" + tables[i].tableId
//             newTable += "><div class='tableHead'><button class='modify'>&#9998;</button>"
//             newTable += "<button class='delete'>&#215;</button><p class='modifyThis'>this will be modified</p></div>"
//             newTable += "<div class='itemsArea' data-appendId=" + tables[i].tableId + "></div>"
//             newTable += "<button class='addItem'>&#43;</button><button class='expand'>&#8675;</button></div>";
//             content.append(newTable);
//             $.ajax("/plans/", {
//                 type: "GET"
//             }).then(function (data) {
//                 // console.log(id);
//                 var plans = data.plans;
//                 var allPlans = plans.length;
//                 for (let j = 0; j < allPlans; j++) {
//                     if (plans[j].tableId === tables[i].tableId) {
//                     console.log(plans[j]);
//                     // var newItem = "<div class='item' data-planid=" + plans[j].planId + " data-tableid=" + plans[j].tableId + "><p>hello</p></div>";
//                     var newItem = "<div class='item' data-planid=" + plans[j].planId + " data-tableId=" + plans[j].tableId + "><button class='modify'>&#9998;</button>"
//                     newItem += "<button class='delete'>&#215;</button>";
//                     newItem += "<p class='modifyThis'>Item name/description</p></div>"
//                     plans[j].append(newItem);
//                     }
//                     // location.reload();
//                 }
//                 // console.log(plans);
//             });