import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";

function App() {
  // Inside your component
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
  fetch("https://vercel-demo-web-backend.onrender.com/api/health")
    .then(r => {
      if (!r.ok) throw new Error("not ok");
      return r.json();
    })
    .then(() => setBackendStatus("Backend LIVE"))
    .catch(() => setBackendStatus("Checking... (waking up)"));
}, []);
const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                TechBit
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Features
              </a>
              <a
                href="#"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Contact
              </a>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
  onClick={async () => {
    try {
      const res = await fetch(
        "https://vercel-demo-web-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Krishi",
            email: "krishi@example.com",
            message: "Hello from Vercel frontend!",
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} – ${text.substring(0, 100)}`);
      }

      const data = await res.json();
      alert("SUCCESS! Backend Response:\n\n" + JSON.stringify(data, null, 2));
    } catch (e) {
      alert("ERROR: " + e.message);
    }
  }}
  className="mt-6 px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition font-semibold"
>
  Test Backend Connection
</button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
  Status: <span className="font-bold text-green-600">{backendStatus}</span>
</div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 mr-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Features
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white">
            Build Amazing Things
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A simple, modern, and responsive landing page built with React and
            Tailwind CSS. Perfect for learning and deploying to Vercel.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose TechBit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fast", desc: "Blazing fast performance with Vite" },
              { title: "Responsive", desc: "Works perfectly on all devices" },
              { title: "Modern", desc: "Built with latest React & Tailwind" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 TechBit. Made for learning. Deployed on Vercel.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
