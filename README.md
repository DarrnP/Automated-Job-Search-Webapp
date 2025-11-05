<h1>🤖 Automated Job Search Platform</h1>
Tired of manually refreshing company career pages every day? This project automates the process by allowing you to input a company's career page URL and specific keywords for a job or internship. The backend then scrapes the website to check if a matching position is available and reports back the findings.

This tool is designed for developers, students, and job seekers who want to efficiently track openings at specific companies without the repetitive manual effort.

<h1>✨ Key Features</h1>
User-Friendly Interface: A clean and simple UI built with React to input job search queries.

Dynamic Web Scraping: Uses Python and Playwright to reliably scrape modern, JavaScript-heavy career pages.

Keyword-Based Search: Allows users to specify one or more keywords (e.g., "Software Engineer Intern," "React Developer") to find relevant listings.

Fast & Modern Backend: Built with FastAPI, ensuring high performance and asynchronous request handling.

Instant Feedback: Immediately responds to the user with the search results.

<h1>🛠️ Tech Stack</h1>
Python,
React,
FastAPI



<h1>⚙️ How It Works</h1>
The application follows a simple client-server architecture:

User Input: The user enters the target company's career page URL and a list of keywords into the React frontend.

API Request: The frontend sends a POST request to the FastAPI backend with the URL and keywords.

Scraping Job: The backend initiates a Playwright instance, which launches a headless browser.

Page Analysis: Playwright navigates to the provided URL, waits for the content to load, and then scans the page's text for the user-defined keywords.

API Response: The backend aggregates the findings (e.g., which keywords were found and how many times) and sends a JSON response back to the client.

<h1>WebApp Preview</h1>
Enter details like carrer page url, keywords for job etc
<img width="703" height="348" alt="Image" src="https://github.com/user-attachments/assets/356f54bd-87a6-4381-8ae5-22c15831b959" />


<img width="636" height="306" alt="Image" src="https://github.com/user-attachments/assets/6e8889d3-8935-4b40-8d98-4386112bf78e" />
<h2></h2>

Output Page
<h2></h2>
<img width="620" height="493" alt="Image" src="https://github.com/user-attachments/assets/1ea652e3-f7b7-4e0a-8f98-0e16717df8b1" />


