// Service wrapper yang akan menggunakan Firebase services
import { 
    aboutService as firebaseAboutService,
    portfolioService as firebasePortfolioService,
    skillsService as firebaseSkillsService,
    activitiesService as firebaseActivitiesService,
    contactService as firebaseContactService
} from './firebaseService';

console.log('🔥 Loading Firebase services directly...');

// Use Firebase services directly
export const aboutService = firebaseAboutService;
export const portfolioService = firebasePortfolioService;
export const skillsService = firebaseSkillsService;
export const activitiesService = firebaseActivitiesService;
export const contactService = firebaseContactService;

console.log('✅ Firebase services loaded successfully');
