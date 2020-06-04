$("button#testButton").on("click", showAllCountries());

// async function showAllCountries() {
//     await $.get('/countries', function(response) {
//         var countries = JSON.parse(response);

//         function x(d) { return d.data.income_per_person_gdppercapita_ppp_inflation_adjusted; }

//         function y(d) { return d.data.military_expenditure_percent_of_gdp; }

//         function radius(d) { return d.data.population_total; }

//         function color(d) { return "red"; }

//         function key(d) { return d.data.name; }

//         function position(dot) {
//             dot.attr("cx", function(d) { return xScale(x(d)); })
//                 .attr("cy", function(d) { return yScale(y(d)); })
//                 .attr("r", function(d) { return radiusScale(radius(d)); });
//         }

//         function interpolateData(year) {
//             return countries.map(function(d) {
//                 return {
//                     name: d.name,
//                     income: interpolateValues(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted, year),
//                     population: interpolateValues(d.data.population_total, year),
//                     militaryExpenditure: interpolateValues(d.data.military_expenditure_percent_of_gdp, year)
//                 };
//             });
//         }
//         var bisect = d3.bisector(function(d) { return d[0]; });

//         // Finds (and possibly interpolates) the value for the specified year.
//         function interpolateValues(values, year) {
//             var i = bisect.left(Object.values(values), year, 0, Object.values(values).length - 1);
//             var a = values[i];
//             console.log(Object.keys(values[i]));
//             if (i > 0) {
//                 var b = values[i - 1],
//                     t = (year - a[0]) / (b[0] - a[0]);
//                 return a[1] * (1 - t) + b[1] * t;
//             }
//             return a[1];
//         }

//         function order(a, b) { return radius(b) - radius(a); }
//         var margin = { top: 19.5, right: 19.5, bottom: 19.5, left: 39.5 },
//             width = 960 - margin.right,
//             height = 500 - margin.top - margin.bottom;

//         // Various scales. These domains make assumptions of data, naturally.
//         var xScale = d3.scaleLog().domain([300, 1e5]).range([0, width]),
//             yScale = d3.scaleLinear().domain([10, 85]).range([height, 0]),
//             radiusScale = d3.scaleSqrt().domain([0, 5e8]).range([0, 40]);

//         // The x & y axes.
//         // var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(12, d3.format(",d"));
//         // var yAxis = d3.svg.axis().scale(yScale).orient("left");

//         // Create the SVG container and set the origin.
//         var svg = d3.select("#vis").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         // Add the x-axis.
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(xScale));

//         // Add the y-axis.
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(d3.axisLeft(yScale));

//         // Add an x-axis label.
//         svg.append("text")
//             .attr("class", "x label")
//             .attr("text-anchor", "end")
//             .attr("x", width)
//             .attr("y", height - 6)
//             .text("income per capita, inflation-adjusted (dollars)");

//         // Add a y-axis label.
//         svg.append("text")
//             .attr("class", "y label")
//             .attr("text-anchor", "end")
//             .attr("y", 6)
//             .attr("dy", ".75em")
//             .attr("transform", "rotate(-90)")
//             .text("military expenditure (percent of gdp)");

//         // Add the year label; the value is set on transition.
//         var label = svg.append("text")
//             .attr("class", "year label")
//             .attr("text-anchor", "end")
//             .attr("y", height - 24)
//             .attr("x", width)
//             .text(1800);
//         var format = d3.format(".2s");
//         // var tip = d3.tip()
//         //     .attr('class', 'd3-tip')
//         //     .direction('s')
//         //     .html(function(d) {
//         //         return "<p><strong>" + d.name + "</strong></p><p><strong>Population: </strong>" + format(d.population) + "</p>";
//         //     })

//         // Add a dot per nation. Initialize the data at 1800, and set the colors.
//         var dot = svg.append("g")
//             // .call(tip)
//             .attr("class", "dots")
//             .selectAll(".dot")
//             .data(interpolateData(1800))
//             .enter().append("circle")
//             // .on('mouseover', tip.show)
//             // .on('mouseout', tip.hide)
//             .attr("class", function(d) { return "dot " + d.data.name; })
//             .style("fill", function(d) { return "red"; })
//             .call(position)
//             .sort(order);

