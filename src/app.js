const inputBar = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const displayContainer = document.getElementById("display-cocktail");
const details = document.getElementById("details");

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
        <img src="${cocktail.strDrinkThumb}" alt="" class="rounded-xl object-cover aspect-square w-full">
        <h3 class="text-xl text-white my-4">
          ${cocktail.strDrink}
        </h3>
        <p class="text-xl text-gray-300 mb-3">
          ${cocktail.idDrink}
        </p>
        <button class="btn py-2 px-3 mt-auto" onclick="detailsUrl('${cocktail.idDrink}')">
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

async function searchByName () {
  const query = inputBar.value;

  if (query) {
    const nameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBar.value}`;

    try {
      const res = await fetch(nameURL);
      const data = await res.json();

      displayCocktail(data.drinks || []);
    } catch (e) {
      alert("Failed to search cocktails");
    }
  } else {
    alert("Please enter a name to search");
  }
}

function detailsUrl (id) {
  let URLDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(URLDetail)
            .then((res) => res.json())
            .then((data) => showDetails(data.drinks[0]));
}

function showDetails (detail) {
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
    <div class="popup bg-white w-[70%] min-h-[500px] p-10">
      <h2 class="text-2xl font-bold mb-4">
        ${detail.strDrink}
      </h2>
      <p class="mb-6">
        ${detail.strInstructions}
      </p>
      <p class="mb-6">
        ${detail.strInstructionsDE}
      </p>
      <p class="mb-6">
        ${detail.strInstructionsES}
      </p>
      <button class="bg-red-500 text-white py-2 px-4 rounded-xl transition duration-300 ease-in cursor-pointer hover:bg-red-700" onclick="closeDetails()">
        CLOSE
      </button>
    </div>
  `;
}

function closeDetails () {
  details.classList.add("invisible");
  details.classList.remove("visible")
}

searchBtn.addEventListener("click", () => {
  searchByFirstLetter();
  searchByName();
});