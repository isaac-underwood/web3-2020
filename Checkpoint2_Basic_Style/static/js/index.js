$("button#testButton").on("click", showAllCountries());

const margin = { top: 100, right: 40, bottom: 70, left: 250 };

const height = 800 - margin.top - margin.bottom;
const width = 1750 - margin.left - margin.right;

// Get the selected value from y data select element
const ySelect = document.getElementById("y-data-select");
let yData = ySelect.value;
let yDataNiceName = ySelect.options[ySelect.selectedIndex].text; // The text value of option - used for axis label

const startYear = "1985"; // A lot of data only starts at around 1985 for my chosen files

// Formats a number making it readable
const formatComma = d3.format(",");

// Returns population for a country at starting year
function radius(d) {
     return d.data.population_total[startYear]; 
}

// A sort order so that smaller circles are drawn on top of bigger ones
function order(a, b) { 
    return radius(b) - radius(a); 
}

// Returns the value of the country's 'four regions' - used for colouring circles
function color(d) {
    return d.data.list_of_countries_geographies.four_regions
}

// Used to calculate current year shown
let year = d3.interpolateNumber(startYear, 2017);

// Set an initial year to the year label
const yearLabel = d3.select("#current-year").text("Year: ".concat(startYear));

const tweenYear = () => {
    return function(t) { displayYear(year(t)); };
}

const displayYear = year => {
    yearLabel.text("Year: ".concat(Math.round(year)));
}

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

let currYear = 1985;

async function showAllCountries() {
    try {
        let response = await fetch('/countries');
        let countries = await response.json();
        console.log(countries[5].data[yData]);
        console.log(countries);

        
        

        const vis = d3.select("#vis");

        ySelect.addEventListener("change", () => {
            yData = ySelect.value;
            yDataNiceName = ySelect.options[ySelect.selectedIndex].text;
            updateVis(countries, vis)
        });

        updateVis(countries, vis);
        

        // svg.call(d3.zoom()
        //     .extent([[0, 0], [width, height]])
        //     .scaleExtent([1, 8])
        //     .on("zoom", zoomed));

        // Zoom Visualisations (Programmatic Zoom)
        // let zoomed = () => {
        //     d3.selectAll("circle").attr("transform", d3.event.transform);
        // }
        
        // const zoom = d3.zoom()
        //     .scaleExtent([1, 40])
        //     .on("zoom", zoomed);
    
        // let clicked = ([x, y]) => {
        //     d3.event.stopPropagation(); // prevent event from reaching any objects other than current object
        //     d3.selectAll("circle").transition()
        //         .duration(750)
        //         .call(
        //             zoom.transform,
        //             d3.zoomIdentity.translate(width / 2, height / 2).scale(40).translate(-x, -y),
        //             d3.mouse(d3.selectAll("circle"))
        //         );
        // }

        // d3.selectAll("circle")
        //     .join("circle")
        //     .on("click", clicked);

        // g.call(zoom);

        // Object.assign(g.selectAll("circle"), {
        //     zoomIn: () => g.transition().call(zoom.scaleBy, 2)
        // });


        //zoom(g, height, width);
        // function update(nRadius) {
        
        //     // adjust the text on the range slider
        //     d3.select("#nRadius-value").text(nRadius);
        //     d3.select("#nRadius").property("value", nRadius);
        
        //     // update the circle radius
        //     d3.select("#vis").selectAll("circle")
        //         .attr("cx", (d) => {
        //             if (d.data.income_per_person_gdppercapita_ppp_inflation_adjusted) {
        //                 return xScale(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[String(nRadius)]);
        //             }
        //         })
        //         .attr("cy", (d) => {
        //             if (d.data.armed_forces_personnel_total) {
        //                 return yScale(d.data.armed_forces_personnel_total[String(nRadius)]);
        //             }
        //         })
        //         .attr("r", function(d) { return Math.sqrt(d.data.population_total[String(nRadius)] * 0.00001); });
        // }
    }
    catch(e) {
        console.error(e);
    }
}

