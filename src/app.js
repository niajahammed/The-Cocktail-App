const inputBar = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const displayContainer = document.getElementById("display-cocktail");

document.addEventListener("DOMContentLoaded", () => {
  fetchCocktail();
});

async function fetchCocktail () {
  try {
    let URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`;

    await fetch(URL)
          .then((res) => res.json())
          .then((data) => displayCocktail(data.drinks.slice(0, 20)));
  } catch (e) {
    alert("Something went wrong!");
  }
}

function displayCocktail (cocktailList) {
  displayContainer.innerHTML = "";

  if (!cocktailList || cocktailList.length === 0) {
    displayContainer.innerHTML = `
      <p class="text-white text-xl col-span-full text-center">No cocktails found.</p>`;
      return;
  }

  let cardHtml = "";
  cocktailList.forEach ((cocktail) => {
    cardHtml += `
      <div class="px-2 py-3 border border-gray-500 my-3 min-h-[300px] rounded-xl flex flex-col h-full">
        <img src="${cocktail.strDrinkThumb}" alt="" class="rounded-xl object-cover h-[200px] w-full">
        <h3 class="text-xl text-white my-4">
          ${cocktail.strDrink}
        </h3>
        <p class="text-xl text-gray-300 mb-3">
          ${cocktail.idDrink}
        </p>
        <button class="btn py-2 px-3 mt-auto">
          VIEW DETAILS
        </button>
      </div>
    `;
  });
  displayContainer.innerHTML = cardHtml;
}

async function searchByFirstLetter () {
  const query = inputBar.value.trim();

  if (query) {
    const firstLetter = query.charAt(0);
    let firstURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

    try {
      const res = await fetch(firstURL);
      const data = await res.json();

      displayCocktail(data.drinks || []);
    } catch (e) {
      alert("Failed to search cocktails");
    }
  } else {
    alert("Please enter a letter to search!");
  }
}

searchBtn.addEventListener("click", () => {
  searchByFirstLetter();
});