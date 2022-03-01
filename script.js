const getValue = () => {
  const searchValue = document.getElementById("input-value");
  const searchText = searchValue.value;
  console.log(searchText);
  searchValue.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((info) => console.log(info.data));
};