import { title } from "node:process";

export const en = {
   meta: {
      title: "Alireza Waterface | Frontend Developer",
      description:
         "Alireza Waterface | FrontEnd developer | Create modern and interactive websites using NextJS, React and JavaScript.",
      author: "Alireza Waterface",
      keywords:
         "freelancer,web developer,front-end developer,frontend developer,website developer,react developer,next.js developer,alireza abchehre,alireza waterface,abchehre,waterface",
      robots: "index, follow",
      openGraph: {
         title: "Alireza Waterface | Frontend Developer",
         description:
            "Alireza Waterface | FrontEnd developer | Create modern and interactive websites using NextJS, React and JavaScript.",
         url: "https://waterface.ir",
         siteName: "Portfolio of Alireza Waterface | FrontEnd Developer",
         locale: "fa_IR",
         type: "website",
         images: [
            {
               url: "https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/me/me.webp",
               width: 640,
               height: 640,
               alt: "Alireza Waterface",
            },
         ],
      },
   },
   nav: {
      home: "Home",
      capabilities: "Capabilities",
      projects: "Projects",
      resume: "Resume",
      blog: "Blog",
      contact: "Contact Me",
   },
   homePage: {
      header: {
         greeting: "Hello, welcome to my website",
         role: "I am Alireza Waterface, a FrontEnd Developer",
         desc: "More than 2 years of experience in web development, specializing in front-end.|Expert in NextJS, React, TypeScript and ...|Bachelor's degree in Computer Engineering from Kermanshah University of Technology",
         social: "Social media",
         skills: "Main skills",
      },
      capabilities: {
         title: "What I offer",
         desc: "Capabilities and skills",
         coOp: "Collaborating with clients and paying close attention to project needs",
         ready: "Ready to collaborate in a hybrid, remote and in-person manner",
         try: {
            part1: "Trying to",
            part2: "improve skills",
         },
         pation: "Interested in technology and passionate about coding",
         contact: {
            part1: "Ready to participate in website development and coding.",
            part2: "Contact me",
         },
      },
      samples: {
         title: "Portfolio",
         desc: "Some already done projects",
         all: "View all",
      },
      resume: {
         title: "Resume",
         desc: "More than 2 years of experience",
         skillsTab: {
            title: "Technical Skills",
            levels: {
               advanced: "Advanced",
               high: "High proficiency",
               medium: "Medium proficiency",
               low: "Low proficiency",
               preliminary: "Preliminary mastery",
            },
         },
         education: {
            title: "Education",
            highSchool: {
               title: "High school",
               desc: "Completed high school in sciences in June 2019",
            },
            bachelor: {
               title: "Bechelor",
               desc: "I started my bachelor degree in computer engineering at Kermanshah University of Technology in 2021 and completed it in 2025.",
            },
         },
         download: "Download resume",
      },
      contact: {
         title: "Contact me",
         desc: "Comtact me form",
         form: {
            name: "Full name",
            phone: "Phone number",
            subject: "Subject",
            desc: "Description",
            cancel: "Cancel",
            register: "Register",
         },
         info: {
            title: "Request for cooperation or project implementation",
            desc: "I am available and ready to do any project or work in the company. You can contact me through this form.",
            phone: "Phone number: ",
            email: "Email address: ",
         },
      },
   },
   footer: {
      related: "Related websites",
      copyright: "All rights reserved.",
   },
} as const;
