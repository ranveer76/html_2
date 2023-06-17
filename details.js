// detail.js

// Retrieve the data from local storage
const storedData = localStorage.getItem('excelData');
const excelData = JSON.parse(storedData);

// Get the detail container element
const detailContainer = document.getElementById('detail-container');

// Check if data is available
if (excelData) {
  // Loop through the rows of the Excel data
  excelData.forEach(row => {
    // Create a card element for each row
    const card = document.createElement('div');
    card.classList.add('p-4', 'border', 'rounded', 'bg-gray-100');

    // Loop through the columns of the row and display the data
    Object.entries(row).forEach(([key, value]) => {
      // Create a paragraph element for each column
      const paragraph = document.createElement('p');
      paragraph.classList.add('text-gray-800', 'font-semibold');
      paragraph.textContent = `${key}: ${value}`;

      // Append the paragraph to the card
      card.appendChild(paragraph);
    });

    // Append the card to the detail container
    detailContainer.appendChild(card);
  });
}
