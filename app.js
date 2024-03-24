const data = document.getElementById("data");
const submit = document.getElementById("submit");
const city = document.getElementById("city");

data.addEventListener("onchange", () => {

})

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (city.value) {
        getData(city.value.trim());
    }
});

const getData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=8b20070ef19d79dbb4ce75a15b316b04`;
    try {
        const response = await fetch(URL);
        const w_data = await response.json();
        city = city[0].toUpperCase() + city.substring(1);
        if (w_data.cod == "200") {
            Notification.requestPermission().then((permission) => {
                if(permission === "granted") {
                    const notification = new Notification(
                        `Today's Weather for ${city}`,
                        {
                            body: `Temparature : ${w_data.main.temp}°C\nHumidity : ${w_data.main.humidity} %\nPressure : ${w_data.main.pressure} hPa\nWeather : ${w_data.weather[0].description}`,
                        }
                    );
                    data.innerText = "Notification Sent!";
                    data.style.color = "green";
                } else {
                    data.innerText = "Notification Permission Not Granted";
                    data.style.color = "red";
                }
            })
        } else {
            data.innerText = "City Not Found!";
            data.style.color = "red";
        }
    } catch (err) {
        console.log(err);
    }
};
