// Test navigation functionality
export const testNavigation = () => {
    // Function to test scroll to each section
    const testScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            console.log(`✅ Scrolled to ${sectionId}`);
            return true;
        } else {
            console.error(`❌ Section ${sectionId} not found`);
            return false;
        }
    };

    // Test all navbar sections
    const sections = ['home', 'about-me', 'skills', 'portofolio', 'activities', 'contact'];
    
    console.log('🔍 Testing navigation to all sections:');
    
    sections.forEach(section => {
        const exists = document.getElementById(section) !== null;
        console.log(`${exists ? '✅' : '❌'} Section #${section}: ${exists ? 'Found' : 'Not Found'}`);
    });

    return {
        testScrollToSection,
        sections,
        allSectionsExist: sections.every(section => document.getElementById(section) !== null)
    };
};

// Auto test when loaded
if (typeof window !== 'undefined') {
    window.testNavigation = testNavigation;
}
