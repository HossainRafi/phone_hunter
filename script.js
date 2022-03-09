// Common Variable
const phoneDetails = document.getElementById("phone-details");
const searchValue = document.getElementById("input-value");
const searchResult = document.getElementById("search-result");
const error = document.getElementById("errormsg");
const allBtn = document.getElementById("see-all");
allBtn.style.display = "none";
error.style.display = "none";

// Get Vlue
const getValue = () => {
  const searchText = searchValue.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

// Display Results
const displaySearchResult = (phones) => {
  // console.log(phones);
  if (phones.length > 20) {
    allBtn.style.display = "block";
  } else {
    allBtn.style.display = "none";
  }

  const first20Phones = phones.slice(0, 20);
  const second20Phones = phones.slice(20, phones.length);
  if (phones.length <= 0 || searchValue.value === "") {
    error.style.display = "block";
    searchResult.textContent = "";
    phoneDetails.textContent = "";
  } else {
    error.style.display = "none";

    searchResult.textContent = "";
    phoneDetails.textContent = "";
    first20Phones.forEach((phone) => {
      // New Card Element Creat
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card rounded-3 shadow p-3 mb-2 bg-body">
          <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-3" alt="..." />
          <div class="card-body text-center">
            <h3 class="card-title">Model: ${phone.phone_name}</h3>
            <h4 class="card-title">Brand: ${phone.brand}</h4>
            <div class="pt-3 pb-2 mx-auto">
            <button onclick="phoneDetail('${phone.slug}')" type="button" class="btn btn-secondary">
            Phone Datails
            </button>
            </div>
          </div>
        </div>
        `;
      searchResult.appendChild(div);
    });
    allBtn.addEventListener("click", function () {
      second20Phones.forEach((phone) => {
        allBtn.style.display = "none";
        // New Card Element Creat
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card rounded-3 shadow p-3 mb-2 bg-body">
          <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-3" alt="..." />
          <div class="card-body text-center">
            <h3 class="card-title">Model: ${phone.phone_name}</h3>
            <h4 class="card-title">Brand: ${phone.brand}</h4>
            <div class="pt-3 pb-2 mx-auto">
            <button onclick="phoneDetail('${phone.slug}')" type="button" class="btn btn-secondary">
            Phone Datails
            </button>
            </div>
          </div>
        </div>
        `;
        searchResult.appendChild(div);
      });
    });
  }

  searchValue.value = "";
  // allBtn.style.display = "none";
};

// Get Phone Details
const phoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

// Display Phone Details
const displayPhoneDetails = (phone) => {
  phoneDetails.textContent = "";
  // Creat Details Element
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src="${
          phone.image
        }" class="card-img-top w-25 mx-auto pt-4" alt="..." />
        <div class="card-body">
        <h4 class="card-title text-center"><span class="fw-bold"> Model: </span>${
          phone.name
        }</h4>
        <h5 class="card-title text-center"><span class="fw-bold"> Release Date: </span>${
          phone?.releaseDate || "Not Found"
        }</h5>
        <p class="card-text"><span class="fw-bold"> Chipset: </span>${
          phone.mainFeatures.chipSet
        }</p>
        <p class="card-text"><span class="fw-bold"> Memory: </span>${
          phone.mainFeatures.memory
        }</p>
        <p class="card-text"><span class="fw-bold"> Display: </span>${
          phone.mainFeatures.displaySize
        }</p>
        <p class="card-text"><span class="fw-bold"> Storage: </span>${
          phone.mainFeatures.storage
        }</p>
        <p class="card-text"><span class="fw-bold"> Sensors: </span>${
          phone.mainFeatures.sensors[0]
        }, ${phone.mainFeatures.sensors[1]}, ${
    phone.mainFeatures.sensors[2]
  }, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}</p>
        <p class="card-text"><span class="fw-bold"> Others Info: </span>
        <span class="card-text"> WLAN: ${
          phone.others?.WLAN || "Not Found"
        }, Bluetooth: ${phone.others?.Bluetooth || "Not Found"}, GPS: ${
    phone.others?.GPS || "Not Found"
  }, NFC: ${phone.others?.NFC || "Not Found"}, Radio: ${
    phone.others?.Radio || "Not Found"
  }, USB: ${phone.others?.USB || "Not Found"}</span></p>
        </div>
    `;
  phoneDetails.appendChild(div);
};
// Finished
