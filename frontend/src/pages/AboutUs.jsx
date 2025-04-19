import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Title from "@/components/ui/Titles";
import Button from "@/components/ui/Buttons";
import useNavigationHooks from "@/hooks/NavigationHooks";

const AboutUs = () => {
    const { goToContactUs } = useNavigationHooks();
    

  return (
    <MainLayout>
      <section className="flex flex-col justify-center items-center max-w-xl mx-auto px-6 py-16 text-center text-text">
        <Title variant="page" className="mb-6 text-title">
          About Us
        </Title>
        <p className="text-lg mb-6 text-textMuted">
          We are a group of students from Griffith College, working on a Web
          Technologies project for the academic year 2024-2025. As part of our
          project, we created both the website and the API with the integrated
          database.
        </p>
        <p className="text-lg mb-8 text-textMuted">
          The team behind this project includes:
          <br />
          <strong>Thomas ODIN</strong>, <strong>Thibaut HERVET</strong>,{" "}
          <strong>Xiang Yu Oon</strong>, and <strong>Kirill Smirnov</strong>.
        </p>
        <Button onClick={goToContactUs}>Contact Us</Button>
      </section>

      <section className="py-16">
        <div className="max-w-xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="text-center">
            <Title variant="section" className="text-left mb-4">
              Our Mission
            </Title>
            <p className="text-lg">
              This project is a usage case for a fictional enterprise called{" "}
              <strong>Wild Play</strong>, which specializes in van rentals and
              helps users plan their trips based on their location. The goal is
              to create a community by sharing travel guides and enabling
              reviews for future travelers.
            </p>
            <p className="text-lg mt-4">
              Our mission is to showcase how web technologies can empower the
              travel industry and foster user engagement through shared
              experiences and reviews.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-textDark">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Title variant="section" className="mb-10 text-title">
            Meet the Team
          </Title>
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {[
              {
                name: "Thomas ODIN",
                role: "Project Lead & Full Stack Developer",
                image: "/images/alice.jpg", // Replace with actual image path
              },
              {
                name: "Thibaut HERVET",
                role: "Backend Developer & Database Management",
                image: "/images/bob.jpg", // Replace with actual image path
              },
              {
                name: "Xiang Yu Oon",
                role: "Frontend Developer & UX/UI Designer",
                image: "/images/charlie.jpg", // Replace with actual image path
              },
              {
                name: "Kirill Smirnov",
                role: "API Developer & System Integration",
                image: "/images/charlie.jpg", // Replace with actual image path
              },
            ].map((member) => (
              <div
                key={member.name}
                className="text-center bg-intro-card shadow-card p-6 rounded-2xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-bold">
                  {member.name}
                </h3>
                <p className="uted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-textDark">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Title variant="section" className="mb-6 text-title">
            Project Details
          </Title>
          <p className="mb-4">
            The entire project codebase for <strong>Wild Play</strong> is
            available on GitHub. You can check out the full project and its code
            here:
          </p>
          <a
            href="https://github.com/Todin13/Wild-play"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline text-lg"
          >
            GitHub Repository
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
