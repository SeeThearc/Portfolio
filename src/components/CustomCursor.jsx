import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only enable custom cursor if the device has a fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hover over interactive elements to morph the cursor
    const handleHoverStart = (e) => {
      // Extensive list of interactive elements in your app
      const interactiveElements = 'button, a, input, textarea, select, .app-item, .dock-item, .contact-action-btn, .sidebar-item, .theme-option, .lock-btn, .audio-toggle-btn, .gallery-card, .contact-avatar-lg, .about-avatar';
      
      if (e.target.closest(interactiveElements)) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    // Attach listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // We use capturing phase to guarantee hover detection
    document.addEventListener('mouseover', handleHoverStart, true);
    document.addEventListener('mouseout', handleHoverEnd, true);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart, true);
      document.removeEventListener('mouseout', handleHoverEnd, true);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div 
      className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
