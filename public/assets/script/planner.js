$(document).ready(function() {

  // CREATE NEW ITEM
  $('#newItemSubmit').on('click', function(event) {
    event.preventDefault();
    let newItem = {
      plan: $('#itemInput').val().trim(),
      in_table: false
    };
    $.ajax('/plans', {
      type: 'POST',
      data: JSON.stringify(newItem),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function() {
      console.log('created new item');
      location.reload();
    });
    console.log(newItem);
  });

});