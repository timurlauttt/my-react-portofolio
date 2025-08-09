import React from 'react';
import ContactCard from './components/ContactCard';
import Section from './components/Layout/Section';
import Container from './components/Layout/Container';
import Grid from './components/Layout/Grid';
import { contactData } from './data/constants';

function Contact() {
    return (
        <Section 
            id="contact" 
            title="Let's Work Together"
            className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50"
        >
            <Container className="text-center">
                <div className="mb-12">
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                        Ready to collaborate? Choose your preferred platform to get in touch. 
                        I'm always excited to discuss new projects, opportunities, and innovative ideas.
                    </p>
                </div>
                <Grid 
                    cols={1}
                    responsive={{
                        sm: 2,
                        md: 2,
                        lg: 3
                    }}
                    gap={8}
                    className="p-6 mt-8 mb-12 place-items-center max-w-6xl mx-auto"
                >
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
                </Grid>
            </Container>
        </Section>
    );
}

export default Contact;
