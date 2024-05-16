import { SiPython, SiJavascript, SiC, SiPostgresql } from 'react-icons/si';

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

export default Technologies;