const house = localStorage.getItem("house");
const resultDiv = document.getElementById("houseResult");

const houses = {
  gryffindor:{name:"Gryffindor",img:"images/gryffindor.png",desc:"Brave, daring, and courageous."},
  hufflepuff:{name:"Hufflepuff",img:"images/hufflepuff.png",desc:"Loyal, kind, and hardworking."},
  ravenclaw:{name:"Ravenclaw",img:"images/ravenclaw.png",desc:"Wise, witty, and loves learning."},
  slytherin:{name:"Slytherin",img:"images/slytherin.png",desc:"Ambitious, clever, and resourceful."}
};

if(house && houses[house]){
  document.body.classList.add(house);
  resultDiv.innerHTML = `
    <img src="${houses[house].img}" class="house-banner" alt="${houses[house].name}">
    <h3 class="mt-3">${houses[house].name}</h3>
    <p>${houses[house].desc}</p>
  `;
}
