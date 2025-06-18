import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      description:
        "Building modern, responsive, and scalable web applications using technologies like .NET, React, and Angular. This includes designing intuitive user interfaces, implementing robust backend logic, and ensuring seamless integration between frontend and backend systems to deliver high-performance, user-friendly digital experiences.",
      title: "Web Application Development",
      subtitle: "Full Stack Developer",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW1qa2hweDJvZm9tcXIwY3hlaXM2M2Y1YmtpeTlieXB4M3dxazdtdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif",
    },
    {
      description:
        "Streamlining and automating repetitive business tasks and workflows to improve efficiency, minimize errors, and reduce manual effort. This involves implementing software solutions that manage routine operations, seamlessly integrate with existing systems, and free up employees to focus on higher-value work—ultimately boosting productivity and operational accuracy",
      title: "Business Process Automation:",
      subtitle: "N8N Integration",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFhb3lsdDk1NWp0OXZraDI4eGdmMmlneXlsNm11eXdoeThoNTE3cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0lGd2OXXHe4tFhb7Wh/giphy.gif",
    },
    {
      description:
        "Connecting applications to cloud platforms like Microsoft Azure or Amazon Web Services for hosting, storage, and advanced cloud-native features. This includes deploying scalable solutions, integrating with cloud-based services, and leveraging platform tools to enhance performance, security, and reliability while enabling seamless growth and modernization.",
      title: "Cloud Native Solutions",
      subtitle: "Azure, AWS",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWd6bmQweXBvejA1ZW55bzBocmhpNWNwZmJkMzB0aGsyMTE2aGh1MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fC4eVInYkUAR0a5hpK/giphy.gif",
    },
    {
      description:
        "Developing comprehensive plans to achieve business goals through online channels, including market research, audience targeting, and campaign planning. This also involves creating engaging content tailored to the target audience, selecting the most effective digital platforms, and continuously optimizing strategies to maximize reach and results.",
      title: "Digital Marketing",
      subtitle: "Google Ads, Facebook Ads and more",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczJrYjBoZTNiZmdreXZiajZxaWhjMGxvdm1pMWlhcm92NXhzM3doZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XyJPNKBskIDWR3Md8K/giphy.gif",
    },
    {
      description:
        "Provides professional customer support and accurate translation services, ensuring clear communication, effective problem-solving, and helping clients connect with a broader, multilingual audience.",
      title: "Customer Service & Translations Services",
      subtitle: "Sales representative, Translator, Customer support",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3BxcHphbTE5czJheTl3M3lyajY3cTV6ejNkajc2ZXJwZDc2ODg4NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3rgXBBaVvhPXk3NSnK/giphy.gif",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
