import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      description:
        "Web apps, APIs and dashboards built with .NET, React and Angular, from the database to the interface. I design the UI and visual assets myself in Photoshop and After Effects, so what gets built matches what the business actually needs and what users find easy to use.",
      title: "Web Application Development",
      subtitle: ".NET · React · Angular",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW1qa2hweDJvZm9tcXIwY3hlaXM2M2Y1YmtpeTlieXB4M3dxazdtdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif",
    },
    {
      description:
        "I map how a process runs today, find the repetitive steps and automate them with n8n and Zapier: lead capture, CRM updates, reports and follow-ups that connect the tools a team already uses, so people spend their time on work that needs them.",
      title: "Business Process Automation",
      subtitle: "n8n · Zapier · CRM",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFhb3lsdDk1NWp0OXZraDI4eGdmMmlneXlsNm11eXdoeThoNTE3cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0lGd2OXXHe4tFhb7Wh/giphy.gif",
    },
    {
      description:
        "Hosting, storage and deployment on Microsoft Azure or AWS, with CI/CD pipelines in Azure DevOps, so applications are reliable, secure and ready to grow without rebuilding them.",
      title: "Cloud Native Solutions",
      subtitle: "Azure, AWS",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWd6bmQweXBvejA1ZW55bzBocmhpNWNwZmJkMzB0aGsyMTE2aGh1MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fC4eVInYkUAR0a5hpK/giphy.gif",
    },
    {
      description:
        "Campaigns on Google Ads and Meta planned together with the product: audience, landing page, tracking and the automations that follow up on every lead. Because I also build the software, campaign data flows straight into the CRM and reports.",
      title: "Growth Marketing",
      subtitle: "Google Ads · Meta Ads · Funnels",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczJrYjBoZTNiZmdreXZiajZxaWhjMGxvdm1pMWlhcm92NXhzM3doZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XyJPNKBskIDWR3Md8K/giphy.gif",
    },
    {
      description:
        "Before writing code I sit with the client to understand the business, gather requirements and agree on what success looks like. Years of client-facing work taught me to explain technical decisions clearly, in Spanish or English.",
      title: "Business Analysis & Client Communication",
      subtitle: "Requirements · Discovery · ES / EN",
      src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxwZDNjc2VoeTJ0NXlremh4YnRpbGVydzVkbzRucm96dzN1aXhlNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3rgXBBaVvhPXk3NSnK/giphy.gif",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
