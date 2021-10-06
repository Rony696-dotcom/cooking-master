document.getElementById("searchBtn").addEventListener("click", function () {
  const searchInput = document.getElementById("search-Input").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((res) => res.json())
    .then((data) => displayMenu(data))
    .catch((error) => alert("places Enter the Food Name"));
});

const displayMenu = (menuList) => {
  const menuContainer = document.getElementById("menu-container");

  for (let i = 0; i < menuList.meals.length; i++) {
    const menu = menuList.meals[i];
    //console.log(menu);
    const menuDiv = document.createElement("div");

    const menuInfo = `
            <a href="#main-menu" class="" onclick="allFoodDiv(${menu.idMeal})">
                <img class="meal-img" src=${menu.strMealThumb}>
                <div class="card p-2">
                    <h5>${menu.strMeal}</h5>
                </div>
            </a>
        `;
    menuDiv.innerHTML = menuInfo;
    menuContainer.appendChild(menuDiv);
  }
};

const allFoodDiv = (mealID) => {
  const eachFood = document.getElementById("details-ingredient");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const addHtml = `
        <div class="single-food d-flex justify-content-center">

        <div class="card" style="width: 18rem">
        <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.meals[0].strMeal}</h5>
          <div class="single-food-second-div">
                <h6>Ingredients: </h6>
                <ul>
                    <li>${data.meals[0].strIngredient1}</li>
                    <li>${data.meals[0].strIngredient2}</li>
                    <li>${data.meals[0].strIngredient3}</li>
                    <li>${data.meals[0].strIngredient4}</li>
                    <li>${data.meals[0].strIngredient5}</li>
                    <li>${data.meals[0].strIngredient6}</li>
                </ul>
            </div>
        </div>
      </div>

            
        </div>
    `;
      eachFood.innerHTML = addHtml;
    });
};
