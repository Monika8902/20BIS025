import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState('');
  const [result, setResult] = useState(null);

  const handleGetNumbers = () => {
    const urlList = urls
      .split('&url=')
      .map((url) => url.replace('url=', ''))
      .filter(Boolean);
    const urlParams = urlList.map((url) => `url=${encodeURIComponent(url)}`).join('&');
  
    axios
      .get(`http://localhost:8008/numbers?${urlParams}`)
      .then((response) => setResult(response.data))
      .catch((error) => setResult({ error: error.message }));
  };
  
  
  
  


  return (
    <div>
      <h1>Number Management Service</h1>
      <label htmlFor="urls">URLs:</label>
      <input
        type="text"
        id="urls"
        value={urls}
        onChange={e => setUrls(e.target.value)}
        style={{ width: '500px' }}
      />
      <button onClick={handleGetNumbers}>Get Numbers</button>

      {result && (
        <div>
          <h2>Result:</h2>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
