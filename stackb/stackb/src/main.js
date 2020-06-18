// import 'public/stylesheets/scss/main.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

const title = 'My Minimal React Webpack Babel Setup';
const stackA = 'http://localhost:8080/'; //URL of Stack A to use API

// Gets countries data from Stack A API, loads into localStorage
async function loadFromCountriesApi() {
    // Send an AJAX Get request to countries API of Stack A ('http://localhost:8080/countries')
    await $.get(stackA + 'countries', function(response) {
        console.log("Fetching countries from API");
        // Add countries data to localStorage using key "countries"
        localStorage.setItem('countries', response);
    }).fail(() => {
        console.error("Error fetching countries from " + stackA + "countries/ API. Check that the server is running.");
    }).done(() => {
        console.log("Successfully fetched countries data from API")
        // Return stored "countries" item from localStorage
        return JSON.parse(localStorage.getItem('countries'));
    });
};

// Check 'countries' item exists in localStorage, if not make a request to API, otherwise load from localStorage
var countriesArray = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')) : loadFromCountriesApi();
console.log(countriesArray);
var test = countriesArray.map((country) => country = {...country, ...{selected: "false"}});

//--------------------------------------

// A functional component that returns a react-select (dropdown) element filled with countries
function Dropdown(props) {
    // Return a dropdown containing all countries and values as country names
    return (
        <Select 
            options={ props.options } 
            isSearchable // So you can type in a country name
            onChange={ props.onChange } // Use the onChange function already created
        />
    );
}

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //countries: [countriesArray.map((country) => country = {...country, ...{selected: "false"}})], 
            //country: [{ label: "New Zealand", value: "New Zealand" }],
            
            countries: countriesArray,
            selectedCountry: 0, // The index in countries array of selected country
        }
    }

    // Updates selectedCountry (index of selected country) in state
    onDropdownChange(country) {

        this.state.selectedCountry = country;
        var asdf = document.getElementById('country-name');
        asdf.textContent = this.state.countries[selectedCountry].data["population_total"]["2020"];
    }

    renderPopulation() {
        if (this.state.countries[this.state.selectedCountry].data["population_total"] != undefined) {
            return (
                <h3 id="population-data">
                    Population Total:
                    { this.state.countries[this.state.selectedCountry].data["population_total"]["2020"] }
                </h3>
            );
        }
        return (
            <h3 class="error" id="population-data">
                Population Total: No data exists.
            </h3>
        );
    }

    renderMilitaryExpenditure() {
        if (this.state.countries[this.state.selectedCountry].data["military_expenditure_percent_of_gdp"] != undefined) {
            return (
                <h3 id="military-expenditure-data">
                    Military Expenditure:
                    { this.state.countries[this.state.selectedCountry].data["military_expenditure_percent_of_gdp"]["2015"] }
                </h3>
            );
        }
        return (
            <h3 class="error" id="military-expenditure-data">
                Military Expenditure: No data exists.
            </h3>
        );
    }

    // Removes the underscores of data file names to make them human-readable
    humanise(str) {
        // Use regex expression to replace all occurrences of underscore with a space
        let humanised = str.replace(/\_/g, " ");
        return humanised;
    }

    // dataKey = The key of the data file (e.g. military_expenditure_percent_of_gdp)
    // renderData(dataKey, dataKeyNiceName, year) {
    //     // Check if the selected country has the key for data file in data key (will be undefined if it doesn't)
    //     if (this.state.countries[this.state.selectedCountry].data[dataKey] != undefined) {
    //         // Return an H3 element with the data info
    //         return (
    //             <h3 id={dataKey}>
    //                 { dataKeyNiceName }: 
    //                 { this.state.countries[this.state.selectedCountry].data[dataKey]["2015"] }
    //             </h3>
    //         );
    //     }
    //     // There is no data field/key for this country, return feedback
    //     return (
    //         <h3 class="error" id={ dataKey }>
    //             { dataKeyNiceName }: No data exists.
    //         </h3>
    //     );
    // }

    // Returns an array of h3 elements containing data pertaining to data file/object
    renderData(keys, year) {
        let data = [];
        
        for (let i = 0; i < keys.length; i++) {
            // For every key, add an h3 containing data for that key
            data.push(
                <h3 id={keys[i]}>
                        { this.humanise(keys[i]) }: 
                        { this.state.countries[this.state.selectedCountry].data[keys[i]][year] }
                </h3>
            );
        }
        return data;
    }

    render() {
        // For every country object set a label and value as country's name, to use for react-select
        let countriesMapped = this.state.countries.map((country, i) => country = {label: country.name, value: i});
        // Get the data keys (file names) of the currently selected country
        let dataKeys = Object.getOwnPropertyNames(this.state.countries[this.state.selectedCountry].data);

        return (
            <div>
                <Dropdown
                    options={ countriesMapped }
                    onChange={ val => 
                        this.setState({ selectedCountry: val.value }) }
                />
                <div className="country-info">
                    <h2>{ this.state.countries[this.state.selectedCountry].name }</h2>
                    <div className="country-data">
                        { this.renderData(dataKeys, "2010") }
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Info />,
    document.getElementById('test-comp')
);

// Helper function to add commas to big numbers for readability
function formatNumberWithCommas(x) {
    return x.toString().replace(/B(?=(d{3})+(?!d))/g, ",");
}

// const form = document.querySelector('form');
// const ul = document.querySelector('ul');
// const button = document.getElementById('clear-all');
// const input = document.getElementById('item');
// let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// localStorage.setItem('items', JSON.stringify(itemsArray));
// const data = JSON.parse(localStorage.getItem('items'));

// const liMaker = text => {
//     const li = document.createElement('li');
//     li.textContent = text;
//     ul.appendChild(li);
// }

// form.addEventListener('submit', function(e) {
//     e.preventDefault();

//     itemsArray.push(input.value);
//     localStorage.setItem('items', JSON.stringify(itemsArray));
//     liMaker(input.value);
//     input.value = '';
// });

// data.forEach(item => {
//     liMaker(item);
// });

// button.addEventListener('click', function() {
//     localStorage.clear();
//     while (ul.firstChild) {
//         ul.removeChild(ul.firstChild);
//     }
// });