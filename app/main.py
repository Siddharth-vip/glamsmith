from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.routers.home import router as home_router

app = FastAPI(
    title="Hair Specialist",
    description="Luxury Hair Specialist Salon Website",
    version="1.0.0"
)

# Serve static files (CSS, JS, Images)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Jinja2 Templates
templates = Jinja2Templates(directory="app/templates")

# Include Routers
app.include_router(home_router)


@app.get("/health")
def health_check():
    return {
        "status": "running",
        "application": "Hair Specialist",
        "version": "1.0.0"
    }