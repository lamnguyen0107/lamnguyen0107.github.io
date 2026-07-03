import { Download, Printer } from "lucide-react";
import { resume } from "../data/resume";

const SectionTitle = ({ children }) => (
  <div className="mb-[3mm]">
    <h2 className="text-[4mm] font-bold uppercase leading-none tracking-[0.03em] text-[#42444a]">
      {children}
    </h2>
  </div>
);

const EmphasisText = ({ children }) => {
  const parts = String(children).split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-bold text-[#5f646f]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
};

const SmallSection = ({ period, title, meta }) => (
  <article className="break-inside-avoid">
    <h3 className="text-[13px] font-bold leading-tight tracking-normal text-[#676b73]">
      {title}
    </h3>
    <p className="mt-[1mm] text-[13px] font-medium leading-tight text-[#949aa5]">{period}</p>
    <p className="mt-[1mm] text-[13px] font-medium leading-tight text-[#747984]">{meta}</p>
  </article>
);

const Experience = ({ experience }) => (
  <article className="break-inside-avoid">
    <div className="flex items-baseline justify-between gap-[4mm]">
      <h3 className="text-[4mm] font-bold leading-tight tracking-normal text-[#676b73]">
        {experience.role}
      </h3>
      <p className="shrink-0 text-[3mm] font-medium leading-tight text-[#949aa5]">{experience.period}</p>
    </div>
    <p className="mt-[1mm] text-[3mm] font-semibold leading-tight text-[#6f7480]">
      {experience.organization}
      {experience.type ? <span className="font-medium text-[#949aa5]"> · {experience.type}</span> : null}
    </p>
    <ul className="mt-[1mm] list-disc space-y-[1mm] pl-[5mm] text-[13px] leading-[1.35] tracking-normal text-[#6f7480]">
      {experience.bullets.map((bullet) => (
        <li key={bullet}>
          <EmphasisText>{bullet}</EmphasisText>
        </li>
      ))}
    </ul>
  </article>
);

const TextColumn = ({ title, items }) => (
  <div className="min-w-0">
    {title ? <h3 className="mb-[2mm] text-[13px] font-bold leading-tight text-[#676b73]">{title}</h3> : null}
    <div className="flex flex-wrap gap-[1mm] text-[13px] leading-tight text-[#949aa5]">
      {items.map((item) => (
        <span key={item} className="rounded-[2mm] bg-[#f1f3f5] px-[1mm] py-[1mm]">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export const ResumePage = () => {
  const copy = resume.locales.en;
  const labels = copy.labels;
  const aboutText =
    "UI/UX Designer with a Digital Media background. I design websites, landing pages, and app screens by turning requirements into user flows, wireframes, prototypes, and clean UI designs. I work with teams to make products simple, clear, and easy to hand off to developers.";
  const profileTags = ["UI/UX Designer", "Product Mindset", "2+ years of experience"];

  return (
    <div className="resume-page min-h-screen overflow-x-auto bg-[#edece7] px-4 py-5 text-[#131313] selection:bg-[#576132] selection:text-white sm:px-6 md:py-8">
      <article className="resume-paper relative mx-auto h-[297mm] w-[210mm] overflow-hidden border border-[#deded5] bg-white px-[10mm] pb-[5mm] pt-[11mm] text-[#131313] shadow-[0_24px_80px_rgba(19,19,19,0.12)]">
        <header className="relative min-h-[49mm]">
          <div className="resume-no-print absolute right-0 top-0 z-20 flex items-center justify-end gap-[3mm]">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-[9mm] items-center gap-[2mm] rounded-[3mm] bg-[#f7f8fa] px-[3mm] text-[3mm] font-medium text-[#344054] shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#576132]/35"
              aria-label="Print resume"
            >
              <Printer size={13} />
              {labels.print}
            </button>
            <a
              href={resume.contact.pdf}
              download="CV-Lam-Nguyen.pdf"
              className="inline-flex h-[9mm] w-[9mm] items-center justify-center rounded-[3mm] bg-[#f7f8fa] text-[#344054] shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#576132]/35"
              aria-label="Download PDF"
            >
              <Download size={13} />
            </a>
          </div>

          <div className="grid grid-cols-[1fr_126mm] gap-x-[12mm]">
            <div className="min-w-0">
              <div className="relative h-[40mm] w-[40mm] overflow-hidden bg-[#d8dac9]">
                <img
                  src="/assets/lam-resume.png"
                  alt={resume.name}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#131313]/5" />
              </div>
            </div>

            <section className="flex h-[40mm] min-w-0 flex-col justify-end">
              <h1 className="resume-display whitespace-nowrap text-[10mm] font-bold leading-none tracking-normal text-[#141416]">
                {resume.vietnameseName}
              </h1>

              <div className="mt-[3mm] flex flex-wrap items-center gap-[2mm] text-[4mm] leading-none text-[#101828]">
                <span>{copy.title}</span>
                <a
                  href={resume.contact.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#0057c8] px-[2mm] py-[1mm] text-[3mm] font-semibold text-white transition-opacity hover:opacity-85"
                >
                  {labels.portfolio}
                </a>
                <a
                  href={resume.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#0b82b8] px-[2mm] py-[1mm] text-[3mm] font-semibold text-white transition-opacity hover:opacity-85"
                >
                  LinkedIn
                </a>
              </div>

              <div className="mt-[3mm] flex flex-wrap gap-x-[3mm] gap-y-[1mm] text-[3mm] leading-tight text-[#667085]">
                <a href={`mailto:${resume.contact.email}`}>
                  <strong className="font-semibold text-[#667085]">E:</strong> {resume.contact.email}
                </a>
                <a href={`tel:${resume.contact.phone.replace(/\s/g, "")}`}>
                  <strong className="font-semibold text-[#667085]">P:</strong> {resume.contact.phone}
                </a>
                <span>
                  <strong className="font-semibold text-[#667085]">A:</strong> {resume.location}
                </span>
              </div>
            </section>
          </div>
        </header>

        <main className="grid grid-cols-[1fr_126mm] gap-x-[12mm] pt-[1mm]">
          <section className="order-2 min-w-0">
            <section>
              <SectionTitle>Introduction</SectionTitle>
              <p className="max-w-[114mm] text-[13px] leading-[1.4] text-[#949aa5]">{aboutText}</p>
              <div className="mt-[3mm] flex flex-wrap gap-[2mm]">
                {profileTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[1mm] bg-[#f1f3f5] px-[2mm] py-[1mm] text-[3mm] font-medium text-[#949aa5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-[11mm]">
              <SectionTitle>{labels.experiences}</SectionTitle>
              <div className="flex flex-col gap-[6mm]">
                {copy.experiences.map((experience) => (
                  <Experience key={`${experience.period}-${experience.organization}`} experience={experience} />
                ))}
              </div>
            </section>
          </section>

          <aside className="order-1 min-w-0">
            <section>
              <SectionTitle>{labels.education}</SectionTitle>
              <div className="flex flex-col gap-[4mm]">
                {copy.education.map((item) => (
                  <SmallSection
                    key={`${item.name}-${item.period}`}
                    period={item.period}
                    title={item.name}
                    meta={item.detail}
                  />
                ))}
              </div>
            </section>

            <section className="mt-[10mm]">
              <SectionTitle>{labels.certifications}</SectionTitle>
              <div className="flex flex-col gap-[4mm]">
                {copy.certifications.map((item) => (
                  <SmallSection
                    key={`${item.name}-${item.period}`}
                    period={`${item.period} · ${item.issuer}`}
                    title={item.name}
                    meta=""
                  />
                ))}
              </div>
            </section>

            <section className="mt-[10mm]">
              <SectionTitle>{labels.skills}</SectionTitle>
              <div className="flex flex-col gap-[5mm]">
                <TextColumn title={labels.design} items={copy.skills.design} />
                <TextColumn title={labels.languages} items={copy.skills.languages} />
              </div>
            </section>

            <section className="mt-[10mm]">
              <SectionTitle>{labels.tools}</SectionTitle>
              <TextColumn title="" items={copy.skills.tools} />
            </section>
          </aside>
        </main>
      </article>
    </div>
  );
};
