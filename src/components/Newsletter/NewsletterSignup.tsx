"use client";
import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse email invalide")
    .required("L’email est requis"),
  consent: Yup.boolean().oneOf(
    [true],
    "Vous devez accepter la politique de confidentialité"
  ),
});

const NewsletterSignup: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const topics = [
    "Politique",
    "Économie",
    "Sport",
    "Technologie",
    "Culture",
    "Tourisme",
  ];

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Restez Informé
          </h2>
          <p className="text-md text-gray-600">
            Recevez les dernières actualités et analyses directement dans votre
            boîte mail
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {isSubscribed ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Inscription réussie !
              </h3>
              <p className="text-gray-600">
                Vous recevrez bientôt notre première newsletter.
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{
                email: "",
                topics: [] as string[],
                consent: false,
              }}
              validationSchema={NewsletterSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setLoading(true);
                  const res = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });

                  if (!res.ok) throw new Error("Erreur API");

                  const data = await res.json();
                  if (data.success) {
                    setIsSubscribed(true);
                    resetForm();
                    setTimeout(() => setIsSubscribed(false), 3000);
                  } else {
                    alert("Échec de l’inscription ❌");
                  }
                } catch (err) {
                  console.error("Erreur d’inscription:", err);
                  alert("Une erreur est survenue. Réessayez plus tard.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Champ email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* Sujets d’intérêt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Sujets d&apos;intérêt (optionnel)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            if (values.topics.includes(topic)) {
                              setFieldValue(
                                "topics",
                                values.topics.filter((t) => t !== topic)
                              );
                            } else {
                              setFieldValue("topics", [
                                ...values.topics,
                                topic,
                              ]);
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            values.topics.includes(topic)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consentement */}
                  <div className="flex items-center text-sm text-gray-500">
                    <Field
                      type="checkbox"
                      name="consent"
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>J&apos;accepte de recevoir des emails </span>
                  </div>
                  <ErrorMessage
                    name="consent"
                    component="p"
                    className="mt-2 text-sm text-red-600"
                  />

                  {/* Bouton */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Envoi en cours..."
                      : "S'abonner à la Newsletter"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
