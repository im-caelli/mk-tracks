
// --- Helpers

// Set multiple attributes
function setAttributes(el, options) {
   Object.keys(options).forEach(function(attr) {
     el.setAttribute(attr, options[attr]);
   })
}


// --- Fetch Data
async function populateData() {

  const responseCups = await fetch('data/mk-tracks.json', {
    headers: { Accept: 'application/json' },
  });

  const mkTracks = await responseCups.json();

  renderData(mkTracks);
  
}


// --- Render Data
function renderData(obj) {

  let cups = obj["Cups"];
  let tracks = obj["Tracks"];
  let bills = obj["Bills"];


  // CUPS
  let totalCups = Object.keys(cups).length;

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
    accordionBTN.innerHTML = "<span class='mkt-cup-title'>" + cupName + "</span>";
    setAttributes(accordionBTN, {
      "class": "accordion-button collapsed mkt-cup-btn", 
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
    emblem.classList.add("mkt-cup-emblem");
    accordionBTN.prepend(emblem);

    const accordionContent = document.createElement("div");
    setAttributes(accordionContent, {
      "id": `${cupSlug}`,
      "class": "accordion-collapse collapse", 
      "data-bs-parent": "#cup-list"
    });
    accordionItem.appendChild(accordionContent);

    const accordionBody = document.createElement("div");
    accordionBody.classList.add("accordion-body", "p-0");
    accordionContent.appendChild(accordionBody);
    
    const trackList = document.createElement("ul");
    trackList.classList.add("track-list-" + cupId, "mkt-track-list");
    accordionBody.appendChild(trackList);
  }


  // TRACKS
  let totalTracks = Object.keys(tracks).length;

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
      "data-bs-target": `#${trackSlug}`,
      "class": "mkt-track-btn"
    });
    trackLink.innerHTML = `<span class="visually-hidden-focusable">${trackName}</span>`;
    trackItem.appendChild(trackLink);
    trackList.appendChild(trackItem);

    const courseImg = document.createElement("img");
    courseImg.src = `img/courses/${trackImg}`;
    courseImg.setAttribute("alt", `${trackName}`);
    courseImg.classList.add("mkt-track-img");
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
    
    const offcanvasTitle = document.createElement("h3");
    setAttributes(offcanvasTitle, {
      "id" : `${trackSlug}-label`,
      "class": "offcanvas-title mkt-track-content-title"
    });
    offcanvasTitle.innerHTML = `<code>${trackCode}</code> ${trackName} `;
    offcanvasHeader.prepend(offcanvasTitle);

    const offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body");
    offcanvas.appendChild(offcanvasBody);

    const map = document.createElement("div");
    map.classList.add("mkt-track-map")
    offcanvasBody.appendChild(map);


    if (trackMap) {
      map.innerHTML = `<img src="img/maps/${trackMap}" alt="${trackName} Map"/>`
    } else {
      map.textContent = "No map available."
    }

    const bill = document.createElement("div");
    bill.classList.add("mkt-track-bill");
    offcanvasBody.appendChild(bill);
   
  }


  // BILLS
  let totalBills = Object.keys(bills).length;
  // console.log(totalBills)

  for (let b = 1; b < totalBills + 1; b++) {
    let billTrack = bills[b]["track"];
    let billExt = bills[b]["ext"];
    let billImg = bills[b]["img"];
    let billDesc = bills[b]["description"];
    let billCount = bills[b]["count"];

    const billList = document.querySelector(`#${billTrack} .mkt-track-bill`);

    if (billCount == 1) {
      const billTitle = document.createElement("h4");
      billTitle.innerHTML = `<span class="bill-icon"></span> Bullet Bill Strategy`;
      billList.appendChild(billTitle);
    }

    const billCard = document.createElement("div");

    if (billImg) {
      billCard.innerHTML = `<img src="img/bills/${billImg}" alt="${billDesc}"/>`
    } else {
      billCard.textContent = "No screenshot available."
    }

    const billText = document.createElement("span");
    billText.textContent = `${billDesc}`;

    if (billExt) {
      billText.classList.add("ext");
    }

    billCard.classList.add("mkt-bill-card");
    billList.appendChild(billCard);
    billCard.appendChild(billText);
  }

}

populateData();