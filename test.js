
//-- On page Load

window.onload = function() {
  console.log("Page loaded, sending category request...");
  sendCategoryRequest();
};



//-- references
var list = document.getElementById('searches');
var randomBtn = document.getElementById('Random');

//Event Listeners
randomBtn.addEventListener("click", randomRecipe)



//const skillsSelect = document.getElementById("selectNumber");

//Lists to hold the API data
var recipeList = [];
var categoriesList = [];

//This holds our category selection
var chosenCat = null; // Setting a defult value so that it starts empty. We will be adding in the variable later
var chosenCatList = []; //creating an empty list of our chosen category. 

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

// //jQuery
// // $(function(){
// //   $('#test').text('Testing');
// // });

//          $(function() {
//             // var availableTutorials  =  [
//             //    "ActionScript",
//             //    "Bootstrap",
//             //    "C",
//             //    "C++",
//             // ];



//             $( "#automplete-1" ).autocomplete({
//                source:  categoriesList
//             });
//          });


function sendCategoryRequest() {

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
    .then(data => {
      console.log('categories:', data);
      updateDropdown(data); // update the dropdown menu

      //Store the category variables
       data.categories.forEach(category => {
        categoriesList.push(category.strCategory);
        console.log('categoriesList:', category.strCategory);
        updateDropdown(category.strCategory, 'list1'); // update the dropdown menu

          // const el = document.getElementById("test");
          // el.textContent = "testy"; 
        // console.log('Category added:', category.strCategory);
      })


    })
    
 
}

//This is the function to update the dropdown menu
function updateDropdown(category, menuId) {
  console.log('Updating dropdown menu...');

  //We are adding in security checks just in case the data isnt passed in to the function 
  if (menuId == null) { console.log('menuId is null, setting default value.'); menuId = 'list1'; return;}
  if (category == null) { console.log('category is null, exiting function.'); return;}

  const menuEl = document.getElementById(menuId);
  

    // Below we create a empty <li> element and a empty <a> element 
    // <li><a class="dropdown-item" href="#">Action</a></li>
    const categoriesLi = document.createElement("li") // Create an empty Li element
    const catergoriesA = document.createElement("a") // Create an empty A element

    //Now we populate the A element details
    catergoriesA.className = "dropdown-item"; 
    catergoriesA.href = "#"; 
    catergoriesA.textContent = category;
    //To Do add logic of on select event

  //Adding a onclick event
  catergoriesA.addEventListener("click", OnMenuButtonSelect);


    //Append A element to Li element and then append Li element to the Menu
    categoriesLi.appendChild(catergoriesA); //append it to the dropdown
    menuEl.appendChild(categoriesLi); //append it to the menu


}


function OnMenuButtonSelect() {
console.log('Menu item selected:', this.textContent);
chosenCat = this.textContent;

}


// const fetchBtn = document.getElementById("fetch");
// if (fetchBtn) fetchBtn.addEventListener("click", sendCategoryRequest);

// //------Test API CALL FROM SERVER.JS -------//

// var searchTerm = document.getElementById("meal-search");
// var searchButton = document.getElementById("search-btn");
// // var recipeButton = document.getElementById("search-btn-food");

//   var recipeBtnEl = document.getElementById("test");



// recipeButton.addEventListener("click", sendFetchRequest);
// searchButton.addEventListener("click", onClickSearhButton);
// recipeBtnEl.addEventListener("click", showGenre);

const listOfSearches  = []; //creating an empty array to store searches





// var select = document.getElementById("selectNumber");
// var options = ["1", "2", "3", "4", "5"];

// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// }


function randomRecipe() {

  console.log('Random recipe button clicked');

  //Here we are checking if the user has selected a category (referencing our temp variable at the top of the page)
  if (chosenCat == null) {
  alert("Please select a category first!");
  return;
  }
   recipeList = []; // we clear the recipe list so we can add new chosen recipes in
  //API call
  
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${chosenCat}`)
  .then(response => response.json())
    .then(data => {
      data.meals.forEach(meal => {
        recipeList.push(meal.strMeal);
        // console.log('Meal added:', meal.strMeal);
      });
    })

    recipeList.forEach((element) => 
      { 
        console.log(element);
      });

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




