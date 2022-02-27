function defaultShow(){
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=a`
  fetch(url)
  .then(res => res.json())
  .then(data=> displaySearchResult(data.meals))
}
const displaySearchResult = (meals) => {
  Loading('none');
  const maindiv = document.getElementById('searchResult');
  maindiv.innerHTML = '';
  document.getElementById('mealDetails').innerHTML = '';
  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col', 'd-flex', 'justify-content-center','rounded');

    div.innerHTML = `
        <div onclick="loadMealDetails('${
          meal.idMeal
        }')" class="card w-100 g-4  mb-5 h-100">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 151)}</p>
  </div>
</div>
        `;

    maindiv.appendChild(div);
  });
};
defaultShow()
const Loading = (value) => {
  document.getElementById('spinner').style.display = value;
};
const searchFood = () => {
  Loading('block');
  const maindiv = document.getElementById('searchResult');
  maindiv.innerHTML = '';
  const Mealdit = document.getElementById('mealDetails');
  Mealdit.innerHTML = '';
  let Searchfield = document.getElementById('input');
  let Searchvalue = Searchfield.value;
  const calculateLenght = Searchvalue.toString();
  //  check empty
  if (calculateLenght.length == 0) {
    // document.querySelector(".ErrorName").style.display="block"
    Loading('none');
    ErrorHandle('block');
  } else {
    ErrorHandle('none');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${Searchvalue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals))
      .catch((error) => ErrorHandle('block'));
    Searchfield.value = '';
  }
};
//check valid iput
const ErrorHandle = (show) => {
  document.querySelector('.ErrorName').style.display = show;
};
ErrorHandle('none');

const loadMealDetails = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaymealdetails(data.meals));
};

const displaymealdetails = (meals) => {
  Loading('block');
  const Mealdit = document.getElementById('mealDetails');
  Mealdit.innerHTML = '';
  meals.forEach((meal) => {
    const div = document.createElement('div');
    div.classList.add('card', 'border', 'border-dark', 'p-1','w-25',"rounded");
    // div.style.width = '18rem';
    div.style.marginTop='20px'
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
      <a href="${meal.strYoutube}" class="btn btn-warning">Play Tutorial</a>
    </div>

    `;
    Mealdit.appendChild(div);
    Loading('none');
  });
};
