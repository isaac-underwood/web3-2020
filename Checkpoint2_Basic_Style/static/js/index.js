var threeStooges = ["Joe", "Josh", "Corey"];
$("button#testButton").on("click", function() {
    console.log(threeStooges);
    for (var i = 0; i < threeStooges.length; i++) {
        threeStooges[i] += " is awesome";
    }
    console.log(threeStooges);
});

function showAllCountries() {
    $.get('/countries', function() {
        console.log("Countries loaded");
    }).fail(function() {
        console.log("Countries not loaded");
    }).always(function() {
        console.log("this is printed no matter what");
    });
}

function showCountry(country) {
    $.get('/countries/', country, function() {
        console.log("Country found");
    }).fail(function() {
        console.log("Country not found");
    }).always(function() {
        console.log("this is printed no matter what");
    });
}

function addCountry() {
    $.post('/countries/new', function() {
        console.log("Country added");
    }).fail(function() {
        console.log("Error country not added")
    });
}

function updateCountry(country) {
    $.ajax('/countries/', country, {
        type: 'PUT',
    }).done(function() {
        console.log("Country updated");
    }).fail(function() {
        console.log("Error updating country");
    });
}

function deleteCountry(country) {
    $.ajax('/countries/', country_name, {
        type: 'DELETE',
    }).done(function() {
        console.log("Country deleted");
    }).fail(function() {
        console.log("Error deleting country");
    });
}