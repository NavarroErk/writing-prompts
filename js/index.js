const btnPublishGroup = document.querySelectorAll(".btn-publish-group");

btnPublishGroup.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleStoryBtnClick(e.target.id);
  });
});

function handleStoryBtnClick(id) {
  const textAreaWriteStory = document.querySelector("#textarea-write-story");
  if (id == "btn-clear") {
    textAreaWriteStory.value = "";
    console.log(id);
  } else if (id == "btn-save") {
    console.log(id);
    //TODO: Save textAreaWriteStory.value as a non-published story. save with prompt for that day, date of that prompt
  } else if (id == "btn-publish") {
    console.log(id);
    //TODO: Grab textAreaWriteStory.value, publish to community library under specific prompt. alongside user information (create open for user to remain anonymous)
  }
}
