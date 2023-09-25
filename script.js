const today = new Date();
const time = today.getHours();

let activeArray = [];

const body = document.querySelector('body');
const path = document.getElementsByTagName('path');
const circle = document.getElementsByTagName('circle');
const mouseTarget = document.getElementsByClassName("hour");
const line = document.getElementsByClassName("line");

clickOnLine()
main();

function getCurrentTime() {
  if (time >= 5 && time <= 18) {
    body.classList.remove('darkMode');
    setLightMode()
  }
  else {
    body.classList.add('darkMode');
    setDarkMode()
  }
}

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





function addElement(currentActive) {
  let labelDayNight;
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  if (currentActive >= 5 && currentActive <= 18) {
    labelDayNight = `${currentActive}00`;
  }
  else {
    labelDayNight = "Night";
  }
  const newContent = document.createTextNode(labelDayNight);

  // add the text node to the newly created div
  newDiv.classList.add('lineIcon');
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementsByClassName("line-holder");
  let parentDiv = currentDiv[currentActive].parentNode;
  parentDiv.insertBefore(newDiv, currentDiv[currentActive]);
}

function removeElement() {


  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementsByClassName("lineIcon");
  currentDiv[0].remove();

}

function clickOnLine(){

  let currentActive = time;

  for (let index = 0; index < mouseTarget.length; index++) {
    mouseTarget[index].addEventListener("click", (e) => {
      if (index !== currentActive) {
        
        activeArray[currentActive] = false
        line[currentActive].style.transform = 'translate3d(0,25px,0)'
        activeArray[index] = true
        removeElement()
        currentActive = index;
        line[currentActive].style.transform = 'translate3d(0,0,0)'
        if (activeArray[index + 1] === false) {
          line[index + 1].style.transform = 'translate3d(0,25px,0)'
        }
        if (activeArray[index - 1] === false) {
          line[index - 1].style.transform = 'translate3d(0,25px,0)'
        }
        addElement(currentActive)
      }
      if (index >= 5 && index < 19) {
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

  for (let activeIndex = 0; activeIndex < mouseTarget.length; activeIndex++) {
    if (activeIndex != time) {
      activeArray[activeIndex] = false;
    } else {
      activeArray[activeIndex] = true;
    }
  }

  getCurrentTime()
  addElement(time)

  // if time is currently 1pm
  // set 12pm and 2pm stikc slightly above
  // set all other stick to false




  //set the current stick to active
  line[time].classList.add("active")

  let transitionString = 'transform 0.1s ease-out';


  for (let index = 0; index < mouseTarget.length; index++) {

    //create another click listener on the hour button
    //when selected change the line to active
    //reset previous active line to not active and reset its position


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