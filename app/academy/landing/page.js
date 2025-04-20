"use client"
import Navbar from "@/app/Components/Navbar";
import { useRouter } from 'next/navigation';

const AcademyLanding = () => {
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="relative w-full h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/img/ivans-academy.jpg')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-80"></div>

                {/* Text content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Ivan's Academy</h1>
                    <p className="text-lg md:text-xl max-w-2xl">
                        Unlock your coding potential with interactive lessons, fun quizzes, and real-world challenges designed just for you.
                    </p>
                    <button className="mt-6 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={()=>router.push('/academy/getstartedform')}
                    >
                        Get Started
                    </button>
                </div>
                <div className="flex justify-center mt-2">
                    
                </div>
            </div>
            <WhatToExpect />
            <HowItWorks />
            <FeaturesSection />
            <LeaderboardPreview />
            <Testimonials />
        </>
    );
};

import { FaCode, FaPuzzlePiece, FaTrophy } from "react-icons/fa";

const WhatToExpect = () => {
  const features = [
    {
      icon: <FaCode className="text-3xl text-blue-600" />,
      title: "Hands-on Coding",
      description: "Practice with real-world code challenges to improve your skills.",
    },
    {
      icon: <FaPuzzlePiece className="text-3xl text-purple-600" />,
      title: "Gamified Learning",
      description: "Fun quizzes and XP-based progress that keep you motivated.",
    },
    {
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      title: "Earn Rewards",
      description: "Climb the leaderboard and win prizes by being consistent.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">What to Expect</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

//leadership board
const mockLeaders = [
    { name: "Asha", xp: 820 },
    { name: "Brian", xp: 760 },
    { name: "Ivan", xp: 700 },
  ];
  
  const LeaderboardPreview = () => (
    <section className="py-12 bg-white dark:bg-gray-800 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Top Learners</h2>
      <ul className="max-w-md mx-auto space-y-3 text-left">
        {mockLeaders.map((user, index) => (
          <li key={index} className="flex justify-between bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded shadow">
            <span className="font-semibold">{user.name}</span>
            <span className="text-blue-600 dark:text-blue-400">{user.xp} XP</span>
          </li>
        ))}
      </ul>
    </section>
  );
  

//testimonials
const Testimonials = () => (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">What Our Learners Say</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <blockquote className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <p className="italic mb-2">“This made coding finally make sense to me!”</p>
          <footer className="text-sm font-medium text-gray-600 dark:text-gray-400">— Asha, 17</footer>
        </blockquote>
        <blockquote className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <p className="italic mb-2">“The leaderboard and XP system keeps me motivated daily.”</p>
          <footer className="text-sm font-medium text-gray-600 dark:text-gray-400">— Brian, 20</footer>
        </blockquote>
      </div>
    </section>
  );
  

//features
const features = [
    "Daily challenges & streaks",
    "XP-based leveling system",
    "Ad-based life refill system",
    "Leaderboard & monthly prizes",
    "Mobile & web access",
  ];
  
  const FeaturesSection = () => (
    <section className="py-12 bg-white dark:bg-gray-800 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Core Features</h2>
      <ul className="max-w-3xl mx-auto space-y-3 text-gray-700 dark:text-gray-300 text-lg list-disc list-inside">
        {features.map((feature, i) => <li key={i}>{feature}</li>)}
      </ul>
    </section>
  );  

//how it works
import { FaUserPlus, FaKeyboard, FaStar, FaGift } from "react-icons/fa";

const steps = [
  { icon: <FaUserPlus />, text: "Create an account" },
  { icon: <FaKeyboard />, text: "Complete lessons & quizzes" },
  { icon: <FaStar />, text: "Earn XP & level up" },
  { icon: <FaGift />, text: "Win real rewards!" }
];

const HowItWorks = () => (
  <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
    <h2 className="text-3xl font-bold mb-6 dark:text-white">How It Works</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center space-y-2">
          <div className="text-4xl text-blue-500">{step.icon}</div>
          <p className="font-medium dark:text-gray-300">{step.text}</p>
        </div>
      ))}
    </div>
  </section>
);


export default AcademyLanding;