function updateVis(countries, vis) {
    // Remove any existing circles, axis so they are redrawn
    d3.selectAll("g").remove();
    d3.selectAll("text").remove();

    var g = d3.select("svg").selectAll("g").enter().data(countries);

    // Calculate the maximum value for X-axis
    let x_max = d3.max(countries, d => {
        if (d.data.income_per_person_gdppercapita_ppp_inflation_adjusted) {
            // Make a natural assumption of data (that income is higher as world is more developed) - 2017
            return +d.data.income_per_person_gdppercapita_ppp_inflation_adjusted["2017"];
        }
    });

    // Calculate the maximum value for Y-axis
    let y_max = d3.max(countries, d => {
        if (d.data[yData]) {
            // Make a natural assumption of data (that military expenditure/personnel would be highest closest towards World Wars) - 1985
            return +d.data[yData]["1985"];
        }
    });

    // Create X Scale (For income)
    let xScale = d3.scaleLog() // Use Log so that circles aren't so bunched up
        .domain([100, x_max])
        .range([margin.left, width]);

    // Create Y Scale
    let yScale = d3.scaleLinear() // Use linear as data on Y axis can change
        .domain([0, y_max])
        .range([height, margin.top]);

    // Create x-axis using the xScale as scale
    let xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d => {
            return xScale.tickFormat(15, d3.format(",d"))(d); // Set ticks, formatting them so they don't display as log numbers
        });
    
    // Add the main svg
    vis.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0" + "," + margin.right + ")");
    
    // Add xAxis to svg
    vis
        .append("g")
        .attr("transform", "translate(0" + "," + height + ")")
        .call(xAxis);
    
    // Add yAxis to svg
    vis
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .call(d3.axisLeft(yScale));
    
    // Add xAxis text label to svg
    vis
        .append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 5)
            .text("Income per Person (GDP per capita)");

    // Add yAxis text label to svg
    vis
        .append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.left + 20)
            .attr("x", -margin.top)
            .text(yDataNiceName); // The name of the Y-axis data set
    
    // Add a tooltip div
    var tooltip = d3.select("body")
        .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px");
    
    // create new 'g' elements for each country
    var en = g.enter().append("g");

    let circlesize = (d) => { return d3.scaleSqrt().domain([0, d3.max(d.data.population_total[startYear])]).range([0, 35]) };
    
    // add a circle to each 'g'
    var circle = en.append("circle")
        .attr("area", (d) => { return circlesize(d); }) // Make circle size based off population
        .attr("fill", (d) => { 
            if (d.data.list_of_countries_geographies) {
                return colorScale(color(d)); // Set color based off country's region - improve user experience
            }
        })
        .attr("cx", (d) => { // The circle's center X position
            if (d.data.income_per_person_gdppercapita_ppp_inflation_adjusted) {
                return xScale(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[startYear]); // Get co-ordinate space using xScale
            }
        })
        .attr("cy", (d) => { // The circle's center Y position
            if (d.data[yData]) {
                return yScale(d.data[yData][startYear]); // Get co-ordinate space using yScale
            }
        })
        .sort(order) // Sort circles based on their radius so that bigger circles don't hide small ones
        .on('mouseover', () => { // Add a mouseover event to show tooltip
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0.9);
              tooltip
                .style('left', d3.event.pageX + 25 + 'px')
                .style('top', d3.event.pageY - 50 + 'px');
        })
        .on('mousemove', function(d) { // Show country info in tooltip when mouse moved over circle
            tooltip
              .html(
                  "Country: " + d.name + "<br/>" +
                  "Population: " + formatComma(d.data.population_total["2017"]) + "<br/>" +
                  "Income per Person (GDP per capita): " + formatComma(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted["2017"]) + "<br/>" +
                  yDataNiceName + formatComma(d.data[yData]["2017"])
                  )
                  .style("font-weight", "bold")
              .style("left", (d3.event.pageX + 25 + "px")) // Add pixels otherwise there will be a weird effect
              .style("top", d3.event.pageY - 50 + "px");
        })
        .on('mouseout', () => { // Hide tooltip when mouse is not on circle
            tooltip
            .transition()
            .duration(500)
            .style('opacity', 0);
        });
    
    // Change size of circle as a transition
    d3.selectAll("circle").transition()
        .duration(750)
        .delay(function(d, i) { return i * 10; })
        .attr("r", function(d) { return Math.sqrt(d.data.population_total[startYear] * 0.000005); });
    
    // Set an animation from initial year values to ending year values once animation button clicked
    let animationButton = d3.select("#animation-start")
        .on("click", () => {
            d3.selectAll("circle")
                .transition()
                .ease(d3.easeCircle)
                .duration(6000)
                .attr("cx", (d) => {
                    if (d.data.income_per_person_gdppercapita_ppp_inflation_adjusted) {
                        return xScale(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted["2017"]);
                    }
                })
                .attr("cy", (d) => {
                    if (d.data[yData]) {
                        return yScale(d.data[yData]["2017"]);
                    }
                })
                .attr("r", (d) => { 
                    return Math.sqrt(d.data.population_total["2017"] * 0.000005); 
                })
                .tween("year", tweenYear);
        });

}


function zoom(g, height, width) {
    

    
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