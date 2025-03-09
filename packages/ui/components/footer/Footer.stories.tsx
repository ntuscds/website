import { type Meta, type StoryFn } from "@storybook/react";

import { Footer } from "./Footer";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default {
  title: "Components/Footer",
  component: Footer,
  argTypes: {},
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  logoProps: {
    src: "/scse-logo/scse-logo-red.png",
    alt: "scse logo",
  },
  socialLinks: [
    { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/ntuscseclub/" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://sg.linkedin.com/company/ntu-scseclub" },
    { name: "GitHub", icon: FaGithub, href: "https://github.com/ntuscds" },
  ],
  studentLinksGroup: {
    header: "For Students",
    links: [
      { label: "Academics", href: "/academics" },
      // { label: "Events", href: "/events" },
      { label: "Join a Subcommittee", href: "/join" },
      { label: "Learn", href: "/learn" },
      { label: "Feedback", href: "/contact" },
    ]
  },
  companyLinksGroup: {
    header: "For Companies",
    links: [
      { label: "Sponsor Us", href: "/sponsors" },
      { label: "Contact", href: "/contact" },
    ]
  },
  vercelPoweredProps: {
    href: "https://vercel.com/?utm_source=cse-it&&utm_campaign=oss",
    src: "/powered-by-vercel.svg",
    alt: "Powered by Vercel Branding",
    width: 155,
    height: 155,
  },
};
