import { FlippHero, TestShowcaseImage } from "~assets/images";

export default {
  mainLandingSection: {
    greetings: [
      "Hi!",
      "Hey!",
      "Sup?",
      "Howdy!",
      "Heya!",
      "Yo!",
      "你好!",
      "Bonjour!",
      "👋 !",
    ],
    name: "Alex Xie.",
    taglinePrefix: "I'm a ",
    taglines: [
      `code enthusiast.`,
      "happy wallflower.",
      "struggling rock climber.",
      "lover of bad puns.",
      "computer science student.",
      "budding developer.",
      "soccer fanatic.",
    ],
  },
  featuredSection: {
    title: "Featured Highlights",
    cards: {
      first: {
        title: "Catch ya on the Flipp side ✌️",
        desc: [
          "Wrote a little bit about my experience as a Software Engineer Intern at Flipp Corp!",
        ],
        linkText: "Read the article",
        linkHref:
          "https://medium.com/@alexieyizhe/catch-ya-on-the-flipp-side-ae3b41c1514f",
        imgSrc: FlippHero,
        imgAlt: "A phone in a background displaying the Flipp app",
      },
      second: {
        title: "Currently seeking Spring 2020 internship opportunities!",
        desc: [
          "Are you looking for an intern? What a coincidence! I'm looking for an internship. We're like a match made in heaven :0",
        ],
        linkText: "Check out my resume",
        linkHref: "/resume",
      },
      third: {
        title: "Building a cohesive design system",
        desc: [
          "Even for personal projects, my goal maintainability and consistency.",
          "That’s why I built a component library system for use on this very portfolio site you’re looking at, and wrote about my process.",
        ],
        linkText: "Check it out",
        linkHref: "/design-system",
      },
    },
  },
  showcaseSection: {
    title: "Stuff I've Done",
    cards: [
      {
        title: "Building Canada's largest hackathon.",
        subtitle: "Hack the North",
        imgSrc: TestShowcaseImage,
        imgAlt: "A test image",
        linkText: "Read more",
        linkHref: "/",
      },
      {
        title: "Building Canada's largest hackathon.",
        subtitle: "Hack the North",
        imgSrc: TestShowcaseImage,
        imgAlt: "A test image",
        linkText: "Read more",
        linkHref: "/",
      },
      {
        title: "Building Canada's largest hackathon.",
        subtitle: "Hack the North",
        imgSrc: TestShowcaseImage,
        imgAlt: "A test image",
        linkText: "Read more",
        linkHref: "/",
      },
    ],
  },
  designSystemSection: {
    title: "Maintaining consistency, even in the small details.",
    subtitle: "Design System",
    sections: {
      intro: {
        title: "Why a design system?",
        desc: [
          "A design system of colors, fonts, sizes, and components ensures that a site is cohesive. It allows for better user experience, but also a better developer (and designer) experience.",
          "For users, one of the principles of interaction design is learnability. With a consistent theme across a site, navigating it will never feel unfamiliar.",
          "For developers and designers, the main benefit is reusability. I can be confident in using an existing component, knowing it will fit with the theme of the site and function as intended.",
        ],
      },
      palette: {
        title: "Palette",
        desc: [
          "Apart from grey and black, I chose to use playful pastel colors to contrast with the monotone white and blacks of text. These allow the particles to feel....",
        ],
      },
      typeface: {
        title: "Typeface",
        desc: ["I decided to go with this font for....."],
      },
      text: {
        title: "Text",
        desc: [
          "Apart from grey and black, I chose to use playful pastel colors to contrast with the monotone white and blacks of text. These allow the particles to feel....",
        ],
      },
      icon: {
        title: "Icon",
        desc: [
          "Icons are a visual text-free tool to quickly identify the function or type of a component....",
        ],
      },
      linkandbutton: {
        title: "Links & Buttons",
        desc: [
          "Links and buttons serve almost the same purpose in an app like this website. They either link to external URLs or to a different page on this site.",
          "Text links essentially function as naked buttons, allowing icon buttons to be consistently rounded. Icon buttons can dynamically change their icon based on a passed prop.",
        ],
      },
      gallery: {
        title: "Gallery",
        desc: ["Iwegowjepgwegpewjgpoewjpgwejogonent...."],
      },
      card: {
        title: "Cards",
        desc: [
          "As cards are used for dozens of types of contents and layouts, they have to be versatile and flexible....",
        ],
      },
      particle: {
        title: "Particles",
        desc: [
          "Although purely for decoration, it’s good to stay consistent with the particle shapes used on the site as well for reusability.",
          "Even though the same 5 shapes are used throughout the site, variation can be achieved through coloring, positioning, or sizing them differently.",
        ],
      },
    },
  },
};
