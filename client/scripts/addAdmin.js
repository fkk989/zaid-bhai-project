const reqBody = {
  name: "",
  email: "",
  password: "",
};
document.getElementById("name").addEventListener("change", (e) => {
  reqBody.name = e.target.value;
});
document.getElementById("email").addEventListener("change", (e) => {
  reqBody.email = e.target.value;
});
document.getElementById("password").addEventListener("change", (e) => {
  reqBody.password = e.target.value;
});

function handleSubmit() {
  const token = localStorage.getItem("theater-admin-token");
  fetch("http://localhost:3000/user/add", {
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
  if (
    reqBody.email.length < 0 ||
    reqBody.password.length < 0 ||
    reqBody.name.length < 0
  ) {
    return;
  }
  handleSubmit();
});
