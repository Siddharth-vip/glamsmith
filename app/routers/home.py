from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["Home"])

# Initialize Jinja2 Templates
templates = Jinja2Templates(directory="app/templates")


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """
    Render the Home Page
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "GLAMSMITH | Haute Coiffure & Luxury Hair Studio",
            "company_name": "GLAMSMITH",
            "hero_title": "Your Hair. Our Passion.",
            "hero_subtitle": "Experience premium hair styling, colouring, keratin, hair spa and personalised consultation in a luxurious atmosphere.",
            "book_button": "Book Appointment"
        }
    )


@router.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    """
    About Page (Future)
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "About | Hair Specialist"
        }
    )


@router.get("/services", response_class=HTMLResponse)
async def services(request: Request):
    """
    Services Page (Future)
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Services | Hair Specialist"
        }
    )


@router.get("/pricing", response_class=HTMLResponse)
async def pricing(request: Request):
    """
    Pricing Page (Future)
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Pricing | Hair Specialist"
        }
    )


@router.get("/reviews", response_class=HTMLResponse)
async def reviews(request: Request):
    """
    Reviews Page (Future)
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Reviews | Hair Specialist"
        }
    )


@router.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    """
    Contact Page (Future)
    """
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Contact | Hair Specialist"
        }
    )