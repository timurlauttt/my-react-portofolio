# My React Portfolio

A modern, responsive portfolio website built with React.js and Firebase.

## Features

- **Dynamic Content Management**: Admin panel for managing portfolio content
- **Firebase Integration**: Real-time database and authentication
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **ID-based Ordering System**: Consistent content organization
- **Image Upload**: Support for portfolio images
- **Modern UI/UX**: Clean and professional design

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Deployment**: Vercel
- **State Management**: React Hooks & Context API

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/timurlauttt/my-react-portofolio.git
cd my-react-portofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Storage
4. Enable Authentication (Anonymous)
5. Update Firebase security rules for development

### 5. Run Development Server

```bash
npm run dev
```

## Portfolio Sections

### Dynamic Sections (Admin Managed)

- **About Me**: Personal background information
- **Skills**: Technical skills with icons and colors
- **Portfolio**: Project showcases with images
- **Activities**: Experiences and participation
- **Contact**: Contact information and social links

### Ordering System

- **Skills**: Descending order (FILO - newest first)
- **Activities**: Ascending order (oldest first)
- **Portfolio**: Ascending order (oldest first)
- **Contact**: Ascending order (oldest first)

## Admin Panel

Access the admin panel to manage your portfolio content:

- **URL**: `/admin/login`
- **Features**: CRUD operations for all sections
- **ID System**: Manual ID assignment for consistent ordering
- **Image Upload**: Support for project and profile images

### Admin Routes

- `/admin/dashboard` - Overview and statistics
- `/admin/about` - Manage About Me section
- `/admin/skills` - Manage Skills section
- `/admin/portfolio` - Manage Portfolio projects
- `/admin/activities` - Manage Activities section
- `/admin/contact` - Manage Contact information

## Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Manual Deployment

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: 2211103102@ittelkom-pwt.ac.id
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/)
- **GitHub**: [timurlauttt](https://github.com/timurlauttt)

## Acknowledgments

- React.js Community
- Firebase Team
- Tailwind CSS
- Heroicons

---

Built with love by [Timur Laut](https://github.com/timurlauttt)
