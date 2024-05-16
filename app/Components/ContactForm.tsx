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

  export default ContactForm;