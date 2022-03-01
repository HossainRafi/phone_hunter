const getValue = () => {
  const searchValue = document.getElementById("input-value");
  const searchText = searchValue.value;
  searchValue.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((info) => displaySearchResult(info.data));
};

const displaySearchResult = (phones) => {
  //   console.log(phones);
    const searchResult = document.getElementById("search-result");
  phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h3 class="card-title">Model: ${phone.phone_name}</h3>
            <h4 class="card-title">Brand: ${phone.brand}</h4>
            <button type="button" class="btn btn-secondary">Phone Datails</button>
          </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};
