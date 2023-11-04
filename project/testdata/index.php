<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logs Data</title>
<style>
    body {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table, th, td {
    border: 1px solid #333;
}

th, td {
    padding: 12px;
    text-align: left;
}

th {
    background-color: #333;
    color: #fff;
}

tbody tr:nth-child(even) {
    background-color: #2a2a2a;
}

tbody tr:nth-child(odd) {
    background-color: #1e1e1e;
}
</style>
</head>
<body>
    <div class="container">
        <h1>Logs Data</h1>
        <table id="logsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Device ID</th>
                    <th>Sensor One</th>
                    <th>Sensor Two</th>
                    <th>Sensor Three</th>
                    <th>Sensor Four</th>
                </tr>
            </thead>
            <tbody>
        
            </tbody>
        </table>
    </div>
    <script> 
document.addEventListener('DOMContentLoaded', () => {
    const fetchData = () => {
        fetch('fetch_logs.php')
            .then(response => response.json())
            .then(logsData => {
                const tableBody = document.querySelector('#logsTable tbody');
                tableBody.innerHTML = '';  // Clear the existing table rows

                logsData.forEach(log => {
                    const row = document.createElement('tr');

                    Object.values(log).forEach(text => {
                        const cell = document.createElement('td');
                        cell.textContent = text;
                        row.appendChild(cell);
                    });

                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // Fetch data immediately when the page loads
    fetchData();

    // Set an interval to fetch data every 2 seconds
    setInterval(fetchData, 2000);
});
 
</script>
</body>
</html>
