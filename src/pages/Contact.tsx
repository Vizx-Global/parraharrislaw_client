import React from "react";
import Header from "@/components/Header";
import ContactInfo from "@/components/ui/ContactInfo";
import ContactMiniForm from "@/components/ui/ContactMiniForm";
import ContactCard from "@/components/ui/ContactCard";
import hero from "@/assets/contact-hero.jpg";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      <Header />

      {/* HERO */}
      <section
  className="relative flex h-56 items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${hero})` }}
>
  <div className="absolute inset-0 bg-black/40" />
  <h1 className="relative z-10 text-4xl font-semibold text-white">Contact Us</h1>
</section>

      {/* INFO + MINI FORM */}
      <section className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="-mt-8 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 md:p-10">
          <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
            <ContactInfo />
            <ContactMiniForm
              onSubmit={() => {
                // wire to your API if you like
                alert("Thanks! We’ll follow up shortly.");
              }}
            />
          </div>
        </div>
      </section>

      {/* MAP (optional; remove if you don’t want it) */}
      <section className="mx-auto mt-12 max-w-7xl px-6 md:px-12">
        <div className="overflow-hidden rounded-2xl border border-black/10">
          <iframe
            title="Parra Harris Law Map"
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=6810%20St.%20Augustine%20Road%2C%20Jacksonville%2C%20FL%2032217&output=embed"
          />
        </div>
      </section>

      {/* FULL-WIDTH CTA FORM */}
      <section className="mx-auto my-12 max-w-7xl px-6 md:px-12">
        <ContactCard
          submitText="Submit"
          onSubmit={() => {
            alert("Submitted — we’ll be in touch.");
          }}
        />
      </section>

      {/* FOOTER SPACE */}
      <div className="h-10" />
    </div>
  );
};

export default Contact;
