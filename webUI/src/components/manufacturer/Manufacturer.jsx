import { ManufacturerHero } from './ManufacturerHero';
import { AboutManufacturer } from './AboutManufacturer';
import { CarListingsSection } from './listings/CarListingsSection';
import { ReviewArticles } from "./ReviewArticles";
import { News } from './News';
import { FAQ } from './FAQ';


export default function Manufacturer() {
  return (
    <div className="p-6 space-y-16 max-w-7xl mx-auto mt-30">
      <ManufacturerHero />
      <AboutManufacturer />
      <CarListingsSection />
      <ReviewArticles />
      <News  />

      <FAQ
        faqs={[
          {
            question: 'What makes Ferrari different from other sports car brands?',
            answer: 'Ferrari combines legendary racing heritage, bespoke Italian craftsmanship, and uncompromising performance, making it a symbol of prestige and speed.',
          },
          {
            question: 'Can I customize my Ferrari?',
            answer: 'Yes! Ferrari offers the “Tailor Made” program, allowing customers to personalize nearly every aspect of their vehicle — from materials to paint colors.',
          },
          {
            question: 'How often does a Ferrari need servicing?',
            answer: 'Ferrari vehicles typically require annual service, with some models offering up to 7 years of complimentary maintenance.',
          },
          {
            question: 'Are all Ferraris hand-built?',
            answer: 'Yes. Every Ferrari is meticulously assembled by skilled artisans in Maranello, Italy, with attention to detail at every stage.',
          },
          {
            question: 'How fast is the Ferrari SF90 Stradale?',
            answer: 'The SF90 Stradale goes from 0–60 mph in just 2.5 seconds and reaches a top speed of 211 mph — thanks to its hybrid V8 powertrain.',
          },
        ]}
      />
    </div>
  );
}