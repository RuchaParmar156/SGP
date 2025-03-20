// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Star Rating System
const stars = document.querySelectorAll('.rating-stars i');
const ratingInput = document.getElementById('rating');

stars.forEach(star => {
    // Mouseover event
    star.addEventListener('mouseover', () => {
        const rating = star.getAttribute('data-rating');
        highlightStars(rating);
    });
    
    // Mouseout event
    star.addEventListener('mouseout', () => {
        const currentRating = ratingInput.value;
        if (currentRating > 0) {
            highlightStars(currentRating);
        } else {
            resetStars();
        }
    });
    
    // Click event
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        ratingInput.value = rating;
        highlightStars(rating);
    });
});

// Function to highlight stars up to a specific rating
function highlightStars(rating) {
    resetStars();
    for (let i = 0; i < rating; i++) {
        stars[i].classList.remove('far');
        stars[i].classList.add('fas');
    }
}

// Function to reset all stars
function resetStars() {
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server here
    // For this demo, we'll just show the success message
    
    // Hide the form and show success message
    feedbackForm.style.display = 'none';
    feedbackSuccess.classList.remove('hidden');
    
    // Reset form after submission (for demo purposes)
    setTimeout(() => {
        feedbackForm.reset();
        resetStars();
        ratingInput.value = 0;
        feedbackForm.style.display = 'block';
        feedbackSuccess.classList.add('hidden');
    }, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature, .section-header, .overview-content, .feedback-form-container');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .feature, .section-header, .overview-content, .feedback-form-container');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation for elements already in view
    animateOnScroll();
    
    // Add 3D effect to the feedback form
    const feedbackForm = document.querySelector('.feedback-form-container');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('mousemove', e => {
            const rect = feedbackForm.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 2;
            const rotateX = ((centerY - y) / centerY) * 2;
            
            feedbackForm.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        feedbackForm.addEventListener('mouseleave', () => {
            feedbackForm.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// 3D Tilt Effect for Service Cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees
        const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Move icon and text for enhanced 3D effect
        const icon = card.querySelector('.service-icon');
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector('p');
        
        icon.style.transform = `translateZ(20px) translateX(${rotateY * 2}px) translateY(${rotateX * -2}px)`;
        heading.style.transform = `translateZ(15px) translateX(${rotateY}px) translateY(${rotateX * -1}px)`;
        paragraph.style.transform = `translateZ(10px) translateX(${rotateY * 0.5}px) translateY(${rotateX * -0.5}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        
        const icon = card.querySelector('.service-icon');
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector('p');
        
        icon.style.transform = 'translateZ(0)';
        heading.style.transform = 'translateZ(0)';
        paragraph.style.transform = 'translateZ(0)';
    });
});

// 3D Effect for Hero Content
const heroContent = document.querySelector('.hero-content');
const heroHeading = heroContent.querySelector('h1');
const heroParagraph = heroContent.querySelector('p');
const heroButtons = heroContent.querySelector('.cta-buttons');

document.addEventListener('mousemove', e => {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    heroHeading.style.transform = `translateZ(30px) translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    heroParagraph.style.transform = `translateZ(20px) translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
    heroButtons.style.transform = `translateZ(25px) translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
});

// 3D Effect for Overview Image
const overviewImage = document.querySelector('.overview-image');
const image3d = document.querySelector('.image-3d');

if (overviewImage && image3d) {
    overviewImage.addEventListener('mousemove', e => {
        const rect = overviewImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation and movement based on mouse position - more subtle rotation
        const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees instead of 10
        const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees instead of 10
        const translateZ = 15 + Math.abs(rotateX * rotateY) / 10; // Less aggressive depth
        
        // Apply 3D transform to container
        overviewImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        
        // Apply parallax effect to image - more subtle movement
        const moveX = (x - centerX) / 15; // Reduced movement
        const moveY = (y - centerY) / 15; // Reduced movement
        
        // Ensure the image stays properly framed
        image3d.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px) translateZ(20px)`;
    });
    
    overviewImage.addEventListener('mouseleave', () => {
        overviewImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        image3d.style.transform = 'scale(1) translateZ(0)';
    });
} 