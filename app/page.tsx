import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { SiPython, SiJavascript, SiC, SiPostgresql } from 'react-icons/si';
import { AboutMe } from './AboutMe';

const features = [
  {
    name: 'Python',
    description:
      'Pythons versatility and readability enable efficient development across various domains, despite moderate speed',
    icon: SiPython,
  },
  {
    name: 'Javascript',
    description:
      'JavaScripts client-side execution streamlines web development, balancing efficiency with browser compatibility.',
    icon: SiJavascript,
  },
  {
    name: 'PostgreSQL',
    description:
      'PostgreSQLs robustness and SQL compliance ensure efficient handling of complex data and transactions.',
    icon: SiPostgresql,
  },
  {
    name: 'C',
    description:
      'Cs low-level control and optimization ensure efficient performance, ideal for resource-intensive applications.',
    icon: SiC,
  },
];

const Technologies = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Work with the best engineer in town
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Technologies I use
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2"><strong>Email:</strong> odekeivancliff@gmail.com</p>
        <p className="mb-2"><strong>Phone:</strong> +256778054598</p>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold cursor-pointer mt-4">
        Send Message
      </button>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white bg-cover bg-center relative" style={{ backgroundImage: `url('/img/banner.jpg')` }}>
        <h1 className="text-4xl font-bold mb-4">Welcome to My World</h1>
        <p className="text-lg">
          You are either a 0 or a 1
        </p>
        <div className="mt-8">
          <a
            href="/portfolio"
            className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold"
          >
            View Portfolio
          </a>
        </div>
      </div>
      <Technologies />
      <AboutMe />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
