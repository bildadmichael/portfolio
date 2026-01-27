const canvas = document.getElementById('binary-canvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('intro-overlay');
const wrapper = document.getElementById('content-wrapper');
const warningText = document.querySelector('.warning-text');

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "10";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Neon Green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Sequence
const interval = setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Trigger warning animation (CSS handles the zoom/glow via class or keyframes on load)
setTimeout(() => {
    warningText.style.opacity = '1';
    warningText.style.transform = 'scale(1.5)';
}, 500);

// Transition out
setTimeout(() => {
    // 1. Glitch effect on main content
    wrapper.classList.add('glitch-active');
    overlay.classList.add('glitch-active'); // Optional: glitch the overlay too

    // 2. Hide overlay after short glitch
    setTimeout(() => {
        clearInterval(interval);
        overlay.classList.add('hidden');
        wrapper.classList.remove('glitch-active');
    }, 500); // 0.5s glitch duration
}, 4000); // 4s total duration before glitch starts
