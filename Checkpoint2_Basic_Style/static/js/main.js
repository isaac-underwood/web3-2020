$.get('/countries', function() {
    console.log("Countries loaded");
}).fail(function() {
    console.log("Countries not loaded");
}).always(function() {
    console.log("this is printed no matter what");
});

$.get('/countries/<country_name>', function() {
    console.log("Country found");
}).fail(function() {
    console.log("Country not found");
}).always(function() {
    console.log("this is printed no matter what");
});

$.post('/countries/new', function() {
    console.log("Country added");
}).fail(function() {
    console.log("Error country not added")
});

$.ajax('/countries/<country_name>', {
        type: 'PUT',
    })
    .done(function() {
        console.log("Country updated");
    })
    .fail(function() {
        console.log("Error updating country");
    });

$.ajax('/countries/<country_name>', {
        type: 'DELETE',
    })
    .done(function() {
        console.log("Country deleted");
    })
    .fail(function() {
        console.log("Error deleting country");
    });