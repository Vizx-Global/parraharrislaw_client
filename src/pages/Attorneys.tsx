// src/pages/Attorneys.tsx
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// ✅ If you store images in /src/assets/attorneys/* keep these imports.
//    (Recommended with Vite — avoids path issues)
import paolaImg from "@/assets/attorneys/paola.jpg";
import lynImg from "@/assets/attorneys/lyn-salvatore.jpg";
import johnImg from "@/assets/attorneys/john-joseph-clark.jpg";
import pjImg from "@/assets/attorneys/priscilla-justiniano.jpg";

// ---------------- Types ----------------
type Section = { label: string; items: string[] };
type Attorney = {
  name: string;
  role: string;
  image: string;
  href: string; // full bio URL
  blurb: string;
  focus?: string[];
  education?: string[];
  admissions?: string[];
  leadership?: string[];
  community?: string[];
  contact?: { phone?: string; email?: string };
};

// ---------------- Data (condensed from your captures) ----------------
const ATTORNEYS: Attorney[] = [
  {
    name: "Paola Parra Harris",
    role: "Founder & Managing Attorney",
    image: paolaImg,
    href: "Attorneys#",
    blurb:
      "Practicing family law since 1998, Paola is bilingual and represents diverse clients in complex family law matters. Recognized as Ultimate Family Law Attorney, Woman of Distinction, and Lawyer of the Year.",
    focus: ["Divorce", "Child Custody & Time-Sharing", "Support & Alimony", "High-asset matters"],
    education: [
      "J.D., Walter F. George School of Law (Mercer University)",
      "B.A., English Literature — University of Florida",
    ],
    leadership: [
      "Founding President, Hispanic Bar Association of Northeast Florida",
      "Leadership Florida – NE Region Council",
      "Catholic Charities of Jacksonville – Board / Chair",
      "Jacksonville Bar Association – Naturalization Committee (Moderator)",
    ],
    community: [
      "Up & Comer honoree; Woman Lawyer of the Year (JWLA)",
      "Recognized by Jacksonville Business Journal & Hola Latino magazine",
    ],
    contact: { phone: "(904) 900-1617", email: "paola@parraharrislaw.com" },
  },
  {
    name: "Lynn Salvatore",
    role: "Senior Associate",
    image: lynImg,
    href: "Attorneys#",
    blurb:
      "Entrepreneurial and masterful. Background with Florida Department of Children & Families and Florida Guardian Ad Litem Program. Certified Civil Circuit Mediator for the Supreme Court of Florida.",
    focus: [
      "Equitable Distribution",
      "Child Custody",
      "Post-Judgment Modifications",
      "Collaborative Family Law",
    ],
    education: [
      "J.D., University of Florida Levin College of Law (1999)",
      "B.S., Business Administration",
    ],
    leadership: [
      "Jacksonville Bar Association",
      "Jacksonville Women Lawyers Association",
      "Martindale-Hubbell AV Preeminent® rated",
      "Jax Bar Podcast – featured guest",
    ],
    community: [
      "Women Empowered Award (Jacksonville Magazine) 2022 & 2023",
      "Expert witness in Middle District of Florida (GAL matters)",
    ],
    contact: { phone: "(904) 900-1617", email: "lynn@parraharrislaw.com" },
  },
  {
    name: "John Joseph Clark",
    role: "Attorney",
    image: johnImg,
    href: "Attorneys#",
    blurb:
      "Fluent in Spanish; reputation for meticulous preparation and client communication. Diverse litigation background; clear strategy from intake to trial prep.",
    focus: ["Divorce", "Support", "Litigation"],
    admissions: [
      "Florida (2001)",
      "U.S. District Court, Southern District of Florida (2006)",
    ],
    education: [
      "J.D., University of Miami School of Law, cum laude (2000)",
      "B.A., Political Science — Florida International University (1997)",
    ],
    leadership: [
      "Phi Delta Phi (Intl. legal honor society)",
      "Hispanic Law Student Association",
      "Criminal Law Society",
    ],
    contact: { phone: "(904) 900-1617", email: "john@parraharrislaw.com" },
  },
  {
    name: 'Priscilla "PJ" Justiniano',
    role: "Of Counsel",
    image: pjImg,
    href: "Attorneys#",
    blurb:
      "U.S. Navy LCDR (Ret.). Served in submarine commands and as Naval Special Warfare command support. Led Florida Coalition for Domestic Violence’s Injunction for Protection Project.",
    focus: ["Family Law", "Domestic Violence Injunctions", "Juvenile Courts", "Veterans"],
    education: ["J.D., Stetson University College of Law (per profile context)"],
    community: [
      "Advocacy for domestic violence survivors",
      "Service to the Hispanic community on the First Coast",
    ],
    contact: { phone: "(904) 900-1617", email: "pj@parraharrislaw.com" },
  },
];

