import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiAmazonaws,
  SiMongodb,
  SiRedis,
  SiGooglecloud,
  SiFlutter,
} from 'react-icons/si';

const SkillMatrix = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovering, setIsHovering] = useState(null);

  // Enhanced and categorized skills data
  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      skills: [
        { name: 'React', level: 80, icon: SiReact, yearStarted: 2019 },
        { name: 'JavaScript', level: 85, icon: SiJavascript, yearStarted: 2018 },
        { name: 'TypeScript', level: 70, icon: SiTypescript, yearStarted: 2020 },
        { name: 'Next.js', level: 75, icon: SiNextdotjs, yearStarted: 2020 },
        { name: 'Tailwind CSS', level: 80, icon: SiTailwindcss, yearStarted: 2021 },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      color: 'bg-gradient-to-r from-emerald-500 to-green-600',
      skills: [
        { name: 'Node.js', level: 60, icon: SiNodedotjs, yearStarted: 2022 },
        { name: 'Django-Python', level: 50, icon: SiPython, yearStarted: 2018 },
        { name: 'PostgreSQL', level: 40, icon: SiPostgresql, yearStarted: 2020 },
        { name: 'MySQL', level: 60, icon: SiMysql, yearStarted: 2018 },
        { name: 'MongoDB', level: 55, icon: SiMongodb, yearStarted: 2019 },
      ]
    },
    {
      id: 'devops',
      name: 'DevOps & Infrastructure',
      color: 'bg-gradient-to-r from-orange-500 to-amber-600',
      skills: [
        { name: 'Linux', level: 70, icon: SiLinux, yearStarted: 2016 },
        { name: 'Git', level: 75, icon: SiGit, yearStarted: 2018 },
        { name: 'Docker', level: 45, icon: SiDocker, yearStarted: 2021 },
        { name: 'AWS', level: 40, icon: SiAmazonaws, yearStarted: 2021 },
        { name: 'Firebase', level: 70, icon: SiFirebase, yearStarted: 2019 },
      ]
    },
    {
      id: 'specialized',
      name: 'Specialized',
      color: 'bg-gradient-to-r from-purple-500 to-violet-600',
      skills: [
        { name: 'Machine Learning', level: 50, icon: SiTensorflow, yearStarted: 2020 },
        { name: 'IoT', level: 55, icon: SiArduino, yearStarted: 2019 },
        { name: 'Redis', level: 40, icon: SiRedis, yearStarted: 2022 },
        { name: 'GCP', level: 35, icon: SiGooglecloud, yearStarted: 2022 },
        { name: 'Flutter', level: 45, icon: SiFlutter, yearStarted: 2021 },
      ]
    },
  ];

  // Get all skills for "all" category
  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.id,
      categoryColor: category.color
    }))
  );

  // Filter skills based on active category
  const displayedSkills = activeCategory === 'all' 
    ? allSkills 
    : skillCategories.find(cat => cat.id === activeCategory)?.skills.map(skill => ({
        ...skill,
        category: activeCategory,
        categoryColor: skillCategories.find(cat => cat.id === activeCategory).color
      })) || [];

  // Determine years of experience
  const getCurrentYear = () => new Date().getFullYear();
  const getYearsExperience = yearStarted => {
    const years = getCurrentYear() - yearStarted;
    return years <= 1 ? '< 1 year' : `${years} years`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Expertise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Technical Proficiency Matrix
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A comprehensive overview of my technical skills and experience across different domains.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="mx-auto mt-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-md'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? `${category.color.replace('bg-gradient-to-r', '')} text-white shadow-md`
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="mx-auto mt-10 max-w-5xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  onHoverStart={() => setIsHovering(skill.name)}
                  onHoverEnd={() => setIsHovering(null)}
                  className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md"
                >
                  {/* Category indicator band */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${skill.categoryColor}`}></div>
                  
                  <div className="flex items-center mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${skill.categoryColor} text-white`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <skill.icon className="h-6 w-6" aria-hidden="true" />
                      </motion.div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getYearsExperience(skill.yearStarted)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Skill level bar */}
                  <div className="mt-4">
                    <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                        className={`absolute top-0 left-0 h-full ${skill.categoryColor}`}
                      />
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Proficiency</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-300">{skill.level}%</span>
                    </div>
                  </div>

                  {/* Skill details on hover */}
                  <AnimatePresence>
                    {isHovering === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Working with {skill.name} since {skill.yearStarted}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillMatrix;