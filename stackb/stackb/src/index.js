// import 'public/stylesheets/scss/main.scss'

import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';
const stackA = 'http://localhost:8080/';

async function loadFromCountriesApi() {
    await $.get(stackA + 'countries', function(response) {
        localStorage.setItem('countries', response);
    });
    return JSON.parse(localStorage.getItem('countries'));
};

var countriesArray = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')) : loadFromCountriesApi();
console.log(countriesArray);

ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app')
);

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.getElementById('clear-all');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    liMaker(input.value);
    input.value = '';
});

data.forEach(item => {
    liMaker(item);
});

button.addEventListener('click', function() {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});