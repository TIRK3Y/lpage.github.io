// Typing effect for the "I am a Developer/Designer/Artist" text
const typingText = document.querySelector('.typing-text');
const textArray = ['Developer', 'Designer', 'Artist'];  // The words to be typed
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
    const currentWord = textArray[textIndex];

    // Check if the text is currently being deleted
    if (!isDeleting) {
        // Add characters to the current text
        currentText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    } else {
        // Remove characters from the current text
        currentText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    }

    typingText.textContent = currentText;

    // When word is fully typed
    if (charIndex === currentWord.length && !isDeleting) {
        setTimeout(() => isDeleting = true, 2500); // Pause before deleting
    }

    // When word is fully deleted
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; // Move to next word
    }

    // Control the typing and deleting speed
    const typingSpeed = isDeleting ? 150 : 300;  // Slower typing and deleting
    setTimeout(type, typingSpeed);
}

// Start the typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);  // Slight delay before starting
});




document.addEventListener('DOMContentLoaded', type);

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('change-video-btn');
    const video = document.getElementById('bg-video');
    const icon = document.getElementById('button-icon');
    
    button.addEventListener('click', function() {
        // Log for debugging
        console.log('Button clicked!');

        // Toggle the video source
        const currentSrc = video.getAttribute('src');
        if (currentSrc === './Background/05.mp4') {
            video.setAttribute('src', './Background/08.mp4');
            icon.textContent = '🌜';  // Change icon to moon for dark mode
        } else {
            video.setAttribute('src', './Background/05.mp4');
            icon.textContent = '🌞';  // Change icon back to sun for light mode
        }

        // Reload the video to start playing the new source
        video.load();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const weatherIcon = document.getElementById("weather-icon");
    const temperatureElement = document.getElementById("temperature");
    const locationElement = document.getElementById("location");

    const API_KEY = "37f24d6410aee98c75f17101645f7258"; // If Youre using my API please do let me Know

    function updateWeatherData(latitude, longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const temp = data.main.temp;
                const location = data.name;
                const weather = data.weather[0].main.toLowerCase();

                // Update the widget with weather data
                temperatureElement.textContent = `${temp}°C`;
                locationElement.textContent = location;

                // Update weather icon based on the weather description
                if (weather.includes("cloud")) {
                    weatherIcon.src = "./Weather/01.png";
                } else if (weather.includes("sun")) {
                    weatherIcon.src = "./Weather/02.png";
                } else if (weather.includes("rain")) {
                    weatherIcon.src = "./Weather/03.png";
                } else if (weather.includes("wind")) {
                    weatherIcon.src = "./Weather/06.png";
                } else {
                    weatherIcon.src = "./Weather/02.png"; // default icon
                }
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                temperatureElement.textContent = "--°C";
                locationElement.textContent = "Unable to load weather";
            });
    }

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateWeatherData(latitude, longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            temperatureElement.textContent = "--°C";
            locationElement.textContent = "Location permission denied";
        });
    } else {
        console.error("Geolocation not supported by the browser");
        temperatureElement.textContent = "--°C";
        locationElement.textContent = "Geolocation not supported";
    }
});


