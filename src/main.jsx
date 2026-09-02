import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Defer loading of Google Analytics / GTM until after LCP + idle (reduces TBT / main-thread work)
function DeferredApp() {
  useEffect(() => {
    const loadGtag = () => {
      if (window.gtagLoaded) return;
      const id = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
      if (!id) return;
      const s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      s.async = true;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`;
      document.head.appendChild(inline);
      window.gtagLoaded = true;
    };

    // Wait for LCP + idle before loading GTM (biggest TBT contributor at 193ms)
    const schedule = () => {
      const doLoad = () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadGtag, { timeout: 4000 });
        } else {
          setTimeout(loadGtag, 2500);
        }
      };
      // Also load on first user interaction if idle hasn't fired yet
      const onInteract = () => {
        window.removeEventListener('scroll', onInteract);
        window.removeEventListener('click', onInteract);
        window.removeEventListener('touchstart', onInteract);
        doLoad();
      };
      window.addEventListener('scroll', onInteract, { once: true, passive: true });
      window.addEventListener('click', onInteract, { once: true });
      window.addEventListener('touchstart', onInteract, { once: true, passive: true });
      doLoad();
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeferredApp />
  </StrictMode>,
)
