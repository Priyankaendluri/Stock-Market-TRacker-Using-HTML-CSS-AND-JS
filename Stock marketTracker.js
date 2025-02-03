const apiKey = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key

async function getStockData() {
    const symbol = document.getElementById('symbol').value.toUpperCase();
    if (!symbol) {
        alert('Please enter a stock symbol!');
        return;
    }

    try {
        // Fetch data from Alpha Vantage API
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
        const data = await response.json();

        if (data['Error Message']) {
            showError('Invalid Stock Symbol. Please try again.');
            return;
        }

        // Extract the latest stock data
        const timeSeries = data['Time Series (5min)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];
        const price = latestData['4. close'];

        // Display stock data
        const stockDetails = document.getElementById('stockDetails');
        stockDetails.innerHTML = `
            <p><strong>Symbol:</strong> ${symbol}</p>
            <p><strong>Time:</strong> ${latestTime}</p>
            <p><strong>Price:</strong> $${price}</p>
        `;
    } catch (error) {
        console.error(error);
        showError('An error occurred while fetching data.');
    }
}

function showError(message) {
    const stockDetails = document.getElementById('stockDetails');
    stockDetails.innerHTML = `<p class="error">${message}</p>`;
}

