import Navbar from "../Sections/Navbar";
import { Particles } from "../Components/Particles";

const About = () => {
return (
<div className="relative min-h-screen bg-[#020617] text-white">

  <Navbar />

  <Particles
    className="fixed inset-0 -z-10"
    quantity={80}
    ease={60}
    color="#ffffff"
  />

  <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">

    <h1 className="text-4xl font-bold mb-10">About Me</h1>

    {/* Intro */}
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-3">
        Abhishek Kailas Hivarkar
      </h2>

      <p className="text-neutral-400 leading-relaxed">
        I am a B.Com graduate with a strong passion for coding and web
        development. My goal is to become one of the best web developers by
        continuously learning modern technologies and building real-world
        applications.
      </p>

      <p className="text-neutral-400 mt-4">
        I mainly work with the MERN stack and enjoy building scalable
        backend systems, secure APIs, authentication systems, and payment
        integrations.
      </p>

      <p className="text-neutral-400 mt-4">
        I have completed multiple real-world projects including client
        projects and personal projects involving full-stack development,
        payment gateways, AI integration, and admin dashboards.
      </p>
    </div>

    {/* Personal Details */}
    <div className="mt-10 bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-5">Personal Details</h2>

      <div className="grid sm:grid-cols-2 gap-4 text-neutral-400">

        <p><span className="text-white">Full Name:</span> Abhishek Kailas Hivarkar</p>
        <p><span className="text-white">Education:</span> B.Com Graduate</p>

        <p><span className="text-white">Phone:</span> 8237975464</p>

        <p>
          <span className="text-white">Email:</span>{" "}
          <a
            href="mailto:abhihivarkar783@gmail.com"
            className="text-sky-400 hover:underline"
          >
            abhihivarkar783@gmail.com
          </a>
        </p>

        <p>
          <span className="text-white">WhatsApp:</span>{" "}
          <a
            href="https://wa.me/qr/XMKCCMDG7WTQI1"
            className="text-sky-400 hover:underline"
          >
            Chat on WhatsApp
          </a>
        </p>

        <p>
          <span className="text-white">LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/abhishek-hivarkar-297742351"
            className="text-sky-400 hover:underline"
          >
            View Profile
          </a>
        </p>

      </div>
    </div>

    {/* Hobbies */}
    <div className="mt-10 bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">Hobbies</h2>

      <ul className="list-disc list-inside text-neutral-400 space-y-2">
        <li>Coding and building web applications</li>
        <li>Playing video games</li>
        <li>Trekking and exploring nature</li>
      </ul>
    </div>

    {/* Inspiration */}
    <div className="mt-10 bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">Inspiration</h2>

      <p className="text-neutral-400">
        My biggest inspiration is <span className="text-sky-400">Linus Torvalds</span>,
        the creator of Linux. His work in open-source software motivates me
        to constantly improve my skills and build impactful technology.
      </p>
    </div>

    {/* Projects */}
    <div className="mt-10 bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">

      <h2 className="text-2xl font-semibold mb-6">Major Projects</h2>

      <div className="space-y-10">

        {/* Kaumudi */}
        <div>
          <h3 className="text-xl text-sky-400 font-semibold">
            Kaumudi Academy (Client Project)
          </h3>

          <p className="text-neutral-400 mt-2">
            Sanskrit course enrollment platform built using the MERN stack.
            Implemented secure REST APIs for student authentication, course
            enrollment, coupon management, and payment processing.
            Integrated Razorpay for secure payments and developed admin
            dashboard features to manage students, coupons, and revenue
            analytics.
          </p>

          <div className="mt-2 text-sm text-sky-400">
            <a href="https://github.com/Abhishekhivarkar/Kaumudi-academy">
              GitHub
            </a>{" "}
            •{" "}
            <a href="https://kaumudi-academy.vercel.app/">
              Live Website
            </a>
          </div>
        </div>

        {/* Shivganga */}
        <div>
          <h3 className="text-xl text-sky-400 font-semibold">
            Shivganga Hotel (Client Project)
          </h3>

          <p className="text-neutral-400 mt-2">
            Full-stack hotel booking platform built with MERN stack.
            Implemented authentication, booking system, room management,
            and Razorpay payment integration. Developed role-based admin
            and receptionist dashboards with analytics like revenue and
            customer activity.
          </p>

          <div className="mt-2 text-sm text-sky-400">
            <a href="https://github.com/tanisha-6/Graphura-ShivGanga">
              GitHub
            </a>{" "}
            •{" "}
            <a href="https://www.hotelshivganga.in/">
              Live Website
            </a>
          </div>
        </div>

        {/* ResuNex */}
        <div>
          <h3 className="text-xl text-sky-400 font-semibold">
            ResuNex (AI Project)
          </h3>

          <p className="text-neutral-400 mt-2">
            AI-powered interview preparation platform using MERN stack.
            Integrated Groq AI (Llama-3.3-70B) to analyze resumes and job
            descriptions to generate interview questions and a 7-day
            preparation roadmap with skill gap analysis.
          </p>

          <div className="mt-2 text-sm text-sky-400">
            <a href="https://github.com/Abhishekhivarkar/ResuNex">
              GitHub
            </a>{" "}
            •{" "}
            <a href="https://resu-nex.vercel.app/">
              Live Website
            </a>
          </div>
        </div>

      </div>

    </div>

  </section>

</div>

);
};

export default About;
