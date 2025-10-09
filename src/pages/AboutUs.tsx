import React, { useState } from "react";
import Header from "@/components/Header";
import teamPhoto from "@/assets/LandlordHero.jpg"; // placeholder team image

// ---- Inline styles: keep CTA micro-interactions only (no card float) ----
const Styles = () => (
  <style>{`
    .cta-btn {
      transition: transform 120ms ease, box-shadow 200ms ease, filter 200ms ease;
    }
    .cta-btn:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
      box-shadow: 0 8px 20px rgba(99,102,241,.25);
    }
    .cta-btn:active {
      transform: translateY(0);
      filter: brightness(0.98);
      box-shadow: 0 4px 12px rgba(99,102,241,.18);
    }
  `}</style>
);

type MissionItem = { title: string; body: string; };

const missionValues: MissionItem[] = [
  {
    title: "COMPETENCE",
    body:
      "With over 50 years of cumulative experience in the legal field in Jacksonville, we understand that what is at stake is the most important issue in the world of our clients, which is why every member of our team pitches in to work on your case. We have the skill and resources to handle all aspects of your litigation.",
  },
  {
    title: "COMPASSION",
    body:
      "We are advocates for the welfare of the families we serve. We are committed to giving our clients the attention and dedication they need to succeed through those uncertain times in their lives. Our experience will help guide and support you and your family through the legal process and beyond.",
  },
  {
    title: "POSITIVE RESULTS",
    body:
      "Our attorneys are committed to providing the citizens of Jacksonville and surrounding areas with superior legal representation. Our record of successful results and our clients’ testimonials offer proof of our history of providing excellent representation and legal services to our clients.",
  },
];

const YouTubeEmbed: React.FC<{ videoId: string; title?: string }> = ({
  videoId,
  title = "Parra Harris Law — About Us",
}) => (
  <div className="relative w-full overflow-hidden rounded-xl shadow-md">
    <div className="pt-[56.25%]" />
    <iframe
      className="absolute left-0 top-0 h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    />
  </div>
);

const AboutUs: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-300">
      <Header />
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6 md:pt-32">
        <Styles />

        {/* HERO */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            About Us
          </h1>
        </header>

        {/* INTRO */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="prose max-w-none">
            <h2 className="text-lg font-semibold tracking-wide text-neutral-700">
              Jacksonville Family &amp; Divorce Lawyers
            </h2>
            <p>
              At a time when you most need a strong advocate, Parra Harris Law
              provides a partner who is experienced, competent and caring on your
              side. Based in Jacksonville and serving all of Northeast Florida, we
              help clients who are going through a divorce, annulment or legal
              separation; are concerned about child support, custody or visitation
              issues; or are dealing with issues such as asset division, order
              enforcement, abuse, and other areas of family law. We have a strong
              track record of success for our clients across the full gamut of
              family law practice areas and were named one of 2023’s “Best Divorce
              Lawyers in Jacksonville” by Expertise.
            </p>
            <p>
              Our firm is led by Paola Parra Harris, who brings over two decades
              of divorce and family law experience to her clients. Paola and her
              accomplished legal team help couples resolve complex divorce issues,
              and strive to do so in caring, compassionate ways that mitigate
              stress and protect the most important things. No matter the
              challenge, our goal is to protect your rights and ensure an optimal
              outcome.
            </p>
          </div>

          {/* Team photo – clickable to Attorneys; also opens lightbox */}
          <div>
            <a href="/attorneys" className="block group">
              <img
                src={teamPhoto}
                alt="Parra Harris Law team"
                className="w-full rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey) return; // allow new-tab
                  e.preventDefault();
                  setOpen(true);
                }}
              />
            </a>

            {open && (
              <div
                className="fixed inset-0 z-50 bg-black/70 p-6"
                onClick={() => setOpen(false)}
                role="dialog"
                aria-modal="true"
              >
                <img
                  src={teamPhoto}
                  alt="Parra Harris Law team"
                  className="mx-auto max-h-full rounded-xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </section>

        {/* VIDEO */}
        <section className="mt-12">
          <YouTubeEmbed videoId="VIDEO_ID" />
        </section>

        {/* MISSION & VALUES — static cards, thin gradient border on hover */}
        <section className="mt-16">
          <h3 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Mission &amp; Values
          </h3>
          <p className="mx-auto mb-8 max-w-3xl text-center text-neutral-700">
            We exist to help our clients successfully navigate the sensitive and
            complex legal issues involved in all areas of divorce and family law,
            providing expert legal guidance, strong advocacy and compassion while
            representing their best interests.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {missionValues.map((item) => (
              <div key={item.title} className="relative group">
                {/* Thin gradient border like CTA: visible on hover */}
                <div className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-[2px]">
                    <div className="h-full w-full rounded-[1rem] bg-transparent" />
                  </div>
                </div>

                <article className="relative z-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                  <h4 className="mb-3 text-center text-base font-semibold tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {item.body}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* REQUEST A CONSULTATION (enhanced CTA) */}
        <section className="mt-16">
          <h3 className="mb-6 text-xl font-semibold">Request a Consultation</h3>

          {/* Gradient wrapper with glassy inner panel */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-[2px] shadow-lg">
            <div className="rounded-3xl bg-white/85 p-6 backdrop-blur-sm md:p-8">
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! We’ll be in touch soon.");
                }}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                    />
                  </div>
                </div>

                <fieldset className="space-y-2">
                  <legend className="mb-1 text-sm font-medium">Contact Preference *</legend>
                  <div className="flex flex-wrap gap-4">
                    {["Call", "Text", "Email"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input required type="radio" name="contactPref" value={opt} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="timePref" className="mb-1 block text-sm font-medium">
                      Preferred day/time
                    </label>
                    <input
                      id="timePref"
                      name="timePref"
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                      placeholder="e.g., Monday mornings"
                    />
                  </div>
                  <div>
                    <label htmlFor="referral" className="mb-1 block text-sm font-medium">
                      How did you hear about us?
                    </label>
                    <input
                      id="referral"
                      name="referral"
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                      placeholder="Google, friend, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="cta-btn inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 
                               px-6 py-3 text-white shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <p className="mt-3 text-xs text-neutral-600">
                By submitting this form, you agree that contacting us does not create an attorney-client relationship.
                Please do not send confidential information until an engagement is established.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
