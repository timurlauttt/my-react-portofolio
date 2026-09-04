import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PortfolioModal = ({ open, onClose, title, image, description, longDescription, link, tech = null, startDate = null, endDate = null }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

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

  const contentToRender = longDescription || description || '';

  // Render formatted content with full support for newlines, paragraphs, and bullet points
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = String(text).split(/\r?\n/);

    return (
      <div className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Bullet list item (- or • or *)
          if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
            const bulletText = trimmed.replace(/^[-•*]\s+/, '');
            const colonIdx = bulletText.indexOf(':');
            if (colonIdx > 0 && colonIdx < 40) {
              const label = bulletText.substring(0, colonIdx);
              const rest = bulletText.substring(colonIdx + 1);
              return (
                <div key={idx} className="flex items-start gap-2.5 pl-2 py-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#0EA5E9] dark:bg-[#38BDF8] mt-1.5 flex-shrink-0" />
                  <span className="flex-1">
                    <strong className="text-black dark:text-slate-100 font-semibold">{label}:</strong>{rest}
                  </span>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 py-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0EA5E9] dark:bg-[#38BDF8] mt-1.5 flex-shrink-0" />
                <span className="flex-1">{bulletText}</span>
              </div>
            );
          }

          // Numbered list item (e.g. 1. 2. 3.)
          const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 py-0.5">
                <span className="font-mono font-bold text-[#0EA5E9] dark:text-[#38BDF8] flex-shrink-0">{numMatch[1]}.</span>
                <span className="flex-1">{numMatch[2]}</span>
              </div>
            );
          }

          // Subheadings (ends with :) e.g. "Key Features:"
          if (trimmed.endsWith(':') && trimmed.length < 50) {
            return (
              <p key={idx} className="font-bold text-black dark:text-slate-100 mt-4 mb-1.5 text-sm sm:text-base border-b border-slate-200 dark:border-slate-800 pb-1">
                {trimmed}
              </p>
            );
          }

          // Feature list line without bullet prefix (e.g. "Weekly Activity Reporting: Students upload...")
          const colonMatch = trimmed.indexOf(':');
          if (colonMatch > 0 && colonMatch < 35 && !trimmed.endsWith(':')) {
            const label = trimmed.substring(0, colonMatch);
            const rest = trimmed.substring(colonMatch + 1);
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 py-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0EA5E9] dark:bg-[#38BDF8] mt-1.5 flex-shrink-0" />
                <span className="flex-1">
                  <strong className="text-black dark:text-slate-100 font-semibold">{label}:</strong>{rest}
                </span>
              </div>
            );
          }

          // Normal Paragraph with preserved line breaks
          return (
            <p key={idx} className="leading-relaxed whitespace-pre-wrap">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 text-black dark:text-slate-100 border-2 sm:border-3 border-black dark:border-slate-300 shadow-[10px_8px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] max-w-3xl w-full max-h-[88vh] flex flex-col rounded overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-black dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-lg sm:text-2xl font-bold text-black dark:text-slate-100 leading-tight pr-4">{title}</h3>
          <button 
            onClick={onClose} 
            className="bg-white dark:bg-slate-800 text-black dark:text-slate-100 border-2 border-black dark:border-slate-300 px-3 py-1 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer rounded shadow-[2px_2px_0_#0f172a] dark:shadow-[2px_2px_0_#ffffff] transition-all" 
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {image && (
            <div className="border-2 border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-950 rounded overflow-hidden shadow-[4px_4px_0_#0f172a] dark:shadow-[3px_3px_0_#ffffff]">
              <img src={image} alt={title} className="w-full max-h-72 object-contain mx-auto" loading="lazy" decoding="async" />
            </div>
          )}

          {dateDisplay && (
            <div className="inline-block px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
              📅 {dateDisplay}
            </div>
          )}

          {tech && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-400">{t('techStack')}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(Array.isArray(tech) ? tech : String(tech).split(',').map(s => s.trim())).map((tItem, i) => (
                  <span key={i} className="bg-[#c5f0ff] dark:bg-sky-950 text-sky-950 dark:text-sky-300 border border-black dark:border-sky-800 px-2.5 py-1 text-xs rounded font-bold shadow-[1.5px_1.5px_0_#0f172a] dark:shadow-[1.5px_1.5px_0_#ffffff]">
                    {tItem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Formatted Description with full Enter / Newline support */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {renderFormattedText(contentToRender)}
          </div>

          {link && (
            <div className="pt-3">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#0EA5E9] dark:bg-[#38BDF8] text-white dark:text-slate-950 border-2 border-black dark:border-white px-5 py-2.5 text-xs sm:text-sm uppercase font-bold shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded"
              >
                <span>{t('openProject')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortfolioModal;

