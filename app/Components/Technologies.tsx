import React from 'react';
import { motion } from 'framer-motion';
import { SiFirebase, SiPython, SiNodedotjs, SiNextdotjs } from 'react-icons/si';

const features = [
  {
    name: 'Firebase',
    description:
      'Firebase offers a comprehensive suite of cloud-based tools for rapid app development, real-time database management, and seamless authentication.',
    icon: SiFirebase,
  },
  {
    name: 'Python',
    description:
      'Pythons versatility, readability, and extensive libraries make it ideal for various applications, from web development to data science and AI.',
    icon: SiPython,
  },
  {
    name: 'Node.js',
    description:
      'Node.js enables server-side JavaScript execution, allowing for scalable and efficient back-end development with a vast ecosystem of packages.',
    icon: SiNodedotjs,
  },
  {
    name: 'Next.js',
    description:
      'Next.js simplifies React development with server-side rendering, automatic code splitting, and optimized performance for production-ready applications.',
    icon: SiNextdotjs,
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
          <p className="mt-6 text-lg leading-8 text-gray-600">Technologies I use</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                className="relative pl-16"
                whileHover={{ scale: 1.1, originX: 0.5, originY: 0.5 }}
                whileTap={{ scale: 0.9 }}
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </motion.div>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Technologies;