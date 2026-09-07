import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

const MOCK_DATA = {
  mainQuestion: {
    id: "q1",
    text: "Since you're already comfortable with Next.js, I'd like to understand if you want to build this as a full-stack application with an integrated database, or a client-side only prototype with mock data.",
  },
  clarifications: [
    {
      id: "c1",
      text: "Would you like to incorporate a real-time database like MongoDB or PostgreSQL to handle user data and research history?",
      options: [
        { id: "opt1", label: "Yes, I can try" },
        { id: "opt2", label: "Not now, just keep it in mind" },
        { id: "opt3", label: "Complete No" },
      ],
    },
    {
      id: "c2",
      text: "Should the application support multiple user roles, such as an Administrator for managing research tasks and a User for executing them?",
      options: [
        { id: "opt1", label: "Yes, I can try" },
        { id: "opt2", label: "Not now, just keep it in mind" },
        { id: "opt3", label: "Complete No" },
      ],
    },
  ],
};

export default function Clarification() {
  const [formData, setFormData] = useState({
    clarifications: MOCK_DATA.clarifications.map(c => ({ id: c.id, selectedOption: null }))
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRadioChange = (clarificationId, optionId) => {
    setFormData(prev => ({
      ...prev,
      clarifications: prev.clarifications.map(c =>
        c.id === clarificationId ? { ...c, selectedOption: optionId } : c
      )
    }));
  };

  const handleContinue = async () => {
    const allFilled = formData.clarifications.every(c => c.selectedOption !== null);
    if (!allFilled) {
      alert("Please answer all clarification questions to proceed.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    router.push('/plan');
  };

  return (
    <Layout>
      <Head>
        <title>Luimo — Clarifications</title>
      </Head>

      <div className="w-full max-w-[600px] mx-auto flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Question Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">Question</h2>
          <p className="text-sm md:text-base text-[#d0d0d0] leading-relaxed max-w-[500px]">
            {MOCK_DATA.mainQuestion.text}
          </p>
        </section>

        {/* Clarifications Section */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-white">Clarifications</h2>
          <div className="space-y-4">
            {MOCK_DATA.clarifications.map((clarification, index) => (
              <Card key={clarification.id} className="space-y-4">
                <p className="text-sm text-[#d0d0d0] leading-relaxed">
                  {clarification.text}
                </p>
                <div className="space-y-3">
                  {clarification.options.map((option) => {
                    const isSelected = formData.clarifications[index].selectedOption === option.id;
                    return (
                      <label
                        key={option.id}
                        className="flex items-center group cursor-pointer space-x-3"
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name={clarification.id}
                            checked={isSelected}
                            onChange={() => handleRadioChange(clarification.id, option.id)}
                            className="peer appearance-none w-5 h-5 border-2 border-white rounded-full checked:bg-white transition-all duration-200 cursor-pointer"
                          />
                          <div className="absolute w-2 h-2 bg-[#0f0f0f] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                        </div>
                        <span className="text-sm text-[#d0d0d0] group-hover:text-white transition-colors duration-200">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Button
          onClick={handleContinue}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>
    </Layout>
  );
}
