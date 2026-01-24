import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Defer loading of Google Analytics / GTM until after initial load
function DeferredApp() {
  useEffect(() => {
    const loadGtag = () => {
      if (window.gtagLoaded) return;
      const s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '');
      s.async = true;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''}');`;
      document.head.appendChild(inline);
      window.gtagLoaded = true;
    };

    // Load after interactive / user gesture
    const onReady = () => setTimeout(loadGtag, 1500);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      onReady();
    } else {
      window.addEventListener('DOMContentLoaded', onReady);
    }

    return () => {
      window.removeEventListener('DOMContentLoaded', onReady);
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeferredApp />
  </StrictMode>,
)
