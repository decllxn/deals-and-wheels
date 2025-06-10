import React from 'react';
import HeroSection from './HeroSection';
import ContactOptions from './ContactOptions';
import ContactForm from './ContactForm';
import FAQSection from './FAQSection';
import SocialMediaLinks from './SocialMediaLinks';
import Testimonials from './Testimonials';

const Contact = () => {
  return (
    <div>
      <HeroSection />
      <div>
        <ContactOptions />
        <ContactForm />
        <FAQSection />
        <SocialMediaLinks />
        <Testimonials />
      </div>
    </div>
  );
};

export default Contact;