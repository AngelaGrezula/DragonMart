const form = document.getElementById("enrollForm");

form.addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const pet = document.getElementById("pet").value;
  localStorage.setItem("studentName", name);
  localStorage.setItem("pet", pet);
  window.location.href="letter.html";
});
