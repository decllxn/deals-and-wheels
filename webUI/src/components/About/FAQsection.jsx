import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle active index
  };

  const faqData = [
    {
      question: "How does the car auction process work?",
      answer: "Our car auction process is straightforward. Sellers list their cars, set a starting price, and buyers can bid. The auction runs for a set time, and the highest bid wins the car. The process is transparent, and all bids are public.",
    },
    {
      question: "Is there a fee to sell my car?",
      answer: "Yes, there is a small fee for listing your car in our auctions. However, the fee is significantly lower than traditional methods of selling. Plus, we offer premium listings for increased visibility.",
    },
    {
      question: "How do I know the auction winner?",
      answer: "Once the auction ends, the winning bid will be displayed, and the highest bidder will be notified via email and through the platform. The transaction will then be processed securely.",
    },
    {
      question: "Can I buy cars directly from the platform?",
      answer: "Yes! You can browse the listings of cars available for sale, view details, and either place a bid in an auction or buy the car outright if the seller has set a fixed price.",
    },
    {
      question: "How do you ensure the cars are legitimate?",
      answer: "We perform thorough verification of all cars listed on our platform. Sellers must submit detailed documents, including ownership records and maintenance history. Additionally, buyers can request vehicle inspections through our partnered services.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept a variety of payment methods, including credit/debit cards, bank transfers, and online payment services like PayPal. All transactions are secured and handled through our trusted payment gateways.",
    },
    {
      question: "What happens if the car I want is sold out?",
      answer: "If the car you’re interested in is sold, you’ll be notified, and you can sign up to receive alerts when similar cars are listed. You can also explore other available vehicles on our platform.",
    },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300">
              <div
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800">{item.question}</h3>
                <span className="text-blue-500 text-2xl">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-[2000px] pb-4" : "max-h-0 pb-0"
                }`}
              >
                {activeIndex === index && (
                  <div className="pl-6 text-lg text-gray-700">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;