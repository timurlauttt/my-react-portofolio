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
        description: "Kumpulan repositori kode, aktivitas open-source, dan proyek teknologi yang saya kembangkan dan publikasikan di GitHub.",
        longDescription: "Koleksi repositori kode, proyek open-source, dan eksplorasi arsitektur perangkat lunak yang telah saya bangun dan bagikan di profil GitHub saya.\n\nFitur Utama:\n- Repositori Open-Source: Beragam proyek aplikasi web modern, eksperimen arsitektur backend, dan antarmuka front-end responsif.\n- Arsitektur Multi-Stack: Portofolio kode mencakup Laravel, React.js, Django, Tailwind CSS, serta integrasi database MySQL & PostgreSQL.\n- Otomasi CI/CD & DevOps: Implementasi pipeline GitHub Actions untuk pengujian otomatis, linting kode, dan deployment server.\n- Dokumentasi Kode Rapi: Struktur repositori modular yang dilengkapi README komprehensif, panduan instalasi, dan lisensi terbuka."
    },
    // [P2] ID: 4 - Pancacinta (E-Learning & School Management)
    "4": {
        title: "Pancacinta - Platform Manajemen Sekolah & E-Learning",
        description: "Pancacinta adalah platform evaluasi dan manajemen sekolah multi-peran komprehensif yang dirancang dengan sistem akses bertingkat untuk Superadmin, Admin, Guru, Siswa, dan Orang Tua (Wali Siswa).",
        longDescription: "Pancacinta adalah platform evaluasi dan manajemen sekolah multi-peran komprehensif yang dirancang dengan sistem akses bertingkat untuk Superadmin, Admin, Guru, Siswa, dan Orang Tua (Wali Siswa).\n\nFitur Utama:\n- Laporan Aktivitas Mingguan: Siswa mengunggah bukti foto terverifikasi berdasarkan minggu kalender ISO 8601, dengan jadwal pelaporan yang dikontrol admin (misalnya penyesuaian libur semester).\n- Engine Ujian Online: Dilengkapi timer hitung mundur dengan verifikasi waktu sisi server, penyimpanan otomatis per soal, pengacakan soal & opsi jawaban, pengelompokan soal wacana/bacaan, serta kalkulasi nilai dan peringkat otomatis secara instan.\n- Pelacak Prestasi: Pencatatan portofolio prestasi terpusat dengan bukti foto dan unggah sertifikat PDF, dipantau dan dimoderasi per kelas.\n- Operasi Massal: Templat impor/ekspor Excel massal untuk data siswa, guru, wali murid, dan bank soal ujian dengan umpan balik validasi baris demi baris.\n- PWA & Notifikasi Web Push: Progressive Web App yang dapat diinstal dengan fallback offline dan pengingat push otomatis setiap hari Jumat untuk siswa yang belum mengirim laporan.\n- Penyimpanan Cloud & Performa: Kompresi gambar WebP otomatis secara on-the-fly dengan integrasi penyimpanan Cloudflare R2 (kompatibel S3)."
    },
    // [P3] ID: 8 - Selis Molis Hoki
    "8": {
        title: "Website Bengkel Selis Molis Hoki",
        description: "Website profil usaha dan katalog layanan untuk bengkel sepeda dan motor listrik guna memperluas jangkauan dan kepercayaan pelanggan.",
        longDescription: "Proyek nyata pertama saya dalam merancang dan mengembangkan website profil bisnis untuk bengkel sepeda dan motor listrik teman saya guna membangun kehadiran online yang profesional dan informatif.\n\nFitur Utama:\n- Katalog Layanan & Estimasi Biaya: Informasi terperinci tentang jenis perbaikan, servis berkala, dan estimasi biaya suku cadang.\n- Kontak Cepat & Integrasi WhatsApp: Tombol komunikasi instan untuk konsultasi teknis dan panduan navigasi lokasi bengkel.\n- Kehadiran Digital Bisnis: Memperkuat branding digital UMKM lokal serta memudahkan pelanggan menemukan informasi layanan terpercaya.\n- Antarmuka Ringan & Responsif: Navigasi intuitif yang dioptimalkan untuk akses cepat melalui perangkat seluler dan smartphone."
    },
    // [P4] ID: 7 - Wedding Invitation
    "7": {
        title: "Undangan Pernikahan Digital Interaktif",
        description: "Aplikasi undangan pernikahan digital berbasis React.js dengan fitur konfirmasi kehadiran (RSVP) online dan hitung mundur acara.",
        longDescription: "Aplikasi web undangan pernikahan digital interaktif yang dibangun menggunakan React.js untuk menyajikan informasi penting acara pernikahan secara elegan, modern, dan mudah diakses.\n\nFitur Utama:\n- Detail Acara Lengkap: Penyajian jadwal akad dan resepsi, peta lokasi terintegrasi, dan panduan acara.\n- Sistem RSVP Online: Formulir konfirmasi kehadiran tamu secara langsung dengan pencatatan digital yang praktis.\n- Hitung Mundur Acara: Timer countdown dinamis real-time menuju hari pernikahan dengan animasi visual yang halus.\n- Desain Mobile-First Responsif: Tampilan anggun dan tata letak responsif yang nyaman dibuka di smartphone maupun aplikasi chatting."
    },
    // [P5] ID: 5 - SMK Taman Siswa Purwokerto Company Profile
    "5": {
        title: "Company Profile SMK Taman Siswa Purwokerto",
        description: "Website profil sekolah SMK Taman Siswa Purwokerto yang dirancang menggunakan Laravel Blade templates dengan tampilan modern dan responsif.",
        longDescription: "Merancang dan mengembangkan antarmuka pengguna website profil sekolah SMK Taman Siswa Purwokerto menggunakan template Laravel Blade untuk menghadirkan pengalaman visual yang menarik, intuitif, dan informatif.\n\nFitur Utama:\n- Antarmuka Responsif Laravel Blade: Struktur tampilan teroptimasi untuk desktop, tablet, dan smartphone dengan navigasi yang mudah.\n- Integrasi Konten Dinamis: Penyajian informasi program keahlian, berita sekolah, agenda kegiatan, dan galeri fasilitas secara terstruktur.\n- Optimasi Kecepatan Muat: Implementasi aset CSS dan JS yang efisien untuk memastikan waktu buka halaman yang cepat.\n- Pengujian Lintas Perangkat: Uji kompatibilitas komprehensif di berbagai browser untuk memastikan konsistensi visual dan fungsional."
    },
    // [P6] ID: 9 - MSIB Project - Web App Questify
    "9": {
        title: "Proyek MSIB - Web App Questify",
        description: "Platform edukasi gamifikasi berbasis Django untuk mengasah kemampuan berpikir kritis dan pemecahan masalah siswa sekolah dasar.",
        longDescription: "Proyek program MSIB yang dibangun menggunakan framework Django, berfokus pada pengembangan platform edukasi gamifikasi untuk melatih kemampuan berpikir dan logika siswa sekolah dasar melalui kuis interaktif.\n\nFitur Utama:\n- Kuis Berpikir Adaptif: Tingkat kesulitan soal yang disesuaikan secara adaptif dengan kemampuan kognitif masing-masing siswa.\n- Gamifikasi Belajar Menyenangkan: Tampilan visual interaktif dan mekanisme kuis berbasis permainan untuk meningkatkan motivasi belajar anak.\n- Penguatan Pemahaman & Logika: Modul pembelajaran terstruktur untuk mengasah pemecahan masalah dan daya pemahaman wacana.\n- Arsitektur Django Andal: Pengelolaan bank soal terpusat, autentikasi pengguna yang aman, dan dashboard moderasi hasil evaluasi."
    },
    // [P7] ID: 1 - lowcosthost.id
    "1": {
        title: "lowcosthost.id - Platform Shared Hosting",
        description: "Platform start-up shared hosting yang andal dan terjangkau untuk membantu mahasiswa serta pengembang pemula mendeploy proyek web dengan mudah.",
        longDescription: "Proyek start-up yang saya kembangkan bersama tim, berfokus pada penyediaan platform shared hosting yang mudah diakses, andal, dan aman bagi mahasiswa maupun pengembang pemula.\n\nFitur Utama:\n- Paket Hosting Ramah Mahasiswa: Penawaran paket terjangkau tanpa mengorbankan performa, stabilitas, atau keamanan server.\n- Alur Deployment Praktis: Antarmuka pengelolaan sederhana untuk memudahkan peluncuran proyek web dan aplikasi akademik.\n- Keamanan & Isolasi Data: Proteksi data terenkripsi dan konfigurasi lingkungan hosting yang aman dan terisolasi.\n- Performa Server Skalabel: Manajemen alokasi sumber daya yang optimal guna menjamin uptime tinggi dan performa stabil."
    },
    // [P8] ID: 2 - Blog Website
    "2": {
        title: "Website Blog & Portofolio Pribadi",
        description: "Website blog dan portofolio pribadi berkinerja tinggi yang dibangun menggunakan Astro dan Tailwind CSS dengan dukungan konten Markdown/MDX.",
        longDescription: "Website blog dan portofolio pribadi yang dikembangkan menggunakan Astro dan Tailwind CSS dengan fokus pada performa tinggi, kesederhanaan, dan standar web modern.\n\nFitur Utama:\n- Pengelolaan Konten Markdown & MDX: Fleksibilitas penulisan artikel dengan dukungan komponen interaktif dan metadata terstruktur.\n- Pencarian Bawaan & Mode Gelap: Fungsi pencarian artikel instan di sisi klien serta tombol peralihan tema dark/light mode yang mulus.\n- Performa Static-First Cepat: Waktu muat halaman ultra-cepat dengan optimasi bundel aset statis yang dideploy di Vercel.\n- Desain Responsif Elegan: Tipografi modern dan tata letak ramah perangkat seluler untuk kenyamanan membaca di berbagai ukuran layar."
    },
    // [P9] ID: 6 - Photobooth Website App
    "6": {
        title: "Aplikasi Web Photobooth Digital",
        description: "Aplikasi web photobooth interaktif untuk mengambil foto langsung dari browser dengan beragam tata letak strip foto estetik.",
        longDescription: "Proyek sampingan berupa aplikasi web photobooth digital yang mereplikasi pengalaman photobooth fisik langsung di browser dengan berbagai pilihan tata letak strip foto menarik.\n\nFitur Utama:\n- Akses Kamera Real-Time: Integrasi webcam browser dengan timer hitung mundur dan pengambilan multi-shot foto otomatis.\n- Templat Strip Foto Estetik: Beragam pilihan gaya tata letak strip foto, kustomisasi warna bingkai, dan filter visual.\n- Pratinjau Kanvas Instan: Render hasil pemotretan secara langsung di browser dengan opsi penyesuaian sebelum diunduh.\n- Ekspor Gambar Resolusi Tinggi: Pemrosesan gambar di sisi klien untuk menghasilkan strip foto beresolusi tinggi yang siap dicetak atau dibagikan."
    },
    // [P10] ID: 3 - MIN 2 Banyumas (PPDB & School Management)
    "3": {
        title: "MIN 2 Banyumas - Sistem Informasi Sekolah & PPDB Online",
        description: "Sistem informasi dan manajemen layanan sekolah siap produksi untuk MIN 2 Banyumas, dilengkapi pendaftaran siswa baru (PPDB) terintegrasi payment gateway dan kelulusan online.",
        longDescription: "Sistem informasi dan manajemen layanan sekolah siap produksi yang dikembangkan untuk Madrasah Ibtidaiyah Negeri (MIN) 2 Banyumas, mengintegrasikan komunikasi publik, penerimaan peserta didik, dan administrasi digital.\n\nFitur Utama:\n- Alur PPDB Online Terpadu: Pendaftaran siswa baru otomatis dengan kode registrasi unik, validasi unggah berkas persyaratan, dan pelacakan status pendaftaran real-time.\n- Integrasi Payment Gateway Midtrans: Pemrosesan pembayaran biaya pendaftaran menggunakan Snap Token dan verifikasi otomatis melalui webhook.\n- Pengumuman Kelulusan Online & SKL: Pengecekan status kelulusan berbasis NISN serta pembuatan Surat Keterangan Lulus (SKL) digital otomatis ber-QR code dinamis.\n- Dashboard Admin Berbasis Peran: Hak akses bertingkat untuk Super Admin, Admin PPDB, dan Admin TIC guna mengelola banner, berita, agenda, prestasi, dan fasilitas madrasah.\n- Operasi Data Massal: Templat impor dan ekspor data siswa dan pendaftar berbasis Excel dengan validasi format instan."
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

const PORTFOLIO_DICTIONARY_EN = {
    // [P1] ID: 10 - GitHub Profile
    "10": {
        title: "GitHub Profile & Repositories",
        description: "A curated collection of open-source repositories, developer tools, and full-stack projects published on my GitHub profile.",
        longDescription: "A curated collection of open-source projects, architecture experiments, and production codebases developed and shared on my GitHub profile.\n\nKey Features:\n- Open-Source Repositories: Active maintenance of modern web applications, backend APIs, and interactive UI components.\n- Multi-Stack Architecture: Diverse projects built using Laravel, React.js, Django, Tailwind CSS, and MySQL/PostgreSQL databases.\n- CI/CD & DevOps Automation: GitHub Actions workflows configured for automated testing, code linting, and continuous server deployments.\n- Comprehensive Documentation: Clean modular codebases complete with thorough README guides, setup documentation, and open licensing."
    },
    // [P2] ID: 4 - Pancacinta (E-Learning & School Management)
    "4": {
        title: "Pancacinta - School Management & E-Learning Platform",
        description: "Pancacinta is a comprehensive multi-role school management and evaluation platform designed with a hierarchical access system for Superadmin, Admin, Teachers, Students, and Parents (Wali Siswa).",
        longDescription: "Pancacinta is a comprehensive multi-role school management and evaluation platform designed with a hierarchical access system for Superadmin, Admin, Teachers, Students, and Parents (Wali Siswa).\n\nKey Features:\n- Weekly Activity Reporting: Students upload verified photo evidence based on ISO 8601 calendar weeks, with admin-controlled reporting schedules (e.g., semester break overrides).\n- Online Examination Engine: Features countdown timers with server-side time verification, per-question auto-save, question/option shuffling, reading comprehension grouping, and instant automated grade/ranking calculations.\n- Achievement Tracker: Centralized portfolio logging with photo proofs and PDF certificate uploads, monitored and moderated per classroom.\n- Bulk Operations: Batch Excel import/export templates for students, teachers, guardians, and exam questions with row-by-row validation feedback.\n- PWA & Web Push: Installable Progressive Web App with offline fallback and scheduled Friday push reminders for students with pending reports.\n- Cloud Storage & Performance: Automatic on-the-fly WebP image compression with storage integration on Cloudflare R2 (S3-compatible)."
    },
    // [P3] ID: 8 - Selis Molis Hoki
    "8": {
        title: "Selis Molis Hoki Workshop Website",
        description: "A business profile and service catalog website created for an electric bicycle and motorcycle repair shop to establish an online presence.",
        longDescription: "This is my first project, which involved designing and developing a website for my friend’s electric bicycle and motorcycle repair shop. The website was created to establish an online presence for the business, provide clear information about available services, and make it easier for customers to learn about repair options, pricing, and contact details. Through this project, I was responsible for translating business requirements into a functional and user-friendly website, focusing on clarity, usability, and a clean design.\n\nKey Features:\n- Service & Pricing Catalog: Clear breakdown of electric vehicle repair options, diagnostics, routine maintenance, and spare part estimates.\n- Instant Inquiry & Location: Direct WhatsApp contact button and interactive location directions for nearby customers.\n- Digital Business Presence: Professional digital branding designed to build trust and increase local workshop visibility.\n- Lightweight & Responsive UI: Fast-loading, mobile-friendly interface tailored for effortless smartphone navigation."
    },
    // [P4] ID: 7 - Wedding Invitation
    "7": {
        title: "Digital Wedding Invitation Web App",
        description: "A lightweight and user-friendly digital wedding invitation built with React.js featuring online RSVP management and dynamic event countdowns.",
        longDescription: "I created a simple wedding invitation page using React.js as a lightweight and user-friendly web application. The page presents essential wedding information, including the wedding date, event details, and an RSVP section that allows guests to confirm their attendance easily. The interface was designed with a clean and responsive layout to ensure accessibility across different devices, providing a smooth user experience for both desktop and mobile users.\n\nKey Features:\n- Interactive Event Information: Clean presentation of ceremony schedules, interactive venue location maps, and event timeline.\n- Online RSVP Confirmation: Real-time attendance submission allowing guests to confirm attendance and send congratulations.\n- Dynamic Countdown Timer: Real-time animated countdown timer leading up to the special day.\n- Mobile-First Responsive Design: Polished typography and layouts optimized for messaging apps and smartphone viewports."
    },
    // [P5] ID: 5 - SMK Taman Siswa Purwokerto Company Profile
    "5": {
        title: "SMK Taman Siswa Purwokerto Company Profile",
        description: "A modern company profile website for SMK Taman Siswa Purwokerto built with Laravel Blade templates, delivering intuitive navigation and responsive design.",
        longDescription: "Designed and developed the user interface for the company profile website using Laravel Blade templates to deliver an intuitive and visually appealing frontend experience. Implemented responsive design principles to ensure optimal display and functionality across desktop, tablet, and mobile devices, while collaborating closely with the backend team to integrate dynamic content and interactive features using JavaScript and Laravel’s frontend stack.\n\nKey Features:\n- Responsive Laravel Blade Architecture: Structured component templates ensuring consistent display on desktop, tablet, and mobile devices.\n- Dynamic Content Integration: Seamless synchronization for school news, vocational majors, academic activities, and facility showcases.\n- Optimized Performance: Efficient CSS and JavaScript bundle execution to achieve rapid page delivery.\n- Cross-Browser Compatibility: Rigorously tested across multiple browsers and screen sizes to ensure high visual fidelity."
    },
    // [P6] ID: 9 - MSIB Project - Web App Questify
    "9": {
        title: "MSIB Project - Questify Quiz Platform",
        description: "An educational platform built with Django designed to improve elementary school students’ thinking and problem-solving skills through interactive quiz-based learning.",
        longDescription: "This is my MSIB project built using the Django framework, focused on developing an educational platform designed to improve elementary school students’ thinking and problem-solving skills through interactive quiz-based learning. The platform provides quiz questions with difficulty levels that are carefully adjusted to match each student’s cognitive abilities, allowing them to learn progressively at a comfortable pace.\n\nKey Features:\n- Adaptive Cognitive Quizzing: Difficulty levels dynamically adjusted to student cognitive levels for progressive mastery.\n- Gamified Learning Experience: Interactive visuals and game-like mechanics to boost student engagement and enjoyment.\n- Logical Thinking & Comprehension: Structured quiz categories strengthening analytical thinking and problem-solving.\n- Robust Django Architecture: Secure authentication, modular question databases, and teacher moderation dashboards."
    },
    // [P7] ID: 1 - lowcosthost.id
    "1": {
        title: "lowcosthost.id - Shared Hosting Platform",
        description: "An accessible, reliable, and secure shared hosting platform start-up developed to help students and developers deploy projects easily.",
        longDescription: "This is my start-up project developed together with my friends, focusing on the shared hosting industry. The start-up is designed to provide an accessible, reliable, and secure hosting platform that allows users from all backgrounds—particularly students and early-stage developers—to deploy their projects easily. By offering affordable pricing plans without compromising on performance or security, the platform aims to reduce the barriers often faced when launching web-based applications.\n\nKey Features:\n- Affordable Web Hosting Plans: Budget-friendly hosting tiers designed to eliminate financial barriers for students and indie developers.\n- Streamlined Project Deployment: User-friendly management interface enabling fast, hassle-free web application launching.\n- Secure & Isolated Environments: Encrypted data protection, isolation protocols, and reliable server-level security.\n- Scalable Infrastructure: Resource management ensuring high uptime and stability for academic and production websites."
    },
    // [P8] ID: 2 - Blog Website
    "2": {
        title: "Personal Blog & Portfolio Website",
        description: "A personal blog and portfolio website developed using Astro and Tailwind CSS, focusing on performance, simplicity, and modern web standards.",
        longDescription: "This project is a personal blog and portfolio website developed using Astro and Tailwind CSS, focusing on performance, simplicity, and modern web standards. The website supports content creation using Markdown and MDX, enabling flexible and efficient content management. The project emphasizes fast load times and optimized performance, leveraging Astro’s static-first approach, deployed on Vercel.\n\nKey Features:\n- Markdown & MDX Content Pipeline: Flexible content authoring supporting rich components and structured frontmatter metadata.\n- Instant Search & Theme Toggle: Integrated fast client-side article search and seamless dark/light mode switching.\n- Static-First Performance: Lightning-fast page load speeds, optimized asset bundles, and reliable edge deployment on Vercel.\n- Responsive Modern UI: Clean typography with mobile-first responsive styling for an optimal reading experience on any device."
    },
    // [P9] ID: 6 - Photobooth Website App
    "6": {
        title: "Photobooth Web Application",
        description: "A photo booth web application that allows users to capture photos directly through the browser and apply various photo strip layouts.",
        longDescription: "This is my side project, a photo booth web application that allows users to capture photos directly through the browser and apply various photo strip layouts. The application is designed to replicate the experience of a physical photo booth in a digital format, offering multiple strip styles, layout options, and customization features to enhance user engagement.\n\nKey Features:\n- Real-Time Camera Access: Seamless in-browser webcam streaming with countdown timers and automated multi-shot capture.\n- Aesthetic Photo Strip Templates: Diverse layout choices, classic retro strips, custom border colors, and sticker overlays.\n- Live Canvas Preview: Instant real-time rendering and interactive adjustments before finalizing.\n- One-Click High-Res Download: Fast client-side image processing and instant downloading of print-ready photo strips."
    },
    // [P10] ID: 3 - MIN 2 Banyumas (PPDB & School Management)
    "3": {
        title: "MIN 2 Banyumas - School Information & PPDB Platform",
        description: "A production-ready school information and service management system developed for MIN 2 Banyumas featuring end-to-end PPDB admissions and graduation certificates.",
        longDescription: "A production-ready school information and service management system developed for Madrasah Ibtidaiyah Negeri (MIN) 2 Banyumas. The platform features an end-to-end online student admission (PPDB) pipeline with automated registration codes, document uploads, and seamless Midtrans payment gateway integration (Snap Token & automated webhook verification). It also includes an online graduation announcement module allowing students to check their status using NISN and generate verifiable graduation certificates (SKL) with dynamic QR codes.\n\nKey Features:\n- End-to-End Online PPDB Pipeline: Automated student registration with unique registration codes, document upload validation, and real-time status tracking.\n- Midtrans Payment Gateway Integration: Seamless payment processing with Snap Token generation and automated webhook transaction verification.\n- Online Graduation Announcement & SKL: NISN-based graduation status lookup and automatic generation of Surat Keterangan Lulus (SKL) with dynamic QR verification.\n- Role-Based Back-Office Administration: Granular access control for Super Admin, PPDB Admin, and TIC Admin to manage banners, news, events, achievements, and facilities.\n- Bulk Excel Data Operations: Batch import and export templates for students and applicants with instant validation feedback."
    }
};

/**
 * Returns translated portfolio fields based on current active language.
 */
export function getTranslatedPortfolio(item, lang) {
    if (!item) return item;

    if (lang === 'en') {
        const title = item.title_en || item.title || '';
        const description = item.description_en || item.description || '';
        const longDescription = item.longDescription_en || item.longDescription || item.long_description || description;

        // If Firestore already has description or longDescription from Admin, prioritize it directly!
        if (description || longDescription) {
            return {
                title,
                description,
                longDescription: longDescription || description
            };
        }
    } else {
        // Indonesian
        const title = item.title_id || item.title || '';
        const description = item.description_id || item.description || '';
        const longDescription = item.longDescription_id || item.longDescription || item.long_description || description;

        // If Firestore has custom Indonesian or default description from Admin, prioritize it!
        if (description || longDescription) {
            return {
                title,
                description,
                longDescription: longDescription || description
            };
        }
    }

    const pId = String(item.portfolioId || item.id || '');
    const titleLower = String(item.title || '').toLowerCase();

    if (lang === 'en') {
        if (pId && PORTFOLIO_DICTIONARY_EN[pId]) {
            const dict = PORTFOLIO_DICTIONARY_EN[pId];
            return {
                title: dict.title || item.title_en || item.title || '',
                description: dict.description || item.description_en || item.description || '',
                longDescription: dict.longDescription || item.longDescription_en || item.longDescription || item.long_description || dict.description || ''
            };
        }
        return {
            title: item.title_en || item.title || '',
            description: item.description_en || item.description || '',
            longDescription: item.longDescription_en || item.longDescription || item.long_description || ''
        };
    }

    if (pId && PORTFOLIO_DICTIONARY[pId]) {
        const dict = PORTFOLIO_DICTIONARY[pId];
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
