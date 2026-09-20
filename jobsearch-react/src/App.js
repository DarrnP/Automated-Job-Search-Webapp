import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  const [dictdata, setDictdata] = useState({
    url: "",
    jobtype: "",
    keyword: ""
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dictdata={dictdata}
              setDictdata={setDictdata}
            />
          }
        />

        <Route
          path="/genrate"
          element={<Genrate dictdata={dictdata} />}
        />
      </Routes>
    </BrowserRouter>
  );
}


export function Home({ dictdata, setDictdata }) {

  function Change(e) {
    const { name, value } = e.target;

    setDictdata({
      ...dictdata,
      [name]: value
    });
  }

  const isComplete =
    dictdata.url !== "" &&
    dictdata.jobtype !== "" &&
    dictdata.keyword !== "";

  return (
    <div className="page">

      <nav className="navbar">
        <div className="logo">AutoSearch</div>
        <div className="version">Job Search Assistant</div>
      </nav>

      <main>

        <section className="hero">

          <span className="eyebrow">
            SMART JOB SEARCH
          </span>

          <h1>
            Find the right roles faster.
          </h1>

          <p>
            Enter your search criteria and let AutoSearch
            check whether a role matches what you're looking for.
          </p>

        </section>


        <section className="form-card">

          <div className="field">
            <label htmlFor="url">
              Website URL
            </label>

            <input
              id="url"
              name="url"
              type="text"
              placeholder="https://example.com"
              value={dictdata.url}
              onChange={Change}
              required
            />
          </div>


          <div className="field">
            <label htmlFor="jobtype">
              Role Type
            </label>

            <input
              id="jobtype"
              name="jobtype"
              type="text"
              placeholder="Job or Internship"
              value={dictdata.jobtype}
              onChange={Change}
              required
            />
          </div>


          <div className="field">
            <label htmlFor="keyword">
              Keywords
            </label>

            <input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Python, Data Analytics, React..."
              value={dictdata.keyword}
              onChange={Change}
              required
            />
          </div>


          {isComplete && (
            <Link
              to="/genrate"
              className="generate-link"
            >
              <button className="generate-button">
                Generate Search
                <span>→</span>
              </button>
            </Link>
          )}

        </section>

      </main>

    </div>
  );
}


export function Genrate({ dictdata }) {

  const [result, setResult] = useState(null);

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/genrate",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(dictdata)
          }
        );

        const data = await response.json();

        setResult(data);

      } catch (error) {

        console.error("Error:", error);

      }
    }

    fetchData();

  }, [dictdata]);


  return (

    <div className="page">

      <nav className="navbar">

        <div className="logo">
          AutoSearch
        </div>

        <Link
          to="/"
          className="back-link"
        >
          ← New Search
        </Link>

      </nav>


      <main className="result-page">

        <div className="result-header">

          <span className="eyebrow">
            SEARCH ANALYSIS
          </span>

          <h1>
            Your search results
          </h1>

          <p>
            Here's how the role matches your search criteria.
          </p>

        </div>


        <div className="summary-card">

          <div className="summary-item">

            <div className="summary-label">
              Website
            </div>

            <div className="summary-value">
              {dictdata.url}
            </div>

          </div>


          <div className="summary-item">

            <div className="summary-label">
              Role Type
            </div>

            <div className="summary-value">
              {dictdata.jobtype}
            </div>

          </div>


          <div className="summary-item">

            <div className="summary-label">
              Keywords
            </div>

            <div className="summary-value">
              {dictdata.keyword}
            </div>

          </div>

        </div>


        {result ? (

          <div className="result-card">

            <h2>
              Match Results
            </h2>


            <div className="result-row">

              <span className="result-label">
                Role Match
              </span>

              <span
                className={
                  result["Role match"]
                    ? "yes"
                    : "no"
                }
              >
                {result["Role match"]
                  ? "Yes"
                  : "No"}
              </span>

            </div>


            <div className="result-row">

              <span className="result-label">
                Keyword Status
              </span>

              <span
                className={
                  result["Keywords"].includes("not")
                    ? "no"
                    : "yes"
                }
              >
                {result["Keywords"]}
              </span>

            </div>

          </div>

        ) : (

          <div className="loading">
            Analyzing your search...
          </div>

        )}

      </main>

    </div>

  );
}