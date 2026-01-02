import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Supabase Configuration
    SUPABASE_URL = os.getenv('https://oixrzeqvlqwzgmhgdfvc.supabase.co')
    SUPABASE_KEY = os.getenv('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peHJ6ZXF2bHF3emdtaGdkZnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzkxNTAsImV4cCI6MjA4MjkxNTE1MH0.a7If1lWHBIL4qrzjn12bXwSry9Mh803K54W2YUiOe7s')
    SUPABASE_SERVICE_KEY = os.getenv('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peHJ6ZXF2bHF3emdtaGdkZnZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzMzOTE1MCwiZXhwIjoyMDgyOTE1MTUwfQ.-1560zzAslt4Q623LdyUXb1lOgKopDN-fDim2lnp7Sc')
    
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'corte_digital_2025_secret_key')
    
    # CORS Configuration
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173"
    ]
    
    # Session Configuration
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = False
    SESSION_COOKIE_DOMAIN = None
    SESSION_PERMANENT = False
    
    # Server Configuration
    HOST = os.getenv('HOST', '127.0.0.1')
    PORT = int(os.getenv('PORT', 5001))
    DEBUG = os.getenv('DEBUG', 'True') == 'True'