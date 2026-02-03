


function sendFetchRequest() {

fetch('https://quoteslate.vercel.app/api/quotes/random')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
}

function sendCategoryRequest() {

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
  .then(data => 
    console.log('categories:',data),
    // options.forEach((element) => 
    //   {
    //    // console.log(element);
       
    //   }
    

    //   options.length = 0,
    //   options.push(...data.categories.map(category => category.strCategory))

    
    
    ); //clear existing options
    
 
}




const fetchBtn = document.getElementById("fetch");
if (fetchBtn) fetchBtn.addEventListener("click", sendCategoryRequest);

//------Test API CALL FROM SERVER.JS -------//

var searchTerm = document.getElementById("meal-search");
var searchButton = document.getElementById("search-btn");


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
