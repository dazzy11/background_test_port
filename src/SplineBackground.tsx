import { useEffect, useRef } from 'react';

export default function SplineBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('@splinetool/viewer').then(() => {
      if (ref.current && !ref.current.querySelector('spline-viewer')) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute(
          'url',
          'https://prod.spline.design/HXTUCtFpInGHRWX7/scene.splinecode'
        );
        splineViewer.style.width = '100%';
        splineViewer.style.height = '100%';
        splineViewer.style.position = 'absolute';
        splineViewer.style.top = '0';
        splineViewer.style.left = '0';
        splineViewer.style.transform = 'scale(1.3)';
splineViewer.style.transformOrigin = 'center';
        splineViewer.style.zIndex = '-1'; // Push it to background
        splineViewer.style.pointerEvents = 'none'; // Let clicks pass through
        ref.current.appendChild(splineViewer);
      }
    });
  }, []);

  return <div ref={ref} className="spline-background" />;
}
