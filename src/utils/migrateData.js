import { aboutService, skillsService, portfolioService, activitiesService, contactService } from '../services/firebaseService';
import { aboutData, skillsData, portfolioData, activitiesData, contactData } from '../data/constants';

export const migrateDataToFirebase = async () => {
    try {
        console.log('Starting data migration to Firebase...');

        // Migrate About Data
        console.log('Migrating About data...');
        for (const item of aboutData) {
            await aboutService.create(item);
        }
        console.log(`Migrated ${aboutData.length} about items`);

        // Migrate Skills Data
        console.log('Migrating Skills data...');
        for (const item of skillsData) {
            await skillsService.create(item);
        }
        console.log(`Migrated ${skillsData.length} skills items`);

        // Migrate Portfolio Data
        console.log('Migrating Portfolio data...');
        for (const item of portfolioData) {
            await portfolioService.create(item);
        }
        console.log(`Migrated ${portfolioData.length} portfolio items`);

        // Migrate Activities Data
        console.log('Migrating Activities data...');
        for (const item of activitiesData) {
            await activitiesService.create(item);
        }
        console.log(`Migrated ${activitiesData.length} activities items`);

        // Migrate Contact Data
        console.log('Migrating Contact data...');
        for (const item of contactData) {
            await contactService.create(item);
        }
        console.log(`Migrated ${contactData.length} contact items`);

        console.log('Data migration completed successfully!');
        return true;
    } catch (error) {
        console.error('Error during data migration:', error);
        return false;
    }
};

// Function to check if data already exists
export const checkDataExists = async () => {
    try {
        const [about, skills, portfolio, activities, contact] = await Promise.all([
            aboutService.getAll(),
            skillsService.getAll(),
            portfolioService.getAll(),
            activitiesService.getAll(),
            contactService.getAll()
        ]);

        return {
            about: about.length > 0,
            skills: skills.length > 0,
            portfolio: portfolio.length > 0,
            activities: activities.length > 0,
            contact: contact.length > 0
        };
    } catch (error) {
        console.error('Error checking data existence:', error);
        return {
            about: false,
            skills: false,
            portfolio: false,
            activities: false,
            contact: false
        };
    }
};
