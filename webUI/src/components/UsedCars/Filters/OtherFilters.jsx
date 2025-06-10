import React, { useState } from 'react';
import AccordionSection from './AccordionSection';

const RangeFilter = ({ label, min, max, step = 1, value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium">{label}</label>
    <div className="flex items-center justify-between mb-2 text-sm">
      <span>{value[0]}</span>
      <span>{value[1]}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value[0]}
      onChange={e => onChange([Number(e.target.value), value[1]])}
      className="w-full mb-1"
    />
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value[1]}
      onChange={e => onChange([value[0], Number(e.target.value)])}
      className="w-full"
    />
  </div>
);

const CheckboxPill = ({ label, checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`px-3 py-1 rounded-full border transition 
      ${checked 
        ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' 
        : 'bg-transparent text-[var(--text-color)] border-[var(--border-color)]'}`}
  >
    {label}
  </button>
);

const OtherFilters = () => {
  const [year, setYear] = useState([2010, 2024]);
  const [price, setPrice] = useState([5000, 100000]);
  const [mileage, setMileage] = useState([0, 200000]);

  const [fuel, setFuel] = useState({
    Petrol: false,
    Diesel: false,
    Hybrid: false,
    Electric: false,
  });

  const [transmission, setTransmission] = useState({
    Automatic: false,
    Manual: false
  });

  const [body, setBody] = useState({
    Sedan: false, SUV: false, Hatchback: false, Coupe: false, Pickup: false, Van: false
  });

  const [seller, setSeller] = useState({
    Dealer: false,
    'Private Seller': false
  });

  const [condition, setCondition] = useState({
    New: false,
    Used: false,
    'Certified Pre-Owned': false
  });

  return (
    <>
      <AccordionSection title="Year">
        <RangeFilter label="Year Range" min={2000} max={2024} value={year} onChange={setYear} />
      </AccordionSection>

      <AccordionSection title="Price ($)">
        <RangeFilter label="Price Range" min={1000} max={100000} step={500} value={price} onChange={setPrice} />
      </AccordionSection>

      <AccordionSection title="Mileage (KM)">
        <RangeFilter label="Mileage" min={0} max={300000} step={1000} value={mileage} onChange={setMileage} />
      </AccordionSection>

      <AccordionSection title="Fuel Type">
        <div className="flex flex-wrap gap-2">
          {Object.keys(fuel).map(type => (
            <CheckboxPill 
              key={type} 
              label={type} 
              checked={fuel[type]} 
              onChange={(val) => setFuel(prev => ({ ...prev, [type]: val }))}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Transmission">
        <div className="flex flex-wrap gap-2">
          {Object.keys(transmission).map(type => (
            <CheckboxPill 
              key={type} 
              label={type} 
              checked={transmission[type]} 
              onChange={(val) => setTransmission(prev => ({ ...prev, [type]: val }))}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Body Type">
        <div className="flex flex-wrap gap-2">
          {Object.keys(body).map(type => (
            <CheckboxPill 
              key={type} 
              label={type} 
              checked={body[type]} 
              onChange={(val) => setBody(prev => ({ ...prev, [type]: val }))}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Seller Type">
        <div className="flex flex-wrap gap-2">
          {Object.keys(seller).map(type => (
            <CheckboxPill 
              key={type} 
              label={type} 
              checked={seller[type]} 
              onChange={(val) => setSeller(prev => ({ ...prev, [type]: val }))}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Condition">
        <div className="flex flex-wrap gap-2">
          {Object.keys(condition).map(type => (
            <CheckboxPill 
              key={type} 
              label={type} 
              checked={condition[type]} 
              onChange={(val) => setCondition(prev => ({ ...prev, [type]: val }))}
            />
          ))}
        </div>
      </AccordionSection>
    </>
  );
};

export default OtherFilters;