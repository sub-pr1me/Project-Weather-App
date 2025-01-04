function appendDOM(a,b,c,d,e) {
    let unitSymbol = e;
    const container = document.getElementById('container');
    container.textContent = '';

    const temperatureF = document.createElement('div');
    const city = document.createElement('div');
    const conditions = document.createElement('div');
    const description = document.createElement('div');
    
    temperatureF.classList.add('temperature', 'white');
    conditions.classList.add('conditions', 'white');
    city.classList.add('city', 'white');
    description.classList.add('description', 'white');

    container.appendChild(temperatureF);
    container.appendChild(conditions);
    container.appendChild(city);
    container.appendChild(description);

    temperatureF.textContent = `${a}°${unitSymbol}`;
    conditions.textContent= b;
    city.textContent = c;
    description.textContent = `(${d})`;
}

export { appendDOM }