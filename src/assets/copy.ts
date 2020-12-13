import {
  AboutMainImg,
  AboutMtlImg,
  AboutPrideImg,
  SaluteImg,
  YelpLyfeImg,
  HmmPic,
  UhhPic,
  FlippCoverPhoto,
  FlippShowcaseImg,
  HacktheNorthShowcaseImg,
  EquithonShowcaseImg,
  InternPlusShowcaseImg,
  FaireShowcaseImg,
  GearIcon,
  PlusIcon,
  PresentIcon,
  LightbulbIcon,
  ShoppingCartIcon,
} from "~assets/images";

import {
  Resume2013PDF,
  Resume2013Img,
  ResumeCurrentPDF,
  ResumeCurrentImg,
} from "~assets/resume";

const FEATURED_CARDS = [
  {
    title: "Catch ya on the Flipp side ✌️",
    desc: ["Learn about my experience as a Software Engineer Intern at Flipp!"],
    linkText: "Read the article",
    linkHref:
      "https://medium.com/@alexieyizhe/catch-ya-on-the-flipp-side-ae3b41c1514f",
    imgSrc: FlippCoverPhoto,
    imgAlt: "A phone in a background displaying the Flipp app",
  },
  {
    title: "Building a cohesive design system ✨",
    desc: [
      "Even for personal projects, my goal is maintainability and consistency.",
      "That’s why I built a component system for use on this very site you’re looking at!",
    ],
    linkText: "See the system",
    linkHref: "/design-system",
  },
];

const SHOWN_CARDS = FEATURED_CARDS.sort(() => 0.5 - Math.random());

export default {
  seo: {
    title: "Alex Xie",
    description:
      "Personal website and portfolio of Alex Yizhe Xie, a computer science student at the University of Waterloo.",
  },
  mainLandingSection: {
    greetings: [
      "Hi!",
      "Hey!",
      "Sup?",
      "Howdy!",
      "Heya!",
      "Heyo!",
      "Yo!",
      "你好!",
      "Bonjour!",
      "👋 !",
    ],
    name: "Alex Xie.",
    taglinePrefix: "I'm a ",
    taglines: [
      `keyboard puncher.`,
      "happy wallflower.",
      "lover of bad puns.",
      "struggling rock climber.",
      "cs student.",
      "comic sans advocate.",
      "soccer fanatic.",
    ],
    links: {
      resume: "/resume",
      github: "https://github.com/alexieyizhe",
      mail: "mailto:hi@alexxie.ca",
      linkedin: "https://linkedin.com/in/alexieyizhe",
    },
  },
  featuredSection: {
    heading: "Featured Highlights",
    cards: {
      first: {
        title: "Behind the scenes of building intern+",
        desc: [
          "Get a look behind the design process of the internship resource site I created.",
        ],
        linkText: "Check it out",
        linkHref: "https://www.youtube.com/watch?v=0Ioruq2xIXw",
        videoSrc:
          "https://www.youtube.com/embed/0Ioruq2xIXw?controls=0&autoplay=1",
      },
      second: {
        title: "Seeking internship opportunities!",
        desc: [
          "Are you looking for an intern? What a coincidence! I'm looking for an internship. We're like a match made in heaven :0",
        ],
        linkText: "Check out my resume",
        linkHref: "/resume",
      },
      third: SHOWN_CARDS[0],
    },
  },
  aboutSection: {
    heading: "Look, it me!",
    galleryImages: [AboutMainImg, AboutMtlImg, AboutPrideImg],
    galleryEasterEggImages: [SaluteImg, YelpLyfeImg, HmmPic, UhhPic],
    desc: [
      "I'm Alex Yizhe Xie, a computer science student in my junior year at the University of Waterloo.",
      "My passions include rock climbing, coding for good, and human-computer interaction design.",
    ],
    readMore: {
      linkText: "Find out more",
      linkHref: "/about",
    },
  },
  showcaseSection: {
    heading: "I've worked on...",
    cards: [
      {
        title: "Making an impact on the future of local retail.",
        subtitle: "Faire",
        imgSrc: FaireShowcaseImg,
        imgAlt: "Home page of Faire",
        linkText: "Learn more",
        linkHref: "https://www.faire.com/about",
        customParticle: PresentIcon,
        color: "#CEAD00",
      },
      {
        title: "Helping peers find high quality internships.",
        subtitle: "intern+",
        imgSrc: InternPlusShowcaseImg,
        imgAlt: "Home page of intern.plus",
        linkText: "Check it out",
        linkHref: "https://intern.plus",
        customParticle: PlusIcon,
        color: "rgb(24, 50, 73)",
      },
      {
        title:
          "Building captivating experiences for Canada's biggest hackathon.",
        subtitle: "Hack the North",
        imgSrc: HacktheNorthShowcaseImg,
        imgAlt: "Home page of Hack the North",
        linkText: "Learn more",
        linkHref: "https://hackthenorth.com",
        customParticle: GearIcon,
        color: "#0E3460",
      },
      {
        title: "Bringing print flyers into the digital medium.",
        subtitle: "Flipp",
        imgSrc: FlippShowcaseImg,
        imgAlt: "Flipp's main dashboard for digital publishing",
        linkText: "More info",
        linkHref: "https://eng.flipp.com/",
        customParticle: ShoppingCartIcon,
        color: "#00c6d7",
      },
      {
        title: "Enabling social innovation through tech.",
        subtitle: "Equithon",
        imgSrc: EquithonShowcaseImg,
        imgAlt: "Equithon's web platform after a rebuild",
        linkText: "See my work",
        linkHref: "https://github.com/equithon",
        customParticle: LightbulbIcon,
        color: "rgb(160, 94, 204)",
      },
    ],
  },
  designSystemSection: {
    heading: "Maintaining consistency, even in the small details.",
    subheading: "Design System",
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
          "Apart from grey and black, I chose to use playful pastel colors to contrast with the monotone white and blacks of text. These allow elements like the particle to bring a splash of color whenever needed.",
        ],
      },
      typeface: {
        title: "Typeface",
        desc: ["This is Overpass. It's a nice font. I like it."],
      },
      text: {
        title: "Text",
        desc: [
          "Every heading, subtitle, or block of text that you see on the site is styled through the Text component. This means it needs to be extremely versatile, but I didn't want to sacrifice consistency in order to accomplish this.",
          "As a result, the Text component allows for preset variants like 'heading' or 'body' to be specified, which will apply preset properties to the wrapped text. However, for flexibility, you can also specify each individual attribute (size, color, font weight, etc.) individually.",
        ],
      },
      icon: {
        title: "Icon",
        desc: [
          "Icons are a visual text-free way of conveying information.",
          "Just like text, you can specify every property of an icon individually for flexibility, and the icon drawing can be animated if desired.",
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
        desc: [
          "Useful for displaying pictures, a Gallery dynamically adjusts available buttons based on number of pictures.",
        ],
      },
      card: {
        title: "Cards",
        desc: [
          "As cards are used for dozens of types of contents and layouts, they are essentially the Text component of the container world.",
          "There are currently two variants of a simple card: a ShowcaseCard and ContentCard that allow for display of content in appealing ways.",
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
  footer: {
    text: "made with a ⌨️ and a whole lotta googling.",
    easterEggText: "you found the easter egg :0 wow cool",
  },
  resumePage: {
    heading: "Resume",
    resumes: [
      {
        name: "A very, very old",
        img: Resume2013Img,
        file: Resume2013PDF,
      },
      {
        name: "Summer 2020 (Current)",
        img: ResumeCurrentImg,
        file: ResumeCurrentPDF,
        current: true,
      },
    ],
  },
};
