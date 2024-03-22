const dropdown = document.getElementById("dropdown");
const dropdownContainer = document.getElementById("dashboard-nav");

document.getElementById("dashboard-nav").addEventListener("mouseenter", () => {
  dropdown.classList.remove("hide");
});
document.getElementById("dashboard-nav").addEventListener("mouseleave", () => {
  dropdown.classList.add("hide");
});
