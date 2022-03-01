const getValue = () => {
  const searchValue = document.getElementById("input-value");
  const searchText = searchValue.value;
  searchValue.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");
  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3 class="card-title">Model: ${phone.phone_name}</h3>
            <h4 class="card-title">Brand: ${phone.brand}</h4>
            <button onclick="phoneDetail('${phone.slug}')" type="button" class="btn btn-secondary">
            Phone Datails
            </button>
          </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};
const phoneDetail = (phoneId) => {
  // console.log(phoneId);
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};
const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
        <h4 class="card-title"> Model: ${phone.name}</h4>
        <h5 class="card-title"> Release Date: ${phone.releaseDate}</h5>
        <p class="card-text"> Chipset: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"> Memory: ${phone.mainFeatures.memory}</p>
        <p class="card-text"> Display: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text"> Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text"> Sensors: ${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}</p>
        <p class="card-text"> WLAN: ${phone.others.WLAN}, Bluetooth: ${phone.others.Bluetooth}, GPS: ${phone.others.GPS}, NFC: ${phone.others.NFC}, Radio: ${phone.others.Radio}, USB: ${phone.others.USB}</p>
        </div>
    `;
  phoneDetails.appendChild(div);
};
