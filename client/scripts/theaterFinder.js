let filter = "";
let locationId = "";
const locationContainer = document.getElementById("location-container");
const finderContainer = document.getElementById("theater-finder-container");
const finderInput = document.getElementById("theater-finder");
const submitButton = document.getElementById("submit-location-btn");

finderContainer.addEventListener("mouseenter", (e) => {
  locationContainer.classList.remove("hide");
  locationContainer.classList.add("show-location");
});
finderContainer.addEventListener("mouseleave", (e) => {
  locationContainer.classList.add("hide");
  locationContainer.classList.remove("show-location");
});

// delete location func
function deleteLocation(id) {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/location/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((data) => data.json())
    .then((data) => {
      fetchLocation();
    });
}

function deleteTheater(locationId, id) {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/theater/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locationId, id }),
  })
    .then((data) => data.json())
    .then((data) => {
      fetchTheaters();
    });
}

//fetching user
function fetchUser() {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        const lcDelBtn = Array.from(
          document.querySelectorAll(".location-del-btn")
        );

        lcDelBtn.map((button) => {
          button.classList.remove("hide");
        });
      }
    });
}
fetchUser();

function addLocation(data) {
  locationContainer.innerHTML = "";
  fetchUser();
  const locations = data.location;

  locations.map((locations) => {
    const locationDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    const delBtn = document.createElement("button");

    // main location div
    locationDiv.setAttribute("class", "mainLocationDiv dynamic-location");

    // delete btn
    delBtn.setAttribute("class", "delBtn hide location-del-btn");
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener("click", () => {
      deleteLocation(locations.id);
    });
    textDiv.innerHTML = `${locations.name}`;
    textDiv.setAttribute("class", "location-style");
    textDiv.addEventListener("click", () => {
      finderInput.value = `${locations.name}`;
      locationId = locations.id;
      filterLocation();
    });

    locationDiv.appendChild(textDiv);
    locationDiv.appendChild(delBtn);
    locationContainer.appendChild(locationDiv);
  });
}
function fetchLocation() {
  const location = fetch("http://localhost:3000/location")
    .then((data) => data.json())
    .then((data) => {
      if (!data.success) return;
      addLocation(data);
    });
}
fetchLocation();

function filterLocation() {
  const filterValue = finderInput.value.toLowerCase();
  const locationDivs = Array.from(
    document.querySelectorAll(".dynamic-location")
  );

  locationDivs.map((elem) => {
    const divValue = elem.innerHTML.toLowerCase();
    if (divValue.includes(filterValue)) {
      elem.style.display = "";
    } else {
      elem.style.display = "none";
    }
  });
}

function fetchTheaters() {
  if (locationId === "") return;
  const theaters = fetch("http://localhost:3000/theater", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: locationId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      addTheater(data);
    });
}

submitButton.addEventListener("click", () => {
  fetchTheaters();
});

function addTheater(data) {
  const theaterContainer = document.getElementById("theater-container");
  theaterContainer.innerHTML = "";
  const theatersData = data.theaters;
  theatersData.map((data) => {
    const div = document.createElement("div");
    div.setAttribute("id", "dynamin-theater-div");
    div.innerHTML = `<div>${data.name}</div> <button onclick="deleteTheater('${data.locationId}', '${data.id}')" class="delBtn hide location-del-btn">Delete</button>`;

    theaterContainer.appendChild(div);
  });
  fetchUser();
}
