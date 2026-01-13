import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PortfolioModal = ({ open, onClose, title, image, description, longDescription, link, tech = null, startDate = null, endDate = null }) => {
  const [MarkdownComp, setMarkdownComp] = useState(null);
  const [rehypeSanitizePlugin, setRehypeSanitizePlugin] = useState(null);
  const [markdownLoadError, setMarkdownLoadError] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    let mounted = true;
    if (!open) {
      // reset any previously loaded markdown components when closed
      setMarkdownComp(null);
      setRehypeSanitizePlugin(null);
      setMarkdownLoadError(false);
      return;
    }

    // dynamically import react-markdown and rehype-sanitize only when modal opens
    (async () => {
      try {
        const [{ default: RM }, { default: rehype }] = await Promise.all([
          new Function("return import('react-markdown')")(),
          new Function("return import('rehype-sanitize')")()
        ]);
        if (!mounted) return;
        setMarkdownComp(() => RM);
        setRehypeSanitizePlugin(() => rehype);
      } catch (err) {
        // If packages aren't installed, don't break the app — fall back to plain text
        console.warn('react-markdown or rehype-sanitize not available:', err);
        if (mounted) setMarkdownLoadError(true);
      }
    })();

    return () => { mounted = false; };
  }, [open]);

  if (!open) return null;

  const formatDate = (d) => {
    if (!d) return null;
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return String(d);
      const day = String(dt.getDate()).padStart(2, '0');
      const month = String(dt.getMonth() + 1).padStart(2, '0');
      const year = dt.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return String(d);
    }
  };

  const startDisplay = formatDate(startDate);
  const endDisplay = formatDate(endDate);
  const dateDisplay = startDisplay || endDisplay ? `${startDisplay || ''}${startDisplay && endDisplay ? ' - ' : ''}${endDisplay || ''}` : null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-4 md:p-6 z-10 max-h-[80vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 bg-gray-100 rounded-full p-2 hover:opacity-90"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            {image ? (
              <img src={image} alt={title} className="w-full h-auto object-cover rounded" />
            ) : (
              <div className="w-full h-56 bg-gray-100 rounded" />
            )}
          </div>

          <div className="px-1 md:px-4">
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {dateDisplay && (
              <div className="mb-2">
                <div className="text-xs text-gray-500 tracking-wider mb-1">date : </div>
                <div className="text-xs text-gray-500 ">{dateDisplay}</div>
              </div>
            )}

            {tech && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 tracking-wider mb-2">tech stack : </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(tech) ? tech : String(tech).split(',').map(s => s.trim())).map((t, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="max-w-none text-sm text-gray-700 mb-4 text-justify">
              {longDescription && (
                MarkdownComp && !markdownLoadError ? (
                  <MarkdownComp rehypePlugins={rehypeSanitizePlugin ? [rehypeSanitizePlugin] : []}>
                    {longDescription}
                  </MarkdownComp>
                ) : (
                  <p className="text-sm text-gray-700">{longDescription}</p>
                )
              )}
            </div>

            {link && (
              <div className="flex justify-end mt-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-semibold bg-yellow-400 text-black border-2 border-yellow-400 px-3 py-2 text-xs uppercase shadow-[4px_6px_0_#74247A] hover:bg-[#74247A] hover:text-yellow-400"
                >
                  Open Project
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortfolioModal;
