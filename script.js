'use strict';

//         https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function(country) 
{
	const request = new XMLHttpRequest();
	request.open("GET", `https://restcountries.com/v2/name/${country}`);
	request.send();

	request.addEventListener("load", function()
	{
			const data = JSON.parse(request.responseText)[0];

			const html = `
			<article class="country">
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
  })
};

getCountryData("Brasil");
getCountryData("usa");