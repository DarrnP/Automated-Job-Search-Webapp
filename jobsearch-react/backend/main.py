from fastapi import FastAPI
from pydantic import BaseModel
from playwright.sync_api import sync_playwright
import time
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import sys

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JobRequest(BaseModel):
    url: str
    jobtype: str
    keyword: str

#l is variable for jobtype and k is for keywords
def scrape_jobs(url, l, k):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  
        page = browser.new_page()
        page.goto(url)

        last_height = 0
        same_height_count = 0

        while True:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(4)
            new_height = page.evaluate("document.body.scrollHeight")
            if new_height == last_height:
                same_height_count += 1
                if same_height_count >= 2:
                    break
            else:
                same_height_count = 0
            last_height = new_height

        content = page.locator("body").inner_text()
        cl = content.lower()
        browser.close()

        if l.lower() in cl:
            if k.lower() in cl:
                return {"Role match": True, "Keywords": "Keywords match found"}
            else:
                return {"Role match": True, "Keywords": "Keywords match not found"}
        else:
            return {"Role match": False, "Keywords": "Keywords match not found"}

@app.post("/genrate")
def scrape(req: JobRequest):
    result = scrape_jobs(req.url, req.jobtype, req.keyword)
    return result
