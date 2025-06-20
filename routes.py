from flask import render_template, request, redirect, url_for, flash
from extensions import db
from models import ContactInquiry, NewsletterSubscription
from datetime import datetime
import logging

# Do NOT import app here

def register_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/contact', methods=['GET', 'POST'])
    def contact():
        if request.method == 'POST':
            try:
                # Get form data
                name = request.form.get('name', '').strip()
                email = request.form.get('email', '').strip()
                phone = request.form.get('phone', '').strip()
                service_type = request.form.get('service_type', '').strip()
                message = request.form.get('message', '').strip()
                city = request.form.get('city', '').strip()
                budget_range = request.form.get('budget_range', '').strip()
                
                # Basic validation
                if not all([name, email, phone, service_type]):
                    flash('Please fill in all required fields.', 'error')
                    return redirect(url_for('index') + '#contact')
                
                # Create new contact inquiry
                inquiry = ContactInquiry(
                    name=name,
                    email=email,
                    phone=phone,
                    service_type=service_type,
                    message=message,
                    city=city,
                    budget_range=budget_range
                )
                
                db.session.add(inquiry)
                db.session.commit()
                
                logging.info(f"New contact inquiry from {name} ({email}) for {service_type}")
                
                return render_template('contact_success.html', name=name, service_type=service_type)
                
            except Exception as e:
                logging.error(f"Error processing contact form: {str(e)}")
                flash('Sorry, there was an error processing your request. Please try again.', 'error')
                return redirect(url_for('index') + '#contact')
        
        return redirect(url_for('index'))

    @app.route('/newsletter', methods=['POST'])
    def newsletter_signup():
        try:
            email = request.form.get('newsletter_email', '').strip()
            
            if not email:
                flash('Please enter a valid email address.', 'error')
                return redirect(url_for('index'))
            
            # Check if email already exists
            existing = NewsletterSubscription.query.filter_by(email=email).first()
            if existing:
                flash('You are already subscribed to our newsletter!', 'info')
                return redirect(url_for('index'))
            
            # Create new subscription
            subscription = NewsletterSubscription(email=email)
            db.session.add(subscription)
            db.session.commit()
            
            flash('Thank you for subscribing to our newsletter!', 'success')
            logging.info(f"New newsletter subscription: {email}")
            
        except Exception as e:
            logging.error(f"Error processing newsletter signup: {str(e)}")
            flash('Sorry, there was an error. Please try again.', 'error')
        
        return redirect(url_for('index'))

    @app.route('/admin')
    def admin():
        # Get all contact inquiries
        inquiries = ContactInquiry.query.order_by(ContactInquiry.created_at.desc()).all()
        
        # Get newsletter subscribers
        subscribers = NewsletterSubscription.query.order_by(NewsletterSubscription.subscribed_at.desc()).all()
        
        # Calculate stats
        total_inquiries = len(inquiries)
        
        # Today's inquiries
        today = datetime.now().date()
        today_inquiries = len([i for i in inquiries if i.created_at.date() == today])
        
        newsletter_subscribers = len(subscribers)
        
        return render_template('admin.html', 
                            inquiries=inquiries,
                            subscribers=subscribers,
                            total_inquiries=total_inquiries,
                            today_inquiries=today_inquiries,
                            newsletter_subscribers=newsletter_subscribers)

    @app.context_processor
    def inject_now():
        return {'now': datetime.utcnow()}