//     }).fail(function() {
//         console.log("Countries not loaded");
//     }).always(function() {
//         console.log("this is printed no matter what");
//     });
// }


// async function showAllCountries() {
//     await $.get('/countries', function(response) {
//         var countries = JSON.parse(response);
//         console.log(countries[0].data.population_total["1800"])
//         console.log(countries);
//         // let leng = Object.keys(countries[0].data.income_per_person_gdppercapita_ppp_inflation_adjusted).length;
//         // console.log(Object.keys(countries[0].data.income_per_person_gdppercapita_ppp_inflation_adjusted)[leng - 1]);

//         // var g = d3.select("svg")
//         //     .selectAll("g")
//         //     .data(countries)
//         //     .attr("height", 500);


//         // var x = d3.scaleLinear()
//         //     .domain([0, 100])
//         //     .range([100, 800]);
//         // // x.domain(d3.extent(countries, function(d) { return d.year; }));
//         // // y.domain([0, d3.max(countries, function(d) { return d.population_total; })]);

//         // g.append("g")
//         //     .attr("transform", "translate(0,50)")
//         //     .call(d3.axisBottom(x));
//         var g = d3.select("#vis")
//             .selectAll("g")
//             .attr("width", 1000)
//             .data(countries);


//         var margin = { top: 10, right: 15, bottom: 40, left: 40 },
//             width = 1000 - margin.left - margin.right,
//             height = 750 - margin.top - margin.bottom;

//         // create svg element, respecting margins
//         var svg = d3.select("#vis")
//             .append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform",
//                 "translate(" + margin.left + "," + margin.top + ")");

//         // Add X axis
//         var x = d3.scaleLinear().domain([0, 100000]).range([0, width]);
//         svg
//             .append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));

//         // Add Y axis
//         var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
//         svg
//             .append("g")
//             .call(d3.axisLeft(y));

//         // Add X axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("x", width)
//             .attr("y", height + margin.top + 20)
//             .text("X axis title");

//         // Y axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("transform", "rotate(-90)")
//             .attr("y", -margin.left + 20)
//             .attr("x", -margin.top)
//             .text("Y axis title")


//         // create new 'g' elements for each country
//         var en = g.enter().append("g")
//             .attr("transform", function(d) {
//                 return "translate(" + 500 + "," + 320 + ")"
//             });

//         // // // add a circle to each 'g'
//         var circle = en.append("circle")
//             .attr("r", function(d) { return 25; })
//             .attr("fill", function(d, i) { return i % 2 == 0 ? "red" : "blue" })
//             .enter();

//         // // add a text to each 'g'
//         // en.append("text").text(function(d) { return d.name });

//     }).fail(function() {
//         console.log("Countries not loaded");
//     }).always(function() {
//         console.log("this is printed no matter what");
//     });
// }


// function chart() {
//     const svg = d3.create("svg")
//         .attr("viewBox", [0, 0, width, height]);

//     svg.append("g")
//         .call(xAxis);

//     svg.append("g")
//         .call(yAxis);

//     svg.append("g")
//         .call(grid);

//     const circle = svg.append("g")
//         .attr("stroke", "black")
//         .selectAll("circle")
//         .data(dataAt(1800), d => d.name)
//         .join("circle")
//         .sort((a, b) => d3.descending(a.population, b.population))
//         .attr("cx", d => x(d.income))
//         .attr("cy", d => y(d.lifeExpectancy))
//         .attr("r", d => radius(d.population))
//         .attr("fill", d => color(d.region))
//         .call(circle => circle.append("title")
//             .text(d => [d.name, d.region].join("\n")));

//     return Object.assign(svg.node(), {
//         update(data) {
//             circle.data(data, d => d.name)
//                 .sort((a, b) => d3.descending(a.population, b.population))
//                 .attr("cx", d => x(d.income))
//                 .attr("cy", d => y(d.lifeExpectancy))
//                 .attr("r", d => radius(d.population));
//         }
//     });
// }

