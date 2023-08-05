
// Helpers
function setAttributes(el, options) {
   Object.keys(options).forEach(function(attr) {
     el.setAttribute(attr, options[attr]);
   })
}

async function populateCups() {
  // const requestCupURL = "data/cups.json";
  // const cups = new Request(requestCupURL);

  // const responseCups = await fetch(cups);
  // const mkCups = await responseCups.json();

  const responseCups = await fetch('data/cups.json', {
    headers: { Accept: 'application/json' },
  });
  const mkCups = await responseCups.json();
  Object.entries(mkCups).forEach(
    ([key, value]) => console.log(key, value)
  );

  populateCupsList(mkCups);
  
}


function populateCupsList(obj) {

  let totalCups = Object. keys(obj). length;

  for (let i = 1; i < totalCups + 1; i++) {

  // Data
   let cupName = obj[i]["name"];
   let cupSlug = obj[i]["slug"];
   let cupIcon = obj[i]["icon"];
   
  const cupList = document.querySelector("#cup-list");

  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");
  cupList.appendChild(accordionItem);

 const accordionHeader = document.createElement("h2");
 accordionHeader.classList.add("accordion-header");
 accordionItem.appendChild(accordionHeader);

 const accordionBTN = document.createElement("button");
 accordionBTN.textContent = cupName;
 setAttributes(accordionBTN, {"class": "accordion-button collapsed", "type": "button", "data-bs-toggle": "collapse", "aria-expanded": "true"});
 accordionBTN.setAttribute("data-bs-target", "#" + `${cupSlug}`);
 accordionBTN.setAttribute("aria-controls", `${cupSlug}`);
 accordionHeader.appendChild(accordionBTN);


 const icon =  document.createElement("img");
 icon.src = `img/cups/${cupIcon}`;
 accordionBTN.prepend(icon);

 const accordionContent = document.createElement("div");
 accordionContent.setAttribute("id", `${cupSlug}`);
 setAttributes(accordionContent, {"class": "accordion-collapse collapse", "data-bs-parent": "#cup-list"});
 accordionItem.appendChild(accordionContent);

 const accordionBody = document.createElement("div");
 accordionBody.classList.add("accordion-body");
 accordionBody.textContent = "Test";
 accordionContent.appendChild(accordionBody);
}

}

populateCups();