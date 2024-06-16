import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2021 - 2024",
    role: "Software Engineer",
    company: "Multilancer Ltd",
    description: `Developed high-performance software solutions, collaborating with cross-functional teams to meet user needs and industry standards. Translated requirements into technical specifications, optimized algorithms, and ensured quality through rigorous testing. Maintained and enhanced existing software, resolving issues and implementing improvements. Employed best practices in development, including version control and CI/CD.`,
    technologies: ["React", "Node", "CI/CD", "MongoDB"],
  },
  {
    year: "2019 - 2022",
    role: "Full Stack Developer",
    company: "Freelance",
    description: `Crafted dynamic web applications for a diverse clientele, blending frontend flair with robust backend functionality. Expertly translated client needs into technical solutions, ensuring clear communication and efficient project delivery. Managed databases, optimized performance, and implemented top-tier security protocols. Conducted rigorous testing and provided ongoing maintenance, adapting to evolving requirements.`,
    technologies: ["MERN", "Flask", "Rest APIs", "MySQL"],
  },
];

export const PROJECTS = [
  {
    title: "Shop TBJ",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart, payment gateway integration using paystack, and user authentication.",
    technologies: ["WordPress", "PHP", "MySQL", "Paystack"],
  },
  {
    title: "Task Management App",
    image: project2,
    description:
      "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "My personal portfolio website showcasing projects, skills, and contact information. Built using React, Vite, Framer Motion, and Tailwind CSS for a fast, responsive, and interactive experience.",
    technologies: ["React", "Vite", "Framer Motion", "Tailwind"],
  },
  {
    title: "Blogging Platform",
    image: project4,
    description:
      "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
    technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  },
];

export const CONTACT = {
  address: "Porth harcourt, Rivers State, Nigeria. ",
  phoneNo: "+234 704 235 9345 ",
  email: "dev@ogheneyole.com.ng",
};
