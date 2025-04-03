/**
 * Optimized P5.js sketches for the course landing page
 * These sketches are designed to be lightweight and performant
 */

// Global variables to store sketch instances
let backgroundSketch = null;
let heroSketch = null;
let footerSketch = null;

// Feature detection for hardware capabilities
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowPower = isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Common particle system settings
const SETTINGS = {
  particleCount: isLowPower ? 15 : 40,
  speed: isLowPower ? 0.5 : 1,
  animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  opacity: isLowPower ? 0.5 : 0.7
};

/**
 * Background sketch that runs across the entire page
 */
function initBackgroundSketch() {
  // Only create if the container exists
  const container = document.getElementById('background-canvas');
  if (!container) return;
  
  backgroundSketch = new p5((sketch) => {
    let particles = [];
    const particleCount = Math.floor(SETTINGS.particleCount / 2);
    
    sketch.setup = function() {
      // Create canvas to fit container
      const canvas = sketch.createCanvas(window.innerWidth, window.innerHeight);
      canvas.style('display', 'block');
      
      // Disable canvas from receiving pointer events
      canvas.elt.style.pointerEvents = 'none';
      
      // Create initial particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(sketch));
      }
    };
    
    sketch.draw = function() {
      // Use clear instead of background for better performance
      sketch.clear();
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Draw particle
        sketch.noStroke();
        sketch.fill(0, 0, 0, p.opacity);
        sketch.circle(p.x, p.y, p.size);
        
        // Update position if animation is enabled
        if (SETTINGS.animate) {
          p.x += p.vx * SETTINGS.speed;
          p.y += p.vy * SETTINGS.speed;
          
          // Wrap around edges
          if (p.x < -p.size) p.x = sketch.width + p.size;
          if (p.x > sketch.width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = sketch.height + p.size;
          if (p.y > sketch.height + p.size) p.y = -p.size;
        }
      }
    };
    
    // Handle window resize
    sketch.windowResized = function() {
      sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  }, container);
}

/**
 * Hero section sketch
 */
function initHeroSketch() {
  // Only create if the container exists
  const container = document.getElementById('p5-container');
  if (!container) return;
  
  heroSketch = new p5((sketch) => {
    let particles = [];
    const particleCount = SETTINGS.particleCount;
    
    sketch.setup = function() {
      // Create canvas to fit container dimensions
      const canvas = sketch.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.style('display', 'block');
      
      // Disable canvas from receiving pointer events
      canvas.elt.style.pointerEvents = 'none';
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(sketch, true));
      }
    };
    
    sketch.draw = function() {
      // Use clear instead of background for transparency
      sketch.clear();
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        sketch.noStroke();
        sketch.fill(255, 240, 0, p.opacity); // Yellow particles
        sketch.circle(p.x, p.y, p.size);
        
        // Optional: connect nearby particles with lines
        if (!isLowPower) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = sketch.dist(p.x, p.y, p2.x, p2.y);
            if (d < 100) {
              sketch.stroke(255, 240, 0, sketch.map(d, 0, 100, 40, 0));
              sketch.line(p.x, p.y, p2.x, p2.y);
            }
          }
        }
        
        // Update particle position
        if (SETTINGS.animate) {
          p.x += p.vx * SETTINGS.speed;
          p.y += p.vy * SETTINGS.speed;
          
          // Wrap around edges
          if (p.x < -p.size) p.x = sketch.width + p.size;
          if (p.x > sketch.width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = sketch.height + p.size;
          if (p.y > sketch.height + p.size) p.y = -p.size;
        }
      }
    };
    
    // Handle container resize
    sketch.windowResized = function() {
      if (container.offsetWidth > 0 && container.offsetHeight > 0) {
        sketch.resizeCanvas(container.offsetWidth, container.offsetHeight);
      }
    };
  }, container);
}

/**
 * Footer section sketch
 */
function initFooterSketch() {
  // Only create if the container exists
  const container = document.getElementById('p5-container-footer');
  if (!container) return;
  
  footerSketch = new p5((sketch) => {
    let particles = [];
    const particleCount = Math.floor(SETTINGS.particleCount / 1.5);
    
    sketch.setup = function() {
      // Create canvas to fit container dimensions
      const canvas = sketch.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.style('display', 'block');
      
      // Disable canvas from receiving pointer events
      canvas.elt.style.pointerEvents = 'none';
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(sketch, true));
      }
    };
    
    sketch.draw = function() {
      // Use clear instead of background for transparency
      sketch.clear();
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        sketch.noStroke();
        sketch.fill(0, 0, 0, p.opacity * 0.6); // Darker particles for footer
        sketch.circle(p.x, p.y, p.size);
        
        // Update particle position
        if (SETTINGS.animate) {
          p.x += p.vx * SETTINGS.speed * 0.5; // Slower in footer
          p.y += p.vy * SETTINGS.speed * 0.5;
          
          // Wrap around edges
          if (p.x < -p.size) p.x = sketch.width + p.size;
          if (p.x > sketch.width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = sketch.height + p.size;
          if (p.y > sketch.height + p.size) p.y = -p.size;
        }
      }
    };
    
    // Handle container resize
    sketch.windowResized = function() {
      if (container.offsetWidth > 0 && container.offsetHeight > 0) {
        sketch.resizeCanvas(container.offsetWidth, container.offsetHeight);
      }
    };
  }, container);
}

/**
 * Helper function to create a particle
 */
function createParticle(sketch, smallerParticles = false) {
  return {
    x: sketch.random(sketch.width),
    y: sketch.random(sketch.height),
    size: sketch.random(smallerParticles ? 1 : 2, smallerParticles ? 4 : 6),
    opacity: sketch.random(10, 50) * SETTINGS.opacity,
    vx: sketch.random(-0.5, 0.5),
    vy: sketch.random(-0.5, 0.5)
  };
}

/**
 * Initialize all sketches when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Use requestIdleCallback for non-critical initialization
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initBackgroundSketch();
      initHeroSketch();
      initFooterSketch();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      initBackgroundSketch();
      initHeroSketch();
      initFooterSketch();
    }, 100);
  }
  
  // Pause animations when the page is not visible
  document.addEventListener('visibilitychange', () => {
    const isVisible = document.visibilityState === 'visible';
    
    if (backgroundSketch && backgroundSketch.loop && backgroundSketch.noLoop) {
      isVisible ? backgroundSketch.loop() : backgroundSketch.noLoop();
    }
    
    if (heroSketch && heroSketch.loop && heroSketch.noLoop) {
      isVisible ? heroSketch.loop() : heroSketch.noLoop();
    }
    
    if (footerSketch && footerSketch.loop && footerSketch.noLoop) {
      isVisible ? footerSketch.loop() : footerSketch.noLoop();
    }
  });
}); 