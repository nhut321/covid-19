var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
const url = 'https://api.covid19api.com/'

var buttonSearch = $('.form-region')
var countryName = $('.select-region-form ')
var caseOf = $('.card-main__item-info-text.case')
var deathOf = $('.card-main__item-info-text.death')

var a = '1231212323'
a=a.replace(new RegExp("^(\\d{" + (a.length%3?a.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
console.log(a)


	fetch(url + 'countries')
		.then(res => res.json())
		.then(async data => {
			let coutry = ''
			await data.forEach((v,i) => {
				return coutry += `
					<option value="${v.Country}">${v.Country}</option>
				`
			})
			countryName.innerHTML= coutry
			// caseOf.innerHTML = total
			// deathOfs.innerHTML = death
			// console.log(typeof total)

		})
		.catch(err=>console.log(err))

// v.Country

// countryName.innerHTML= '<option value="1">123</option>'



buttonSearch.onsubmit = (e) => {
	e.preventDefault()
	const select = $('.select-region-form')
	var text = select.options[select.selectedIndex].text;
	// console.log(text)
	fetch(url + 'dayone/country/' + text)
		.then(res => res.json())
		.then(data => {
			let length = data.length
			caseOf.innerHTML = data[length - 1].Confirmed
			deathOf.innerHTML = data[length - 1].Deaths
		})
		.catch(err => console.log(err))

}

const newConfirmed = $('.newconfirmed span:last-child')
const confirmed = $('.confirmed span:last-child')
const newDeaths = $('.newDeaths span:last-child')
const deaths = $('.deaths span:last-child')



fetch(url + 'summary')
	.then(res=>res.json())
	.then(data => {
		newConfirmed.innerHTML = data.Global.NewConfirmed
		confirmed.innerHTML = data.Global.TotalConfirmed
		newDeaths.innerHTML = data.Global.NewDeaths
		deaths.innerHTML = data.Global.TotalDeaths
		// console.log(data.Global)
	})


