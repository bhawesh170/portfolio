const homeButton = document.querySelector('.navbar a:nth-child(1)');
const aboutMeButton = document.querySelector('.navbar a:nth-child(2)');
const skillsButton = document.querySelector('.navbar a:nth-child(3)');
const projectsButton = document.querySelector('.navbar a:nth-child(4)');
const contactButton = document.querySelector('.navbar a:nth-child(5)');

const mainSection = document.querySelector('.main-section');
const aboutMeSection = document.getElementById('about-me');
const skillsSection = document.getElementById('skills');
const projectsSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');

const apiKey = 'cfb0dff435f74223865180535251510';
function fetchWeather(lat, lon) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const location = data.location.name;

      document.getElementById('weather').innerHTML = `${location}<br>
        <img src="https:${icon}" alt="${condition}" style="vertical-align:middle;">
        🌡️ ${temp}°C | ${condition}`;
    })
    .catch(err => {
      document.getElementById('weather').textContent = 'Weather data unavailable';
      console.error(err);
    });
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(lat, lon);
    },
    error => {
      document.getElementById('weather').textContent = 'Location access denied';
      console.error(error);
    }
  );
} else {
  document.getElementById('weather').textContent = 'Geolocation not supported';
}


const buttons = [
  {btn: homeButton, section: mainSection},
  {btn: aboutMeButton, section: aboutMeSection},
  {btn: skillsButton, section: skillsSection},
  {btn: projectsButton, section: projectsSection},
  {btn: contactButton, section: contactSection},
];

buttons.forEach(({btn, section}) => {
  btn.addEventListener('click', () => {
    buttons.forEach(({section: sec}) => {
      sec.style.display = (sec === section) ? 'block' : 'none';
    });
  });
});


const timeElement = document.getElementById('time');

function updateTime() {
  const now = new Date();
  timeElement.textContent = now.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}
setInterval(updateTime, 1000);
updateTime();