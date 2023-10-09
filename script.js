// Initialize varaibles, arrays and get elements
const today = new Date();
const currentHour = today.getHours();
const currentMinutes = today.getMinutes();
const dayTime = 7;
const nightTime = 18;

let activeArray = [];

const body = document.querySelector('body');
const path = document.getElementsByTagName('path');
const circle = document.getElementsByTagName('circle');
const hourClass = document.getElementsByClassName("hour");
const line = document.getElementsByClassName("line");

//Functions are invoke to start listening or waiting for a click
clickOnLine()
main();

// Set website's theme color to dark or light mode for the social media icons and website
function setWebsiteTheme() {
  if (currentHour >= dayTime && currentHour <= nightTime) {
    body.classList.remove('darkMode');
    setIconsLightMode()
  }
  else {
    body.classList.add('darkMode');
    setIconsDarkMode()
  }
}

// Set the icons on the left based on the dark or light mode
function setIconsLightMode(){
  for(let i = 0; i < path.length; i++){

    if(path[i].getAttribute('fill') === 'none'){
      path[i].setAttribute('fill', 'none');
    }else {
      path[i].setAttribute('fill', '#ff9823');
      circle[0].setAttribute('fill', '#ff9823');
    }

    if(path[i].getAttribute('stroke') === '#EE6C4D'){
      path[i].setAttribute('stroke', '#ff9823');
      circle[0].setAttribute('stroke', '#ff9823');
    }  

  }
}

function setIconsDarkMode(){
  for(let i = 0; i < path.length; i++){

    if(path[i].getAttribute('fill') === 'none'){
      path[i].setAttribute('fill', 'none');
    }else {
      path[i].setAttribute('fill', '#EE6C4D');
      circle[0].setAttribute('fill', '#EE6C4D');
    }

    if(path[i].getAttribute('stroke') === '#ff9823'){
      path[i].setAttribute('stroke', '#EE6C4D');
      circle[0].setAttribute('stroke', '#EE6C4D');
    }  

  }
}



//Add text to the top of the active line
function addElement(currentActive) {

  let labelDayNight;
  const newDiv = document.createElement("div");
  let amPm = currentActive >= 12 ? 'PM' : 'AM';
  let hour = (currentActive % 12) || 12;
  let minutes = (currentMinutes < 10 ? '0' : '')  + currentMinutes;
  
  if (currentActive >= dayTime && currentActive <= nightTime) {
    labelDayNight = `${hour}:${minutes}${amPm}`;
  }
  else {
    labelDayNight = "Night";
  }
  const newContent = document.createTextNode(labelDayNight);

  newDiv.classList.add('lineIcon');
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementsByClassName("line-holder");
  let parentDiv = currentDiv[currentActive].parentNode;
  parentDiv.insertBefore(newDiv, currentDiv[currentActive]);
}

//Remove element on the top of the active line when is not active
function removeElement() {
  const currentDiv = document.getElementsByClassName("lineIcon");
  currentDiv[0].remove();
}

//The logic for line is selected and becomes active.
//Set the website theme's color
function clickOnLine(){

  let currentActive = currentHour;

  for (let i = 0; i < hourClass.length; i++) {
    hourClass[i].addEventListener("click", (e) => {

      if (i !== currentActive) {

        activeArray[currentActive] = false

        line[currentActive].style.transform = 'translate3d(0,25px,0)'

        activeArray[i] = true
        removeElement()
        currentActive = i;
  
        line[currentActive].style.transform = 'translate3d(0,0,0)'
  
        if (activeArray[i + 1] === false) {
          line[i + 1].style.transform = 'translate3d(0,25px,0)'
        }
        if (activeArray[i - 1] === false) {
          line[i - 1].style.transform = 'translate3d(0,25px,0)'
        }
        addElement(currentActive)
      }
      if (i >= dayTime && i <= nightTime) {
        body.classList.remove('darkMode');
        setLightMode()
      }
      else {
        body.classList.add('darkMode');
        setDarkMode()
      }
    });
  }
}

function main() {
  //Transition values
  let transitionString = 'transform 0.1s ease-out';
  let originalLinePos = 'translate3d(0,0,0)';
  let halfLinePos = 'translate3d(0,12px,0)';
  let belowHalfLinePos = 'translate3d(0,25px,0)';

  //Initialize a boolean array for the active/inactive lines
  for (let i = 0; i < hourClass.length; i++) {
    if (i != currentHour) {
      activeArray[i] = false;
    } else {
      activeArray[i] = true;
    }
  }

  setWebsiteTheme()
  addElement(currentHour)

  line[currentHour].classList.add("active")

  for (let j = 0; j < hourClass.length; j++) {

    //create another click listener on the hour button
    //when selected change the line to active
    //reset previous active line to not active and reset its position
    //Neighbouring lines to active line need to raise 50% and lower
    hourClass[j].addEventListener("mouseover", (e) => {
      if (activeArray[j] === false) {
        line[j].style.transform = originalLinePos
        line[j].style.transition = transitionString
      }

      if (j == 0 && activeArray[j] === false) {
        if (activeArray[j + 1] === false) {
          line[j + 1].style.transform = halfLinePos
          line[j + 1].style.transition = transitionString
        }
      }

      if (j == (hourClass.length - 1) && activeArray[j] === false) {
        if (activeArray[j - 1] === false) {
          line[j - 1].style.transform = halfLinePos
          line[j - 1].style.transition = transitionString
        }
      }

      if (j > 0 && j < (hourClass.length - 1) && activeArray[j] === false) {
        if (activeArray[j + 1] === false) {
          line[j + 1].style.transform = halfLinePos
          line[j + 1].style.transition = transitionString
        }
        if (activeArray[j - 1] === false) {
          line[j - 1].style.transform = halfLinePos
          line[j - 1].style.transition = transitionString
        }
      }
    });

    hourClass[j].addEventListener("mouseout", (e) => {
      if (activeArray[j] === false) {
        line[j].style.transform = belowHalfLinePos
      }

      if (j == 0 && activeArray[j] === false) {
        if (activeArray[j + 1] === false) {
          line[j + 1].style.transform = belowHalfLinePos
        }
      }

      if (j == (hourClass.length - 1) && activeArray[j] === false) {
        if (activeArray[j - 1] === false) {
          line[j - 1].style.transform = belowHalfLinePos
        }
      }

      if (j > 0 && j < (hourClass.length - 1) && activeArray[j] === false) {
        if (activeArray[j + 1] === false) {
          line[j + 1].style.transform = belowHalfLinePos
        }
        if (activeArray[j - 1] === false) {
          line[j - 1].style.transform = belowHalfLinePos
        }
      }

    });
  }
}

/** Grabbed an external js libray to do scroll reveal */
window.sr = ScrollReveal({
  reset: false,
  duration: 800,
  easing: 'cubic-bezier(.694,0,.335,1)',
  scale: 1,
  viewFactor: 0.3,
});

ScrollReveal().reveal('.section_left');
ScrollReveal().reveal('.section_right',{delay: 850});
ScrollReveal().reveal('.projectTitle');
ScrollReveal().reveal('.projectRow',{delay: 850});