export function StyledText() {
    const layersRef = useRef([]);
  
    useEffect(() => {
      const layers = layersRef.current;
      
      gsap.fromTo(
        layers,
        { x: 0, y: 0 },
        {
          x: (i) => (i + 1) * 2,
          y: (i) => (i + 1) * 2,
          duration: 1,
          delay: 1,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.06
        }
      );
  
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xRatio = (clientX / innerWidth - 0.5) * 2;
        const yRatio = (clientY / innerHeight - 0.5) * 2;
  
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 6;
          gsap.to(layer, {
            x: (i + 1) * 2 + xRatio * depth,
            y: (i + 1) * 2 + yRatio * depth,
            duration: 0.8,
            ease: 'power2.out'
          });
        });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
  
    return (
      <span className="title-outline">
        EXPO
        <span className='title-outline__elem-static'>
        EXPO
        </span>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            ref={(el) => (layersRef.current[i] = el)}
            className="title-outline__elem"
          >
            EXPO
          </span>
        ))}
      </span>
    );
  }