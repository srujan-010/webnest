import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Section";
import { ArrowLeft, CheckCircle2, Layout, Smartphone, Award, Calendar, Check, ExternalLink, Briefcase, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getProjects } from "@/services/api";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects() || [];
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} | WebNest Case Study`,
    description: project.shortDescription || project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects for the related projects section
  const allProjects = await getProjects() || [];
  const relatedProjects = allProjects
    .filter((p: any) => p.slug !== slug && p.status === 'published')
    .filter((p: any) => p.category === project.category || p.categories?.includes(project.category))
    .slice(0, 3);

  // Fallback to any published projects if we don't have 3 matching category ones
  if (relatedProjects.length < 3) {
    const existingSlugs = new Set(relatedProjects.map((p: any) => p.slug));
    const fallbacks = allProjects.filter(
      (p: any) => p.slug !== slug && p.status === 'published' && !existingSlugs.has(p.slug)
    );
    relatedProjects.push(...fallbacks.slice(0, 3 - relatedProjects.length));
  }

  const mainImage = project.coverImage || project.desktopImage || project.image;
  const techList = project.techStack || project.tech || [];
  const featuresList = project.featuresList || project.features || [];
  const resultsList = project.results || [];
  const galleryList = project.gallery || project.galleryImages || [];

  return (
    <main className="min-h-screen pt-28 pb-20 bg-slate-50/30">
      
      {/* 1. Case Study Hero Banner */}
      <Section spacing="none" className="pt-8 pb-16 bg-slate-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_45%)]" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

        <Container>
          <div className="mb-10">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest group mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-brand-600 text-white">
                {project.category}
              </span>
              {project.isFeatured && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-yellow-400 text-slate-950 flex items-center gap-1">
                  <Award className="w-3 h-3 fill-current" /> Featured Work
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display max-w-4xl leading-[1.15] mb-6">
              {project.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
              {project.shortDescription || project.description}
            </p>

            {/* Quick Facts Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm max-w-4xl">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Client</span>
                <span className="font-semibold text-sm sm:text-base text-slate-100 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-400" /> {project.clientName || "WebNest Internal"}
                </span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Year</span>
                <span className="font-semibold text-sm sm:text-base text-slate-100 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-400" /> {project.completionYear || "2024"}
                </span>
              </div>
              <div className="border-l border-white/10 pl-6 col-span-2 md:col-span-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Core Tech</span>
                <span className="font-semibold text-sm sm:text-base text-slate-100 truncate block">
                  {techList[0] || "React"} + {techList[1] || "Tailwind"}
                </span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Live Demo</span>
                {project.liveUrl || project.websiteUrl ? (
                  <a 
                    href={project.liveUrl || project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-brand-400 hover:text-brand-300 font-semibold text-sm sm:text-base transition-colors gap-1 group"
                  >
                    Visit Site <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-slate-500 font-semibold text-sm">Enterprise NDA</span>
                )}
              </div>
            </div>
          </div>

          {/* Large Hero Showcase Banner */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900 translate-y-10 z-20">
            <img 
              src={mainImage} 
              alt={project.name} 
              className="w-full h-full object-cover object-top" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
          </div>
        </Container>
      </Section>

      {/* 2. Overview & Details Container */}
      <Section className="pt-24 pb-16 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Project Narrative */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">Project Overview</span>
                <h2 className="text-3xl font-bold font-display text-slate-900 mb-5">Building the Solution</h2>
                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.challenge && (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-600" />
                    <h3 className="text-xl font-bold font-display text-slate-900">The Challenge</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">The Solution</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Sticky Sidebar Metadata */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50 sticky top-32 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-950 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-slate-50 border border-slate-200/50 rounded-md text-xs font-semibold text-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {featuresList.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-950 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Core Features</h3>
                    <ul className="space-y-3">
                      {featuresList.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(project.liveUrl || project.websiteUrl) && (
                  <div className="pt-4">
                    <a 
                      href={project.liveUrl || project.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <Button variant="primary" className="w-full h-12 rounded-xl flex items-center justify-center gap-2 group">
                        Visit Live Platform <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* 3. Metrics/Results Section */}
      {resultsList.length > 0 && (
        <Section className="py-20 bg-slate-50/50 border-b border-slate-100">
          <Container>
            <div className="text-center mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">Metrics & Analytics</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900">Key Results Delivered</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resultsList.map((result: string, i: number) => {
                // Split results if they look like "99% Inventory Accuracy"
                const parts = result.split(/(\d+%|\$\d+M\+?|\d+k\+?)/i);
                const val = parts[1] || "";
                const text = parts.filter((_, idx) => idx !== 1).join("").trim();
                
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                    {val ? (
                      <>
                        <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-display mb-2">{val}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{text}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
                        <span className="font-semibold text-sm text-slate-800 leading-snug">{result}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. Interface Showcase Mockups */}
      <Section className="py-24 bg-white border-b border-slate-100">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">Design & Engineering</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">Responsive Interface System</h2>
            <p className="text-slate-500 text-sm">We optimized user flows for both large-format desktop web architectures and compact mobile layouts.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
            
            {/* Desktop Mockup Card */}
            <div className="lg:col-span-2 bg-slate-50 rounded-[2rem] p-6 md:p-8 border border-slate-100 flex flex-col justify-between overflow-hidden shadow-sm group">
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Desktop Layout</span>
                <h4 className="text-lg font-bold text-slate-900">Optimized Dashboard & Operations Control</h4>
              </div>
              
              {/* Browser frame */}
              <div className="relative w-full aspect-[16/10] bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-1">
                <div className="h-8 border-b border-slate-100 flex items-center px-4 gap-1.5 bg-slate-50 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <div className="flex-1 mx-4 h-5 bg-white rounded border border-slate-200/80 flex items-center justify-center">
                     <span className="text-[9px] text-slate-400 font-sans tracking-wide">
                       {project.name.toLowerCase().replace(/\s+/g, '')}.com
                     </span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-900 relative overflow-hidden">
                  <img 
                    src={project.desktopImage || project.image} 
                    alt="Desktop Version" 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
              </div>
            </div>

            {/* Mobile Mockup Card */}
            <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 border border-slate-100 flex flex-col justify-between items-center shadow-sm group">
              <div className="w-full mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Mobile View</span>
                <h4 className="text-lg font-bold text-slate-900">Responsive Mobile Fluid App</h4>
              </div>

              {/* Phone frame */}
              <div className="relative w-48 aspect-[9/19] bg-slate-950 rounded-[32px] border-[5px] border-slate-900 shadow-xl overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-1">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <div className="flex-1 bg-slate-900 relative">
                  <img 
                    src={project.mobileImage || project.image} 
                    alt="Mobile Version" 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* 5. Client Testimonial Banner */}
      {project.testimonialQuote && (
        <Section className="py-24 bg-slate-900 text-white relative border-b border-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.06),_transparent)]" />
          <Container className="relative z-10 max-w-4xl">
            <div className="text-center space-y-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400 block">Client Testimonial</span>
              
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed font-display text-slate-100 max-w-3xl mx-auto italic">
                "{project.testimonialQuote}"
              </blockquote>

              <div className="flex flex-col items-center gap-3 pt-4">
                {project.testimonialPhoto && (
                  <img 
                    src={project.testimonialPhoto} 
                    alt={project.testimonialAuthor} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-500" 
                  />
                )}
                <div>
                  <cite className="not-italic font-bold text-slate-100 text-base sm:text-lg block">
                    {project.testimonialAuthor}
                  </cite>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                    {project.testimonialRole}, {project.testimonialCompany || project.clientName}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. Dynamic Related Projects Section */}
      {relatedProjects.length > 0 && (
        <Section className="py-24 bg-slate-50/50">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">Explore More Work</span>
                <h2 className="text-3xl font-bold font-display text-slate-900">Related Case Studies</h2>
              </div>
              <Link href="/portfolio" className="hidden sm:inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-widest gap-1 group border-b border-transparent hover:border-brand-600 pb-0.5 transition-all">
                View All Case Studies <ArrowLeft className="w-4.5 h-4.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p: any) => {
                const cover = p.coverImage || p.desktopImage || p.image;
                const techList = p.techStack || p.tech || [];
                return (
                  <div key={p.slug} className="flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img src={cover} alt={p.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-brand-600 text-white shadow-md">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                        <span>{p.clientName || "WebNest Internal"}</span>
                        <span>{p.completionYear || "2024"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors duration-300 mb-2 font-display">
                        {p.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 flex-1">
                        {p.shortDescription || p.description}
                      </p>
                      <div className="pt-4 border-t border-slate-100">
                        <Link href={`/portfolio/${p.slug}`}>
                          <Button variant="primary" className="w-full h-10 text-xs rounded-xl flex items-center justify-center gap-1.5 group/btn">
                            View Case Study <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. Start a Project CTA Block */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="bg-slate-950 rounded-3xl p-12 text-center relative overflow-hidden shadow-xl border border-slate-900">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] -z-10" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] -z-10" />
             <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white mb-6 relative z-10">Have a similar project in mind?</h2>
             <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">Let's build a secure, modern platform customized for your business workflows.</p>
             <Link href="/contact" className="relative z-10 inline-block">
               <Button variant="primary" className="h-[52px] px-8 bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold shadow-lg transition-transform hover:scale-[1.02]">
                 Let's Talk
               </Button>
             </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
