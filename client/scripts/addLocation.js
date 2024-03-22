const reqBody = {
  name: "",
};
document.getElementById("name").addEventListener("change", (e) => {
  reqBody.name = e.target.value;
});

function handleSubmit() {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/location/add", {
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
