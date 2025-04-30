import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Smile,
  Palette,
  Box,
  Lock,
  Shield,
  NotepadTextIcon,
} from "lucide-react";

const features = [
  {
    name: "Mood-Aware Conversations",
    icon: <Smile className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Emotionally Intelligent AI",
    icon: <Heart className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Dynamic Theming Based on Emotions",
    icon: <Palette className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Reflective Journaling & Mindfulness Loops",
    icon: <NotepadTextIcon className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Self-Care Toolbox (Focus, Breathwork, Motivation)",
    icon: <Box className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Offline Mode for Core Features",
    icon: <Lock className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Encrypted and Private by Design",
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
  },
];

const testimonials = [
  {
    name: "Aman Ahmed",
    quote:
      "Serava helped me navigate tough days with gentle support. It truly understands how I feel.",
  },
  {
    name: "Suleman",
    quote:
      "The mood-based UI is amazing. I love how the app adapts to my emotions.",
  },
];

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#faf5f8] text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center lg:items-start justify-center text-center lg:text-start relative bg-[url(/images/bg.jpg)] bg-cover bg-no-repeat bg-center">
        <div className="flex flex-col items-start px-6 sm:px-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold mb-4 text-[#523c74] drop-shadow-xl"
          >
            Serava
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold mb-4 text-[#fff] drop-shadow-xl"
          >
            Talk. Feel. Heal.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-2xl max-w-xl mb-10 text-white font-bold"
          >
            Serava adapts to your emotions and helps you grow - one mindful
            moment at a time.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#features"
              className="bg-[#7265b3] text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-[#8878d5] transition"
            >
              Explore Features
            </motion.a>
            <button
              // onClick={() => setShowPopup(true)}
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.mohdaqdasasim.serava",
                  "_blank"
                )
              }
              className="inline-block focus:outline-none cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-14 mx-auto"
              />
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-[#0004] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#e6d0ea] rounded-2xl shadow-2xl p-8 max-w-md text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold mb-4 text-[#523c74] drop-shadow-xl"
              >
                App Not Released Yet
              </motion.h1>
              <p className="text-gray-700 font-bold mb-6">
                The Serava app is currently in testing. We'd love for you to
                become a tester and help shape its future.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://forms.gle/N9kXXdxHBB4494Nx8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7265b3] text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-[#8878d5] transition"
              >
                Become a Tester
              </motion.a>
              <button
                onClick={() => setShowPopup(false)}
                className="block w-full mt-8 cursor-pointer text-sm text-gray-500 text-center hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl text-center font-extrabold mb-4 text-[#523c74] drop-shadow-xl">
          How Serava Supports You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-[#eee6f9] border border-indigo-100 p-6 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon} {/* Displaying the icon */}
                <h3 className="text-lg font-semibold text-[#523c74] ml-4">
                  {feature.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Experience support that evolves with your emotions, always
                empathetic, always present.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl text-center font-extrabold mb-12 text-[#523c74] drop-shadow-xl">
          App Preview
        </h2>

        {/* Promo Video */}
        <div className="mb-16 flex justify-center">
          <div className="w-full sm:w-[560px] h-[315px]">
            <iframe
              className="w-full h-full rounded-xl shadow-lg border border-indigo-100"
              src="https://www.youtube.com/embed/ubrHCBv4zXQ"
              title="Serava Promo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {["1.png", "2.png", "3.png", "4.png"].map((file, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-xl border border-indigo-100"
            >
              <img
                src={`/screenshots/${file}`}
                alt={`Screenshot ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 px-6 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl text-center font-extrabold mb-4 text-[#523c74] drop-shadow-xl">
          What Our Testers Say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map(({ name, quote }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl bg-[#eee6f9] border border-indigo-100 p-6 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <p className="italic text-gray-700 mb-4">“{quote}”</p>
              <p className="font-semibold text-[#523c74]">— {name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left px-6 py-8 border-t border-indigo-300 gap-4 sm:gap-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Serava Logo" className="w-12" />
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm text-indigo-600 font-medium">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>

        {/* App Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="inline-block focus:outline-none cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-12 mx-auto"
          />
        </button>
      </footer>
    </div>
  );
}
