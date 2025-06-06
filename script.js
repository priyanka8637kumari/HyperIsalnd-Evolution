// WebXR Hyper Island Journey - Main Script
console.log('🚀 Hyper Island Journey WebXR Experience Starting...');

// Scene management
let currentScene = 'initial';
let isTransitioning = false;

// Chapter information
const chapterData = {
    1: {
        title: "Foundations Station",
        description: "Learning HTML, CSS, JavaScript fundamentals with modular, interactive practice and creative exploration."
    },
    2: {
        title: "Collab Central", 
        description: "Embracing radical collaboration, trusting the process, and learning that feedback is a gift."
    },
    3: {
        title: "Design Detour",
        description: "Exploring UI/UX design, empathy, aesthetics, and user flows with vibrant creativity."
    },
    4: {
        title: "Backend Boiler Room",
        description: "Structuring logic and powering data flow with Node.js, databases, and REST APIs."
    },
    5: {
        title: "Project Junction",
        description: "Building, breaking, learning, and repeating in a dynamic maker space environment."
    },
    6: {
        title: "Reflect Loop",
        description: "Introspective learning: What did I learn? How did I grow? What's next?"
    },
    final: {
        title: "Launch Station",
        description: "Portfolio ready, future bright. Ready to lead, ready to change the world."
    }
};

// Initialize the experience when A-Frame is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM loaded, initializing A-Frame components...');
    
    // Wait for A-Frame to be ready
    const scene = document.querySelector('a-scene');
    if (scene.hasLoaded) {
        initializeExperience();
    } else {
        scene.addEventListener('loaded', initializeExperience);
    }
});

function initializeExperience() {
    console.log('🎮 A-Frame scene loaded, setting up interactions...');
    
    setupDoorInteraction();
    setupChapterInteractions();
    setupAnimations();
    setupAudio();
    
    // Initial camera position
    const cameraRig = document.querySelector('#camera-rig');
    cameraRig.setAttribute('position', '0 1.6 5');
    
    console.log('✅ Experience initialized successfully!');
}

function setupDoorInteraction() {
    const door = document.querySelector('#door-clickable');
    
    if (door) {
        door.addEventListener('click', function() {
            console.log('🚪 Door clicked! Transitioning to chapter selection...');
            transitionToChapterScene();
        });
        
        // Add hover effect
        door.addEventListener('mouseenter', function() {
            door.setAttribute('animation__hover', 'property: scale; to: 1.1 1.1 1.1; dur: 200');
        });
        
        door.addEventListener('mouseleave', function() {
            door.setAttribute('animation__hover', 'property: scale; to: 1 1 1; dur: 200');
        });
    }
}

function setupChapterInteractions() {
    const chapterElements = document.querySelectorAll('.chapter-clickable');
    
    chapterElements.forEach(element => {
        element.addEventListener('click', function() {
            const chapterNum = this.getAttribute('data-chapter');
            console.log(`📚 Chapter ${chapterNum} clicked!`);
            showChapterInfo(chapterNum);
        });
        
        // Add hover effects
        element.addEventListener('mouseenter', function() {
            this.setAttribute('animation__hover', 'property: rotation; to: 0 360 0; dur: 1000; loop: true');
            this.setAttribute('animation__scale', 'property: scale; to: 1.2 1.2 1.2; dur: 200');
        });
        
        element.addEventListener('mouseleave', function() {
            this.removeAttribute('animation__hover');
            this.setAttribute('animation__scale', 'property: scale; to: 1 1 1; dur: 200');
        });
    });
}

