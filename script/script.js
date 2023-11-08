const row = document.querySelector('.row');
const all = document.querySelector('#all');
const search = document.querySelector('#search');
const searchBox = document.querySelector('.search-wrapper');
const searchInput = document.querySelector('#searchInput');
const submit = document.querySelector('#submit');
const name = document.querySelector('#name')
const image = document.querySelector('#image')
const language = document.querySelector('#languages')
const currencies = document.querySelector('#currency')
const capital = document.querySelector('#capital')
const maps = document.querySelector('#maps')
const result = document.querySelector('.result')

const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all ')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
            row.innerHTML += `
        <div class="col-4">
            <div class="card">
               <img src="${country.flags.png}" class="card-img-top" alt="...">
               <div class="card-body">
               <h3 class="card-title">${country.translations.rus.official}</h3>
               <p class="card-text">${country.capital}</p>
               </div>
            </div>
        </div>
        `
        })
    })
}
handleGetCountries()

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
    }
})

const handleSearch = () => {
    let value = searchInput.value
    result.classList.remove('hidden')
    console.log(value)
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json,'country')
            name.innerHTML = json[0].name.common
            image.src = json[0].flags.png
            language.innerHTML = Object.values(json[0].languages)
            currencies.innerHTML = Object.values(json[0].currencies).map(el => el.symbol)
            capital.innerHTML = json[0].capital
            maps.href = json[0].maps.googleMaps
            fetch(`http://api.weatherapi.com/v1/current.json?key=f2c65364cd2644f087e60957230811&lang=ru&q=${json[0].capital}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json, 'weather')
                    city.innerHTML = json.location.region
                    country.innerHTML = json.location.country
                    current.innerHTML = json.current.temp_c
                    text.innerHTML = json.current.condition.text
                })
        })
}

submit.addEventListener('click',  () => handleSearch())

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSearch()
    }
})




