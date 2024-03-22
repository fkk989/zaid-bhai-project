function fetchUser() {
  const token = localStorage.getItem("theater-admin-token");
  const user = fetch("http://localhost:3000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      const logiNav = document.getElementById("login-nav");
      const dashboardNav = document.getElementById("dashboard-nav");

      if (data.success) {
        logiNav.classList.add("hide");
        dashboardNav.classList.remove("hide");
      } else {
        logiNav.classList.remove("hide");
        dashboardNav.classList.add("hide");
      }
    });
}
fetchUser();

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("theater-admin-token");
  fetchUser();
});
