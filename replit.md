# Design Kraft - Interior Design Website

## Overview

Design Kraft is a professional interior design company website built as a Flask web application. The platform serves as a lead generation and portfolio showcase website, similar to industry leaders like Livspace and HomeLane. The application features a modern, responsive design focused on converting visitors into potential clients through consultation bookings and service inquiries.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Database**: SQLAlchemy ORM with configurable database support
  - Development: SQLite (default)
  - Production: PostgreSQL (via DATABASE_URL environment variable)
- **WSGI Server**: Gunicorn for production deployment
- **Session Management**: Flask built-in sessions with configurable secret keys

### Frontend Architecture
- **Template Engine**: Jinja2 (Flask's default)
- **CSS Framework**: Bootstrap 5 for responsive design
- **Typography**: Google Fonts (Inter for body text, Playfair Display for headings)
- **Icons**: Font Awesome 6
- **JavaScript**: Vanilla JavaScript with Bootstrap components
- **Images**: External CDN (Pixabay) for hero background

### Data Storage Solutions
- **Primary Database**: SQLAlchemy with dual-mode support
  - Development environment uses SQLite for simplicity
  - Production can use PostgreSQL via environment configuration
- **Connection Pooling**: Configured with pool recycling and pre-ping for reliability
- **Auto-migration**: Database tables created automatically on app startup

## Key Components

### Models (models.py)
1. **ContactInquiry**: Captures lead information from contact forms
   - Personal details (name, email, phone)
   - Service requirements (service_type, budget_range, city)
   - Communication preferences (consultation_date, message)
   - Timestamp tracking (created_at)

2. **NewsletterSubscription**: Manages email subscriptions
   - Unique email constraint to prevent duplicates
   - Subscription tracking with timestamps

### Routes (routes.py)
1. **Index Route (/)**: Serves the main landing page
2. **Contact Route (/contact)**: Handles both GET and POST requests
   - Form validation and error handling
   - Database persistence of inquiries
   - Success page redirection with personalized messages
   - Comprehensive logging for debugging and monitoring

### Templates
1. **base.html**: Master template with navigation, Bootstrap setup, and common assets
2. **index.html**: Main landing page with hero section and service showcases
3. **contact_success.html**: Confirmation page with next-steps information

### Static Assets
1. **CSS (style.css)**: Custom styling with CSS variables for theming
2. **JavaScript (main.js)**: Interactive features including navigation effects and form enhancements

## Data Flow

1. **User Journey**: 
   - Visitor lands on homepage → Views services/portfolio → Fills contact form → Receives confirmation
   
2. **Contact Form Processing**:
   - User submits form → Server validation → Database storage → Success page → Email notification (planned)

3. **Database Operations**:
   - Automatic table creation on startup
   - Contact inquiries stored with full details
   - Newsletter subscriptions managed separately

## External Dependencies

### Python Packages
- **flask**: Core web framework
- **flask-sqlalchemy**: Database ORM integration
- **gunicorn**: Production WSGI server
- **psycopg2-binary**: PostgreSQL adapter
- **email-validator**: Email validation utilities
- **werkzeug**: WSGI utilities and security features

### Frontend Dependencies (CDN)
- **Bootstrap 5**: Responsive CSS framework
- **Font Awesome 6**: Icon library
- **Google Fonts**: Typography (Inter, Playfair Display)

### Infrastructure
- **Replit**: Development and hosting platform
- **PostgreSQL**: Production database option
- **SSL/TLS**: Handled by Replit's infrastructure

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Python 3.11 runtime
- **Database**: SQLite for local development
- **Server**: Built-in Flask development server with hot reload
- **Debugging**: Enabled with comprehensive logging

### Production Environment
- **Deployment Target**: Autoscale deployment on Replit
- **WSGI Server**: Gunicorn with multiple workers
- **Database**: PostgreSQL (configurable via DATABASE_URL)
- **Process Management**: Gunicorn handles worker processes and auto-restart
- **Security**: ProxyFix middleware for proper header handling behind reverse proxy

### Configuration Management
- **Environment Variables**: Used for sensitive configuration
  - `DATABASE_URL`: Database connection string
  - `SESSION_SECRET`: Flask session encryption key
- **Fallback Values**: Sensible defaults for development environment

## Changelog
- June 19, 2025: Initial setup with Flask application
- June 19, 2025: Updated branding to "Dream Kraft Interiors" 
- June 19, 2025: Implemented forest green and warm orange color scheme
- June 19, 2025: Added PostgreSQL database with contact_inquiry and newsletter_subscription tables
- June 19, 2025: Updated contact form to serve only Bangalore and Other locations

## User Preferences

Preferred communication style: Simple, everyday language.