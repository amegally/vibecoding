/**
 * Course Landing Page JavaScript
 * Optimized for performance
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen handler - show content when everything loads
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Remove the loading screen from DOM after animation completes
            setTimeout(() => {
                loadingScreen.parentNode?.removeChild(loadingScreen);
            }, 500);
        }
    });

    // Initialize testimonials carousel
    initializeTestimonials();
    
    // Initialize FAQ accordion
    initializeFAQ();
});

/**
 * Testimonials carousel functionality
 */
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-arrow.prev');
    const nextButton = document.querySelector('.testimonial-arrow.next');
    
    if (!testimonialCards.length) return;
    
    let currentSlide = 0;
    let autoplayInterval;
    let isTransitioning = false;

    // Update the active slide
    const updateSlidePosition = () => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Hide all cards
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Show current card
        testimonialCards[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
            // Update ARIA attributes for accessibility
            dot.setAttribute('aria-selected', index === currentSlide ? 'true' : 'false');
        });
        
        // Reset transition flag after a short delay
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    };

    // Navigate to next slide
    const nextSlide = () => {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlidePosition();
    };

    // Navigate to previous slide
    const prevSlide = () => {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlidePosition();
    };

    // Start autoplay timer
    const startAutoplay = () => {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    // Stop autoplay timer
    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    };

    // Set up event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning || currentSlide === index) return;
            currentSlide = index;
            updateSlidePosition();
            startAutoplay();
        });
        
        // Accessibility
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('tabindex', '0');
        
        // Allow keyboard navigation
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentSlide = index;
                updateSlidePosition();
                startAutoplay();
            }
        });
    });

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
        
        // Accessibility for nav buttons
        prevButton.setAttribute('role', 'button');
        prevButton.setAttribute('tabindex', '0');
        prevButton.setAttribute('aria-label', 'Previous testimonial');
        
        prevButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prevSlide();
                startAutoplay();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });
        
        // Accessibility for nav buttons
        nextButton.setAttribute('role', 'button');
        nextButton.setAttribute('tabindex', '0');
        nextButton.setAttribute('aria-label', 'Next testimonial');
        
        nextButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
                startAutoplay();
            }
        });
    }

    // Start with the first slide active
    updateSlidePosition();
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
}

/**
 * FAQ Accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Add accessibility attributes
        question.setAttribute('id', `faq-question-${index}`);
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        answer.setAttribute('id', `faq-answer-${index}`);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', `faq-question-${index}`);
        
        // Click handler
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
} 