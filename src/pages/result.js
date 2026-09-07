import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Button from '../components/Button';

const MOCK_RESULTS = {
  question: {
    id: "q1",
    text: "Since you're already comfortable with Next.js, I'd like to understand if you want to build this as a full-stack application with an integrated database, or a client-side only prototype with mock data.",
  },
  answer: {
    id: "ans1",
    title: "Answer to Question",
    paragraphs: [
      "Based on your expertise with Next.js and the goal of creating a professional research agent, I highly recommend building this as a full-stack application. This approach ensures that your research data, user preferences, and agent configurations are persisted reliably across sessions.",
      "By utilizing Next.js Server Components and API Routes, you can seamlessly integrate a database like PostgreSQL (via Prisma or Drizzle) to handle complex relational data. This will allow you to implement a robust history feature, enabling users to revisit and refine previous research cycles.",
      "Furthermore, a full-stack architecture provides the necessary infrastructure for asynchronous background tasks, which are critical for deep research agents that may need to perform multiple API calls or long-running data processing tasks without blocking the UI."
    ],
  },
  advantages: {
    id: "adv1",
    title: "Advantages",
    groups: [
      {
        id: "adv_group1",
        items: [
          "Data Persistence: Research results are saved permanently.",
          "Scalability: Easier to add complex features like user authentication.",
          "Performance: Server-side rendering reduces initial load time for large results."
        ]
      },
      {
        id: "adv_group2",
        items: [
          "Professionalism: Demonstrates full-stack engineering capabilities.",
          "Extensibility: Simple to integrate with third-party AI agents and tools.",
          "Control: Full ownership over the data pipeline and storage."
        ]
      }
    ],
  },
  sections: [
    {
      id: "sec1",
      title: "Recommended Tech Stack",
      content: {
        type: "paragraphs",
        items: [
          "Frontend: Next.js 16 with Tailwind CSS for a premium, responsive interface.",
          "Backend: Next.js API Routes (Node.js runtime).",
          "Database: PostgreSQL with Supabase for rapid deployment and scaling.",
          "ORM: Prisma for type-safe database access."
        ]
      }
    },
    {
      id: "sec2",
      title: "Next Steps",
      content: {
        type: "paragraphs",
        items: [
          "1. Define the database schema for research queries and results.",
          "2. Set up the Next.js project structure with a shared components library.",
          "3. Implement the research flow from query to result."
        ]
      }
    }
  ],
};

export default function Result() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLogoSticky, setIsLogoSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsLogoSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate file generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDownloading(false);
    alert("Your research results have been downloaded as a PDF!");
  };

  return (
    <Layout>
      <Head>
        <title>Luimo — Research Results</title>
      </Head>

      <div className="w-full max-w-[650px] mx-auto flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Question Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">Question</h2>
          <p className="text-sm md:text-base text-[#d0d0d0] leading-relaxed">
            {MOCK_RESULTS.question.text}
          </p>
        </section>

        {/* Answer Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Answer to Question</h2>
          <div className="space-y-4">
            {MOCK_RESULTS.answer.paragraphs.map((para, i) => (
              <p key={i} className="text-sm md:text-base text-[#d0d0d0] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Advantages Section */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white">Advantages</h2>
          <div className="space-y-8">
            {MOCK_RESULTS.advantages.groups.map((group, i) => (
              <ul key={group.id} className="space-y-3">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start space-x-3 text-sm md:text-base text-[#d0d0d0] leading-relaxed">
                    <span className="text-white mt-1.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* Additional Sections */}
        {MOCK_RESULTS.sections.map((section) => (
          <section key={section.id} className="space-y-4">
            <h2 className="text-lg font-bold text-white">{section.title}</h2>
            <div className="space-y-4">
              {section.content.items.map((item, i) => (
                <p key={i} className="text-sm md:text-base text-[#d0d0d0] leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Download Section */}
        <div className="flex justify-center pt-10 pb-20">
          <div className="w-full max-w-[400px]">
            <Button
              onClick={handleDownload}
              isLoading={isDownloading}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
