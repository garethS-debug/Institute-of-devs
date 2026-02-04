

const skillsSelect = document.getElementById("selectNumber");
var recipeList = [];
var categoriesList = [];

function sendFetchRequest() {

// fetch('https://quoteslate.vercel.app/api/quotes/random')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch((error) => console.error("Fetch error:", error));
  const searchOutput = skillsSelect.value;
  const selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;

  console.log('Selected category:', selectedText, searchOutput);

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchOutput}`)
  .then(response => response.json())
    .then(data => {
      console.log('categories:', data);
      recipeList = [];
      data.meals.forEach(meal => {
        recipeList.push(meal.strMeal);
        // console.log('Meal added:', meal.strMeal);
      });
    })


}


         $(function() {
            // var availableTutorials  =  [
            //    "ActionScript",
            //    "Bootstrap",
            //    "C",
            //    "C++",
            // ];



            $( "#automplete-1" ).autocomplete({
               source:  categoriesList
            });
         });

window.onload = function() {
  console.log("Page loaded, sending category request...");
  sendCategoryRequest();
};

function sendCategoryRequest() {

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
    .then(data => {
      console.log('categories:', data);
      updateDropdown(data); // update the dropdown menu

      //Store the category variables
       data.categories.forEach(category => {
        categoriesList.push(category.strCategory);
        // console.log('Category added:', category.strCategory);
      })


    })
    
 
}

function updateDropdown(data) {

    const select = document.getElementById('selectNumber'); // Get the element
    select.innerHTML = ''; //clear existing options
    
    const categories = document.createElement('Option') // get the DOM element
    categories.value = ''; //set to empty
    categories.disabled = true; //disable it
    categories.selected = true; //set it to selected
    categories.textContent = 'Food Categories'; //call it food categories
    select.appendChild(categories); //append it to the dropdown

    //---- Loop and add the categories from the API
    data.categories.forEach(category => {
    const newCategories = document.createElement('Option') // get the name
    newCategories.value = category.strCategory; //set the value
    newCategories.textContent = category.strCategory;
    select.appendChild(newCategories);

    })

}




const fetchBtn = document.getElementById("fetch");
if (fetchBtn) fetchBtn.addEventListener("click", sendCategoryRequest);

//------Test API CALL FROM SERVER.JS -------//

var searchTerm = document.getElementById("meal-search");
var searchButton = document.getElementById("search-btn");
var recipeButton = document.getElementById("search-btn-food");


recipeButton.addEventListener("click", sendFetchRequest);
searchButton.addEventListener("click", onClickSearhButton);


const listOfSearches  = []; //creating an empty array to store searches

var list = document.getElementById('searches');



var select = document.getElementById("selectNumber");
var options = ["1", "2", "3", "4", "5"];

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}





function onClickSearhButton() {

    sendCategoryRequest();
  // 4. use the value property of the searchInput to get the search term
  //1. **Read the search text** from an input field on the page.
  var searchOutput = searchTerm.value;
  // console.log(searchTerm.value);
  console.log(searchOutput);

  //2. **Validate** that text has been entered (non-empty).
  if (searchOutput == "") {
    alert("Please enter a search term");
    return;
  }

  else {
    //3. Add the valid search text to a **list of searches** displayed on the page.
    listOfSearches.push(searchOutput);
    refreshUI(searchOutput);
    
    listOfSearches.forEach((element) => 
      { 
        
       // console.log(element); 

      });

  }


}

function refreshUI(searches) {
  console.log(searches);
  var ulEl = document.createElement('li');
  ulEl.appendChild(document.createTextNode(searches));
  list.appendChild(ulEl);

}




