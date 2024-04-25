var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var restart = document.getElementById("p3");
var Best_Score = document.getElementById("bestscore");
var scorespan = document.getElementById("scorespan");
var restartBTN = document.getElementById("restatBTN");
var counter = 0;
var bg = document.getElementById("videoBG");

function updateDisplayedBestScore(score) {
  Best_Score.textContent = score;
}

fetch("http://localhost:3000/bestscore")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch best score");
    }
    return response.json();
  })
  .then((data) => {
    updateDisplayedBestScore(data.bestScore);
  })
  .catch((error) => {
    console.error("Error fetching best score:", error);
  });

function updateBestScoreOnBackend(score) {
  fetch("http://localhost:3000/bestscore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score: score }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update best score");
      }
      console.log("Best score updated successfully");
    })
    .catch((error) => {
      console.error("Error updating best score:", error);
    });
}

p1.addEventListener("click", function () {
  p1.classList.add("animate");
  setTimeout(function () {
    p1.classList.remove("animate");
  }, 500);
});

restart.addEventListener("click", function () {
  location.reload();
});

CHECKGO = setInterval(function () {
  whitecar = parseInt(window.getComputedStyle(p1).getPropertyValue("top"));
  blackcar = parseInt(window.getComputedStyle(p2).getPropertyValue("left"));
  counter++;
  scorespan.innerText = counter;
  if (blackcar < 80 && blackcar > 0 && whitecar == 340) {
    alert("GAME OVER! score:  " + counter);
    clearInterval(CHECKGO);
    scorespan.innerText = counter;
    p1.style.animation = "none";
    p2.style.animation = "none";
    videoBG.style.animation = "none";
    fetch("http://localhost:3000/bestscore")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch best score");
        }
        return response.json();
      })
      .then((data) => {
        if (counter > data.bestScore) {
          updateBestScoreOnBackend(counter);
          updateDisplayedBestScore(counter);
        }
      })
      .catch((error) => {
        console.error("Error fetching best score:", error);
      });
  }
}, 300);
