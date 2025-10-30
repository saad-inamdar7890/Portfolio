/**
 * Interactive Avatar Animation
 * Makes the avatar's eyes follow the cursor movement
 */

class AvatarAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn(`Avatar container "${containerId}" not found`);
            return;
        }

        this.avatar = this.container.querySelector('svg') || this.container.querySelector('object');
        this.leftPupil = null;
        this.rightPupil = null;
        this.eyebrows = null;
        this.mouth = null;
        
        this.isHovering = false;
        this.currentEmotion = 'neutral';
        
        this.init();
    }

    init() {
        // Wait for SVG to load if it's an object tag
        if (this.avatar && this.avatar.tagName === 'OBJECT') {
            this.avatar.addEventListener('load', () => {
                this.setupElements();
            });
        } else {
            this.setupElements();
        }

        // Add mouse move listener
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Add hover listeners to the avatar
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.handleHover(true));
            this.container.addEventListener('mouseleave', () => this.handleHover(false));
        }

        // Random blink animation
        setInterval(() => this.blink(), 3000 + Math.random() * 2000);
    }

    setupElements() {
        // Get SVG document
        let svgDoc = this.avatar;
        if (this.avatar && this.avatar.tagName === 'OBJECT') {
            svgDoc = this.avatar.contentDocument;
        }

        if (!svgDoc) return;

        // Get eye pupils
        this.leftPupil = svgDoc.getElementById('left-pupil');
        this.rightPupil = svgDoc.getElementById('right-pupil');
        
        // Get eyebrows
        this.leftEyebrow = svgDoc.getElementById('left-eyebrow');
        this.rightEyebrow = svgDoc.getElementById('right-eyebrow');
        
        // Get mouth
        this.mouth = svgDoc.getElementById('mouth-path');
        
        // Get full eye groups for blinking
        this.leftEye = svgDoc.getElementById('left-eye');
        this.rightEye = svgDoc.getElementById('right-eye');
    }

    handleMouseMove(event) {
        if (!this.leftPupil || !this.rightPupil) return;

        const avatarRect = this.container.getBoundingClientRect();
        const avatarCenterX = avatarRect.left + avatarRect.width / 2;
        const avatarCenterY = avatarRect.top + avatarRect.height / 2;

        // Calculate angle to cursor
        const deltaX = event.clientX - avatarCenterX;
        const deltaY = event.clientY - avatarCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        // Calculate distance (normalized to max eye movement)
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 200);
        const normalizedDistance = (distance / 200) * 3; // Max 3px movement

        // Calculate new pupil positions
        const moveX = Math.cos(angle) * normalizedDistance;
        const moveY = Math.sin(angle) * normalizedDistance;

        // Update pupil positions with smooth transition
        this.leftPupil.setAttribute('cx', 75 + moveX);
        this.leftPupil.setAttribute('cy', 90 + moveY);
        this.rightPupil.setAttribute('cx', 125 + moveX);
        this.rightPupil.setAttribute('cy', 90 + moveY);

        // Update eyebrows based on cursor position (raises when cursor is above)
        if (this.leftEyebrow && this.rightEyebrow) {
            const eyebrowRaise = deltaY < -50 ? -2 : 0;
            this.updateEyebrows(eyebrowRaise);
        }
    }

    handleHover(isEntering) {
        this.isHovering = isEntering;
        
        if (isEntering) {
            this.smile();
            this.wiggleEyebrows();
        } else {
            this.neutral();
        }
    }

    smile() {
        if (!this.mouth) return;
        
        // Happy smile
        this.mouth.setAttribute('d', 'M 85 118 Q 100 130, 115 118');
        this.currentEmotion = 'happy';
    }

    neutral() {
        if (!this.mouth) return;
        
        // Neutral expression
        this.mouth.setAttribute('d', 'M 85 120 Q 100 128, 115 120');
        this.currentEmotion = 'neutral';
    }

    updateEyebrows(offset) {
        if (!this.leftEyebrow || !this.rightEyebrow) return;
        
        const baseY = 75 + offset;
        this.leftEyebrow.setAttribute('d', `M 65 ${baseY} Q 75 ${baseY - 3}, 85 ${baseY}`);
        this.rightEyebrow.setAttribute('d', `M 115 ${baseY} Q 125 ${baseY - 3}, 135 ${baseY}`);
    }

    wiggleEyebrows() {
        if (!this.leftEyebrow || !this.rightEyebrow) return;
        
        let count = 0;
        const wiggle = setInterval(() => {
            const offset = count % 2 === 0 ? -3 : 0;
            this.updateEyebrows(offset);
            count++;
            
            if (count > 4) {
                clearInterval(wiggle);
                this.updateEyebrows(0);
            }
        }, 150);
    }

    blink() {
        if (!this.leftEye || !this.rightEye) return;
        
        // Quick blink animation
        this.leftEye.style.transform = 'scaleY(0.1)';
        this.leftEye.style.transformOrigin = 'center';
        this.leftEye.style.transition = 'transform 0.1s ease';
        
        this.rightEye.style.transform = 'scaleY(0.1)';
        this.rightEye.style.transformOrigin = 'center';
        this.rightEye.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            this.leftEye.style.transform = 'scaleY(1)';
            this.rightEye.style.transform = 'scaleY(1)';
        }, 150);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize avatar animation if container exists
    const avatarContainer = document.getElementById('interactive-avatar');
    if (avatarContainer) {
        new AvatarAnimation('interactive-avatar');
    }
});
