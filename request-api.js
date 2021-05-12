// http://api.nbp.pl/api/exchangerates/tables/A/

// http://api.nbp.pl/api/exchangerates/tables/a/last/5/

//get api currentCourse
fetchingCurrentCourseData();

//get api historicalCourse
fetchingHistoricalCourseData();

function fetchingCurrentCourseData() {
  fetch("http://api.nbp.pl/api/exchangerates/tables/A/")
    .then((res) => res.json())
    .then((data) => {
      createTableCurrentCourse(data);
    });
}

function fetchingHistoricalCourseData() {
  fetch("http://api.nbp.pl/api/exchangerates/tables/a/last/5/")
    .then((res) => res.json())
    .then((data) => {
      createTableHistoricalCourse(data);
    });
}

function createTableCurrentCourse(data) {
  document
    .querySelector(".js-btn-actualCourse")
    .addEventListener("click", (event) => {
      let html = ``;

      console.log(data);
      let { rates, effectiveDate } = data[0];

      html += `<h2 class="h2TitleDate">${effectiveDate}</h2>`;
      html += `<table class="tableInfoContent">`;

      html += `<tr class="titleContent">`;

      html += `<tr class="titleContentCourse">`;
      html += `<th>currency</th>`;
      html += `<th>code</th>`;
      html += `<th>mid</th>`;
      html += `</tr>`;

      rates.map(({ currency, code, mid }) => {
        if (
          code === "USD" ||
          code === "EUR" ||
          code === "UAH" ||
          code === "RUB" ||
          code === "CZK"
        ) {
          html += `<tr class="contentInfoCurrentCourse">`;
          html += `<td class="contentCurrentCourse">${currency}</td>`;
          html += `<td class="contentCurrentCourse">${code}</td>`;
          html += `<td class="contentCurrentCourse">${mid}</td>`; //mid.toFixed(2)
          html += `</tr>`;
        }
      });

      html += `</table>`;
      document.querySelector("main").innerHTML = html;
    });
}

function createTableHistoricalCourse(data) {
  document
    .querySelector(".js-btn-historyCourse")
    .addEventListener("click", (event) => {
      let html = ``;
      console.log(data);

      html += `<div class="infoHistoryCourse">`;
      data.map(({ effectiveDate, rates }) => {
        html += `<div class="infoData">`;

        html += `<h2 class="h2TitleDate">${effectiveDate}</h2>`;
        html += `<table class="tableHistoryCourses">`;
        html += `<tr>`;
        html += `<th>currency</th>`;
        html += `<th>code</th>`;
        html += `<th>mid</th>`;
        html += `</tr>`;

        rates.map(({ currency, code, mid }) => {
          if (
            code === "USD" ||
            code === "EUR" ||
            code === "UAH" ||
            code === "RUB" ||
            code === "CZK"
          ) {
            html += `<tr class="contentInfoCurrentCourse">`;
            html += `<td class="contentCurrentCourse">${currency}</td>`;
            html += `<td class="contentCurrentCourse">${code}</td>`;
            html += `<td class="contentCurrentCourse">${mid}</td>`; //mid.toFixed(2)
            html += `</tr>`;
          }
        });
        html += `</table>`;
        html += `</div>`;
      });

      html += `</div>`;

      document.querySelector("main").innerHTML = html;
    });
}
