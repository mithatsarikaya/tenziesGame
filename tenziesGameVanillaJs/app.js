//gerenerate random number between 1-6, you know why
function generateDiceNumber() {
  return Math.ceil(Math.random() * 6);
}
let diceDivs = document.querySelectorAll(".dice--face");

//in order held dice add them the new class "clicked"
//if they have it remove it if they have not then add it
diceDivs.forEach((d) => {
  d.addEventListener("click", (e) => {
    let isClicked = !Object.values(e.target.classList).includes("clicked");
    console.log(isClicked);
    e.target.classList.toggle("clicked", isClicked);
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

const rollBtn = document.querySelector(".roll-dice");

//rollBtn
rollBtn.addEventListener("click", () => rollDices());

document.addEventListener("keydown", (e) => {
  if (e.key === "b") {
    rollBtn.click();
  }
});
