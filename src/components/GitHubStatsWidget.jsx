import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaGithub, FaExternalLinkAlt, FaStar, FaBuilding } from 'react-icons/fa';
import { VscRepo, VscGitCommit } from 'react-icons/vsc';
import { useCountUp } from '../hooks/usePerformance';

const GitHubStatsWidget = () => {
    const { t } = useLanguage();
    const [repoCount, repoRef] = useCountUp(70, 1100);
    const [contribCount, contribRef] = useCountUp(487, 1300);
    const [teamCount, teamRef] = useCountUp(5, 900);

    // Pinned repositories from real GitHub profile
    const pinnedRepos = [
        {
            name: 'my-react-portofolio',
            url: 'https://github.com/timurlauttt/my-react-portofolio',
            desc: 'Personal portfolio website built with React, Vite, and Neo-Brutalism design system.',
            lang: 'JavaScript',
            langColor: '#f1e05a'
        },
        {
            name: 'photo-booth-v1',
            url: 'https://github.com/timurlauttt/photo-booth-v1',
            desc: 'Interactive web photobooth application with camera filters and instant photo strip generation.',
            lang: 'JavaScript',
            langColor: '#f1e05a'
        },
        {
            name: 'capstone-project',
            url: 'https://github.com/timurlauttt/capstone-project',
            desc: 'Capstone team project - Enterprise web application and digital catalog system.',
            lang: 'Blade',
            langColor: '#f7523f'
        }
    ];

    const orgs = [
        { name: '@devscriptalpha', url: 'https://github.com/devscriptalpha' },
        { name: '@Praktikum-PBO-IF-01', url: 'https://github.com/Praktikum-PBO-IF-01' },
        { name: '@lowcosthost', url: 'https://github.com/lowcosthost' },
        { name: '@ppl-smktamansiswa', url: 'https://github.com/ppl-smktamansiswa' },
        { name: '@hit-E-TRACER', url: 'https://github.com/hit-E-TRACER' }
    ];

    // Contribution levels for visual heatmap grid
    // 0: empty, 1: low, 2: med, 3: high, 4: very high
    const heatmapWeeks = [
        [1, 0, 0, 1, 0, 0, 0],
        [0, 1, 2, 0, 1, 0, 0],
        [1, 0, 1, 3, 2, 0, 1],
        [0, 2, 0, 1, 0, 2, 0],
        [1, 1, 3, 2, 1, 0, 1],
        [2, 0, 1, 4, 2, 1, 0],
        [0, 1, 0, 2, 3, 1, 2],
        [1, 3, 2, 1, 0, 2, 1],
        [2, 1, 4, 3, 2, 0, 1],
        [0, 2, 1, 0, 1, 3, 0],
        [1, 0, 3, 2, 1, 1, 2],
        [3, 2, 1, 4, 3, 2, 1],
        [1, 4, 2, 1, 3, 0, 2],
        [2, 1, 0, 2, 1, 4, 1],
        [0, 3, 2, 1, 0, 2, 0],
        [1, 2, 4, 3, 2, 1, 3],
        [2, 0, 1, 2, 4, 3, 1],
        [1, 3, 2, 1, 0, 2, 1],
        [4, 2, 3, 1, 2, 0, 2],
        [1, 0, 2, 4, 3, 1, 0],
        [2, 3, 1, 2, 1, 4, 2],
        [3, 1, 4, 2, 3, 1, 1]
    ];

    const getHeatmapColor = (level) => {
        switch (level) {
            case 1: return 'bg-emerald-900/60 dark:bg-emerald-950 border-emerald-800/40';
            case 2: return 'bg-emerald-700 dark:bg-emerald-800 border-emerald-600';
            case 3: return 'bg-emerald-500 dark:bg-emerald-500 border-emerald-400';
            case 4: return 'bg-emerald-400 dark:bg-emerald-300 border-emerald-200';
            default: return 'bg-gray-200 dark:bg-[#22272e] border-black/10 dark:border-white/5';
        }
    };

    return (
        <div className="mt-12 w-full border-2 sm:border-3 border-black dark:border-neutral-700 bg-white dark:bg-[#161b22] rounded-lg shadow-[8px_8px_0_#0f172a] p-5 sm:p-7">
            {/* Header / Profile Identity */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black/10 dark:border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-3.5">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black dark:border-white shadow-[2px_2px_0_#0EA5E9]">
                            <img src="/aku.webp" alt="timurlauttt" className="w-full h-full object-cover" width="48" height="48" loading="lazy" decoding="async" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 bg-amber-400 text-black text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-black shadow-[1px_1px_0_#000]">
                            PRO
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base sm:text-lg text-black dark:text-white leading-tight">
                                Urip Yoga Pangestu
                            </h3>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                @timurlauttt
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            {t('githubSubtitle')}
                        </p>
                    </div>
                </div>

                <a
                    href="https://github.com/timurlauttt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase rounded border-2 border-black shadow-[3px_3px_0_#0EA5E9] hover:bg-[#0EA5E9] hover:text-white dark:hover:bg-[#0EA5E9] dark:hover:text-white transition-all w-fit"
                >
                    <FaGithub className="text-sm" />
                    <span>{t('githubProfileLink')}</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                </a>
            </div>

            {/* Real Stats Metrics Bar - count-up on scroll */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div ref={repoRef} className="p-3.5 bg-gray-50 dark:bg-[#0d1117] border-2 border-black dark:border-neutral-700 rounded shadow-[3px_3px_0_#0f172a] flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-[#0EA5E9] rounded border border-black dark:border-neutral-700">
                        <VscRepo className="text-xl" />
                    </div>
                    <div>
                        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Repositories
                        </span>
                        <span className="text-xl font-extrabold text-black dark:text-white tabular-nums">
                            {repoCount} Repos
                        </span>
                    </div>
                </div>

                <div ref={contribRef} className="p-3.5 bg-gray-50 dark:bg-[#0d1117] border-2 border-black dark:border-neutral-700 rounded shadow-[3px_3px_0_#0f172a] flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 rounded border border-black dark:border-neutral-700">
                        <VscGitCommit className="text-xl" />
                    </div>
                    <div>
                        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Yearly Activity
                        </span>
                        <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {contribCount}+ Contributions
                        </span>
                    </div>
                </div>

                <div ref={teamRef} className="p-3.5 bg-gray-50 dark:bg-[#0d1117] border-2 border-black dark:border-neutral-700 rounded shadow-[3px_3px_0_#0f172a] flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-950/60 text-purple-500 rounded border border-black dark:border-neutral-700">
                        <FaBuilding className="text-lg" />
                    </div>
                    <div>
                        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Organizations
                        </span>
                        <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
                            {teamCount} Teams
                        </span>
                    </div>
                </div>
            </div>

            {/* Contribution Graph Heatmap Box */}
            <div className="p-4 bg-gray-50 dark:bg-[#0d1117] border-2 border-black dark:border-neutral-700 rounded-lg shadow-[3px_3px_0_#0f172a] mb-6 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        487 contributions in the last year
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                        <span>Less</span>
                        <span className="w-2.5 h-2.5 rounded-sm bg-gray-200 dark:bg-[#22272e] border border-black/10"></span>
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900/60"></span>
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700"></span>
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
                        <span>More</span>
                    </div>
                </div>

                <div className="overflow-x-auto pb-1">
                    <div className="flex gap-1 min-w-[560px] justify-between">
                        {heatmapWeeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-1">
                                {week.map((level, dIdx) => (
                                    <div
                                        key={dIdx}
                                        className={`w-3 h-3 rounded-xs border transition-transform hover:scale-125 ${getHeatmapColor(level)}`}
                                        title={`Activity indicator`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pinned Repositories Section */}
            <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Pinned Repositories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {pinnedRepos.map((repo) => (
                        <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 bg-white dark:bg-[#0d1117] border-2 border-black dark:border-neutral-700 rounded-md shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 transition-transform flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <VscRepo className="text-[#0EA5E9] flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-[#58a6ff] group-hover:underline truncate">
                                            {repo.name}
                                        </span>
                                    </div>
                                    <span className="text-[9px] px-1.5 py-0.2 rounded-full border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-400 font-mono">
                                        Public
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {repo.desc}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mt-3 text-[11px] text-gray-500 dark:text-gray-400">
                                <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: repo.langColor }}
                                />
                                <span>{repo.lang}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Organizations Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Organizations:
                </span>
                {orgs.map((org) => (
                    <a
                        key={org.name}
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-gray-100 dark:bg-[#0d1117] border border-black/20 dark:border-neutral-700 text-gray-800 dark:text-gray-300 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-colors"
                    >
                        {org.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default React.memo(GitHubStatsWidget);
