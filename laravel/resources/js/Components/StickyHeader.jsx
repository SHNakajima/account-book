import React, { useEffect, useState } from 'react';

const StickyHeader = ({
  children,
  className = 'text-lg font-semibold text-gray-900 mb-3 sticky bg-white z-30 py-2',
  style = {},
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleResize = () => {
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <h2 className={className} style={{ top: `${headerHeight}px`, ...style }}>
      {children}
    </h2>
  );
};

export default StickyHeader;
