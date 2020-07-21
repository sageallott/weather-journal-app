/* Global Variables */
const form = document.querySelector('.form');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f28e90029e0a6d01679b49841fb13f03&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', perform);

/* Function called by event listener */
function perform(e) {
    e.preventDefault();
    // Get user values
    const updateZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, updateZip, apiKey)
    .then(function (userData) {
      // Add to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content: feelings })
    }).then(function (newData) {
      // Update browser content
      update()
    })
  form.reset();
}

// Function to GET Web API Data
const getWeather = async (baseURL, newZip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + newZip + apiKey);
    try {
      // userData equals to the result of fetch function
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }

  /* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })

    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
      }
      catch (error) {
        console.log(error);
      }
    };

    const update = async () => {
        const request = await fetch('/all');
        try {
          const allData = await request.json()
          // update new entry values
          document.getElementById('date').innerHTML = allData.date;
          document.getElementById('temp').innerHTML = allData.temp;
          document.getElementById('content').innerHTML = allData.content;
        }
        catch (error) {
          console.log("error", error);
        }
      };
