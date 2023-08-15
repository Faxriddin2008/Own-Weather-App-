const api ={
    key: '0b71d9aba96d782d82bb18ddd4c2c92a',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener("keypress" , setQuery)
function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value)
        console.log(searchBox.value);
    }

}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name} , ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp")
    temp.innerHTML = `${Math.round(weather.main.temp)}`

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`;
    check(temp);
}

function dateBuilder(now) {
    let months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July', 'August' , 'September' , 'October' , 'November' , 'December'];
    let days = ['Sunday' , 'Monday', 'Tuesday', 'Wednesday' ,'Thursday' , 'Friday', 'Saturday'];
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

function check(temp){
    if(temp.textContent < 0){
        document.getElementById("body").style.background = "url('bg2.jpg')";
        document.getElementById("body").style.backgroundSize = "cover";
    }else{
        document.getElementById("body").style.background = "url('bg.jpg')";
    }
}

























