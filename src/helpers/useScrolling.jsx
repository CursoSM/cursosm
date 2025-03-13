import { useState, useEffect } from 'react';

function useScrolling(timeout = 100) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let timer;
    const handleScroll = () => {
      // Actualiza la posición de scroll
      setScrollY(window.scrollY);
      // Si no estaba ya marcado como scrolling, lo marcamos
      if (!isScrolling) setIsScrolling(true);

      // Reiniciamos el timer
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Si no se ha producido nuevo scroll en el intervalo, dejamos de marcarlo
        setIsScrolling(false);
      }, timeout);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isScrolling, timeout]);

  return { isScrolling, scrollY };
}

export default useScrolling;