// function showAllCountries() {
//     $.get('/countries', function(response) {
//         var countries = JSON.parse(response);
//         console.log(response);
//         console.log(countries);


//         var currentData = dataAt(year);
//         chart.update(currentData);
//         var margin = ({ top: 20, right: 20, bottom: 35, left: 40 });
//         var radius = d3.scaleSqrt([0, 5e8], [0, width / 24]);
//         var width, height = 560;

//         var y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top]);
//         var x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right]);

//         const circle = svg.append("g")
//             .attr("stroke", "black")
//             .selectAll("circle")
//             .data(dataAt(1800), countries => countries.name)
//             .join("circle")
//             .sort((a, b) => d3.descending(a.population_total, b.population_total))
//             .attr("cx", d => x(d.income_per_person_gdppercapita_ppp_inflation_adjusted))
//             .attr("cy", d => y(d.military_expenditure_percent_of_gdp))
//             .attr("r", d => radius(d.population_total))
//             .attr("fill", d => color('red'))
//             .call(circle => circle.append("title")
//                 .text(d => d.name));

//         grid = g => g
//             .attr("stroke", "currentColor")
//             .attr("stroke-opacity", 0.1)
//             .call(g => g.append("g")
//                 .selectAll("line")
//                 .data(x.ticks())
//                 .join("line")
//                 .attr("x1", d => 0.5 + x(d))
//                 .attr("x2", d => 0.5 + x(d))
//                 .attr("y1", margin.top)
//                 .attr("y2", height - margin.bottom))
//             .call(g => g.append("g")
//                 .selectAll("line")
//                 .data(y.ticks())
//                 .join("line")
//                 .attr("y1", d => 0.5 + y(d))
//                 .attr("y2", d => 0.5 + y(d))
//                 .attr("x1", margin.left)
//                 .attr("x2", width - margin.right));

//         yAxis = g => g
//             .attr("transform", `translate(${margin.left},0)`)
//             .call(d3.axisLeft(y))
//             .call(g => g.select(".domain").remove())
//             .call(g => g.append("text")
//                 .attr("x", -margin.left)
//                 .attr("y", 10)
//                 .attr("fill", "currentColor")
//                 .attr("text-anchor", "start")
//                 .text("↑ Military expenditure (million)"));

//         xAxis = g => g
//             .attr("transform", `translate(0,${height - margin.bottom})`)
//             .call(d3.axisBottom(x).ticks(width / 80, ","))
//             .call(g => g.select(".domain").remove())
//             .call(g => g.append("text")
//                 .attr("x", width)
//                 .attr("y", margin.bottom - 4)
//                 .attr("fill", "currentColor")
//                 .attr("text-anchor", "end")
//                 .text("Income per capita (dollars) →"));

//         const svg = d3.create("svg").attr("viewBox", [0, 0, 560, 560]);
//         svg.append("g")
//             .call(xAxis);

//         svg.append("g")
//             .call(yAxis);

//         svg.append("g")
//             .call(grid);

//         var g = d3.select("svg").selectAll("g").data(countries);

//         // create new 'g' elements for each country
//         var en = g.enter().append("g")
//             .filter(function(d) { return d.data["income_per_person_gdppercapita_ppp_inflation_adjusted"] })
//             .attr("transform", function(d) {
//                 return "translate(" + (Math.random() * 1000) + 40 + "," + (Math.random() * 1000) + 40 + ")"
//             });

//         // add a circle to each 'g'
//         var circle = en.append("circle")
//             .attr("r", function(d) { return Math.random() * 20 })
//             .attr("fill", function(d, i) { return i % 2 == 0 ? "red" : "blue" });

//         // add a text to each 'g'
//         en.append("text").text(function(d) { return d.name });

//     }).fail(function() {
//         console.log("Countries not loaded");
//     }).always(function() {
//         console.log("this is printed no matter what");
//     });
// }

async function showAllCountries() {
    try {
        let response = await fetch('/countries');
        let result = await response.json();

        
    }
    catch(e) {
        console.error(e);
    }
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