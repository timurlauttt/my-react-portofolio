/**
 * Comprehensive dictionary-based translation helper for dynamic content loaded from Firebase
 * (All 10 Portfolio Projects & All 19 Activities, including full descriptions, metadata, & achievements).
 */

const MONTHS_MAP = {
    'january': 'Januari',
    'february': 'Februari',
    'march': 'Maret',
    'april': 'April',
    'may': 'Mei',
    'june': 'Juni',
    'july': 'Juli',
    'august': 'Agustus',
    'september': 'September',
    'october': 'Oktober',
    'november': 'November',
    'december': 'Desember',
    'jan': 'Jan',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Apr',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Agt',
    'sep': 'Sep',
    'oct': 'Okt',
    'nov': 'Nov',
    'dec': 'Des'
};

const CATEGORIES_MAP = {
    'activity': 'Aktivitas',
    'education': 'Pendidikan',
    'project': 'Proyek',
    'competition': 'Kompetisi',
    'workshop': 'Workshop',
    'certification': 'Sertifikasi',
    'organization': 'Organisasi',
    'volunteer': 'Relawan'
};

const STATUS_MAP = {
    'completed': 'Selesai',
    'ongoing': 'Sedang Berjalan',
    'draft': 'Draf'
};

export function translateDate(dateStr, lang) {
    if (!dateStr || lang !== 'id') return dateStr;
    let res = String(dateStr);
    Object.entries(MONTHS_MAP).forEach(([en, id]) => {
        const regex = new RegExp(`\\b${en}\\b`, 'gi');
        res = res.replace(regex, id);
    });
    return res;
}

export function translateCategory(cat, lang) {
    if (!cat || lang !== 'id') return cat;
    const lower = String(cat).toLowerCase().trim();
    return CATEGORIES_MAP[lower] || cat;
}

export function translateStatus(status, lang) {
    if (!status) return status;
    if (lang === 'id') {
        const lower = String(status).toLowerCase().trim();
        return STATUS_MAP[lower] || status;
    }
    return String(status).charAt(0).toUpperCase() + String(status).slice(1);
}

