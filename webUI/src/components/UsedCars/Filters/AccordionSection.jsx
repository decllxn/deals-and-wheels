import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-semibold">{title}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && <div className="mt-4">{children}</div>}
      <hr style={{ borderColor: 'var(--border-color)' }} className="my-4" />
    </div>
  );
};

export default AccordionSection;