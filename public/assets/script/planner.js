function colorBtn(colorCode) {
    var colorChoice;
    if (colorCode === "white") {
        $("input").prop("checked", false);
    }
    else {
        switch (colorCode) {
            case "#e7717d":
                colorChoice = "option1";
                break;
            case "#c2cad0":
                colorChoice = "option2";
                break;
            case "#c2b920":
                colorChoice = "option3";
                break;
            case "#7e685a":
                colorChoice = "option4";
                break;
            case "#afd275":
                colorChoice = "option5";
                break;
            case "#66fcf1":
                colorChoice = "option6";
                break;
            case "#123c69":
                colorChoice = "option7";
                break;
            case "#ffcb9a":
                colorChoice = "option8";
                break;
        }
        $("input[value=" + colorChoice).prop("checked", true);
    }
}

function updateColor(colorChoice) {
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
    return colorCode;
}

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
        $(this).removeClass("expand");
        $(this).addClass("collapseButton");
        $(this).html('\u21E1');
        $.ajax("/plans/", {
            type: "GET"
        }).then(function (data) {
            var plans = data.plans;
            var allPlans = plans.length;
            for (let j = 0; j < allPlans; j++) {
                if (plans[j].tableId == id) {
                    var newItem = "<div id='dragtarget' data-description=" + plans[j].description + " data-plan=" + plans[j].plan + " draggable='true' class='item' data-planid=" + plans[j].planId + " data-tableId=" + plans[j].tableId + " style='background-color:" + plans[j].color_code + "'><button class='modify-item' tableId=" + plans[j].tableId + " modifyId=" + plans[j].planId + " data-toggle='modal' data-target='#itemEditor'>&#9998;</button>"
                    newItem += "<button delete-id=" + plans[j].planId + " class='delete-item'>&#215;</button>";
                    newItem += "<p class='plan' tableId=" + plans[j].tableId + " modifyId=" + plans[j].planId + ">" + plans[j].plan + "</p><p class='description' planId=" + plans[j].planId + " >" + plans[j].description + "</p></div>";
                    $(appendArea).append(newItem);
                }
            }
        });
    });

    $(document).on("click", ".collapseButton", function(event) {
        event.preventDefault();
        $(this).removeClass("collapseButton");
        $(this).addClass("expand");
        $(this).html('\u21E3');
        var plans = $(this).siblings(".itemsArea");
        $(plans).empty();
    });


    $.ajax("/colors", {
        type: "GET"
    }).then(function(data) {

       
        var bodyDiv = $(document).find('body');
        var body = data.colors[0].body;

        var headerDiv = $(document).find('header');
        var header = data.colors[0].header;
        
        var title = data.colors[0].title;
        var titleDiv = $(document).find("#title");

        var buttons = data.colors[0].buttons;
        var buttonsDiv = $(document).find(".buttons");

        $(bodyDiv[0]).css("background-color", body);
        $(headerDiv[0]).css("background-color", header); 
        $(titleDiv[0]).css("color", title);
        $(buttonsDiv[0]).css('background-color', buttons);
        $(buttonsDiv[1]).css('background-color', buttons);

    });

    // ADD NEW TABLES
    $("#addTable").on("click", function (event) {
        event.preventDefault();

        var newTableData = {
            title: 'Title',
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
        var parentId = $(this).parent().attr("data-tableid"); // change to append to individual table id, not class
        var newPlanData = {
            plan: 'Plan',
            description: 'description',
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
    });

    $(document).on("click", ".delete-table", function (event) {
        var idToDelete = $(this).attr("deleteId");

        $.ajax("/tables/" + idToDelete, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted id ", idToDelete);
            location.reload();
        })
    });

    $(document).on("click", ".delete-item", function (event) {
        var idToDelete = $(this).attr("delete-id");

        $.ajax("/plans/" + idToDelete, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted id ", idToDelete);
            location.reload();
        })
    });

    // OPEN MODAL
    $(document).on("click", ".modify-table", function (event) {

        var id = parseInt($(this).attr("modifyId"));
        var saveButton = $("#saveTable");
        
        saveButton.attr("tableId", id);
         // SHOW EXISTING TABLE DATA IN FORM
        $.ajax("/tables", {
            type: "GET"
        }).then(function (data) {
            var tables = data.tables;
            var len = tables.length;
            for (var i = 0; i < len; i++) {
                if ((tables[i].tableId === id) && (tables[i].title != "Title your list!")) {
                    $("#editTitle").attr("value", tables[i].title);
                    var colorCode = tables[i].color_code;
                    colorBtn(colorCode);
                }
                else if ((tables[i].tableId === id) && (tables[i].title === "Title your list!")) {
                    $("#editTitle").removeAttr("value");
                    $("input").prop("checked", false);
                }
            }
        });

        $("#tableEditor").show();

    });

    $(document).on("click", ".modify-item", function (event) {

        var itemId = parseInt($(this).attr("modifyId"));
        var tableId = parseInt($(this).attr("tableId"));
        var saveButton = $("#saveItem");

        saveButton.attr("itemId", itemId);
        saveButton.attr("tableId", tableId);
        $.ajax("/plans", {
            type: "GET"
        }).then(function (data) {
            var plans = data.plans;
            var len = plans.length;
            for (var i = 0; i < len; i++) {
                if ((plans[i].planId === itemId) && (plans[i].plan != "Plan title")) {
                    $("#editItemTitle").attr("value", plans[i].plan);
                    $("#editDescription").attr("value", plans[i].description);
                    var colorCode = plans[i].color_code;
                    colorBtn(colorCode);
                }
                else if ((plans[i].planId === itemId) && (plans[i].plan === "Plan title")) {
                    $("#editItemTitle").removeAttr("value");
                    $("#editDescription").removeAttr("value");
                    $("input").prop("checked", false);
                }
            }

            if (planTitle != "Plan title") {
                $("#editItemTitle").attr("value", planTitle);
            }
        });
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
        var colorCode = updateColor(colorChoice);

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
        var colorCode = updateColor(colorChoice);
        
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
        event.dataTransfer.setData("color-code", $(event.target).css('background-color'));
        event.dataTransfer.setData("plan", $(event.target).find(".plan").text());
        event.dataTransfer.setData("description", $(event.target).find(".description").text());

    });
    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        var targetId = $(event.target).parent().attr("data-tableid");
        var elemId = event.dataTransfer.getData("Text");
        var planId = event.dataTransfer.getData("planId");
        var colorCode = event.dataTransfer.getData("color-code");
        var plan = event.dataTransfer.getData("plan");
        var description = event.dataTransfer.getData("description");

        var newId;

        if (event.target.id == "droptarget") {
            newId = parseInt(targetId);

            event.target.appendChild(document.getElementById(elemId));

            newTableId = {
                plan: plan,
                description: description,
                tableId: newId,
                color_code: colorCode
            };
            $.ajax("/plans/" + planId, {
                type: "PUT",
                data: JSON.stringify(newTableId),
                dataType: 'json',
                contentType: 'application/json'
            }).then(function () {
                // location.reload();
            });
        }
    });

    $(document).on("click", "#changeScheme", function(event) {
        $("#schemeEditor").show();
    });

    $(document).on("click", "#saveColors", function (event) {
        event.preventDefault();

        var colorChoice = $("input[name='inlineRadioOptions']:checked").val();
        var header;
        var body;
        var title;
        var buttons;

        switch (colorChoice) {
            case "option1":
                header = "#ffb6b9";
                body = "#fae3d9";
                title = "#bbded6";
                buttons = "#8ac6d1";
                break;
            case "option2":
                header = "#9dab86";
                body = "#e6a157";
                title = "#eb8242";
                buttons = "#c9753d";
                break;
            case "option3":
                header = "#698474";
                body = "#889e81";
                title = "#bac7a7";
                buttons = "#e5e4cc";
                break;
            case "option4":
                header = "#e4f2f0";
                body = "#170a19";
                title = "#70416d";
                buttons = "#99d8d0";
                break;
            case "option5":
                header = "#110133";
                body = "#00918e";
                title = "#4dd599";
                buttons = "#ffdc34";
                break;
            case "option6":
                header = "#dff6f0";
                body = "#46b3e6";
                title = "#4d80e4";
                buttons = "#2e279d";
                break;
            case "option7":
                header = "#bd574e";
                body = "#fa877f";
                title = "#ffad87";
                buttons = "#dedef0";
                break;
            case "option8":
                header = "#9b9b9b";
                body = "#c2c2c2";
                title = "#000000";
                buttons = "#545454";
                break;
            default:
                header = "#293462";
                body = "#00818a";
                title = "#000000";
                buttons = "#FFFFFF";
        }

        var updatedScheme = {
            header: header,
            body: body,
            title: title,
            buttons: buttons
        };

        $.ajax("/colors/" + 1, {
            type: "PUT",
            data: JSON.stringify(updatedScheme),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            location.reload();
        })
    });

});
