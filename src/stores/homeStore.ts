import { create } from 'zustand';

interface Pixel {
  id: number;
  top: number;
  left: number;
  speedX: number;
  speedY: number;
  z: number; // Add z-coordinate for depth
  size: number; // Add size for 3D effect
}

interface HomeStore {
  pixels: Pixel[];
  initializePixels: () => void;
  movePixels: () => void;
  startAnimation: (canvas: HTMLCanvasElement) => void;
  stopAnimation: () => void;
}

const useHomeStore = create<HomeStore>((set, get) => ({
  pixels: [],

  // Initialize pixels with random positions, speeds, and depth
  initializePixels: () => {
    const pixels: Pixel[] = [];
    const numPixels = 100;
    for (let i = 0; i < numPixels; i++) {
      const z = Math.random() * 10 + 1; // Random depth between 1 and 11
      pixels.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        z, // Assign depth
        size: 2 / z, // Smaller size for farther stars
      });
    }
    set({ pixels });
  },

  // Move pixels and wrap around screen boundaries
  movePixels: () => set((state) => ({
    pixels: state.pixels.map((pixel) => {
      let newTop = pixel.top + pixel.speedY / pixel.z; // Adjust speed based on depth
      let newLeft = pixel.left + pixel.speedX / pixel.z; // Adjust speed based on depth

      if (newTop > 100) newTop = 0;
      if (newTop < 0) newTop = 100;
      if (newLeft > 100) newLeft = 0;
      if (newLeft < 0) newLeft = 100;

      return {
        ...pixel,
        top: newTop,
        left: newLeft,
      };
    }),
  })),

  // Start the animation loop
  startAnimation: (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const { pixels, movePixels } = get();

      // Overlay a semi-transparent black rectangle to create the trail effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.1)`; // Dark shade with 10% opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw pixels (stars) with 3D effect
      pixels.forEach((pixel) => {
        const brightness = 1 / pixel.z; // Brighter for closer stars
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`; // Adjust brightness based on depth
        ctx.fillRect(
          (pixel.left / 100) * canvas.width,
          (pixel.top / 100) * canvas.height,
          pixel.size, // Adjust size based on depth
          pixel.size // Adjust size based on depth
        );
      });

      movePixels(); // Update pixel positions
      requestAnimationFrame(animate); // Continue the animation loop
    };

    requestAnimationFrame(animate);
  },

  // Stop the animation loop (cleanup)
  stopAnimation: () => {
    // Add cleanup logic if needed
  },
}));

export default useHomeStore;