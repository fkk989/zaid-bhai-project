const checkboxContainer = document.getElementById("theater-checkbox-container");
const reqBody = {
  id: "",
  name: "",
};
document.getElementById("name").addEventListener("change", (e) => {
  reqBody.name = e.target.value;
});

function fetchLocation() {
  const location = fetch("http://localhost:3000/location")
    .then((data) => data.json())
    .then((data) => {
      if (!data.success) return;
      const locations = data.location;

      locations.map((location) => {
        const lable = document.createElement("label");
        const checkbox = document.createElement("input");

        lable.setAttribute("for", `${location.id}`);
        lable.setAttribute("class", "flex");
        lable.innerHTML = `${location.name}`;
        checkbox.setAttribute("value", `${location.id}`);
        checkbox.setAttribute("id", `${location.id}`);
        checkbox.setAttribute("class", "theater-checkbox");
        checkbox.setAttribute("type", "checkbox");

        checkbox.addEventListener("click", (e) => {
          selectOnlyCheckBox(e.currentTarget);
          reqBody.id = e.target.value;
        });

        lable.appendChild(checkbox);
        checkboxContainer.appendChild(lable);
      });
    });
}
fetchLocation();

function handleSubmit() {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/theater/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {});
}

document.getElementById("submit-btn").addEventListener("click", () => {
  if (reqBody.name.length < 0) {
    return;
  }
  handleSubmit();
});

const selectOnlyCheckBox = (checkedInput) => {
  const checkboxes = Array.from(document.querySelectorAll(".theater-checkbox"));

  checkboxes &&
    checkboxes.map((checkboxes) => {
      if (checkboxes) {
        checkboxes.checked = false;
      }
    });
  checkedInput.checked = true;
};
