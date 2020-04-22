$.get('countries', function() {
    console.log("Countries loaded");
}).fail(function() {
    console.log("Countries not loaded");
}).always(function() {
    console.log("this is printed no matter what");
});

$.get('countries/<country_id>', function() {
    console.log("Country found");
}).fail(function() {
    console.log("Country not found");
}).always(function() {
    console.log("this is printed no matter what");
});