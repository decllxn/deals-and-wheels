import React from 'react';
import ContactHero from './ContactHero';
import ContactInfoCards from './ContactInfoCards';
import ContactForm from './ContactForm';
import SupportLinks from './SupportLinks';


const Contact = () => {
  return (
    <div className='mt-20'>
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <SupportLinks />
    </div>
  );
};

export default Contact;