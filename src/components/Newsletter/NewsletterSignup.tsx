"use client";
import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    "Politique",
    "Économie",
    "Sport",
    "Technologie",
    "Culture",
    "Santé",
    "Environnement",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <section className="bg-blue-50 dark:bg-blue-900/20 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Restez Informé
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Recevez les dernières actualités et analyses directement dans votre
            boîte mail
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          {isSubscribed ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Inscription réussie !
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Vous recevrez bientôt notre première newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Sujets d&apos;intérêt (optionnel)
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTopics.includes(topic)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <input
                  type="checkbox"
                  required
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  J&apos;accepte de recevoir des emails de NewsGlobe et
                  j&apos;ai lu la{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    politique de confidentialité
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                S&apos;abonner à la Newsletter
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Plus de 50,000 lecteurs nous font confiance • Pas de spam •
            Désabonnement facile
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
