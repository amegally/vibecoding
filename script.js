// Background particles sketch
document.addEventListener('DOMContentLoaded', () => {
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
                
                // Draw connections
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

    // Initialize the background sketch
    new p5(bodySketch);

    // Remove the flyer sketch initialization
    // const flyerElement = document.querySelector('.flyer');
    // if (flyerElement) {
    //     new p5(flyerSketch);
    // }

    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        const handleHover = opacity => () => ctaButton.style.opacity = opacity;
        ctaButton.addEventListener('mouseenter', handleHover('0.8'));
        ctaButton.addEventListener('mouseleave', handleHover('1'));
    }
}); 