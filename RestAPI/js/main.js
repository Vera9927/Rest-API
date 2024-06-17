// fetch data
async function fetchAPOD(apiKey, date) {
    const baseUrl = "https://api.nasa.gov/planetary/apod";
    const url = `${baseUrl}?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching APOD: ${error.message}`);
    }
}

// display APOD data -------------------------

function displayAPOD(data) {
    const apodTitle = document.getElementById("apodTitle");
    const apodMedia = document.getElementById("apodMedia");
    const apodExplanation = document.getElementById("apodExplanation");


    // display title
    apodTitle.textContent = data.title;

    if (data.media_type === "image") {

        // display image 
        apodMedia.innerHTML = `
            <img src="${data.url}" alt="${data.title}">
        `;
    } else if (data.media_type === "video") {

        // display video
        apodMedia.innerHTML = `
            <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
        `;
    } else {

        // media type not supported
        apodMedia.textContent = "Media type not supported.";
    }

    // display explanation
    apodExplanation.textContent = data.explanation;
}

// Event listener when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'NWC8V6nTsmgw9VUfs6UIyKvJiBkoR1YR5lOup8Gt';
    const submitBtn = document.getElementById("submitBtn");
    const datePicker = document.getElementById("datePicker");

    submitBtn.addEventListener("click", async function(event) {
        event.preventDefault();
        const chosenDate = datePicker.value;

        if (!chosenDate) {
            alert("Please select a date.");
            return;
        }

        try {
            const apodData = await fetchAPOD(apiKey, chosenDate);
            displayAPOD(apodData);
        } catch (error) {
            console.error(error.message);
            alert("Failed to fetch APOD data. Please try again later.");
        }
    });
});

