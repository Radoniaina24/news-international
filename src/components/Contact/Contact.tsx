"use client";

import React from "react";
import {
  User,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Building2,
  MessageSquare,
} from "lucide-react";
import { useFormik } from "formik";
import { FormValues, InputField } from "../Form/InputField";
import * as Yup from "yup";
import { TextAreaField } from "../Form/TextAreaField";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  // Schéma de validation
  const validationSchema = Yup.object({
    lastName: Yup.string().required("Ce champ est requis"),
    firstName: Yup.string().required("Ce champ est requis"),
    subject: Yup.string().required("Ce champ est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("Ce champ est requis"),
    message: Yup.string().required("Ce champ est requis"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      lastName: "",
      firstName: "",
      subject: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const toastId = toast.loading("Envoi en cours...");
      try {
        const fullname = values.lastName + " " + values.firstName;
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullname,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }),
        });

        if (!response.ok) throw new Error("Erreur serveur");

        toast.success("Votre message a bien été envoyé.", { id: toastId });
        resetForm();
        // console.log(values);
      } catch (error) {
        console.log(error);
        toast.error("Une erreur est survenue. Veuillez réessayer.", {
          id: toastId,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen py-5 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}

      <Toaster position="top-center" />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-10">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    Contactez-nous
                  </h2>
                  <p className="text-slate-600">
                    Merci de bien vouloir compléter le formulaire ci-dessous.
                    Votre demande sera transmise à notre équipe, qui
                    s&apos;engage à vous apporter une réponse personnalisée et
                    professionnelle dans les plus brefs délais.
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputField
                        name="lastName"
                        label="Nom"
                        icon={User}
                        placeholder="Votre nom"
                        formik={formik}
                      />
                      <InputField
                        name="firstName"
                        label="Prénom"
                        icon={User}
                        placeholder="Votre prénom"
                        formik={formik}
                      />
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputField
                        name="subject"
                        label="Sujet"
                        icon={MessageSquare} // ou FileText, Edit3
                        placeholder="Entrez le sujet de votre message"
                        formik={formik}
                      />

                      <InputField
                        name="email"
                        label="Email"
                        type="email"
                        icon={Mail}
                        placeholder="exemple@gmail.com"
                        formik={formik}
                      />
                    </div>

                    {/* Message Field */}
                    <TextAreaField
                      name="message"
                      label="Message"
                      placeholder="Écrivez votre message ici..."
                      icon={MessageCircle}
                      formik={formik}
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className={`w-full bg-gradient-to-r text-sm from-blue-600 to-red-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl transition-all duration-300 transform flex items-center justify-center space-x-3 ${
                        formik.isSubmitting
                          ? "opacity-70 cursor-not-allowed "
                          : "hover:shadow-2xl  hover:from-blue-700 hover:to-red-600 "
                      }`}
                    >
                      {formik.isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Envoyer le message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 h-fit sticky top-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">
                  Nos coordonnées
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Adresse email
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        redaction@gateofafrica.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Téléphone
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        +230 5 782 8567 | +261 32 05 777 47
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Siège social
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Gate Africa Group Lot II A 105 E Nanisana Iadiambola
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        Antananarivo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
