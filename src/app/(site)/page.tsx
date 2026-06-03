import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { getProjectsFromDrive, getDriveImageOrFallback } from "@/lib/googleDrive";
import services from "@/content/services.json";
import testimonials from "@/content/testimonials.json";

export const revalidate = 3600;

export default async function HomePage() {
  const allProjects = await getProjectsFromDrive();
  const featuredProjects = allProjects.filter((p) => p.featured);
  const heroImage = getDriveImageOrFallback("GOOGLE_DRIVE_HERO_IMAGE_ID", "/images/hero-bg.jpg");

  return (
    <>
      <HeroSection
        headline={"Enjoy your new space\nwith Phoenix"}
        subheadline="Precision craftsmanship meets quality construction."
        backgroundImage={heroImage}
        ctaPrimary={{ label: "View Our Work", href: "/projects" }}
        ctaSecondary={{ label: "Book a Discovery Call", href: "/contact" }}
      />
      <ServicesOverview services={services} />
      <FeaturedProjects projects={featuredProjects} />
      <TestimonialsCarousel testimonials={testimonials} />
    </>
  );
}
