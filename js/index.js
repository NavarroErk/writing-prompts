const btnPublishGroup = document.querySelectorAll(".btn-publish-group");

btnPublishGroup.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleStoryBtnClick(e.target.id);
  });
});

function getCurrentDay() {
  const d = new Date();
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  };
}

const textAreaWriteStory = document.querySelector("#textarea-write-story");

function handleStoryBtnClick(id) {
  if (id == "btn-clear") {
    document.querySelector("#input-story-title").value = "";
    textAreaWriteStory.value = "";
    populateGenreInputs();
  } else if (id == "btn-save") {
    console.log(id);
    //TODO: Save textAreaWriteStory.value as a non-published story. save with prompt for that day, date of that prompt
  } else if (id == "btn-publish") {
    publishClicked();
  }
}

async function publishClicked() {
  const checkboxPublishAnonymous = document.querySelector(
    "#checkbox-publish-anonymous"
  );
  let promptVar = await getPrompt();
  let submission = {
    prompt: promptVar,
    title: document.querySelector("#input-story-title").value,
    story: document.querySelector("#textarea-write-story").value,
    genre: getStoryGenre(),
    anonymous: checkboxPublishAnonymous.checked,
    username: "Rick",
    date: getCurrentDay(),
  };

  fetch("http://localhost:3000/api/submit-story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  }).then((res) => {
    console.log(res.status);

    if (res.status == 400) {
      alert(
        "There are 1 or more missing fields. Please fill in the required areas before attempting to publish."
      );
    }
  });
}

function getStoryGenre() {
  let selectedGenreArr = [];
  const checkboxGenreGroup = document.querySelectorAll(".checkbox-genre");
  checkboxGenreGroup.forEach((checkbox) => {
    if (checkbox.checked == true) {
      selectedGenreArr.push(checkbox.value);
    }
  });
  return selectedGenreArr;
}

async function getPrompt() {
  let res = await fetch("http://localhost:3000/api/prompt");
  let data = await res.json();
  return data;
}

async function populatePrompt() {
  let promptToday = await getPrompt();
  document.querySelector("#p-prompt-today").textContent = promptToday;
}
function populateGenreInputs() {
  const genreArr = [
    "Adventure",
    "Action",
    "Children",
    "Comedy",
    "Fantasy",
    "Fiction",
    "Folktale",
    "Horror",
    "Non-fiction",
    "Romance",
    "Sci-Fi",
    "Superhero",
    "Supernatural",
    "Thriller",
  ];
  const divStoryGenre = document.querySelector("#div-story-genre");
  divStoryGenre.textContent = "";
  document.querySelector("#checkbox-publish-anonymous").checked = false;
  genreArr.forEach((genre) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", genre.toLowerCase());
    checkbox.setAttribute("id", genre.toLowerCase());
    checkbox.setAttribute("value", genre.toLowerCase());
    checkbox.setAttribute("class", "checkbox-genre");
    const label = document.createElement("label");
    label.setAttribute("for", genre.toLowerCase());
    label.textContent = genre;
    const divGenreLabelGroup = document.createElement("div");
    divGenreLabelGroup.setAttribute("class", "div-genre-label-group flex-row");
    divGenreLabelGroup.appendChild(checkbox);
    divGenreLabelGroup.appendChild(label);
    divStoryGenre.appendChild(divGenreLabelGroup);
  });
}

populatePrompt();
populateGenreInputs();