// ---------------- Small helpers ----------------
const toSections = (a: Attorney): Section[] =>
  [
    a.focus && a.focus.length ? { label: "Focus Areas", items: a.focus } : null,
    a.education && a.education.length ? { label: "Education", items: a.education } : null,
    a.admissions && a.admissions.length ? { label: "Admissions", items: a.admissions } : null,
    a.leadership && a.leadership.length ? { label: "Leadership & Recognition", items: a.leadership } : null,
    a.community && a.community.length ? { label: "Community", items: a.community } : null,
  ].filter(Boolean) as Section[];

// ---------------- UI ----------------
const Attorneys = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Attorney | null>(null);

  const sections = useMemo(() => (selected ? toSections(selected) : []), [selected]);

  return (
    <div className="min-h-screen bg-gray-300">
      <Header />

      {/* keep content under the fixed header */}
      <main className="max-w-6xl mx-auto px-4 pt-28 md:pt-36 pb-16">
        <section className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Jacksonville Family Law Attorneys
          </h1>
        </section>

        <section className="mb-10">
          <p className="text-muted-foreground leading-7">
            At Parra Harris Law, we have a proven track record of success. Our Jacksonville Family
            Law Attorneys focus exclusively on divorce and family law and work diligently on your
            behalf in all matters of divorce, property division, child custody and visitation, and
            other matters. The firm is led by award-winning attorney, Paola Parra Harris—recognized
            as Ultimate CEO, Ultimate Family Law Attorney, Woman of Distinction, and Lawyer of the Year.
          </p>
        </section>

        {/* Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ATTORNEYS.map((a) => (
            <Card
              key={a.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => {
                  setSelected(a);
                  setOpen(true);
                }}
                className="block w-full text-left"
                aria-label={`Open bio for ${a.name}`}
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={a.image}
                    alt={`${a.name} – ${a.role}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </button>

              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(a);
                      setOpen(true);
                    }}
                    className="text-left"
                  >
                    <h3 className="font-semibold leading-tight hover:underline">{a.name}</h3>
                    <p className="text-sm text-muted-foreground">{a.role}</p>
                  </button>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline whitespace-nowrap mt-1"
                  >
                    Full Bio ↗
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      

      {/* Spotlight Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
  {/* Wider + shorter on laptops, keep header visible */}
  <DialogContent className="max-w-4xl p-0 md:max-h-[90vh] overflow-hidden">
    {selected && (
      <>
        {/* Sticky header */}
        <DialogHeader className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b px-6 py-4">
          <DialogTitle className="text-[20px] md:text-2xl">{selected.name}</DialogTitle>
          <DialogDescription className="text-[13px] md:text-sm text-muted-foreground">
            {selected.role}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="overflow-y-auto h-full px-6 py-5 md:max-h-[calc(80vh-72px)]">
          <div className="grid gap-6 md:grid-cols-[260px,1fr]">
            {/* Left: image + contact (constrained height) */}
            <div className="md:pr-2">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full max-h-64 object-cover rounded-xl shadow"
              />
              <div className="mt-3 space-y-1 text-[13px] leading-5">
                {selected.contact?.phone && (
                  <div>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    <a className="underline" href={`tel:+1${selected.contact.phone.replace(/\D/g, "")}`}>
                      {selected.contact.phone}
                    </a>
                  </div>
                )}
                {selected.contact?.email && (
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <a className="underline" href={`mailto:${selected.contact.email}`}>
                      {selected.contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right: condensed text + dense sections */}
            <div className="md:pl-2">
              <p className="text-[15px] leading-6">{selected.blurb}</p>

              {/* Two-column sections on laptop to cut vertical height */}
              <div className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2">
                {sections.map((s) => (
                  <div key={s.label}>
                    <h4 className="text-[12px] font-semibold tracking-wide uppercase text-muted-foreground">
                      {s.label}
                    </h4>
                    <ul className="mt-2 list-disc pl-5 text-[13px] leading-6 space-y-1">
                      {s.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={selected.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="h-9 px-4 text-[13px]">Read Full Bio</Button>
                </a>
                <a href="/contact">
                  <Button className="h-9 px-4 text-[13px]">Schedule a Consultation</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>
<Footer />
    </div>
    
  );
};

export default Attorneys;
