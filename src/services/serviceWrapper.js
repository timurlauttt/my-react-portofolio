// Service wrapper yang akan menggunakan Firebase services
import { 
    aboutService as firebaseAboutService,
    portfolioService as firebasePortfolioService,
    skillsService as firebaseSkillsService,
    activitiesService as firebaseActivitiesService,
    contactService as firebaseContactService,
    cvService as firebaseCvService
} from './firebaseService';

// Use Firebase services directly
export const aboutService = firebaseAboutService;
export const portfolioService = firebasePortfolioService;
export const skillsService = firebaseSkillsService;
export const activitiesService = firebaseActivitiesService;
export const contactService = firebaseContactService;
export const cvService = firebaseCvService;
