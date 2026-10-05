import React, {useEffect, useRef} from 'react';

// Proposed compatibility adapter; the legacy portfolio does not import it.
export default function MasonryAdapter({className, children}) {
  const container = useRef(null);
  useEffect(() => {
    let cancelled = false;
    let masonry;
    let images;
    let observer;
    const layout = () => masonry?.layout();
    Promise.all([import('masonry-layout'), import('imagesloaded')]).then(([engine, loader]) => {
      if (cancelled) return;
      masonry = new engine.default(container.current);
      images = loader.default(container.current);
      images.on('progress', layout);
      observer = new ResizeObserver(layout);
      for (const item of container.current.children) observer.observe(item);
    }).catch(error => {
      if (!cancelled) console.error('Masonry compatibility adapter could not initialize', error);
    });
    return () => {
      cancelled = true;
      observer?.disconnect();
      images?.off('progress', layout);
      masonry?.destroy();
    };
  }, [children]);
  return <div ref={container} className={className}>{children}</div>;
}
