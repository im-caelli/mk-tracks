
// Helpers
function setAttributes(el, options) {
   Object.keys(options).forEach(function(attr) {
     el.setAttribute(attr, options[attr]);
   })
}

// Fetch Data
async function populateData() {

  const responseCups = await fetch('data/mk-tracks.json', {
    headers: { Accept: 'application/json' },
  });
  const mkCups = await responseCups.json();
  Object.entries(mkCups).forEach(
    ([key, value]) => console.log(key, value)
  );

  renderData(mkCups);
  
}

// Render cups
function renderData(obj) {

  let cups = obj["Cups"];
  let tracks = obj["Tracks"];
  let bill = obj["Bill"];

  // CUPS

  let totalCups = Object. keys(cups). length;

  for (let c = 1; c < totalCups + 1; c++) {

    let cupName = obj["Cups"][c]["name"];
    let cupSlug = obj["Cups"][c]["slug"];
    let cupIcon = obj["Cups"][c]["icon"];
    
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

  // TRACKS


}

populateData();