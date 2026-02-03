


function sendFetchRequest() {

fetch('https://quoteslate.vercel.app/api/quotes/random')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
}





document.getElementById("fetch").addEventListener("click", sendFetchRequest);
