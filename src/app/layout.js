import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const outfit = Outfit({
  subsets: ["latin"], weight:["400","500","600","700" ]
});
const ovo = Ovo({
  subsets: ["latin"],weight:["400"]
});

export const metadata = {
  title: "Zayd | Frontend Developer",
  description: "Zayd's professional portfolio showcasing modern web development projects using React, Next.js, and Tailwind CSS.",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem("theme");
                  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  
                  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" 
        />
      </head>

      <body
       
       suppressHydrationWarning
       className={`${outfit.className} antialiased leading-8 overflow-x-hidden bg-white text-gray-900 dark:bg-[#0b0118] dark:text-white transition-colors duration-300`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