const PORTFOLIO_DICTIONARY = {
    // [P1] ID: 10 - GitHub Profile
    "10": {
        title: "Profil & Repositori GitHub",
        description: "Kumpulan repositori dan proyek yang telah saya buat di GitHub, beberapa mungkin tidak terlihat karena bersifat privat.",
        longDescription: "Koleksi proyek open source, eksperimen teknologi, dan repositori kode yang telah saya kembangkan dan bagikan di profil GitHub saya."
    },
    // [P2] ID: 4 - Current Project (eLearning)
    "4": {
        title: "Proyek Saat Ini (E-Learning)",
        description: "Untuk proyek ini, saya sedang mengerjakan aplikasi e-learning yang direncanakan selesai pada bulan Agustus, namun karena privasi beberapa konten disembunyikan.",
        longDescription: "Aplikasi e-learning berbasis web yang sedang aktif dikembangkan untuk mendukung kegiatan belajar mengajar online secara interaktif dan terstruktur."
    },
    // [P3] ID: 8 - Selis Molis Hoki
    "8": {
        title: "Website Bengkel Selis Molis Hoki",
        description: "Ini adalah proyek pertama saya, membuat website profil dan layanan untuk bengkel sepeda dan motor listrik milik teman saya.",
        longDescription: "Ini adalah proyek nyata pertama saya, yang melibatkan perancangan dan pengembangan website untuk bengkel sepeda dan motor listrik teman saya. Website ini dibuat untuk membangun kehadiran online bisnis, memberikan informasi yang jelas tentang layanan perbaikan, perkiraan biaya, dan detail kontak. Melalui proyek ini, saya menerjemahkan kebutuhan bisnis ke dalam website fungsional dengan desain yang bersih dan mudah digunakan."
    },
    // [P4] ID: 7 - Wedding Invitation
    "7": {
        title: "Undangan Pernikahan Digital",
        description: "Saya membuat halaman undangan pernikahan digital sederhana menggunakan React.js. Halaman ini memuat informasi lengkap acara pernikahan dan formulir RSVP kehadiran tamu.",
        longDescription: "Saya membuat halaman undangan pernikahan digital interaktif menggunakan React.js sebagai aplikasi web yang ringan dan mudah digunakan. Halaman ini menyajikan informasi penting pernikahan, termasuk tanggal pernikahan, detail lokasi acara, hitung mundur, dan bagian konfirmasi kehadiran (RSVP) agar tamu dapat mengonfirmasi kehadiran mereka secara online dengan mudah. Antarmuka dirancang bersih dan responsif di berbagai perangkat (desktop & mobile)."
    },
    // [P5] ID: 5 - SMK Taman Siswa Purwokerto Company Profile
    "5": {
        title: "Company Profile SMK Taman Siswa Purwokerto",
        description: "Merancang dan mengembangkan antarmuka pengguna website profil sekolah menggunakan Laravel Blade templates, menghadirkan pengalaman visual yang intuitif dan menarik bagi pengunjung.",
        longDescription: "Merancang dan mengembangkan antarmuka pengguna website profil sekolah SMK Taman Siswa Purwokerto menggunakan Laravel Blade templates untuk menghadirkan pengalaman visual yang menarik dan intuitif. Menerapkan prinsip desain responsif untuk memastikan tampilan optimal di desktop, tablet, dan ponsel pintar. Berkolaborasi erat dengan tim backend untuk mengintegrasikan konten dinamis dan fitur interaktif menggunakan JavaScript dan stack frontend Laravel. Selain itu, mengoptimalkan kecepatan muat halaman melalui implementasi CSS dan JS yang efisien, serta melakukan pengujian lintas browser dan perangkat untuk memastikan pengalaman pengguna yang konsisten."
    },
    // [P6] ID: 9 - MSIB Project - Web App
    "9": {
        title: "Proyek MSIB - Web App Questify",
        description: "Ini adalah proyek program MSIB saya yang dibangun menggunakan framework Django.",
        longDescription: "Ini adalah proyek MSIB saya yang dibangun menggunakan framework Django, berfokus pada pengembangan platform edukasi interaktif untuk melatih kemampuan berpikir dan pemecahan masalah siswa sekolah dasar melalui kuis berbasis permainan. Platform ini menyediakan soal kuis dengan tingkat kesulitan yang disesuaikan secara adaptif sesuai kemampuan kognitif siswa, dirancang sangat interaktif dan visual agar belajar menjadi menyenangkan."
    },
    // [P7] ID: 1 - lowcosthost.id
    "1": {
        title: "lowcosthost.id",
        description: "Ini adalah proyek start-up saya bersama teman-teman—sebuah start-up yang bergerak di bidang shared hosting yang memungkinkan siapa saja, khususnya mahasiswa dan pengembang pemula, untuk mendeploy proyek web mereka secara mudah dan terjangkau.",
        longDescription: "Ini adalah proyek start-up yang saya kembangkan bersama teman-teman, berfokus pada industri shared hosting. Start-up ini dirancang untuk menyediakan platform hosting yang mudah diakses, andal, dan aman, yang memungkinkan pengguna dari berbagai latar belakang—terutama mahasiswa dan pengembang pemula—untuk mendeploy proyek mereka dengan mudah. Dengan menawarkan paket harga yang terjangkau tanpa mengorbankan performa atau keamanan, platform ini bertujuan untuk mengurangi hambatan yang sering dihadapi saat meluncurkan aplikasi berbasis web atau proyek akademik. Selain itu, layanan ini mengutamakan kemudahan penggunaan, skalabilitas, dan perlindungan data, memastikan pengguna dapat fokus dalam mengembangkan karya mereka."
    },
    // [P8] ID: 2 - Blog Website
    "2": {
        title: "Website Blog Pribadi",
        description: "Website blog dan portofolio pribadi yang dibangun menggunakan Astro dan Tailwind CSS, dirancang untuk menghadirkan performa cepat, tata letak responsif, dan pengalaman membaca yang nyaman.",
        longDescription: "Proyek ini adalah website blog dan portofolio pribadi yang dikembangkan menggunakan Astro dan Tailwind CSS, dengan fokus pada performa tinggi, kesederhanaan, dan standar web modern. Website ini mendukung pembuatan konten menggunakan Markdown dan MDX untuk pengelolaan konten yang fleksibel dan efisien. Fitur utamanya mencakup mode gelap (dark mode) untuk kenyamanan membaca, fungsi pencarian bawaan, serta desain responsif yang menyesuaikan tampilan dengan mulus di berbagai perangkat.\n\nProyek ini mengutamakan kecepatan muat halaman melalui pendekatan static-first dari Astro, dideploy di Vercel untuk memastikan stabilitas dan keandalan hosting. Platform ini berfungsi sebagai ruang untuk menampilkan portofolio, membagikan pengalaman pribadi, dan menerbitkan berbagai artikel."
    },
    // [P9] ID: 6 - Photobooth Website App
    "6": {
        title: "Aplikasi Web Photobooth",
        description: "Proyek sampingan saya, sebuah aplikasi web photobooth dengan berbagai pilihan strip foto menarik.",
        longDescription: "Ini adalah proyek sampingan saya, sebuah aplikasi web photobooth yang memungkinkan pengguna mengambil foto langsung melalui browser dan memilih berbagai tata letak strip foto. Aplikasi ini dirancang untuk mereplikasi pengalaman photobooth fisik ke dalam format digital, menawarkan beragam gaya strip, opsi tata letak, dan fitur kustomisasi. Aplikasi ini berfokus pada pengalaman pengguna yang mulus dengan akses kamera real-time, pratinjau instan, dan hasil foto yang dapat langsung diunduh, cocok untuk penggunaan pribadi, acara, atau proyek digital kreatif."
    },
    // [P10] ID: 3 - Capstone Project - E-Catalog Application
    "3": {
        title: "Proyek Capstone - Aplikasi E-Katalog",
        description: "Memimpin tim proyek capstone sebagai project lead, mengawasi perencanaan, eksekusi, dan penyelesaian aplikasi e-katalog dengan fokus pada manajemen jadwal dan koordinasi tim.",
        longDescription: "Bertindak sebagai Project Lead yang memimpin tim dalam perencanaan, eksekusi, dan penyelesaian aplikasi e-katalog. Merancang dan mengimplementasikan diagram ERD database dengan mendefinisikan seluruh entitas, relasi, dan skema untuk memastikan integritas data. Mengembangkan fungsionalitas CRUD lengkap untuk manajemen produk pada dashboard admin guna mempermudah operasional. Selain itu, mengintegrasikan sistem pelacakan kendaraan real-time menggunakan WebSockets untuk meningkatkan akurasi dan frekuensi pembaruan data, yang meningkatkan kepuasan pengguna sebesar 30% dan mengurangi pertanyaan layanan pelanggan sebesar 25%."
    }
};

