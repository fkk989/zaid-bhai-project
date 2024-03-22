const reqBody = { email: "", password: "" };
document.getElementById("email").addEventListener("change", (e) => {
  const email = e.target.value;
  reqBody.email = email.toLowerCase();
});
document.getElementById("password").addEventListener("change", (e) => {
  reqBody.password = e.target.value;
});

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
        window.location.href = "http://localhost:8000";
      }
    });
}

fetchUser();

function handleSubmit() {
  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      const token = data.token;
      localStorage.setItem("theater-admin-token", token);
      if (data.success) {
        fetchUser();
        window.location.href = "http://localhost:8000";
      }
    });
}

document.getElementById("login-btn").addEventListener("click", () => {
  if (email.length < 0 || password.length < 0) {
    return;
  }
  handleSubmit();
  fetchUser();
});
