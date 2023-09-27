const tem=document.querySelector(".temp p");
const ftem=document.querySelector(".temp p span");
    const city=document.querySelector(".temp  li:first-child");
    const country=document.querySelector(".temp  li:nth-child(2)");
    const cond_img=document.querySelector(".condition img");
    const wcond=document.querySelector(".condition li:first-child");
    const humidity=document.querySelector(".humudity p");
    const wspeed=document.querySelector(".Windspeed p");
    const timeField = document.querySelector(".time li:first-child");
    const dateField = document.querySelector(".time li:nth-child(2)");
    const dayField = document.querySelector(".time li:nth-child(3)");
    

   const cityField = document.querySelector(".weather2 p");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event listen to the form
form.addEventListener("submit", search);

// Default Location
let target = "Kolkata";

// Function to fetch Data from Weather API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    // Destructuring
     // Destructuring
     const {
        current: {
          temp_c,
          condition: { text, icon },
          wind_kph, 
          humidity, 
          feelslike_c,
        },
        location: { name, country, localtime},
    } = data;

    // Calling update Dom Function
    updateDom(temp_c, feelslike_c, name, country, humidity, wind_kph, localtime, icon, text);

  } catch (error) {
    alert("Location not found");
  }
};

// Function to update Dom
function updateDom( temparature, feelslike, ct, cntry, humi, speed, time, emoji,text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  

  tem.innerText = `${temparature}°C`;
  ftem.innerHTML=`${feelslike}°C`;
  city.innerText = ct;
  country.innerText = cntry;
  humidity.innerHTML=`${humi}%`;
  wspeed.innerHTML=`${speed} km/h`;
 timeField.innerText = `${exactTime}`;
 dayField.innerText =exactDay;   
 dateField.innerText = `${exactDate}`;
  cond_img.src = emoji;
  wcond.innerHTML= text;
}

fetchData(target);

// Function to search the location
function search(e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
}

// Function to get the name of day
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturdat";

    default:
      return "Don't Know";
  }
}


