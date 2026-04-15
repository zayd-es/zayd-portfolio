import { Layout, Smartphone, MousePointer2, Palette } from "lucide-react";
import { 
  SiHtml5, 
  SiCss, 
  SiTailwindcss, 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiGit, 
   SiShadcnui,        
  SiGithub           
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Code2, GraduationCap, Laptop, Terminal, Rocket } from "lucide-react";

import screenChatbot from './screen Chatbot.png';
import screenDashboard from './screen Dashboard.png';

export const workData = [
    {
        title: 'AI ChatBot',
        description: 'AI-Powered conversational interface built with React and API integration.',
        bgImage: screenChatbot, 
        link: 'https://ai-chatbot-one-blue-38.vercel.app'
    },
    {
        title: 'Admin Dashboard',
        description: 'Modern analytics dashboard featuring Shadcn/UI and Next.js performance.',
        bgImage: screenDashboard, 
        link: 'https://next16-shadcn-dashboard.vercel.app'
      },
   
];
export const serviceData = [
  {
    Icon: Layout,
    title: 'Frontend Development',
    description: 'Specializing in building modern, high-performance web applications using React and Next.js with clean, maintainable code.',
    link: '#work'
  },
  {
    Icon: Smartphone,
    title: 'Responsive Design',
    description: 'Ensuring your website looks and works perfectly on all devices, from mobile phones to large desktop screens.',
    link: '#work'
  },
  {
    Icon: MousePointer2,
    title: 'Modern UI/UX',
    description: 'Transforming complex requirements into intuitive, user-friendly interfaces with smooth animations and modern aesthetics.',
    link: '#work'
  },
  {
    Icon: Palette,
    title: 'UI Implementation',
    description: 'Converting Figma designs into pixel-perfect, interactive components using Tailwind CSS and modern UI libraries.',
    link: '#work'
  },
];


export const infoList = [
  {
    icon: Terminal,
    title: 'Tech Stack',
    description: 'React, Next.js, Tailwind CSS' 
  },
  {
    icon: Laptop,
    title: 'Freelance Experience',
    description: 'Developed custom web solutions for diverse clients'
  },
  {
    icon: Rocket, 
    title: 'Main Projects',
    description: 'AI ChatBots, Admin Dashboards & E-commerce '
  }
];



export const tools = [
  { Icon: SiHtml5, name: "HTML", color: "#E34F26" },
  { Icon: SiCss, name: "CSS", color: "#1572B6" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { Icon: SiReact, name: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, name: "Next.js",color: "#4b5563" },
  { Icon: SiGit, name: "Git", color: "#F05032" },
  { Icon: SiGithub, name: "GitHub", color: "#6e5494" },
  { Icon: VscVscode, name: "VS Code", color: "#007ACC" },
  { Icon: SiShadcnui, name: "Shadcn UI", color: "#000000" },
];