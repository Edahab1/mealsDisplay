/* <reference types="../@types/jquery"/> */
import {
  displayMeals,
  searchBox,
  searchByCategory,
  searchByArea,
  searchByIngredients,
  showContact,
} from "./API's.js";

// display  meals on loading website
$(window).on("load", function(){
  closeMenu()
  displayMeals();
})

$(".logo").click(() => {
  closeMenu()
  displayMeals();
});

/*menubar button action*/
// open menu
function openMenu() {
  $(".menu-bar").css("left", "0");
  $(".aside-navbar").css("left", "250px");
  $(".menu-icon").addClass("d-none");
  $(".close").addClass("d-block").removeClass("d-none");

  for (let i = 0; i < 5; i++) {
    $(".links ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
$(".menu-icon").click(() => {
  openMenu();
});

// close menu
function closeMenu() {
  $(".menu-bar").css("left", "-225px");
  $(".aside-navbar").css("left", "0");
  $(".menu-icon").addClass("d-block");
  $(".menu-icon").removeClass("d-none");
  $(".close").addClass("d-none");
  $(".close").removeClass("d-block");

  $(".links ul li").animate(
    {
      top: 150,
    },
    200
  );
}
$(".close").click(() => {
  closeMenu();
});

// click on search
$(".links #searchLink").click(() => {
  closeMenu();
  searchBox();
});

// click on category
$(".links #category").click(() => {
  closeMenu();
  searchByCategory();
});

// click on area
$(".links #area").click(() => {
  closeMenu();
  searchByArea();
});

$(".links #ingredient").click(() => {
  closeMenu();
  searchByIngredients();
});

$(".links #contact").click(() => {
  closeMenu();
  showContact();
});

$("main").click(()=>{
  closeMenu()
})