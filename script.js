'use strict';

//         https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = function(msg)
{
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
}

//////////////////////////////////////

const renderCountry = function(data, className = '') 
{
	const html = `
		<article class="country ${className}">

			<img class="country__img" src="${data.flag}"/>

			<div class="country__data">
				<h3 class="country__name">${data.name}</h3>
				<h4 class="country__region">${data.region}</h4>
				<p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)}</p>
				<p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
				<p class="country__row"><span>💰</span>${data.currencies[0].name}</p>

			</div>

		</article>`;

	countriesContainer.insertAdjacentHTML("beforeend", html);
	countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function(country) 
{
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v2/name/${country}`);
	request.send();

	request.addEventListener("load", function()
	{
		const data = JSON.parse(request.responseText)[0];

        // Render country
		renderCountry(data);

        // Render country's neighbour
        const neighbour = data.borders?.[0];
        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener("load", function() 
        {
            const data2 = JSON.parse(request2.responseText);
            
            renderCountry(data2, "neighbour")
        })
    });
};

const getCountryData = function(country)
{
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => 
    {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); 
    })
    .then(response => response.json())
    .then(data => renderCountry(data, "neighbour"))
    .catch(err => renderError(`Something went wrong ${err}`));
};

btn.addEventListener("click", function ()
{
    getCountryData("brasil");
});



