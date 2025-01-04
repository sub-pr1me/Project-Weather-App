import "./styles.css";
import { appendDOM } from "./DOM";

const searchField = document.getElementById('search');
const btn = document.getElementById('get');
const container = document.getElementById('container');

let arr = [];
let units = 'metric';
let unitSymbol = 'C';

function unitControl() {
    const switcher = document.getElementById('units');
    const options = document.querySelectorAll('.temp');
    switcher.addEventListener('click', () => {
        options.forEach((option) => {
            option.classList.toggle('inactive');
        });
        if (units === 'metric') {
            units = 'us';
            unitSymbol = 'F';
        } else {
            units = 'metric';
            unitSymbol = 'C';
        };
    });
};
unitControl();

async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?&unitGroup=${units}&iconSet=icons2&key=27ZSZFFLPWTRAQZUGVX3VTUY3`)
    if (!response.ok) {
        throw Error('ERROR')
    };
    const cityData = await response.json();
    return cityData;    
    } catch (error) {
        console.log(error);
    };
};

async function processData(data) {    
    const result = await data;
    console.log(result);
    arr.push(result.currentConditions.temp);
    arr.push(result.currentConditions.conditions);
    arr.push(result.resolvedAddress);
    arr.push(result.description);    
    arr.push(result.currentConditions.icon);
};

btn.addEventListener('click', async () => {    
    if (searchField.value) {
        let path = '';
        await processData(getWeather(searchField.value));
        arr.push(`${unitSymbol}`);
        appendDOM(arr[0], arr[1], arr[2], arr[3], arr[5]);
        path = `${arr[4]}`;
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/2nd%20Set%20-%20Color/${path}.svg`
        container.insertBefore(img, container.firstChild);
        searchField.value = '';
        arr = [];
    };
});