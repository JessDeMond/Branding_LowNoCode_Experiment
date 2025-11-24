import React, { useRef, useEffect } from 'react';

export const EntropyCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Handle Retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // System Config
    const PARTICLE_COUNT = 40;
    const CONNECTION_DISTANCE = 80;
    const MOUSE_RADIUS = 120;
    
    // State
    const mouse = { x: -1000, y: -1000 };
    const center = { x: width / 2, y: height / 2 };
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
    }

    const particles: Particle[] = [];

    // Initialize Particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Create a loosely organized grid/cloud around the center
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 100;
        const x = center.x + Math.cos(angle) * dist;
        const y = center.y + Math.sin(angle) * dist;
        
        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.8 ? '#FFD166' : '#2EC4B6' // Gold or Teal
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update Particles
      particles.forEach(p => {
        // Physics: Return to base
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.005; // Spring force
        p.vy += dyBase * 0.005;

        // Physics: Mouse Repulsion (Entropy)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_RADIUS) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS;
          const repulsionStrength = 3; 
          
          p.vx -= forceDirectionX * force * repulsionStrength;
          p.vy -= forceDirectionY * force * repulsionStrength;
        }

        // Friction
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw Connections
      ctx.strokeStyle = 'rgba(46, 196, 182, 0.15)'; // Teal transparent
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    const handleClick = () => {
        // Shockwave
        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            // If mouse is far, shock from center
            const shockX = dist > 500 ? 0 : dx;
            const shockY = dist > 500 ? 0 : dy;
            
            // Add random chaos
            p.vx += (Math.random() - 0.5) * 20 + shockX * 0.1;
            p.vy += (Math.random() - 0.5) * 20 + shockY * 0.1;
        });
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
        center.x = width / 2;
        center.y = height / 2;
        initParticles();
    }
    
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-40 bg-black/20 rounded-xl overflow-hidden relative cursor-crosshair mb-6 group">
        <canvas ref={canvasRef} className="absolute inset-0 z-10" />
        <div className="absolute bottom-2 right-3 z-20 text-[10px] font-mono text-slate/30 pointer-events-none select-none uppercase group-hover:text-teal/50 transition-colors">
            System Entropy
        </div>
    </div>
  );
};