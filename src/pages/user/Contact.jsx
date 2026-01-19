import React, { useState, useEffect } from 'react';
import ContactCard from '../../components/ContactCard';
import { contactService } from '../../services/serviceWrapper';

function Contact() {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadContactData = async () => {
            try {
                console.log('Loading contact data for main page...');
                setLoading(true);
                setError(null);
                const data = await contactService.getAll();
                console.log('Contact data loaded:', data);
                // Sort by contactId ascending (ID 1 first, then 2, 3, etc.)
                const sortedData = data.sort((a, b) => (a.contactId || 0) - (b.contactId || 0));
                setContactData(sortedData);
            } catch (error) {
                console.error('Error loading contact data:', error);
                setError('Failed to load contact data');
                setContactData([]);
            } finally {
                setLoading(false);
            }
        };

        loadContactData();
    }, []);

    if (loading) {
        return (
            <section id="contact" className="pt-20 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="font-bold text-2xl md:text-3xl mb-6 text-gray-900">Let's Work Together</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Ready to collaborate? Choose your preferred platform to get in touch.
                        </p>
                    </div>
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74247A]"></div>
                        <span className="ml-3 text-gray-600">Loading contact options...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="contact" className="pt-20 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">Contact</h1>
                    </div>
                    <div className="text-center py-16">
                        <p className="text-red-600 mb-4">{error}</p>
                        <p className="text-gray-500">Please try again later</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="pt-20 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="font-bold mt-4 mb-4 text-center text-lg md:text-2xl">Contact</h1>
                    <p className="text-center text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Ready to collaborate? Choose your preferred platform to get in touch.
                        I'm always excited to discuss new projects, opportunities, and innovative ideas.
                    </p>
                </div>
                {contactData.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No contact information available yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add contact options through the admin panel!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-6xl mx-auto">
                        {contactData.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                type={contact.type}
                                href={contact.href}
                                bgColor={contact.bgColor}
                                order={contact.order}
                                label={contact.label}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Contact;
