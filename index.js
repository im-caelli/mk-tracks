
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
  const mkTracks = await responseCups.json();
  // Object.entries(mkCups).forEach(
  //   ([key, value]) => console.log(key, value)
  // );

  renderData(mkTracks);
  
}

// Render cups
function renderData(obj) {

  let cups = obj["Cups"];
  let tracks = obj["Tracks"];
  let bill = obj["Bill"];


  // CUPS

  let totalCups = Object. keys(cups). length;

  for (let c = 1; c < totalCups + 1; c++) {

    let cupId = cups[c]["id"];
    let cupName = cups[c]["name"];
    let cupSlug = cups[c]["slug"];
    let cupIcon = cups[c]["icon"];
    
    const cupList = document.querySelector("#cup-list");

    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");
    cupList.appendChild(accordionItem);

    const accordionHeader = document.createElement("h2");
    accordionHeader.classList.add("accordion-header");
    accordionItem.appendChild(accordionHeader);

    const accordionBTN = document.createElement("button");
    accordionBTN.textContent = cupName;
    setAttributes(accordionBTN, {
      "class": "accordion-button collapsed", 
      "type": "button", 
      "data-bs-toggle": "collapse", 
      "aria-expanded": "true",
      "data-bs-target": `#${cupSlug}`,
      "aria-controls": `${cupSlug}`
    });
    accordionHeader.appendChild(accordionBTN);

    const emblem =  document.createElement("img");
    emblem.src = `img/cups/${cupIcon}`;
    emblem.setAttribute("alt", `${cupName}`);
    accordionBTN.prepend(emblem);

    const accordionContent = document.createElement("div");
    setAttributes(accordionContent, {
      "id": `${cupSlug}`,
      "class": "accordion-collapse collapse", 
      "data-bs-parent": "#cup-list"
    });
    accordionItem.appendChild(accordionContent);

    const accordionBody = document.createElement("div");
    accordionBody.classList.add("accordion-body");
    accordionContent.appendChild(accordionBody);
    
    const trackList = document.createElement("ul");
    trackList.classList.add("track-list-" + cupId);
    accordionBody.appendChild(trackList);
  }


  // TRACKS
  let totalTracks = Object. keys(tracks). length;

  for (let t = 1; t < totalTracks + 1; t++) {

    let trackName = tracks[t]["name"];
    let trackSlug = tracks[t]["slug"];
    let trackCup = tracks[t]["cup"];
    let trackImg = tracks[t]["img"];
    let trackCode = tracks[t]["code"];
    let trackMap = tracks[t]["map"];

    // List
    const trackList = document.querySelector(".track-list-" + trackCup);

    const trackItem = document.createElement("li");
    const trackLink = document.createElement("a");
    setAttributes(trackLink, {
      "role": "button", 
      "href": "", 
      "data-bs-toggle": "offcanvas",
      "aria-controls": `${trackSlug}`,
      "data-bs-target": `#${trackSlug}`
    });
    trackLink.innerHTML = `<span class="visually-hidden-focusable">${trackName}</span>`;
    trackItem.appendChild(trackLink);
    trackList.appendChild(trackItem);

    const courseImg = document.createElement("img");
    courseImg.src = `img/courses/${trackImg}`;
    courseImg.setAttribute("alt", `${trackName}`);
    trackLink.appendChild(courseImg);


    // Content
    const trackContent = document.querySelector("#track-content");

    const offcanvas = document.createElement("div");
    setAttributes(offcanvas, {
      "id" : `${trackSlug}`,
      "class": "offcanvas offcanvas-end", 
      "data-bs-scroll": "true", 
      "tabindex": "-1", 
      "data-bs-theme" : "dark",
      "aria-labelledby": `${trackSlug}-label`
    });
    trackContent.appendChild(offcanvas);

    const offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");
    offcanvasHeader.innerHTML = '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>';
    offcanvas.appendChild(offcanvasHeader);
    
    const offcanvasTitle = document.createElement("h5");
    setAttributes(offcanvasTitle, {
      "id" : `${trackSlug}-label`,
      "class": "offcanvas-title"
    });
    offcanvasTitle.innerHTML = `${trackName} <code>${trackCode}</code>`;
    offcanvasHeader.prepend(offcanvasTitle);

    const offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body");
    offcanvas.appendChild(offcanvasBody);

    const map = document.createElement("div");
    map.classList.add("track-map");
    map.innerHTML = `<img src="img/maps/${trackMap}" alt="${trackName} Map"/>`
    offcanvasBody.appendChild(map);
  }


  // BILLS
  // let totalBills = Object. keys(bill). length;
  // console.log(totalBills)

  // for (let b = 1; b < totalBills + 1; b++) {
  //   let billTrack = bill[b]["track"];
  //   let billExt = bill[b]["ext"];
  //   let billImg = bill[b]["img"];
  //   let billDesc = bill[b]["description"];

  // }


}

populateData();