const ACTIVITIES_DICTIONARY = {
    // [A1] ID: 1 - Internship - eLearning Project
    "1": {
        title: "Magang - Proyek eLearning",
        description: "Saya sedang mengerjakan proyek e-learning untuk universitas, namun karena privasi beberapa informasi dirahasiakan.",
        fullDescription: "Saya saat ini sedang mengerjakan pengembangan sistem e-learning untuk universitas. Demi alasan privasi dan kerahasiaan, beberapa informasi tidak dapat dibagikan secara terbuka. Detail institusi dan data internal dianonimkan untuk menjaga keamanan pihak terkait. Fokus utama saya mencakup aspek teknis dan fungsional sistem, seperti manajemen materi pembelajaran, kuis & tugas, serta integrasi fitur yang mendukung kebutuhan mahasiswa, dosen, dan administrator universitas.",
        category: "Project",
        location: "Telkom University Purwokerto",
        achievements: [
            "Mengembangkan modul manajemen materi pembelajaran dan penugasan online",
            "Membangun antarmuka web responsif dan interaktif untuk sistem e-learning universitas"
        ]
    },
    // [A2] ID: 5 - Praktisi Days
    "5": {
        title: "Praktisi Days",
        description: "Berpartisipasi dalam acara Praktisi Days di Telkom University Purwokerto 2024 dan menjadi Master of Ceremony (MC).",
        fullDescription: "Saya berpartisipasi dalam acara Praktisi Days di Telkom University Purwokerto 2024 sebagai bagian dari orientasi mahasiswa baru program studi. Saya berkontribusi di Divisi Acara untuk merencanakan dan mengoordinasikan jalannya rangkaian kegiatan, serta dipercaya menjadi Master of Ceremonies (MC) pada beberapa sesi untuk memandu jalannya acara secara interaktif dan profesional.",
        category: "Workshop",
        location: "ITTP Purwokerto",
        achievements: [
            "Anggota Divisi Acara",
            "Master of Ceremony (MC)"
        ]
    },
    // [A3] ID: 2 - Todays Committee
    "2": {
        title: "Panitia Todays 2024",
        description: "Berpartisipasi dalam orientasi kampus dan bertugas sebagai mentor pendamping untuk 24 mahasiswa baru.",
        fullDescription: "Saya berpartisipasi aktif dalam program orientasi kampus (Todays) dan mengemban tanggung jawab sebagai mentor kelompok bagi 24 mahasiswa baru. Dalam peran ini, saya membimbing dan mendampingi mereka selama kegiatan orientasi akademik maupun non-akademik, membantu adaptasi dengan lingkungan kampus, memperkenalkan fasilitas, kultur organisasi, serta tata tertib perkuliahan. Pengalaman ini mengasah kepemimpinan, komunikasi, dan manajemen waktu saya.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil menjadi mentor pendamping bagi 24 mahasiswa baru selama masa orientasi kampus",
            "Membantu proses adaptasi akademik dan pengenalan kultur perkuliahan bagi mahasiswa baru"
        ]
    },
    // [A4] ID: 15 - Community Service
    "15": {
        title: "Pengabdian Masyarakat",
        description: "Terlibat dalam kegiatan program pengabdian kepada masyarakat di Desa Taman Sari pada Juni 2023.",
        fullDescription: "Saya menjadi bagian dari program pengabdian masyarakat di Desa Taman Sari. Tanggung jawab utama saya adalah merancang konsep kegiatan dan memastikan pelaksanaannya sesuai rencana bersama tim dan perangkat desa setempat, sehingga memberikan manfaat nyata bagi warga masyarakat.",
        category: "Volunteer",
        location: "Desa Taman Sari",
        achievements: [
            "Berhasil merancang dan mengimplementasikan konsep program pengabdian masyarakat di Desa Taman Sari",
            "Memastikan seluruh rangkaian kegiatan berjalan lancar sesuai jadwal yang direncanakan",
            "Berkontribusi pada hasil positif dan partisipasi aktif warga masyarakat selama kegiatan",
            "Mempererat kolaborasi antara tim pengabdian dan masyarakat setempat"
        ]
    },
    // [A5] ID: 16 - Studi Independent - MSIB
    "16": {
        title: "Studi Independen - MSIB",
        description: "Mengikuti program Studi Independen Bersertifikat MSIB Kampus Merdeka di Educourse.id bidang Web Development.",
        fullDescription: "Saya telah menyelesaikan Program Studi Independen Bersertifikat 900 jam di bawah MSIB Kampus Merdeka di Educourse.id, spesialisasi Platform and Web Development untuk sistem pendidikan berstandar Industri 4.0. Selama program, saya mengembangkan platform pendidikan fullstack mencakup frontend dan backend, manajemen database, sistem autentikasi, integrasi RESTful API, implementasi CMS, dan fitur gamifikasi. Tim saya berhasil meraih penghargaan Top 3 Best Project Team untuk proyek akhir capstone, dan saya dianugerahi STEM Endorsed Certificate atas keunggulan pengembangan platform edukasi digital.",
        category: "Education",
        location: "Educourse.id / Remote",
        achievements: [
            "Menyelesaikan Program Studi Independen Bersertifikat 900 jam di bawah MSIB Kampus Merdeka",
            "Top 3 Tim Proyek Terbaik – Program Platform & Web Developer",
            "Penerima Sertifikat STEM Endorsed atas keunggulan pengembangan platform edukasi",
            "Mengembangkan Platform Pendidikan Fullstack (Front-end & Back-end)",
            "Mengimplementasikan Autentikasi, Manajemen Database, dan Integrasi RESTful API",
            "Menyelesaikan Proyek Capstone Studi Kasus Institusi Pendidikan",
            "Menyelesaikan Modul Terstruktur dalam Design Thinking, CMS, Gamifikasi, dan Visualisasi Data"
        ]
    },
    // [A6] ID: 8 - Entrepreneur Talkshow 2
    "8": {
        title: "Talkshow Kewirausahaan 2",
        description: "Berpartisipasi dalam acara talkshow live Divisi Kewirausahaan di Himpunan Mahasiswa Sistem Informasi 2024.",
        fullDescription: "Saya berpartisipasi dalam acara Live Talkshow yang diselenggarakan oleh Divisi Kewirausahaan HMSI 2024 sebagai panitia Divisi Acara dan dipercaya menjadi Master of Ceremonies (MC) untuk memandu jalannya talkshow, memperkenalkan pembicara, dan menjaga antusiasme peserta.",
        category: "Activity",
        location: "Online / ITTP",
        achievements: [
            "Berhasil menjalankan peran utama sebagai anggota Divisi Acara dan Master of Ceremony (MC) pada Live Talkshow Kewirausahaan 2024.",
            "Menjaga suasana acara tetap profesional dan interaktif, memastikan transisi antar sesi berlangsung mulus dan audiens tetap aktif terlibat."
        ]
    },
    // [A7] ID: 17 - Google AI Professional Certificate
    "17": {
        title: "Sertifikasi Google AI",
        description: "Menyelesaikan 7 kursus Google AI Professional Certificate di Coursera, menguasai penerapan AI praktis untuk keterampilan profesional.",
        fullDescription: "Saya telah berhasil menyelesaikan program Google AI Professional Certificate yang diselenggarakan oleh Google melalui Coursera. Program ini terdiri dari 7 kursus komprehensif yang menunjukkan kemahiran dalam memanfaatkan AI untuk berbagai kebutuhan profesional: Perencanaan & Brainstorming, Riset & Wawasan, Penulisan & Komunikasi, Pembuatan Konten, Analisis Data, dan Pembuatan Aplikasi. Sepanjang program, saya membangun portofolio 20+ artefak berbasis AI dan mengembangkan solusi AI kustom menggunakan teknik vibe coding. Saya dapat melakukan prompt engineering secara efektif, mengevaluasi output, dan memanfaatkan alat AI secara bertanggung jawab untuk menyelesaikan tantangan kerja nyata.",
        category: "Certification",
        location: "Online / Coursera",
        achievements: [
            "Menyelesaikan seluruh 7 modul kursus Google AI Professional di Coursera",
            "Membangun portofolio 20+ artefak berbasis kecerdasan buatan (AI)",
            "Mengembangkan solusi AI kustom menggunakan teknik vibe coding",
            "Membuktikan kemahiran dalam prompt engineering efektif dan evaluasi output AI",
            "Meraih Sertifikat Profesional Resmi Google AI yang diterbitkan pada 10 Juni 2026"
        ]
    },
    // [A8] ID: 12 - Care For Maba 2023
    "12": {
        title: "Care For Maba 2023",
        description: "Panitia orientasi mahasiswa baru program studi Sistem Informasi di ITTP tahun 2023 dan bertugas sebagai MC.",
        fullDescription: "Saya berpartisipasi dalam acara Care For Maba Telkom University Purwokerto 2023 sebagai panitia Divisi Acara dan bertugas sebagai Master of Ceremonies (MC) pada sesi pengenalan program studi bagi mahasiswa baru.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Anggota Divisi Acara",
            "Master of Ceremony (MC)"
        ]
    },
    // [A9] ID: 7 - Entrepreneur Talkshow 1
    "7": {
        title: "Talkshow Kewirausahaan 1",
        description: "Berpartisipasi dalam acara talkshow live Divisi Kewirausahaan di Himpunan Mahasiswa Sistem Informasi 2024.",
        fullDescription: "Saya berpartisipasi dalam acara Live Talkshow yang diselenggarakan oleh Divisi Kewirausahaan HMSI 2024 sebagai panitia Divisi Acara dan dipercaya menjadi Master of Ceremonies (MC) untuk memandu jalannya talkshow, memperkenalkan pembicara, dan menjaga antusiasme peserta.",
        category: "Activity",
        location: "Online / ITTP",
        achievements: [
            "Berhasil menjalankan peran utama sebagai anggota Divisi Acara dan Master of Ceremony (MC) pada Live Talkshow Kewirausahaan 2024.",
            "Menjaga suasana acara tetap profesional dan interaktif, memastikan transisi antar sesi berlangsung mulus dan audiens tetap aktif terlibat."
        ]
    },
    // [A10] ID: 14 - Orphanage Social Service
    "14": {
        title: "Bakti Sosial Panti Asuhan",
        description: "Berpartisipasi dalam kegiatan bakti sosial di Panti Asuhan Harapan Mulya Purwokerto.",
        fullDescription: "Melaksanakan kegiatan bakti sosial dan donasi di Panti Asuhan Harapan Mulya Purwokerto. Bertanggung jawab merancang konsep acara dan mengoordinasikan logistik agar kegiatan bakti sosial berjalan lancar dan berkesan.",
        category: "Volunteer",
        location: "Panti Asuhan Harapan Mulya",
        achievements: [
            "Berhasil merancang dan mengimplementasikan konsep bakti sosial di Panti Asuhan Harapan Mulya",
            "Memastikan jalannya kegiatan berlangsung lancar sesuai dengan program yang direncanakan",
            "Memberikan pengalaman yang bermakna dan berdampak positif bagi anak-anak panti asuhan",
            "Mendukung tercapainya tujuan sosial melalui koordinasi dan kerja sama tim yang solid"
        ]
    },
    // [A11] ID: 10 - Malam Sanggar Seni
    "10": {
        title: "Malam Sanggar Seni",
        description: "Panitia acara Malam Sanggar Seni di ITTP 2023 dan bertugas sebagai moderator sesi acara.",
        fullDescription: "Menjadi panitia dalam acara Malam Sanggar Seni di Telkom Institute of Technology Purwokerto 2023. Bertanggung jawab sebagai moderator sesi untuk memandu jalannya penampilan dan koordinasi dengan para pengisi acara.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil memoderatori salah satu segmen utama dalam acara Malam Sanggar Seni 2023",
            "Memastikan interaksi berjalan lancar antara pengisi acara, pembicara, dan penonton",
            "Menjaga alur sesi tetap terstruktur dan menarik sepanjang penampilan",
            "Berkontribusi pada kesuksesan acara dan pengalaman berkesan bagi para penonton"
        ]
    },
    // [A12] ID: 4 - HMSI Member 2024
    "4": {
        title: "Pengurus HMSI 2024",
        description: "Anggota aktif Divisi Kewirausahaan HMSI ITTP 2023/2024 dengan program kerja utama pengadaan kemeja PDH.",
        fullDescription: "Anggota aktif Himpunan Mahasiswa Sistem Informasi ITTP periode 2023/2024 di Divisi Kewirausahaan. Berkontribusi dalam program kerja utama produksi dan distribusi seragam PDH mahasiswa Sistem Informasi, mengasah keterampilan negosiasi vendor, koordinasi tim, dan kewirausahaan.",
        category: "Organization",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil mengelola dan memasarkan seragam PDH resmi untuk dua angkatan berbeda (Angkatan 2023 dan 2024) sebagai bagian program unggulan Divisi Kewirausahaan.",
            "Berkontribusi aktif dalam mendukung dan menyukseskan program kerja kewirausahaan lainnya di dalam divisi.",
            "Menjalin koordinasi dan kerja sama tim yang solid lintas inisiatif organisasi."
        ]
    },
    // [A13] ID: 6 - Infection4.0
    "6": {
        title: "Panitia Infection 4.0",
        description: "Panitia orientasi Fakultas Informatika di ITTP 2023 divisi acara dan bertugas sebagai Master of Ceremonies (MC).",
        fullDescription: "Mengikuti kegiatan orientasi Fakultas Informatika (Infection 4.0) di ITTP 2023 sebagai panitia Divisi Acara dan dipercaya menjadi Master of Ceremonies (MC) dalam memandu rangkaian penyambutan mahasiswa baru.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil menjalankan tugas utama di Divisi Acara dengan berkontribusi dalam kelancaran perencanaan dan eksekusi Orientasi Fakultas 2023 di ITTP.",
            "Dipercaya sebagai Master of Ceremony (MC) untuk memandu beberapa sesi acara, menjaga antusiasme audiens, dan memastikan jalannya acara berlangsung dinamis dan profesional."
        ]
    },
    // [A14] ID: 20 - Google Cybersecurity Professional Certificate
    "20": {
        title: "Sertifikasi Google Cybersecurity",
        description: "Menyelesaikan 9 kursus Google Cybersecurity Professional Certificate di Coursera, menguasai keterampilan keamanan praktis.",
        fullDescription: "Saya telah berhasil menyelesaikan program Google Cybersecurity Professional Certificate yang diselenggarakan oleh Google melalui Coursera. Program komprehensif ini terdiri dari 9 kursus intensif yang dirancang untuk memberikan pengalaman praktis di bidang keamanan siber tingkat pemula. Melalui sertifikasi ini, saya telah menunjukkan kompetensi dalam konsep dasar keamanan siber, manajemen risiko, keamanan jaringan, dan alat-alat teknis penting (Linux, SQL, Python, SIEM). Saya memperoleh pengetahuan praktis dalam menangani insiden keamanan, mengidentifikasi ancaman, dan menerapkan teknik mitigasi untuk melindungi aset digital.",
        category: "Certification",
        location: "Online / Coursera",
        achievements: [
            "Menyelesaikan seluruh 9 modul kursus Google Cybersecurity di Coursera",
            "Memperoleh pengalaman praktis dengan Python, Linux, SQL, SIEM tools, dan IDS",
            "Mampu mengidentifikasi serta memitigasi risiko, ancaman, dan kerentanan keamanan siber",
            "Meraih Sertifikat Profesional Resmi Google Cybersecurity yang diterbitkan pada 6 Juli 2026"
        ]
    },
    // [A15] ID: 13 - Faculty Election 2023
    "13": {
        title: "Pemira Fakultas 2023",
        description: "Panitia Pemilihan Raya Fakultas Informatika 2023 sebagai staf divisi acara dan moderator.",
        fullDescription: "Panitia Pemilihan Raya Fakultas Informatika (Pemira FIF) 2023 di Divisi Acara. Bertanggung jawab merancang konsep acara, bertindak sebagai moderator salah satu segmen, dan memastikan pemilihan berjalan tertib dan demokratis.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil memoderatori salah satu segmen penting dalam Pemilihan Raya Fakultas Informatika 2023",
            "Berkontribusi dalam pengembangan konsep acara dan struktur jalannya pemilihan",
            "Memastikan kegiatan berjalan tertib dan tepat waktu sesuai agenda yang telah ditetapkan",
            "Mendukung kelancaran pesta demokrasi mahasiswa di tingkat fakultas"
        ]
    },
    // [A16] ID: 11 - HMSI Member 2023
    "11": {
        title: "Pengurus HMSI 2023",
        description: "Anggota aktif Divisi Kewirausahaan HMSI ITTP 2023/2024 dengan program kerja utama pengadaan kemeja PDH.",
        fullDescription: "Anggota aktif Himpunan Mahasiswa Sistem Informasi ITTP periode 2023/2024 di Divisi Kewirausahaan. Berkontribusi dalam program kerja utama produksi dan distribusi seragam PDH mahasiswa Sistem Informasi, mengasah keterampilan negosiasi vendor, koordinasi tim, dan kewirausahaan.",
        category: "Organization",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil mengelola dan memasarkan seragam PDH resmi untuk dua angkatan berbeda (Angkatan 2023 dan 2024) sebagai bagian program unggulan Divisi Kewirausahaan.",
            "Berkontribusi aktif dalam mendukung dan menyukseskan program kerja kewirausahaan lainnya di dalam divisi."
        ]
    },
    // [A17] ID: 9 - Closing Dies Natalis Information System 2023
    "9": {
        title: "Closing Dies Natalis SI 2023",
        description: "Berpartisipasi dalam penutupan Dies Natalis Prodi Sistem Informasi 2023 dan bertugas sebagai Master of Ceremony.",
        fullDescription: "Berpartisipasi dalam acara Penutupan Dies Natalis Program Studi Sistem Informasi 2023 dan dipercaya sebagai Master of Ceremony (MC) untuk memimpin jalannya seluruh rangkaian acara hingga selesai.",
        category: "Activity",
        location: "ITTP Purwokerto",
        achievements: [
            "Berhasil bertindak sebagai Master of Ceremony (MC) pada Malam Penutupan Dies Natalis Prodi Sistem Informasi 2023",
            "Memastikan seluruh susunan acara berjalan lancar dan tepat waktu",
            "Menunjukkan kemampuan public speaking profesional dan membangun interaksi hangat dengan audiens",
            "Menyukseskan perayaan Dies Natalis program studi hingga penutupan yang meriah"
        ]
    },
    // [A18] ID: 19 - Practical Assistant – Programming Laboratory
    "19": {
        title: "Asisten Praktikum – Laboratorium Pemrograman",
        description: "Menjadi Asisten Praktikum mata kuliah Pemrograman Berorientasi Objek (Java) dan prinsip perancangan OOP.",
        fullDescription: "Bertugas sebagai Asisten Praktikum untuk mata kuliah Pemrograman Berorientasi Objek (Java) di Laboratorium Pemrograman Telkom University Purwokerto selama Semester Genap Tahun Akademik 2025/2026.\n\nDalam peran ini, saya mendampingi dosen dalam pelaksanaan sesi laboratorium, membimbing mahasiswa dalam memahami konsep pemrograman berorientasi objek menggunakan Java, serta memberikan bantuan teknis saat latihan pengkodean dan penugasan. Saya juga membantu mahasiswa dalam memecahkan error kode, menjelaskan konsep rekayasa perangkat lunak, dan memastikan mereka memperoleh pemahaman yang kokoh tentang prinsip-prinsip OOP melalui latihan langsung. Pengalaman ini memperkuat keahlian teknis saya dalam pemrograman Java sekaligus meningkatkan keterampilan komunikasi, bimbingan, dan penyelesaian masalah.",
        category: "Education",
        location: "Laboratorium Pemrograman ITTP",
        achievements: [
            "Bertugas sebagai Asisten Praktikum resmi untuk mata kuliah Pemrograman Berorientasi Objek (Java).",
            "Membimbing mahasiswa selama sesi praktikum laboratorium dan latihan pemrograman.",
            "Mendampingi dosen dalam pelaksanaan kelas praktikum pemrograman.",
            "Membimbing mahasiswa dalam menerapkan konsep OOP berbasis Java.",
            "Membantu mahasiswa melakukan debugging kode dan memecahkan kendala teknis pemrograman.",
            "Menerima sertifikat penghargaan resmi dari Laboratorium Pemrograman Telkom University Purwokerto."
        ]
    },
    // [A19] ID: 18 - Sertifikat Kompetensi Pengembang Web — LSP Informatika (BNSP)
    "18": {
        title: "Sertifikat Kompetensi Pengembang Web — LSP Informatika (BNSP)",
        description: "Lulus uji kompetensi profesional nasional skema Pengembang Web yang diselenggarakan oleh LSP Informatika (BNSP).",
        fullDescription: "Saya telah berhasil lulus Uji Kompetensi profesi nasional yang diselenggarakan oleh Lembaga Sertifikasi Profesi (LSP) INFORMATIKA, yang berlisensi resmi oleh Badan Nasional Sertifikasi Profesi (BNSP) dengan nomor lisensi BNSP-LSP-3xx-ID. Asesmen ini dilaksanakan pada 26 April 2026 untuk skema kompetensi Pengembang Web (Web Developer). Berdasarkan hasil asesmen, saya resmi dinyatakan KOMPETEN — memenuhi seluruh standar profesi nasional untuk peran Pengembang Web sesuai Standar Kompetensi Kerja Nasional Indonesia (SKKNI). Sertifikasi ini merupakan bukti formal dan diakui secara nasional atas kompetensi profesional saya di bidang web development.",
        category: "Certification",
        location: "LSP Informatika / BNSP",
        achievements: [
            "Dinyatakan KOMPETEN dalam skema kompetensi profesi nasional Pengembang Web (Web Developer)",
            "Lulus Uji Kompetensi oleh LSP Informatika berlisensi resmi BNSP (BNSP-LSP-3xx-ID)",
            "Menerima Surat Keterangan Hasil Asesmen No. 0xxxx/SKHA/LSP-INF/04/2026",
            "Asesmen diselenggarakan pada 26 April 2026 di Jakarta"
        ]
    }
};

