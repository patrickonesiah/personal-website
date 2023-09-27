// Initialize varaibles, arrays and get elements
const today = new Date();
const time = today.getHours();
const dayTime = 7;
const nightTime = 18;

let activeArray = [];

const body = document.querySelector('body');
const path = document.getElementsByTagName('path');
const circle = document.getElementsByTagName('circle');
const mouseTarget = document.getElementsByClassName("hour");
const line = document.getElementsByClassName("line");

//Functions are invoke to start listening or waiting for a click
clickOnLine()
main();

// Get current time to switch website's theme color to dark or light mode
function getCurrentTime() {
  if (time >= dayTime && time <= nightTime) {
    body.classList.remove('darkMode');
    setLightMode()
  }
  else {
    body.classList.add('darkMode');
    setDarkMode()
  }
}

// Set the icons on the left based on the dark or light mode
function setLightMode(){
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

function setDarkMode(){
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
  //Create a new div element
  const newDiv = document.createElement("div");

  //Check if the hour is before or after 12
  let amPm = currentActive >= 12 ? 'pm' : 'am';

  //Whatever remains is the hour
  let hour = (currentActive % 12) || 12;

  //Set the label to current time
  if (currentActive >= dayTime && currentActive <= nightTime) {
    labelDayNight = `${hour}:00${amPm}`;
  }
  else {
    labelDayNight = "Night";
  }
  const newContent = document.createTextNode(labelDayNight);

  // Add the text node to the newly created div
  newDiv.classList.add('lineIcon');
  newDiv.appendChild(newContent);

  // Add the newly created element and its content into the DOM
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

  let currentActive = time;

  // Loop through all hour buttons and listen for a mouse click
  for (let index = 0; index < mouseTarget.length; index++) {
    mouseTarget[index].addEventListener("click", (e) => {
      //If the current hour button is not the active line
      if (index !== currentActive) {
        //Set previously active line to false
        activeArray[currentActive] = false
        //Move up y-axis
        line[currentActive].style.transform = 'translate3d(0,25px,0)'
        //Set the new active line to true
        activeArray[index] = true
        //Remove the text above the line
        removeElement()
        //Set the currentActive to the new index
        currentActive = index;
        //Move down line to its original position
        line[currentActive].style.transform = 'translate3d(0,0,0)'
        //Move up its neighbouring line that are not currently active
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,25px,0)'
        }
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,25px,0)'
        }
        //Add the text above the line
        addElement(currentActive)
      }
      //Set the website color theme based on the hour
      if (index >= dayTime && index <= nightTime) {
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

  //Initialize a boolean array for the active/inactive lines
  for (let activeIndex = 0; activeIndex < mouseTarget.length; activeIndex++) {
    if (activeIndex != time) {
      activeArray[activeIndex] = false;
    } else {
      activeArray[activeIndex] = true;
    }
  }

  getCurrentTime()
  //Add the innerHtml to the above of the active line
  addElement(time)

  //set the current line to active
  line[time].classList.add("active")

  //Transition values
  let transitionString = 'transform 0.1s ease-out';


  for (let index = 0; index < mouseTarget.length; index++) {

    //create another click listener on the hour button
    //when selected change the line to active
    //reset previous active line to not active and reset its position
    //Neighbouring lines to active line need to raise 50% and lower
    mouseTarget[index].addEventListener("mouseover", (e) => {
      if (activeArray[index] === false) {
        line[index].style.transform = 'translate3d(0,0,0)'
        line[index].style.transition = transitionString
      }

      if (index == 0 && activeArray[index] === false) {
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,12px,0)'
          line[index + 1].style.transition = transitionString
        }
      }

      if (index == (mouseTarget.length - 1) && activeArray[index] === false) {
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,12px,0)'
          line[index - 1].style.transition = transitionString
        }
      }

      if (index > 0 && index < (mouseTarget.length - 1) && activeArray[index] === false) {
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,12px,0)'
          line[index + 1].style.transition = transitionString
        }
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,12px,0)'
          line[index - 1].style.transition = transitionString
        }
      }
    });

    mouseTarget[index].addEventListener("mouseout", (e) => {
      if (activeArray[index] === false) {
        line[index].style.transform = 'translate3d(0,25px,0)'
      }

      if (index == 0 && activeArray[index] === false) {
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,25px,0)'
        }
      }

      if (index == (mouseTarget.length - 1) && activeArray[index] === false) {
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,25px,0)'
        }
      }

      if (index > 0 && index < (mouseTarget.length - 1) && activeArray[index] === false) {
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,25px,0)'
        }
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,25px,0)'
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