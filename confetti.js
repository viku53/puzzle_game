class Confetti {
    constructor(el) {
        this.el = el;
        this.containerEl = null;
        this.confettiFrequency = 3;
        this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
        this.confettiShapes = ['circle', 'square', 'triangle'];
        this.confettiAnimations = ['slow', 'medium', 'fast'];

        this._setupElements();
    }

    _setupElements() {
        const containerEl = document.createElement('div');
        this.el.style.position = 'relative';
        containerEl.classList.add('confetti-container');
        this.el.appendChild(containerEl);
        this.containerEl = containerEl;
    }

    startConfetti() {
        this.confettiInterval = setInterval(() => {
            const confettiEl = document.createElement('div');
            confettiEl.classList.add('confetti');
            confettiEl.style.left = `${Math.random() * 100}%`;
            confettiEl.style.width = confettiEl.style.height = `${Math.random() * 8 + 5}px`;
            confettiEl.style.backgroundColor = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];

            const shape = this.confettiShapes[Math.floor(Math.random() * this.confettiShapes.length)];
            if (shape === 'circle') confettiEl.style.borderRadius = '50%';
            else if (shape === 'triangle') {
                confettiEl.style.width = '0';
                confettiEl.style.height = '0';
                confettiEl.style.borderLeft = '5px solid transparent';
                confettiEl.style.borderRight = '5px solid transparent';
                confettiEl.style.borderBottom = `10px solid ${confettiEl.style.backgroundColor}`;
                confettiEl.style.backgroundColor = 'transparent';
            }

            confettiEl.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            this.containerEl.appendChild(confettiEl);

            setTimeout(() => confettiEl.remove(), 3000);
        }, 30);
    }

    stopConfetti() {
        clearInterval(this.confettiInterval);
    }
}

// Initialize confetti
document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.querySelector('body');
    if (confettiContainer) {
        window.confetti = new Confetti(confettiContainer);
    }
});
