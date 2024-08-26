import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

const Tailwind = () => {
  return (
    <div className="text-center border-solid border-4 border-red-500 bg-black text-white shadow">
      ERB + TAILWIND = ❤
    </div>
  );
};

function Hello() {
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      const data = await getPrayerTimes();
      if (data && data.data && data.data.timings) {
        setPrayerTimes(data.data.timings);
      }
    }

    fetchPrayerTimes();
  }, []);

  async function getPrayerTimes() {
    const url = "http://api.aladhan.com/v1/timingsByCity?city=Richardson&state=Texas&country=US&method=2";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error: any) {
      console.error(error.message);
    }
    return null;
  }

  return (
    <div>
      <h1 className="text-blue-300">electron-react-boilerplate</h1>
      <Tailwind/>
      <div>
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>

      {/* Render prayer times if available */}
      {prayerTimes && (
        <div>
          <h2>Prayer Times</h2>
          <ul>
            {Object.entries(prayerTimes).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

