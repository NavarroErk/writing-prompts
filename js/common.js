function isLoggedIn(isLoggedIn) {
  const btnLoggedInStatus = document.querySelector("#btn-logged-in-status");
  let loggedInStatus = isLoggedIn;
  try {
    if (loggedInStatus == true) {
      btnLoggedInStatus.textContent = "Logout";
    } else {
      btnLoggedInStatus.textContent = "Login";
    }
  } catch (error) {
    console.error(error);
  }
}

function loadHeader() {
  const body = document.querySelector("body");

  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      const domParser = new DOMParser();
      const document = domParser.parseFromString(data, "text/html");
      const headerElement = document.querySelector("header");
      if (headerElement) {
        body.prepend(headerElement);
      }
      isLoggedIn(true);
    });
}