/**
 * Returns translated portfolio fields based on current active language.
 */
export function getTranslatedPortfolio(item, lang) {
    if (!item) return item;
    if (lang === 'en') {
        return {
            title: item.title_en || item.title || '',
            description: item.description_en || item.description || '',
            longDescription: item.longDescription_en || item.longDescription || item.long_description || ''
        };
    }

    // Explicit Indonesian fields in Firestore
    if (item.title_id || item.description_id || item.longDescription_id) {
        return {
            title: item.title_id || item.title || '',
            description: item.description_id || item.description || '',
            longDescription: item.longDescription_id || item.longDescription || item.long_description || ''
        };
    }

    const pId = String(item.portfolioId || item.id || '');
    const titleLower = String(item.title || '').toLowerCase();

    // 1. Try matching by ID in PORTFOLIO_DICTIONARY
    if (pId && PORTFOLIO_DICTIONARY[pId]) {
        const dict = PORTFOLIO_DICTIONARY[pId];
        return {
            title: dict.title || item.title,
            description: dict.description || item.description,
            longDescription: dict.longDescription || item.longDescription || item.long_description || item.description
        };
    }

    // 2. Try matching by keyword in title
    const matchKey = Object.keys(PORTFOLIO_DICTIONARY).find(k => {
        const dict = PORTFOLIO_DICTIONARY[k];
        return dict.title && titleLower.includes(dict.title.toLowerCase().substring(0, 8));
    });

    if (matchKey) {
        const dict = PORTFOLIO_DICTIONARY[matchKey];
        return {
            title: dict.title || item.title,
            description: dict.description || item.description,
            longDescription: dict.longDescription || item.longDescription || item.long_description || item.description
        };
    }

    return {
        title: item.title || '',
        description: item.description || '',
        longDescription: item.longDescription || item.long_description || ''
    };
}

