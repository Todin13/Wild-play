/*

Contact US Page
Author: ODIN Thomas
CO-Author: Kiril Smirnov (did the emailjs part)

*/
import React, { useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import emailjs from "@emailjs/browser"; // emailjs library for sending emails

const ContactUs = () => {
  const form = useRef(); //ejs form
  const ejsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID; // emailjs service id
  const ejsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // emailjs template id
  const ejsPubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY; // emailjs public key

  //emailing contact form msg to company email
  const sendEmail = (e) => {
    e.preventDefault();

    //sending email
    emailjs.sendForm(ejsServiceId, ejsTemplateId, form.current, ejsPubKey).then(
      (result) => {
        //console.log('ejs success:', result);
        alert("Message sent!");
        form.current.reset();
      },
      (error) => {
        //console.error('ejs error:', error);
        alert("Failed to send message, try again later.");
      }
    );
  };

  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto px-6 py-16 text-center text-text">
        <Title variant="page" className="mb-6 text-title">
          Contact Us
        </Title>
        <p className="text-lg mb-8 text-textMuted">
          Have a project in mind? Want to collaborate? Just feel like saying hi?
          Reach out — we'd love to hear from you.
        </p>
        <div className="bg-deepgreen p-8 rounded-2xl shadow-card">
          <form
            className="grid grid-cols-1 gap-6 text-left"
            onSubmit={sendEmail}
            ref={form}
          >
            <div>
              <label className="block text-white mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                name="message"
                rows="5"
                placeholder="Tell us what’s on your mind..."
                className="w-full px-4 py-3 rounded-lg border border-voga-border bg-white placeholder-placeholder text-textDark focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>

            <div className="text-center">
              <Button type="submit" onClick={sendEmail}>
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
