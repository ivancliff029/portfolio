import { useState, FormEvent } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
     
    console.log("email sent");
     
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2"><strong>Email:</strong> odekeivancliff@gmail.com</p>
        <p className="mb-2"><strong>Phone:</strong> +256778054598</p>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold cursor-pointer mt-4"
        onClick={() => setShowModal(true)}
      >
        Send Message
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Compose Message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded mb-2 w-full"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="border border-gray-300 p-2 rounded mb-2 w-full"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className="border border-gray-300 p-2 rounded mb-2 w-full"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border border-gray-300 p-2 rounded mb-2 w-full"
                rows={4}
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Email sent successfully!</p>}
              <div className="flex justify-end">
                <button
                  className={`bg-blue-500 text-white py-2 px-4 rounded-full font-semibold cursor-pointer mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full font-semibold cursor-pointer mt-4 ml-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
