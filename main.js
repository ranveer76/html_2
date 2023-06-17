const fileInput = document.getElementById('file-input');
const dataContainer = document.getElementById('data-container');
const localStorageKey = 'chosenFile';

fileInput.addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

    renderData(jsonData);
    saveFileToLocalStorage(file);
  };

  reader.readAsArrayBuffer(file);
}

function renderData(jsonData) {
    dataContainer.innerHTML = '';
  
    for (let i = 1; i < jsonData.length; i++) {
      const rowData = jsonData[i];
      const card = document.createElement('div');
      card.classList.add('bg-white', 'p-4', 'rounded', 'shadow', 'cursor-pointer');
  
      // Filter the rowData to keep only the non-empty cells in the first two columns
      const filteredData = rowData.slice(0, 2).filter(cell => cell !== '');
  
      if (filteredData.length > 0) {
        card.addEventListener('click', () => navigateToDetailsPage(rowData));
  
        filteredData.forEach((cell, index) => {
          const paragraph = document.createElement('p');
          paragraph.classList.add('text-gray-700', 'mb-2');
          paragraph.textContent = cell;
          card.appendChild(paragraph);
        });
  
        dataContainer.appendChild(card);
      }
    }
  }  

function saveFileToLocalStorage(file) {
  const reader = new FileReader();
  reader.onload = function () {
    const fileData = new Uint8Array(reader.result);
    localStorage.setItem(localStorageKey, JSON.stringify([...fileData]));
  };
  reader.readAsArrayBuffer(file);
}

function loadFileFromLocalStorage() {
  const fileData = JSON.parse(localStorage.getItem(localStorageKey));
  if (fileData) {
    const workbook = XLSX.read(fileData, { type: 'array' });
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

    renderData(jsonData);
  }
}

function navigateToDetailsPage(rowData) {
  sessionStorage.setItem('selectedRow', JSON.stringify(rowData));
  window.location.href = 'details.html';
}

loadFileFromLocalStorage();
