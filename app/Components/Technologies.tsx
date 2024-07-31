import React from 'react';
import { motion } from 'framer-motion';
import {
  SiFirebase,
  SiReact,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiLinux,
  SiNodedotjs,
  SiTensorflow,
  SiArduino,
} from 'react-icons/si';

const skills = [
  { name: 'Firebase', level: '70%', icon: SiFirebase },
  { name: 'React', level: '80%', icon: SiReact },
  { name: 'Python', level: '50%', icon: SiPython },
  { name: 'PostgreSQL', level: '40%', icon: SiPostgresql },
  { name: 'MySQL', level: '60%', icon: SiMysql },
  { name: 'Linux', level: '70%', icon: SiLinux },
  { name: 'Node.js', level: '60%', icon: SiNodedotjs },
  { name: 'ML&IoT', level: '50%', icon: SiTensorflow, altIcon: SiArduino },
];

const SkillMatrix = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Skill Matrix</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Technical Proficiencies
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A representation of my expertise in various technologies and skills.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-2">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="relative flex items-center"
                whileHover={{ scale: 1.05, originX: 0.5, originY: 0.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <dt className="flex items-center">
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <skill.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      {skill.altIcon && (
                        <skill.altIcon className="h-6 w-6 text-white ml-1" aria-hidden="true" />
                      )}
                    </motion.div>
                  </div>
                  <span className="ml-16 text-base font-semibold leading-7 text-gray-900">
                    {skill.name}
                  </span>
                </dt>
                <dd className="ml-16 mt-2 w-full">
                  <div className="h-2 rounded-full bg-gray-300">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                  <span className="block text-right text-sm text-gray-600">{skill.level}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
