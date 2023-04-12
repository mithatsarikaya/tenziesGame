//gerenerate random number between 1-6, you know why
function generateDiceNumber() {
  return Math.ceil(Math.random() * 6);
}
let diceDivs = document.querySelectorAll(".dice--face");

function checkIfTenzie() {
  let classListOfDivs = [];
  diceDivs.forEach((d) => {
    classListOfDivs.push({
      value: d.innerText,
      isHeld: Object.values(d.classList).includes("clicked"),
    });
  });

  //check if they all held
  let areAllHeld = classListOfDivs.every((c) => c.isHeld === true);
  //get one value from dices
  let oneValueFromGame = classListOfDivs[0].value;
  //check if they all same value
  let areAllSame = classListOfDivs.every((c) => c.value === oneValueFromGame);

  //if winning conditions are okey, then ask user for a new game
  if (areAllHeld && areAllSame) {
    if (confirm("Do you want to play new game?")) {
      window.location.reload();
    }
  }
}

//in order held dice add them the new class "clicked"
//if they have it remove it if they have not then add it
diceDivs.forEach((d) => {
  d.addEventListener("click", (e) => {
    let isClicked = !Object.values(e.target.classList).includes("clicked");
    e.target.classList.toggle("clicked", isClicked);
    checkIfTenzie();
  });
});

function rollDices() {
  diceDivs.forEach((d) => {
    //roll dices if they are not held
    if (!Object.values(d.classList).includes("clicked")) {
      d.innerText = generateDiceNumber();
    }
  });
}

rollDices();
checkIfTenzie();

const rollBtn = document.querySelector(".roll-dice");

//rollBtn
rollBtn.addEventListener("click", () => {
  rollDices();
  checkIfTenzie();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "b") {
    rollBtn.click();
  }
});
