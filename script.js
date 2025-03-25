// Background particles sketch
const bodySketch = p => {
    const particles = [];
    const numParticles = 40;
    
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('background-canvas');
        p.frameRate(30); // Optimize performance
        
        // Initialize particles
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
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

// Flyer background sketch
const flyerSketch = p => {
    let flyerWidth, flyerHeight;
    let noiseScale = 0.02;
    let noiseOffset = 0;
    let texturePoints = [];
    const numPoints = 300;
    
    p.setup = () => {
        const flyerElement = document.querySelector('.flyer');
        const flyerRect = flyerElement.getBoundingClientRect();
        flyerWidth = flyerRect.width;
        flyerHeight = flyerRect.height;
        
        const canvas = p.createCanvas(flyerWidth, flyerHeight);
        canvas.parent('p5-container');
        p.frameRate(30);
        
        // Generate texture points
        for (let i = 0; i < numPoints; i++) {
            texturePoints.push({
                x: p.random(flyerWidth),
                y: p.random(flyerHeight),
                size: p.random(1, 3),
                opacity: p.random(5, 20)
            });
        }
    };
    
    p.draw = () => {
        p.clear();
        drawBackgroundPattern();
        drawTexture();
        noiseOffset += 0.005;
    };
    
    const drawBackgroundPattern = () => {
        // Draw diagonal lines pattern
        p.stroke(0, 15);
        p.strokeWeight(1);
        
        // Diagonal lines
        const spacing = 20;
        for (let i = -flyerHeight; i < flyerWidth + flyerHeight; i += spacing) {
            p.line(i, 0, i + flyerHeight, flyerHeight);
        }
        
        // Draw decorative elements
        p.noFill();
        p.stroke(255, 56, 96, 30);
        p.strokeWeight(2);
        
        // Corner circles
        const circleSize = flyerWidth * 0.3;
        p.ellipse(0, 0, circleSize);
        p.ellipse(flyerWidth, 0, circleSize);
        p.ellipse(0, flyerHeight, circleSize);
        p.ellipse(flyerWidth, flyerHeight, circleSize);
        
        // X pattern
        p.stroke(0, 20);
        p.strokeWeight(1);
        p.line(0, 0, flyerWidth, flyerHeight);
        p.line(flyerWidth, 0, 0, flyerHeight);
        
        // Noise pattern
        p.noStroke();
        p.fill(0, 5);
        for (let x = 0; x < flyerWidth; x += 10) {
            for (let y = 0; y < flyerHeight; y += 10) {
                const noiseVal = p.noise(x * noiseScale, y * noiseScale, p.frameCount * 0.01);
                if (noiseVal > 0.6) {
                    p.rect(x, y, 10, 10);
                }
            }
        }
    };
    
    const drawTexture = () => {
        // Grain texture
        texturePoints.forEach(point => {
            const noiseVal = p.noise(point.x * 0.01, point.y * 0.01, noiseOffset);
            const opacity = p.map(noiseVal, 0, 1, 0, point.opacity);
            p.noStroke();
            p.fill(0, opacity);
            p.ellipse(point.x, point.y, point.size);
        });
        
        // Subtle noise overlay
        p.blendMode(p.OVERLAY);
        for (let x = 0; x < flyerWidth; x += 20) {
            for (let y = 0; y < flyerHeight; y += 20) {
                const noiseVal = p.noise(x * 0.005, y * 0.005, noiseOffset * 0.5);
                const size = p.map(noiseVal, 0, 1, 15, 25);
                p.noStroke();
                if (noiseVal > 0.5) {
                    p.fill(255, 5);
                    p.ellipse(x, y, size);
                } else {
                    p.fill(0, 3);
                    p.ellipse(x, y, size);
                }
            }
        }
        p.blendMode(p.BLEND);
        
        // Add vignette
        const gradient = p.drawingContext.createRadialGradient(
            flyerWidth/2, flyerHeight/2, flyerWidth * 0.3,
            flyerWidth/2, flyerHeight/2, flyerWidth * 0.8
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
        p.drawingContext.fillStyle = gradient;
        p.noStroke();
        p.rect(0, 0, flyerWidth, flyerHeight);
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

// Initialize both sketches
new p5(bodySketch);
new p5(flyerSketch);

// Add hover effect to CTA button
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        const handleHover = opacity => () => ctaButton.style.opacity = opacity;
        ctaButton.addEventListener('mouseenter', handleHover('0.8'));
        ctaButton.addEventListener('mouseleave', handleHover('1'));
    }
}); 