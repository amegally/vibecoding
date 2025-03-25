// Background particles sketch
const backgroundSketch = p => {
    const particles = [];
    const numParticles = 40;
    
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('background-canvas');
        p.frameRate(30); // Optimize performance
        
        // Initialize particles once
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: p.random(2, 4),
                speedX: p.random(-0.2, 0.2),
                speedY: p.random(-0.2, 0.2),
                opacity: p.random(5, 15)
            });
        }
    };
    
    p.draw = () => {
        p.clear();
        p.background(240);
        
        particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            particle.x = (particle.x + p.width) % p.width;
            particle.y = (particle.y + p.height) % p.height;
            
            // Draw particle
            p.noStroke();
            p.fill(0, particle.opacity);
            p.ellipse(particle.x, particle.y, particle.size);
            
            // Draw connections (only to particles ahead in the array to avoid duplicates)
            for (let j = i + 1; j < particles.length; j++) {
                const other = particles[j];
                const d = p.dist(particle.x, particle.y, other.x, other.y);
                if (d < 80) {
                    p.stroke(0, p.map(d, 0, 80, 5, 0));
                    p.line(particle.x, particle.y, other.x, other.y);
                }
            }
        });
    };
    
    // Debounced resize handler
    let resizeTimeout;
    p.windowResized = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }, 250);
    };
};

// Flyer sketch
const flyerSketch = p => {
    let flyerWidth, flyerHeight;
    
    p.setup = () => {
        const flyerElement = document.querySelector('.flyer');
        const flyerRect = flyerElement.getBoundingClientRect();
        flyerWidth = flyerRect.width;
        flyerHeight = flyerRect.height;
        
        const canvas = p.createCanvas(flyerWidth, flyerHeight);
        canvas.parent('p5-container');
        p.frameRate(30); // Optimize performance
    };
    
    p.draw = () => {
        p.clear();
        drawBackgroundPattern();
    };
    
    const drawBackgroundPattern = () => {
        // Grid pattern
        p.stroke(0, 15);
        p.strokeWeight(0.5);
        
        const spacing = 20;
        for (let y = 0; y < flyerHeight; y += spacing) {
            p.line(0, y, flyerWidth, y);
        }
        for (let x = 0; x < flyerWidth; x += spacing) {
            p.line(x, 0, x, flyerHeight);
        }
        
        // Globe decoration
        const globeSize = flyerWidth * 0.15;
        const globeX = flyerWidth * 0.15;
        const globeY = flyerHeight * 0.15;
        
        p.noFill();
        p.stroke(0, 20);
        p.strokeWeight(1);
        
        for (let i = 0; i < 3; i++) {
            p.ellipse(globeX, globeY, globeSize * (0.6 + i * 0.2), globeSize * (0.4 + i * 0.2));
        }
        
        p.line(globeX, globeY - globeSize/2, globeX, globeY + globeSize/2);
        p.line(globeX - globeSize/2, globeY, globeX + globeSize/2, globeY);
        
        // Arrow decoration
        const arrowX = flyerWidth * 0.85;
        const arrowY = flyerHeight * 0.85;
        const arrowSize = flyerWidth * 0.1;
        
        p.stroke(0, 30);
        p.strokeWeight(2);
        p.line(arrowX - arrowSize, arrowY, arrowX, arrowY);
        p.line(arrowX, arrowY - arrowSize, arrowX, arrowY);
        p.line(arrowX - arrowSize * 0.7, arrowY - arrowSize * 0.7, arrowX, arrowY);
    };
    
    // Debounced resize handler
    let resizeTimeout;
    p.windowResized = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const flyerElement = document.querySelector('.flyer');
            const flyerRect = flyerElement.getBoundingClientRect();
            flyerWidth = flyerRect.width;
            flyerHeight = flyerRect.height;
            p.resizeCanvas(flyerWidth, flyerHeight);
        }, 250);
    };
};

// Initialize sketches
new p5(backgroundSketch);
new p5(flyerSketch);

// DOM content loaded handler
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        const handleHover = opacity => () => ctaButton.style.opacity = opacity;
        ctaButton.addEventListener('mouseenter', handleHover('0.8'));
        ctaButton.addEventListener('mouseleave', handleHover('1'));
    }
}); 