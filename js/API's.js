const mealDisplayRow = document.getElementById("DisplayRow");
const search = document.getElementById("search");

// display functions
function display(arr) {
  let mealBox = "";
  //   console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    mealBox += `
        <div class="col-md-3">
            <div id="meal" data-id="${arr[i].idMeal}" class="meal position-relative overflow-hidden">
              <img src="${arr[i].strMealThumb}" class="w-100" alt="">
              <div class="meal-overlay">
                <h3 id="strMeal">${arr[i].strMeal}</h3>
              </div>
            </div>
          </div> `;
  }

  mealDisplayRow.innerHTML = mealBox;
}

export async function displayMeals() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    response = await response.json();
    response = response.meals;
    display(response);
    // console.log(response);

    let mealCard = document.querySelectorAll(".meal");
    mealCard.forEach((meal) => {
      $(meal).click(function () {
        let x = $(meal).attr("data-id");
        mealDetails(x);
      });
    });
  } catch (err) {
    console.log("error", err);
  }
}

// search section
export function searchBox() {
  search.innerHTML = `<div class="row fixed-top pt-3 px-5 mx-5 z-0">
        <div class="col-md-6">
          <input id="searchByName" type="text" name="searchName" class="form-control bg-transparent text-white" placeholder="Search meal by Name">
        </div>
        <div class="col-md-6">
          <input id="searchByFirstL" type="text" maxlength="1" name="searchLetter" class="form-control bg-transparent text-white" placeholder="Search meal by First Letter">
        </div>
    </div>`;

  mealDisplayRow.innerHTML = "";

  $("#searchByName").on("input", function () {
    let name = $(this).val();
    // console.log("name");
    searchByName(name);
  });

  $("#searchByFirstL").on("input", function () {
    let firstL = $(this).val();
    // console.log(firstL);
    searchByFirstL(firstL);
  });
}

async function searchByName(name) {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    data = await data.json();
    if (data.meals) {
      display(data.meals);
    } else {
      mealDisplayRow.innerHTML = `<p class="not-found text-white">No meals found</p>`;
    }
    let mealCard = document.querySelectorAll(".meal");
    mealCard.forEach((meal) => {
      $(meal).click(function () {
        let x = $(meal).attr("data-id");
        mealDetails(x);
      });
    });
  } catch (err) {
    console.log("error", err);
  }
}

async function searchByFirstL(letter) {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    data = await data.json();
    if (data.meals) {
      display(data.meals);
    } else {
      mealDisplayRow.innerHTML = `<p class="not-found text-white">No meals found</p>`;
    }
    let mealCard = document.querySelectorAll(".meal");
    mealCard.forEach((meal) => {
      $(meal).click(function () {
        let x = $(meal).attr("data-id");
        mealDetails(x);
      });
    });
  } catch (err) {
    console.log("error", err);
  }
}

// category section
function showCategory(arr) {
  let mealBox = "";
  //   console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    mealBox += `
        <div class="col-md-3">
            <div data-id="${
              arr[i].idCategory
            }" class="meal overflow-hidden position-relative">
              <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
              <div class="category-overlay">
                <h3 id="strMeal">${arr[i].strCategory}</h3>
                <p class="text-center">${arr[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div> `;
  }
  mealDisplayRow.innerHTML = mealBox;
}

export async function searchByCategory() {
  mealDisplayRow.innerHTML = "";
  search.innerHTML = "";
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php
`
    );
    data = await data.json();
    showCategory(data.categories);
  } catch (err) {
    console.log("error", err);
  }
}

// area section
function showArea(arr) {
  let mealBox = "";
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    mealBox += `
      <div class="col-md-3">
          <div class="meal categories">
            <h3>${arr[i].strArea}</h3>
          </div>
        </div> `;
  }
  mealDisplayRow.innerHTML = mealBox;
}

export async function searchByArea() {
  mealDisplayRow.innerHTML = "";
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    data = await data.json();
    console.log(data.meals);
    showArea(data.meals);
  } catch (err) {
    console.log("error", err);
  }
}

