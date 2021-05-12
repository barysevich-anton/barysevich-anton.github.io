fetchingData();

function fetchingData(search) {
  fetch("./cd_catalog.xml")
    .then((res) => res.text())
    .then((data) => {
      // console.log(data);

      let parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");

      if (!search) {
        createXmlTable(xmlDoc);
      }

      checkerSearchData(xmlDoc);

      sortTableData(xmlDoc);
    });
}

function checkerSearchData(data) {
  document
    .querySelector(".js-btn-search")
    .addEventListener("click", (event) => {
      let inputSearch = document.querySelector(".js-input-search").value;
      console.log(data);
      if (inputSearch.length === 0) {
        return createXmlTable(data);
      }

      if (inputSearch.length < 4) {
        return createPushMessage();
      }

      let colMainInfoXML = data.getElementsByTagName("CD");

      for (let i = 0; i < colMainInfoXML.length; i++) {
        let titleInfo = colMainInfoXML[i].getElementsByTagName("TITLE")[0]
          .textContent;
        let artistInfo = colMainInfoXML[i].getElementsByTagName("ARTIST")[0]
          .textContent;

        if (
          artistInfo.includes(inputSearch) ||
          titleInfo.includes(inputSearch)
        ) {
          return createSearchTableXML(colMainInfoXML[i]);
        }
      }

      return createPushMessageNotExists();
    });
}

function createPushMessage() {
  let html = ``;

  html += `<div class="pushMessage">`;
  html += `<span class="pushMessage">Incorrect data entering</span>`;
  html += `</div>`;

  document.querySelector(".push").innerHTML = html;

  setTimeout(function () {
    document.querySelector(".push").innerHTML = ``;
  }, 1000);
}

function createPushMessageNotExists() {
  let html = ``;

  html += `<div class="pushMessage">`;
  html += `<span class="pushMessage">Doesn't exists</span>`;
  html += `</div>`;

  document.querySelector(".push").innerHTML = html;

  setTimeout(function () {
    document.querySelector(".push").innerHTML = ``;
  }, 1000);
}

function createSearchTableXML(data) {
  let html = ``;
  html += ` <tr>`;
  html += ` <th>Title</th>`;
  html += `<th>Artist</th>`;
  html += ` <th>Country</th>`;
  html += ` <th>Company</th>`;
  html += `<th>Price</th>`;
  html += `<th>Year</th>`;
  html += `</tr>`;
  html += `<tr>`;
  html += `<td> ${data.getElementsByTagName("TITLE")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("ARTIST")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("COUNTRY")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("COMPANY")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("PRICE")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("YEAR")[0].textContent}</td>`;
  html += `</tr>`;
  document.querySelector("table").innerHTML = html;
}

function createXmlTable(data) {
  let html = ``;
  html += ` <tr>`;
  html += ` <th>Title</th>`;
  html += `<th>Artist</th>`;
  html += ` <th>Country</th>`;
  html += ` <th>Company</th>`;
  html += `<th>Price</th>`;
  html += `<th>Year</th>`;
  html += `</tr>`;
  let colMainTag = data.getElementsByTagName("CD");
  for (let i = 0; i < colMainTag.length; i++) {
    html += `<tr>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("TITLE")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("ARTIST")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("COUNTRY")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("COMPANY")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("PRICE")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("YEAR")[0].textContent
    }</td>`;
    html += `</tr>`;
  }

  document.querySelector("table").innerHTML = html;
}

function sortTableData(data) {
  const convertedXml = xmlToJson(data);

  const arrayOfXmlTags = convertedXml.CATALOG.CD;

  // console.log(arrayOfXmlTags);

  document.querySelector(".tableInfo").addEventListener("click", (event) => {
    if (event.target.nodeName !== "TH") {
      return;
    }

    let nameToSearch = event.target.innerText.toUpperCase();
    console.log(nameToSearch);
    const sortedArr = arrayOfXmlTags.sort((a, b) =>
      sortUniversal(a, b, nameToSearch)
    );

    createSortedTable(sortedArr);
  });
}

function createSortedTable(arr) {
  let html = ``;
  html += ` <tr>`;
  html += ` <th>Title</th>`;
  html += `<th>Artist</th>`;
  html += ` <th>Country</th>`;
  html += ` <th>Company</th>`;
  html += `<th>Price</th>`;
  html += `<th>Year</th>`;
  html += `</tr>`;

  arr.forEach(({ TITLE, ARTIST, COUNTRY, COMPANY, PRICE, YEAR }) => {
    html += `<tr>`;
    html += `<td> ${TITLE}</td>`;
    html += `<td> ${ARTIST}</td>`;
    html += `<td> ${COUNTRY}</td>`;
    html += `<td> ${COMPANY}</td>`;
    html += `<td> ${PRICE}</td>`;
    html += `<td> ${YEAR}</td>`;
    html += `</tr>`;
  });

  document.querySelector("table").innerHTML = html;
}

// https://gist.github.com/chinchang/8106a82c56ad007e27b1 link to function of github
function xmlToJson(xml) {
  var obj = {};

  if (xml.nodeType == 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    obj = xml.nodeValue;
  }
  let textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      let item = xml.childNodes.item(i);
      let nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          let old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

function sortUniversal(a, b, value) {
  if (a[value] < b[value]) {
    return -1;
  }

  if (a[value] > b[value]) {
    return 1;
  } else {
    return 0;
  }
}
