const msg01 = document.querySelector("#msg01");
const msg02 = document.querySelector("#msg02");

fetch("/api/config")
  .then((res) => res.json())
  .then((result) => {
    const path = result.pathServiceBackend1;

    fetch(path)
      .then((res) => res.json())
      .then((results) => {
        msg01.innerHTML = results.msg01;
        msg02.innerHTML = results.msg02;
      });
  });
