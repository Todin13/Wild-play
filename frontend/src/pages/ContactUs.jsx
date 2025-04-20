import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";


const ContactUs = () => {

  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center text-text">
        <Title variant="page" className="mb-6 text-title">
          Contact Usss
        </Title>
        <p className="text-lg mb-8 text-textMuted">
          Have a project in mind? Want to collaborate? Just feel like saying hi?
          Reach out — we'd love to hear from you.
        </p>
        <div className="bg-deepgreen p-8 rounded-2xl shadow-card">
          <form className="grid grid-cols-1 gap-6 text-left">
            <div>
              <label className="block text-white mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-voga-border bg-white placeholder-placeholder text-textDark focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-voga-border bg-white placeholder-placeholder text-textDark focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Tell us what’s on your mind..."
                className="w-full px-4 py-3 rounded-lg border border-voga-border bg-white placeholder-placeholder text-textDark focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>

            <div className="text-center">
              {/* need to create a trash email to send and receive email using emailjs */}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  alert("Message sent!");
                }}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 bg-white text-textDark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Title variant="section" className="mb-6 text-title">
            Our Location
          </Title>
          <p className="text-voga.text mb-4">
            Griffith College Dublin, South Circular Road, Dublin 8.🌍
          </p>
          <p className="text-voga.textMuted">
            You can also reach us directly at{" "}
            <a
              href="mailto:thomas.odin@student.griffith.ie"
              className="text-accent hover:underline"
            >
              support@wild-play.ie
            </a>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactUs;
