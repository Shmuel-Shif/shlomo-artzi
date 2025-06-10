// Start celebration effects when the page loads
document.addEventListener('DOMContentLoaded', () => {

    // Launch initial confetti
    launchConfetti();

    // Start continuous confetti every few seconds
    setInterval(launchConfetti, 3000);
});

function launchConfetti() {
    // Duration of the confetti animation
    const animationEnd = Date.now() + 3000;
    
    // Confetti settings
    const colors = ['#e0e0e0', '#c0c0c0', '#a0a0a0']; // Elegant silver tones
    
    // Create a confetti interval
    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // Launch confetti from both sides
        const particleCount = 2;
        
        // Left side
        confetti({
            particleCount,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: colors,
            ticks: 200,
            gravity: 1,
            scalar: 1.2,
            drift: 0,
            shapes: ['square'],
            opacity: 0.8
        });
        
        // Right side
        confetti({
            particleCount,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: colors,
            ticks: 200,
            gravity: 1,
            scalar: 1.2,
            drift: 0,
            shapes: ['square'],
            opacity: 0.8
        });
    }, 100);
}

// Add dynamic background effects
const container = document.querySelector('.celebration-container');
let mouseX = 0;
let mouseY = 0;

// Track mouse movement for subtle background effect
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    // Update gradient position based on mouse
    container.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
}); 