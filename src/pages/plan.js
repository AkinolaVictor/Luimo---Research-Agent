import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

const INITIAL_PLAN = {
  question: {
    id: "q1",
    text: "Since you're already comfortable with Next.js, I'd like to understand if you want to build this as a full-stack application with an integrated database, or a client-side only prototype with mock data.",
  },
  planDescription: "Here's the plan I'll follow to arrive at an answer for the question.",
  planItems: [
    { id: "item1", text: "Analyze the requirements for a full-stack Next.js application including database schema design." },
    { id: "item2", text: "Evaluate the best database options (MongoDB vs PostgreSQL) based on the data structure." },
    { id: "item3", text: "Outline the API routes and server-side logic for handling research data." },
    { id: "item4", text: "Design the integrated authentication flow for user roles." },
  ],
};

const ALTERNATE_PLANS = [
  [
    "Focus on a lean client-side architecture using LocalStorage for persistence.",
    "Design a modular state management system using Redux Toolkit for mock data.",
    "Create a comprehensive set of mock API responses to simulate server behavior.",
    "Implement a simple export/import feature for saving research results as JSON."
  ],
  [
    "Research an edge-computing approach using Next.js Middleware for data fetching.",
    "Implement a serverless database strategy using Vercel KV or Supabase.",
    "Develop a dynamic UI that adapts based on the detected user role.",
    "Optimize the data fetching pipeline for minimal latency."
  ]
];

export default function Plan() {
  const [planData, setPlanData] = useState(INITIAL_PLAN);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const router = useRouter();

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const nextIndex = (planIndex + 1) % ALTERNATE_PLANS.length;
    setPlanIndex(nextIndex);
    setPlanData(prev => ({
      ...prev,
      planItems: ALTERNATE_PLANS[nextIndex].map((text, i) => ({ id: `item${i}`, text }))
    }));

    setIsRegenerating(false);
  };

  const handleContinue = async () => {
    setIsContinuing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsContinuing(false);
    router.push('/result');
  };

  return (
    <Layout>
      <Head>
        <title>Luimo — Research Plan</title>
      </Head>

      <div className="w-full max-w-[600px] mx-auto flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Question Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">Question</h2>
          <p className="text-sm md:text-base text-[#d0d0d0] leading-relaxed max-w-[90%]">
            {planData.question.text}
          </p>
        </section>

        {/* Plan Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-white">Plan</h2>
          <p className="text-sm text-[#b0b0b0] leading-relaxed">
            {planData.planDescription}
          </p>

          <Card className="space-y-4 relative overflow-hidden">
            {planData.planItems.map((item, index) => (
              <div
                key={item.id}
                className="text-sm text-[#d0d0d0] leading-relaxed border-b border-[#3a3a3a] pb-3 last:border-0 last:pb-0"
              >
                {item.text}
              </div>
            ))}

            {isRegenerating && (
              <div className="absolute inset-0 bg-[#4a4a4a]/50 backdrop-blur-sm flex items-center justify-center">
                <div className="flex items-center space-x-2 text-white font-medium">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.918l1-1.622z"></path>
                  </svg>
                  <span>Regenerating Plan...</span>
                </div>
              </div>
            )}
          </Card>
        </section>

        <div className="flex flex-col space-y-3">
          <Button
            variant="secondary"
            onClick={handleRegenerate}
            isLoading={isRegenerating}
          >
            I don't like this plan, regenerate another plan
          </Button>

          <Button
            onClick={handleContinue}
            isLoading={isContinuing}
          >
            Continue
          </Button>
        </div>
      </div>
    </Layout>
  );
}