/**
 * Returns translated activity fields based on current active language.
 */
export function getTranslatedActivity(item, lang) {
    if (!item) return item;
    if (lang === 'en') {
        return {
            title: item.title_en || item.title || '',
            description: item.description_en || item.description || '',
            fullDescription: item.fullDescription_en || item.fullDescription || item.description || '',
            category: item.category || 'Activity',
            status: translateStatus(item.status || 'completed', 'en'),
            date: item.date || '',
            location: item.location || '',
            achievements: item.achievements_en || item.achievements || []
        };
    }

    // Explicit Indonesian fields in Firestore
    if (item.title_id || item.description_id || item.fullDescription_id || item.achievements_id) {
        return {
            title: item.title_id || item.title || '',
            description: item.description_id || item.description || '',
            fullDescription: item.fullDescription_id || item.fullDescription || item.description || '',
            category: translateCategory(item.category_id || item.category || 'Activity', lang),
            status: translateStatus(item.status || 'completed', lang),
            date: translateDate(item.date_id || item.date || '', lang),
            location: item.location_id || item.location || '',
            achievements: item.achievements_id || item.achievements || []
        };
    }

    const aId = String(item.activityId || item.id || '');
    const titleLower = String(item.title || '').toLowerCase();
    const descLower = String(item.description || '').toLowerCase();

    // 1. Try matching by ID in ACTIVITIES_DICTIONARY
    if (aId && ACTIVITIES_DICTIONARY[aId]) {
        const dict = ACTIVITIES_DICTIONARY[aId];
        return {
            title: dict.title || item.title,
            description: dict.description || item.description,
            fullDescription: dict.fullDescription || dict.description || item.fullDescription || item.description,
            category: translateCategory(dict.category || item.category || 'Activity', lang),
            status: translateStatus(item.status || 'completed', lang),
            date: translateDate(item.date || '', lang),
            location: dict.location || item.location || '',
            achievements: dict.achievements || item.achievements || []
        };
    }

    // 2. Try matching by keyword in title or description
    const matchKey = Object.keys(ACTIVITIES_DICTIONARY).find(k => {
        const dict = ACTIVITIES_DICTIONARY[k];
        return (dict.title && titleLower.includes(dict.title.toLowerCase().substring(0, 10))) ||
               (dict.description && descLower.includes(dict.description.toLowerCase().substring(0, 15)));
    });

    if (matchKey) {
        const dict = ACTIVITIES_DICTIONARY[matchKey];
        return {
            title: dict.title || item.title,
            description: dict.description || item.description,
            fullDescription: dict.fullDescription || dict.description || item.fullDescription || item.description,
            category: translateCategory(dict.category || item.category || 'Activity', lang),
            status: translateStatus(item.status || 'completed', lang),
            date: translateDate(item.date || '', lang),
            location: dict.location || item.location || '',
            achievements: dict.achievements || item.achievements || []
        };
    }

    return {
        title: item.title || '',
        description: item.description || '',
        fullDescription: item.fullDescription || item.description || '',
        category: translateCategory(item.category || 'Activity', lang),
        status: translateStatus(item.status || 'completed', lang),
        date: translateDate(item.date || '', lang),
        location: item.location || '',
        achievements: item.achievements || []
    };
}
