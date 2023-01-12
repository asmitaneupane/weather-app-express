const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const country_name = document.getElementById('country_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    console.log(cityVal);
    if(cityVal === '') {
        city_name.innerText =  `Please write the name before search!`;
        datahide.classList.add('data_hide');
    } else {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=d1af562632e00d11d8c3cc64eca4253e`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(arrData)

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            console.log(city_name.innerText)
            temp_real_val.innerText = arrData[0].main.temp;
            
            //condition to check sunny or cloudy

            const tempStatus = arrData[0].weather[0].main;

            if (tempStatus == "Sunny") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
                } else if (tempStatus == "Clouds") {
                    temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #dfe4ea;'></i>";
                } else if (tempStatus == "Rainy") {
                    temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                    temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
                }

            datahide.classList.remove('data_hide');

        }catch {
            city_name.innerText =  `Please enter the city name properly!`;
            datahide.classList.add('data_hide');
        }
    }

}

submitBtn.addEventListener('click', getInfo);