from pathlib import Path

# Base Project Directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Templates Directory
TEMPLATES_DIR = BASE_DIR / "app" / "templates"

# Static Directory
STATIC_DIR = BASE_DIR / "app" / "static"

# Storage Directory
STORAGE_DIR = BASE_DIR / "app" / "storage"

# JSON Storage Files
BOOKINGS_FILE = STORAGE_DIR / "bookings.json"
REVIEWS_FILE = STORAGE_DIR / "reviews.json"
CONTACTS_FILE = STORAGE_DIR / "contacts.json"

# Application Information
APP_NAME = "Hair Specialist"
APP_VERSION = "1.0.0"
APP_DESCRIPTION = "Luxury Hair Specialist Salon Website"

# Default Theme Colors
THEME = {
    "primary": "#D4AF37",      # Gold
    "secondary": "#111111",    # Black
    "background": "#0F0F0F",
    "text": "#FFFFFF",
    "muted": "#B0B0B0"
}

# Ensure storage directory exists
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

# Create JSON files if they don't exist
for file in [BOOKINGS_FILE, REVIEWS_FILE, CONTACTS_FILE]:
    if not file.exists():
        file.write_text("[]", encoding="utf-8")