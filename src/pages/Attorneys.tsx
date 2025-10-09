import Header from "@/components/Header";
import AttorneyCard, { Attorney } from "@/components/ui/AttorneyCard";

import paola from "@/assets/attorneys/paola.jpg";
import lyn from "@/assets/attorneys/lyn-salvatore.jpg";
import john from "@/assets/attorneys/john-joseph-clark.jpg";
import priscilla from "@/assets/attorneys/priscilla-justiniano.jpg";

const ATTORNEYS: Attorney[] = [
  {
    name: "Paola Parra Harris",
    role: "Founder & Managing Attorney",
    image: paola,
    href: "https://parraharrislaw.com/attorney-paola-parra-harris/",
    blurb:
      "Cuban born and Florida raised, Paola has practiced Family Law since 1998. Fully bilingual, she serves a large Spanish-speaking clientele and leads the firm’s complex divorce, custody, and high-asset matters.",
    tags: ["Bilingual", "Trial", "20+ Years"],
  },
  {
    name: "Lynn Salvatore",
    role: "Senior Associate",
    image: lyn,
    href: "https://parraharrislaw.com/attorneys/lyn-salvatore/",
    blurb:
      "Senior Associate focusing on equitable distribution, parental responsibility, and post-judgment modifications with a practical, settlement-forward mindset.",
    tags: ["Negotiation", "Post-Judgment"],
  },
  {
    name: "John Joseph Clark",
    role: "Attorney",
    image: john,
    href: "https://parraharrislaw.com/attorneys/john-joseph-clark/",
    blurb:
      "Represents clients in divorce and support matters from strategy through trial preparation, with clear communication and diligent case management.",
    tags: ["Support", "Litigation"],
  },
  {
    name: 'Priscilla "PJ" Justiniano',
    role: "Of Counsel",
    image: priscilla,
    href: "https://parraharrislaw.com/attorneys/priscilla-justiniano/",
    blurb:
      "Of Counsel to the firm, PJ brings seasoned judgment to complex family law issues and consults on strategy, motion practice, and hearings.",
    tags: ["Strategy", "Motions"],
  },
];

const Attorneys = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      <Header />

      {/* Keep below fixed header */}
      <main className="max-w-6xl mx-auto px-4 pt-28 md:pt-36 pb-16">
        {/* Title */}
        <section className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Jacksonville Family Law Attorneys
          </h1>
        </section>

        {/* Intro (captures the firm description from the site) */}
        <section className="mb-10">
          <p className="text-muted-foreground leading-7">
            At Parra Harris Law, we have a proven track record of success. Our Jacksonville Family Law
            Attorneys focus exclusively on divorce and family law and work diligently on your behalf in all
            matters of divorce, property division, child custody and visitation, and other matters. The firm
            is led by award-winning attorney, Paola Parra Harris—recognized as Ultimate CEO, Ultimate Family
            Law Attorney, Woman of Distinction, and Lawyer of the Year.
          </p>
        </section>

        {/* Grid of Attorneys (dynamic) */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ATTORNEYS.map((a) => (
            <AttorneyCard key={a.name} data={a} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Attorneys;
