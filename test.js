
//-- On page Load

window.onload = function() {
  console.log("Page loaded, sending category request...");
  sendCategoryRequest();
 // updateMenu();
};



//Quote References
var quoteList = [
"I love deadlines. I love the whooshing noise they make as they go by.",
"The story so far: \n In the beginning the Universe was created. \nThis has made a lot of people very angry and been widely regarded as a bad move.",


  
];


//-- references
var list = document.getElementById('searches');
var randomBtn = document.getElementById('Random');

//Event Listeners
randomBtn.addEventListener("click", randomRecipe)



//const skillsSelect = document.getElementById("selectNumber");

//Lists to hold the API data
var recipeList = [];
var categoriesList = []; // Stored Categories

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

  //-- APi request
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
    .then(data => {
      console.log('categories:', data);
     

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
  if (menuId == null) { 
    console.log('menuId is null, setting default value.'); menuId = 'list1'; 
    return;
  }

  if (category == null) { 
    console.log('category is null, exiting function.'); 
    return;
  }

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

function updateMenu(){

const ingrediantsEl = document.getElementById('Ingredients');
const categoryLi = document.createElement("li") // Create an empty Li element

// while (ingrediantsEl.firstChild) ul.removeChild(ul.firstChild);
categoryLi.innerHTML = ""; // Clear the existing content of the list

var node= document.getElementById("list1-parent");
while (node.firstChild) {
    node.removeChild(myNode.firstChild);
}

var node= document.getElementById("parent");
node.querySelectorAll('*').forEach(n => n.remove());

}


function OnMenuButtonSelect() {
console.log('Menu item selected:', this.textContent);
chosenCat = this.textContent;

//Updaate the menu name to show selected category
const parentButton = document.getElementById('list1-parent');
parentButton.textContent = chosenCat;



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
        recipeList.push(meal); // We add our recipes to the recipe list so we can call it in the random generator

       //console.log('Meal added:', meal.strMeal); 
      });
        
    })

    .then(() => {

       randomSelection(); 
    }) // We add this in to ensure the recipe list is fully updated before we call the random generator
    
    


    recipeList.forEach((element) => 
      {   

        console.log('Recipe in chosen category:', element);
      });
      

}




function randomSelection(){
  if (!recipeList.length) {
    console.warn('recipeList empty'); // Ensuring the recipe list isnt empty
    return ;
  }

  const randomElement = recipeList[Math.floor(Math.random() * recipeList.length)];

  console.log('Randomly selected recipe:', randomElement.strMeal);

  details = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomElement.idMeal}`)
    .then(response => response.json())
    .then(data => {
       console.log('Meal Details:', data.meals[0].strCategory, data.meals[0].strArea, data.meals[0].strInstructions, data.meals[0].strMealThumb);
      // showMealDetails(data.meals[0]);

      //update the image of the chosen recipe
      const recipeImage = document.getElementById('recipe-image');
      recipeImage.src = data.meals[0].strMealThumb;

      //Update recipe title
      const recipeTitle = document.getElementById('recipe-title');
      recipeTitle.textContent = data.meals[0].strMeal;

      //update recipe text
      const recipeText = document.getElementById('ingredient-text');
      recipeText.textContent = data.meals[0].strInstructions;


      // Update Recipe 
    const recipeEl = document.getElementById("recipe-parent");
    const recipeLi = document.createElement("li") // Create an empty Li element
   
      
    //Now we populate the A element details
    recipeLi.className = "recipe-item"; 
    recipeLi.textContent = data.meals[0].strIngredient1;

    //List Element for ingrediants
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent =data.meals[0].strIngredient1;
          recipeEl.appendChild(li);

          const li2 = document.createElement('li');
          li2.className = 'list-group-item';
          li2.textContent =data.meals[0].strIngredient2;
          recipeEl.appendChild(li2);

          const li3 = document.createElement('li');
          li3.className = 'list-group-item';
          li3.textContent =data.meals[0].strIngredient3;
          recipeEl.appendChild(li3);

          const li4 = document.createElement('li');
          li4.className = 'list-group-item';
          li4.textContent =data.meals[0].strIngredient4;
          recipeEl.appendChild(li4);

          const li5 = document.createElement('li');
          li5.className = 'list-group-item';
          li5.textContent =data.meals[0].strIngredient5;
          recipeEl.appendChild(li5);

          const li6 = document.createElement('li');
          li6.className = 'list-group-item';
          li6.textContent =data.meals[0].strIngredient6;
          recipeEl.appendChild(li6);

          const li7 = document.createElement('li');
          li7.className = 'list-group-item';
          li7.textContent =data.meals[0].strIngredient7;
          recipeEl.appendChild(li7);


          const li8 = document.createElement('li');
          li8.className = 'list-group-item';
          li8.textContent =data.meals[0].strIngredient8;
          recipeEl.appendChild(li8);

          const li9 = document.createElement('li');
          li9.className = 'list-group-item';
          li9.textContent =data.meals[0].strIngredient9;
          recipeEl.appendChild(li9);

          const li10 = document.createElement('li');
          li10.className = 'list-group-item';
          li10.textContent =data.meals[0].strIngredient10;
          recipeEl.appendChild(li10);

          const li11 = document.createElement('li');
          li11.className = 'list-group-item';
          li11.textContent =data.meals[0].strIngredient11;
          recipeEl.appendChild(li11);

    //To Do add logic of on select event
    //Append A element to Li element and then append Li element to the Menu
    // recipeLi.appendChild(recipeA); //append it to the dropdown
    recipeEl.appendChild(recipeLi); //append it to the menu

      console.log("Recipe Ingredients: " , data.meals[0].strIngredient1);

      newQuote();

      console.log('Meal Details:', data.meals[0].strCategory, data.meals[0].strArea, data.meals[0].strInstructions, data.meals[0].strMealThumb);
    //Filling in the rest of the details

    })  
   
}

function newQuote() {

  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  const quoteTextEl = document.getElementById('quote-text');
  quoteTextEl.textContent = randomQuote;

  const quoteAuthorEl = document.getElementById('quote-author');
  quoteAuthorEl.textContent = " - " + "Douglas Adams";
  
}
function onClickSearhButton() {ha

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




