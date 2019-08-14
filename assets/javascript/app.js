//Create an array of gifs below//
const giffs = ["football", "tennis", "basketball", "boxing", "gymnastic", "baseball", "hockey", "soccer", "bowling", "boxing","rugby"];

//Create a function for the JSON content for each button div//
function displaygiff() {
const giff = this.getAttribute("data-name");
const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giff + "&apikey=0QG6PobGEmTJLBNwF8Gnu0lV6DqwBZ5y&limit=10";
fetch(queryURL).then(function (response) {

//return in JSON format//
return response.json();
}).then(function (responseJson) {
const results = responseJson.data;

// To empty result from previous button//
document.getElementById("giffs-view").innerHTML = "";

// Get results by creating loop for the above statement//
for (let i = 0; i < results.length; i++) {

// Create a variable for the url//
const imageUrl = responseJson.data.image_original_url;

// Creating a div for the gif//
const anims = document.createElement("div");
anims.setAttribute("class", "left");

//Have to create a element result for rating (ask tutor for help) or go back to the exercises//
const rating = results[i].rating;
const title = results[i].title.toUpperCase();
if (results[i].rating !== "r" || results[i].rating === "pg") {

// create paragraph element to show rating (ask tutor for help)//
const p = document.createElement("p");
p.innerHTML = "Rating:" + rating;

// create an image element//
const gifImage = document.createElement("img");

// setting up source attribute of image(s)//
gifImage.setAttribute("src", imageUrl);
gifImage.setAttribute("src", results[i].images.fixed_height.url);

// To change giffs from animate to still//Add an eventlistener click function//
gifImage.addEventListener('click', function () {
const state = this.getAttribute("src");
if (state === results[i].images.fixed_height.url) {
this.setAttribute('src', results[i].images.fixed_height_still.url);
imageUrl.state ="still";
} else {
this.setAttribute('src', results[i].images.fixed_height.url);
imageUrl.state = "animate";
}
});


//putting the div and paragraph on index (ask tutor for help)//
anims.append(p);
anims.append(gifImage);
document.getElementById("giffs-view").prepend(anims);
}
}
});
}

// On button click
document.getElementById("add-giff").addEventListener("click", function (event) {
event.preventDefault();
// grab the input
const giff = document.getElementById("giff-input").value.trim();
// Adding to array
giffs.push(giff);
// Calling renderButtons
renderButtons();
});
// Display initial buttons
renderButtons();


// Displaying giff data function//Ask Tutor for help//
function renderButtons() {

// Remove previous buttons after refreshing//
document.getElementById("buttons-view").innerHTML = "";

// Loop through giphs
for (let i = 0; i < giffs.length; i++) {

// Generate buttons for each giff in the array
const a = document.createElement("button");

// Add a 'giff' class to my button//
a.classList.add("giff");

// Add a data-attribute
a.setAttribute("data-name", giffs[i]);

// Provide initial button text
a.innerHTML = giffs[i];

// Add button to the buttons-view div
document.getElementById("buttons-view").append(a);

// Function for displaying the giff info
a.addEventListener("click", displaygiff);
}
}