function showIngredients(arr) {
  let mealBox = "";
  //   console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    mealBox += `
        <div class="col-md-3 text-white text-center ingredients">
            <div data-id="${arr[i].idIngredient}" class="meal">
              <i class="fa-solid fa-drumstick-bite fa-4x pb-3 m-1"></i>
              <div>
                <h3 id="strMeal">${arr[i].strIngredient}</h3>
                <p class="text-center">${arr[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div> `;
  }
  mealDisplayRow.innerHTML = mealBox;
}

export async function searchByIngredients() {
  mealDisplayRow.innerHTML = "";
  search.innerHTML = "";
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    data = await data.json();
    showIngredients(data.meals.slice(0, 20));
  } catch (err) {
    console.log("error", err);
  }
}

export async function mealDetails(id) {
  mealDisplayRow.innerHTML = "";
  search.innerHTML = "";
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    data = await data.json();
    // let mealName = data.meals;
    console.log(data.meals);
    showMealDetails(data.meals);
  } catch (err) {
    console.log("error", err);
  }
}

function showMealDetails(meal) {
  mealDisplayRow.innerHTML = "";

  let ingredients = "";

  for (let i = 1; i < 21; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal[0].strTags?.split(",");
  console.log(tags);
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  mealDisplayRow.innerHTML += `<div id="displayDetails">
            <div class="row min-vh-100 m-md-5 text-white">
              <div class="col-md-4" id="${meal[0].idMeal}">
                <img src="${meal[0].strMealThumb}" alt="" class="w-100">
                <h2 class="text-center mt-3">${meal[0].strMeal}</h2>
              </div>
              <div class="col-md-8">
                <h2>Instructions :</h2>
                <p>${meal[0].strInstructions}</p>
                <h4>Area: ${meal[0].strArea}</h4>
                <h4>category: ${meal[0].strCategory}</h4>
                <h4>Recipes :</h4>
                <ul class="list-unstyled d-flex flex-wrap">
                  ${ingredients}
                </ul>
                <h4>Tags :</h4>
                <ul class="list-unstyled d-flex">
                  ${tagsStr}
                </ul>
                <div class="sources">
                  <a href="${meal[0].strSource}" class="btn btn-success me-2">Source</a>
                  <a href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
              </div>

            </div>
          </div>`;
}
export function showContact() {
  mealDisplayRow.innerHTML = `
  <form id="contactUS" class="row align-items-center w-75 m-auto">
            <div class="col-md-6 pb-3">
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Enter Your Name"
              />
          <span class="error" id="nameError"></span>
            </div>
            <div class="col-md-6 pb-3">
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Enter Your Email"
              />
          <span class="error" id="emailError"></span>
            </div>
            <div class="col-md-6 pb-3">
              <input
                id="phone"
                type="tel"
                class="form-control"
                placeholder="Enter Your Phone"
              />
          <span class="error" id="phoneError"></span>
            </div>
            <div class="col-md-6 pb-3">
              <input
                id="age"
                type="number"
                class="form-control"
                placeholder="Enter Your Age"
              />
          <span class="error" id="ageError"></span>
            </div>
            <div class="col-md-6 pb-3">
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="Enter Your password"
              />
          <span class="error" id="passwordError"></span>
            </div>
            <div class="col-md-6 pb-3">
              <input
                id="confirmPassword"
                type="password"
                class="form-control"
                placeholder="Re-enter Your Password"
              />
          <span class="error" id="confirmPasswordError"></span>
            </div>

            <div class="row m-auto w-25">
              <button id="submitBtn" type="submit" class="btn btn-outline-danger" disabled>Submit</button>
            </div>
            
        </form>`;

  validateContactForm();
}

function validateContactForm() {
  const form = document.getElementById("contactUs");
  const submitBtn = document.getElementById("submitBtn");

  const inputs = {
    name: {
      element: document.getElementById("name"),
      regex: /^[a-zA-Z\s]+$/,
      errorElement: document.getElementById("nameError"),
      errorMessage: "Please enter a valid name (letters and spaces only).",
    },
    email: {
      element: document.getElementById("email"),
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorElement: document.getElementById("emailError"),
      errorMessage: "Please enter a valid email address.",
    },
    phone: {
      element: document.getElementById("phone"),
      regex: /^\d{11}$/,
      errorElement: document.getElementById("phoneError"),
      errorMessage: "Please enter a valid phone number.",
    },
    age: {
      element: document.getElementById("age"),
      regex: /^(?:1[89]|[2-9]\d)$/,
      errorElement: document.getElementById("ageError"),
      errorMessage: "Please enter a valid age (18 or older).",
    },
    password: {
      element: document.getElementById("password"),
      regex: /^.{6,}$/,
      errorElement: document.getElementById("passwordError"),
      errorMessage: "Password must be at least 6 characters long.",
    },
    confirmPassword: {
      element: document.getElementById("confirmPassword"),
      errorElement: document.getElementById("confirmPasswordError"),
      errorMessage: "Passwords do not match.",
    },
  };

  function validateInput(input) {
    const { element, regex, errorElement, errorMessage } = input;
    let isValid = true;

    if (regex) {
      isValid = regex.test(element.value);
    }

    if (element.id === "confirmPassword") {
      isValid = element.value === inputs.password.element.value;
    }

    errorElement.textContent = isValid ? "" : errorMessage;
    return isValid;
  }

  function validateForm() {
    let isFormValid = true;

    for (const key in inputs) {
      if (!validateInput(inputs[key])) {
        isFormValid = false;
      }
    }

    submitBtn.disabled = !isFormValid;
  }

  for (const key in inputs) {
    inputs[key].element.addEventListener("input", validateForm);
  }

  submitBtn.addEventListener("click", function () {
    mealDisplayRow.innerHTML = `<div id="submitMessage" class="d-flex justify-content-center align-items-center">
              <h3 class="bg-success text-center p-3">Contact details have been submitted successfully</h3>
            </div>`;
  });
}

