const collectedData = JSON.parse(localStorage.getItem('collectedData')) || []; // Load collected data from localStorage

document.getElementById('dataCollectionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileNumber = document.getElementById('fileNumber').value;
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const sex = document.getElementById('sex').value;
    const coverage = document.getElementById('coverage').value;
    const medicalHistory = document.getElementById('medicalHistory').value;
    const operations = document.getElementById('operations').value;
    const images = document.getElementById('images').files;

    const imageUrls = []; // Store image URLs for preview

    // Loop through files and create preview URLs
    for (let i = 0; i < images.length; i++) {
        imageUrls.push(URL.createObjectURL(images[i]));
    }

    const data = {
        fileNumber,
        name,
        dob,
        sex,
        coverage,
        medicalHistory,
        operations,
        imageUrls
    };

    collectedData.push(data); // Add data to the array
    localStorage.setItem('collectedData', JSON.stringify(collectedData)); // Save to localStorage
    displayData(); // Re-render data table
    document.getElementById('dataCollectionForm').reset(); // Reset form
});

function displayData() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data

    collectedData.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.fileNumber}</td>
            <td>${data.name}</td>
            <td>${data.dob}</td>
            <td>${data.sex}</td>
            <td>${data.coverage}</td>
            <td>${data.medicalHistory}</td>
            <td>${data.operations}</td>
            <td>
                ${data.imageUrls.map(url => <img src="${url}" alt="Image" width="50">).join(' ')}
            </td>
            <td><a href="patientDetails.html?fileNumber=${data.fileNumber}">View Details</a></td>
        `;
        tableBody.appendChild(row);
    });
}

// Call displayData() on page load to render previously stored data
document.addEventListener("DOMContentLoaded", displayData);

// Function to filter the data based on the search input
function filterData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = collectedData.filter(data => 
        data.fileNumber.toLowerCase().includes(searchInput) || 
        data.name.toLowerCase().includes(searchInput)
    );

    // Clear the table and display filtered data
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data

    filteredData.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.fileNumber}</td>
            <td>${data.name}</td>
            <td>${data.dob}</td>
            <td>${data.sex}</td>
            <td>${data.coverage}</td>
            <td>${data.medicalHistory}</td>
            <td>${data.operations}</td>
            <td>
                ${data.imageUrls.map(url => <img src="${url}" alt="Image" width="50">).join(' ')}
            </td>
            <td><a href="patientDetails.html?fileNumber=${data.fileNumber}">View Details</a></td>
        `;
        tableBody.appendChild(row);
    });
}