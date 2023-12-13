import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Image from 'next/image';

const Technologies = () => {
  return (
    <div className="mt-12 text-center mb-12">
      <h2 className="text-2xl font-bold mb-4">Technologies I Use</h2>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <Image
            src="https://banner2.cleanpng.com/20180422/hrq/kisspng-javascript-web-development-logo-script-clipart-5adc4c1a932f97.7568863815243868426029.jpg"
            alt="ReactJS"
            className="w-24 h-24 mr-2"
            width={800}
            height={500}
          />
          <span>JavaScript</span>
        </div>
        <div className="flex items-center">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/012/697/295/large_2x/3d-python-programming-language-logo-free-png.png"
            alt="Python"
            className="w-24 h-24 mr-2"
            width={800}
            height={500}
          />
          <span>Python</span>
        </div>
        <div className="flex items-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/150px-Tux.svg.png"
            alt="Linux"
            className="w-24 h-24 mr-2"
            width={800}
            height={500}
          />
          <span>Linux</span>
        </div>
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-200 text-gray-800">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>

      <div className="flex items-center mb-8">
        <div className="mr-4" style={{ width: '133px' }}>
          <Image
            src="/img/ivan cliff.jpeg"
            alt="Your Story"
            className="rounded-lg shadow-md w-full h-auto"
            width={133}
            height={133}
          />
        </div>

        <div className="text-center" style={{ width: '400px' }}>
          <p className="text-lg">
            My name is Odeke Ivan, I&apos;m passionate about technology and how things work. I have been coding for about 5 years now, I&apos;m a senior developer and open-minded towards project development.
          </p>
        </div>
      </div>
    </div>
  );
};
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white bg-cover bg-center relative" style={{ backgroundImage: `url('/img/banner.jpg')` }}>
        <h1 className="text-4xl font-bold mb-4">Welcome to My World</h1>
        <p className="text-lg">
          You are  either a 0 or a 1
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

      <AboutMe />
      <Footer />
    </>
  );
};

export default Home;
