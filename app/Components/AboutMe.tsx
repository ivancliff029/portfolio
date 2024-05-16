import Image from "next/image";

const AboutMe = () => {
    return (
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Image div */}
          <div className="md:w-1/3 bg-white rounded-lg shadow-md p-8">
            <Image
              src="/img/ivan cliff.jpeg"
              alt="Your Story"
              className="rounded-lg"
              width={200}
              height={200}
            />
          </div>
          
          {/* Text div */}
          <div className="md:w-2/3 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg">
              My name is Odeke Ivan. I'm passionate about technology and how things work. With over 5 years of experience in coding, I'm a senior developer dedicated to creating innovative solutions. I approach project development with an open mind and a commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default AboutMe;