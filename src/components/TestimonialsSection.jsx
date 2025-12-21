import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            role: "Project Manager",
            company: "Tech Solutions",
            content: "Urip delivered exceptional work on our e-learning platform. His attention to detail and technical skills are outstanding.",
            avatar: "https://i.pravatar.cc/150?img=1",
            rating: 5
        },
        {
            id: 2,
            name: "Sarah Wilson",
            role: "UI/UX Designer",
            company: "Creative Agency",
            content: "Working with Urip was a pleasure. He transformed our design concepts into a beautiful, functional website.",
            avatar: "https://i.pravatar.cc/150?img=2",
            rating: 5
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Startup Founder",
            company: "InnovateTech",
            content: "Urip's expertise in React and Django helped us launch our product ahead of schedule. Highly recommended!",
            avatar: "https://i.pravatar.cc/150?img=3",
            rating: 5
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Clients Say</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Don't just take my word for it - here's what my clients have to say about working with me
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 md:p-12 text-center">
                        <div className="mb-6">
                            <img 
                                src={testimonials[currentIndex].avatar} 
                                alt={testimonials[currentIndex].name}
                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                            />
                            <StarRating rating={testimonials[currentIndex].rating} />
                        </div>
                        
                        <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                            "{testimonials[currentIndex].content}"
                        </blockquote>
                        
                        <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white">
                                {testimonials[currentIndex].name}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                            </div>
                        </div>
                    </div>

                    {/* Navigation dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentIndex ? 'bg-[#74247A]' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
