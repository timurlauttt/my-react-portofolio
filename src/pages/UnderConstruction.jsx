import React from "react";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border-2 border-black dark:border-slate-300 rounded-lg shadow-[8px_8px_0_#0f172a] dark:shadow-[6px_6px_0px_0px_#ffffff] p-8 sm:p-10 text-center">
        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950 border-2 border-black dark:border-slate-300 text-2xl">
          🚧
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-slate-100 mb-3">
          Under Construction
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2">
          Portfolio sedang dalam perbaikan.
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 mb-6">
          Gambar portfolio & activities lagi diperbaiki setelah optimasi. Data teks aman — cuma field gambar yang kehapus. Akan segera kembali normal.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/timurlauttt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold bg-[#0EA5E9] text-white border-2 border-black px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform rounded"
          >
            GitHub
          </a>
          <a
            href="mailto:2211103102@ittelkom-pwt.ac.id"
            className="inline-flex items-center justify-center font-bold bg-white dark:bg-slate-950 text-black dark:text-slate-100 border-2 border-black dark:border-slate-300 px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform rounded"
          >
            Contact
          </a>
        </div>
        <p className="mt-6 text-[11px] font-mono text-slate-400 dark:text-slate-600">
          Admin tetap bisa akses via <a href="/admin" className="underline hover:text-[#0EA5E9]">/admin</a>
        </p>
      </div>
    </div>
  );
}
