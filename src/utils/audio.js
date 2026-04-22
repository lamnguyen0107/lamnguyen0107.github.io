const hoverSound = new Audio('/assets/audio/fx.mp3');
hoverSound.volume = 0.5;

export const playHoverSound = () => {
    // Reset and play
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {
        // Handle cases where auto-play is blocked until first interaction
    });
};
