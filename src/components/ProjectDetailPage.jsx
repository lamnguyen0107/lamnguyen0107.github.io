import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { navigateTo } from "../utils/navigation";
import { playHoverSound } from "../utils/audio";

const ProjectMeta = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-2 font-body text-[11px] uppercase tracking-widest text-white/35">{label}</p>
    <p className="font-body text-sm font-medium leading-snug text-white md:text-base">{value}</p>
  </div>
);

export const ProjectDetailPage = ({ slug }) => {
  const project = projects.find((item) => !item.hidden && (item.slug === slug || item.id === slug));
  const showTopVisit = project?.showTopVisit !== false;

  if (!project) {
    return (
      <div className="min-h-screen bg-background px-6 py-20 text-white md:px-16">
        <button
          type="button"
          onClick={() => navigateTo("/")}
          className="mb-12 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </button>
        <h1 className="font-heading text-5xl italic">Project not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-white selection:text-black">
      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:px-16 md:pb-32 md:pt-12">
        <button
          type="button"
          onClick={() => navigateTo(`/#work-${project.slug || project.id}`)}
          className="mb-16 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-body text-sm text-white/60 transition hover:border-white/25 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to work
        </button>

        <section className="mb-12 md:mb-16">
          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-black ${
                  project.logoImage ? "" : "bg-white"
                }`}
              >
                {project.logoImage ? (
                  <img
                    src={project.logoImage}
                    alt={`${project.title} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  project.logo
                )}
              </div>
              <div className="min-w-0">
                <p className="font-body text-base font-semibold leading-none text-white">{project.title}</p>
                <p className="mt-2 font-body text-sm text-white/50">{project.tagline}</p>
              </div>
            </div>
            {showTopVisit ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group liquid-glass-strong inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white transition hover:scale-105"
              >
                Visit Live Project
                <ArrowUpRight size={17} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:rotate-45" />
              </a>
            ) : null}
          </div>

          <h1 className="max-w-5xl font-heading text-5xl font-normal italic leading-[0.96] tracking-normal text-white md:text-7xl lg:text-[72px]">
            {project.headline}
          </h1>

          <p className="mt-8 max-w-3xl font-body text-base leading-relaxed text-white/55 md:text-lg">
            {project.summary}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-8 border-t border-white/10 pt-8 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-12">
            <ProjectMeta label="Platform" value={project.platform} />
            <ProjectMeta label="Industry" value={project.industry} />
            <ProjectMeta label="Collaboration" value={project.collaboration} />
            <ProjectMeta label="Responsibility" value={project.responsibility} />
          </div>
        </section>

        <section className="mb-24 md:mb-32">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:rounded-3xl">
            <img
              src={project.detailHeroImage || project.image}
              alt={`${project.title} thumbnail`}
              className="aspect-video h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-20 md:gap-28">
          {project.detailSections.map((section, index) => (
            <article
              key={section.title}
              className={`grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-14 ${
                index % 2 === 1 ? "md:grid-cols-[1.25fr_0.75fr]" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="font-body text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-[36px]">
                  {section.title}
                </h2>
                <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/55">
                  {section.description}
                </p>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={section.image}
                    alt={`${project.title} - ${section.title}`}
                    className="aspect-video h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </section>

        {showTopVisit ? (
          <section className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:mt-32 md:flex-row md:items-center">
            <div>
              <p className="font-body text-sm uppercase tracking-widest text-white/35">Live project</p>
              <h2 className="mt-3 font-heading text-4xl font-normal italic leading-none tracking-normal text-white md:text-5xl">{project.title}</h2>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="group liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium text-white transition hover:scale-105"
            >
              Visit Live Project
              <ArrowUpRight size={18} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:rotate-45" />
            </a>
          </section>
        ) : null}
      </main>
    </div>
  );
};
