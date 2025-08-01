import React, { useState } from 'react';
import Button from './Button';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0_#000]">
            <h3 className="text-xl font-bold mb-4 text-center">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-yellow-400"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-yellow-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-bold mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-yellow-400"
                        placeholder="Message subject"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-yellow-400"
                        placeholder="Write your message..."
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {submitStatus === 'success' && (
                    <div className="text-green-600 text-center font-bold">
                        Message sent successfully!
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="text-red-600 text-center font-bold">
                        Failed to send message. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
