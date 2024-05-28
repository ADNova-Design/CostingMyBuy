var tabs_buttons = document.querySelectorAll(".button_icon");
var pages = document.querySelectorAll(".page");
var circle = document.querySelector("#circle");

var current = 1;

set_circle_position(current);

function select_page(n) {
  for (var i = 0; i < tabs_buttons.length; i++) {
    pages[i].classList.remove("out_left");
    pages[i].classList.remove("in_left");
    pages[i].classList.remove("out_right");
    pages[i].classList.remove("in_right");
    if (i === n) {
      tabs_buttons[i].classList.add("button_icon_selected");
      pages[i].classList.add("page_active");
    } else {
      tabs_buttons[i].classList.remove("button_icon_selected");
      pages[i].classList.remove("page_active");
    }
  }
  set_circle_position(n);

  if (n > current) {
    pages[current].classList.add("out_left");
    pages[n].classList.add("in_right");
  } else if (n < current) {
    pages[current].classList.add("out_right");
    pages[n].classList.add("in_left");
  }
  current = n;
}

function set_circle_position(n) {
  var left =
    tabs_buttons[n].querySelector("i").getBoundingClientRect().left -
    document.querySelector("#nav").getBoundingClientRect().left;
  circle.style.left = left + "px";
}

window.onresize = function () {
  set_circle_position(current);
};