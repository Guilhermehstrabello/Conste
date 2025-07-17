import confetti from 'canvas-confetti';

export const shootConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    startVelocity: 30,
  });
};
