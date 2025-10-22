async function getCommunityStories() {
  let res = await fetch("http://localhost:3000/api/community-library");
  let data = await res.json();
  return data;
}

async function populateCommunityStories() {
  const libraryStories = await getCommunityStories();
  const sectionCommunityStoryList = document.querySelector(
    "#section-community-story-list"
  );
  let ampm = "";
  libraryStories.forEach((libraryStory) => {
    const divUserStory = document.createElement("div");
    const pPrompt = document.createElement("p");
    const pTitle = document.createElement("p");
    const pStory = document.createElement("p");
    const pGenre = document.createElement("p");
    const pUsername = document.createElement("p");
    const pDate = document.createElement("p");

    pPrompt.textContent = `Prompt: ${libraryStory.prompt}`;
    pTitle.textContent = `Title: ${libraryStory.title}`;
    pStory.textContent = `Story: ${libraryStory.story}`;
    pGenre.textContent = `Genre: ${libraryStory.genre}`;
    pUsername.textContent = `Username: ${
      libraryStory.anonymous == false ? libraryStory.username : "Anonymous"
    }`;
    pDate.textContent = `Date: ${libraryStory.date.year}-${
      libraryStory.date.month
    }-${libraryStory.date.day} | ${libraryStory.date.hour}:${
      libraryStory.date.minute
    } ${libraryStory.date.hour < 12 ? (ampm = "am") : (ampm = "pm")}`;

    divUserStory.setAttribute("class", "div-user-story");
    divUserStory.appendChild(pPrompt);
    divUserStory.appendChild(pTitle);
    divUserStory.appendChild(pStory);
    divUserStory.appendChild(pGenre);
    divUserStory.appendChild(pUsername);
    divUserStory.appendChild(pDate);

    document
      .querySelector("#section-community-story-list")
      .appendChild(divUserStory);
    const hr = document.createElement("hr");
    document.querySelector("#section-community-story-list").appendChild(hr);
  });
}
populateCommunityStories();

// communityStories.forEach((story) => {
//   console.log(story);
// });
