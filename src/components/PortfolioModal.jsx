import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PortfolioModal = ({ open, onClose, title, image, description, longDescription, link, tech = null, startDate = null, endDate = null }) => {
  const { t } = useLanguage();
  const [MarkdownComp, setMarkdownComp] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    let mounted = true;
    if (!open) { setMarkdownComp(null); return; }
    (async () => {
      try {
        const { default: RM } = await new Function("return import('react-markdown')")();
        if (mounted) setMarkdownComp(() => RM);
      } catch {}
    })();
    return () => { mounted = false; };
  }, [open]);

  if (!open) return null;

  const formatDate = (d) => {
    if (!d) return null;
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return String(d);
      return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}/${dt.getFullYear()}`;
    } catch { return String(d); }
  };

  const startDisplay = formatDate(startDate);
  const endDisplay = formatDate(endDate);
  const dateDisplay = startDisplay || endDisplay ? `${startDisplay || ''}${startDisplay && endDisplay ? ' - ' : ''}${endDisplay || ''}` : null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white border-2 md:border-3 border-black dark:border-neutral-700 shadow-[10px_8px_0_#0f172a] max-w-3xl w-full max-h-[85vh] flex flex-col rounded" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b-2 border-black dark:border-neutral-700">
          <h3 className="text-xl sm:text-2xl font-bold dark:text-white">{title}</h3>
          <button onClick={onClose} className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white border-2 border-black dark:border-neutral-700 px-3 py-1 font-bold hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer rounded-sm" aria-label="Close modal">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {image && <div className="mb-4 border-2 border-black dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 rounded overflow-hidden"><img src={image} alt={title} className="w-full h-48 sm:h-64 object-contain" loading="lazy" decoding="async" /></div>}
          {dateDisplay && <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{dateDisplay}</p>}
          {tech && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-400">{t('techStack')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(tech) ? tech : String(tech).split(',').map(s => s.trim())).map((tItem, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-gray-200 border border-gray-300 dark:border-neutral-700 px-2.5 py-1 text-xs rounded font-medium">{tItem}</span>
                ))}
              </div>
            </div>
          )}
          <div className="text-sm leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            {longDescription && MarkdownComp ? <MarkdownComp>{longDescription}</MarkdownComp> : <p>{longDescription || description}</p>}
          </div>
          {link && <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#0EA5E9] text-white border-2 border-[#0EA5E9] px-4 py-2 text-xs uppercase font-semibold shadow-[4px_6px_0_#0f172a] hover:bg-[#0f172a] hover:text-white transition-colors">{t('openProject')}</a>}
        </div>
      </div>
    </div>,
    document.body
  );
};
export default PortfolioModal;