function transitionToChapterScene() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    console.log('🌟 Starting scene transition...');
    
    // Play transition sound (if available)
    playSound('#transition-sound');
    
    // Update UI
    updateUI('Select a chapter to explore your learning journey!');
    
    // Fade out initial scene
    const initialScene = document.querySelector('#initial-scene');
    const chapterScene = document.querySelector('#chapter-scene');
    const cameraRig = document.querySelector('#camera-rig');
    
    // Transition effect
    initialScene.setAttribute('animation__fadeout', 'property: opacity; to: 0; dur: 1500');
    
    setTimeout(() => {
        initialScene.setAttribute('visible', false);
        chapterScene.setAttribute('visible', true);
        chapterScene.setAttribute('opacity', 0);
        chapterScene.setAttribute('animation__fadein', 'property: opacity; to: 1; dur: 1500');
        
        // Move camera to new position
        cameraRig.setAttribute('animation__move', 'property: position; to: 0 5 15; dur: 2000; easing: easeInOutQuad');
        
        currentScene = 'chapters';
        isTransitioning = false;
        
        console.log('✨ Transition complete!');
    }, 1500);
}

function showChapterInfo(chapterNum) {
    const chapterInfo = chapterData[chapterNum];
    if (chapterInfo) {
        console.log(`📖 Showing info for ${chapterInfo.title}`);
        
        updateUI(`Chapter ${chapterNum}: ${chapterInfo.title}`, chapterInfo.description);
        
        // Add visual feedback
        const islands = document.querySelectorAll('#floating-islands a-entity');
        islands.forEach(island => {
            const box = island.querySelector('.chapter-clickable');
            if (box && box.getAttribute('data-chapter') === chapterNum) {
                // Highlight selected chapter
                box.setAttribute('material', 'color: #FFD700; emissive: #FFD700; emissiveIntensity: 0.5');
                box.setAttribute('animation__glow', 'property: material.emissiveIntensity; to: 1; dur: 1000; dir: alternate; loop: true');
            } else if (box) {
                // Reset other chapters
                box.setAttribute('material', 'color: #ff6b35');
                box.removeAttribute('animation__glow');
            }
        });
    }
}

function setupAnimations() {
    // Add floating animation to clouds
    const clouds = document.querySelectorAll('#clouds a-sphere');
    clouds.forEach((cloud, index) => {
        cloud.setAttribute('animation__float', `property: position; to: ${cloud.getAttribute('position').x + 2} ${cloud.getAttribute('position').y + 1} ${cloud.getAttribute('position').z}; dur: ${4000 + index * 1000}; dir: alternate; loop: true; easing: easeInOutSine`);
    });
    
    // Add gentle movement to floating islands
    const islands = document.querySelectorAll('#floating-islands > a-entity[id*="chapter"]');
    islands.forEach((island, index) => {
        island.setAttribute('animation__bob', `property: position; to: ${island.getAttribute('position').x} ${parseFloat(island.getAttribute('position').y) + 0.5} ${island.getAttribute('position').z}; dur: ${3000 + index * 500}; dir: alternate; loop: true; easing: easeInOutSine`);
    });
    
    console.log('🎭 Animations set up complete!');
}

function setupAudio() {
    // Setup audio context (modern browsers require user interaction)
    document.addEventListener('click', function initAudio() {
        console.log('🔊 Initializing audio context...');
        // Audio setup would go here
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

function playSound(selector) {
    const audio = document.querySelector(selector);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play prevented:', e));
    }
}

function updateUI(title, description = '') {
    const instructionsDiv = document.querySelector('#instructions');
    const chapterInfo = document.querySelector('#chapter-info');
    const chapterTitle = document.querySelector('#chapter-title');
    const chapterDescription = document.querySelector('#chapter-description');
    
    if (description) {
        instructionsDiv.style.display = 'none';
        chapterInfo.style.display = 'block';
        chapterTitle.textContent = title;
        chapterDescription.textContent = description;
    } else {
        instructionsDiv.style.display = 'block';
        chapterInfo.style.display = 'none';
        instructionsDiv.querySelector('p').textContent = title;
    }
}

// Utility functions
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    console.log('📱 Window resized, adjusting UI...');
    // Handle responsive adjustments if needed
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript error:', e.error);
});

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⏱️ Page load time: ${loadTime}ms`);
    });
}

console.log('🎯 Script loaded successfully! Ready for WebXR adventure!');
