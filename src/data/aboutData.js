import React from "react";
import Link from "gatsby-link";

export const STATS_COUNTER_DURATION = 3;

export const STATS_LIST = [
  {
    name: 'Trips Around The Sun',
    start: 0,
    end: 18,
  },
  {
    name: 'Hours Spent Coding',
    start: 0,
    end: 2984,
  },
  {
    name: 'Soccer Balls Kicked',
    start: 0,
    end: 973,
  },
  {
    name: 'Unpronounceable Last Name',
    start: 0,
    end: 1,
  }
];

export const DESC_PARAGRAPHS = [
  <span>
    I'm a diehard soccer fan, whether it's watching FC Barcelona - my favourite team - or getting
    on the field myself. Apart from soccer and coding, my other interests are <s>nonexistent</s> fitness,
    cooking, my husky-malamute Storm, and travelling. I've done a couple of solo trips that you can read about
    on <Link to="/blog">my blog</Link>!
  </span>,
  <span>
    My friends always tell me that I'm addicted to coding, but I like to think of it less as an addiction to coding
    and more as a passion for solving problems. I find myself engrossed in creating solutions to tough problems
    and pushing myself to always improve my skills and abilities; before you know it, I've been programming for
    hours upon hours. This is also one aspect of my skills that I'm constantly improving, so I'm also interested
    in more sustainable and long-term coding practices like Agile development and working in a professional environment.
  </span>,
  <span>
    However, I also believe that creating solutions to problems and learning new ideas aren't limited to the
    scope of studying and coding. I'm currently working with a huge amount of passionate individuals on organizing
    a <a href="https://www.tedxuw.com/" target="_blank">700+ attendee TEDx event</a>, powering one of
    the <a href="https://teamwaterloop.ca/" target="_blank">world's top 25 hyperloop teams</a>, and leading the next iteration
    of <a href="https://equithon.org/" target="_blank">Waterloo's largest social innovation hackathon</a>. These have been
    incredibly rewarding learning experiences that I cherish greatly, and I'm hoping to continue contributing and getting
    involved with various communities now and into the future.
  </span>,
  <span>
    At my previous co-op at Flipp, I worked with some other awesome peeps on the system
    responsible for indexing retailer products to power the results on Flipp's flyers and search results.
    Even though almost everything I worked on at Flipp is on the back-end, I'm extremely interested
    in the workings of the entire web stack. Stemming from the fact that I'm a very visual learner, I
    have a deep fascination with user interfaces and UX design. I absolutely love trawling the web for interesting
    articles and demos/case studies of said topic - stuff like human-computer interactions and subtle effects on
    user experience are my bread and butter. It's a major contributing factor to why I'm learning JavaScript,
    React, responsive design, and how to use tools like Figma and Adobe XD.
  </span>,
  <span>
    If you've made it this far, props (no React pun intended) to you 🥂 I'm always looking for new initiatives.
    If you have any questions or wanna chat, shoot me an email or find me on social media!
  </span>
]


export const INTERESTS_LIST = [
  { name: "Travel", icon: "briefcase" },
  { name: "Fitness", icon: "activity" },
  { name: "Games", icon: "crosshair" },
  { name: "Coding", icon: "code" },
  { name: "Volunteering", icon: "heart" }
]

export const SKILLS_LIST = [
  {
    type: 'languages',
    children: [
      { name: "JavaScript", icon: "javascript" },
      { name: "Ruby", icon: "ruby" },
      { name: "Python", icon: "python" },
    ]
  },
  {
    type: 'frameworks',
    children: [
      { name: "React", icon: "atom" },
      { name: "Ruby on Rails", icon: "ruby_on_rails" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "Ionic 3", icon: "ionic" },
      { name: "Angular 4", icon: "angular" },
      { name: "MeteorJS", icon: "meteor" },
    ]
  },
  {
    type: 'tools',
    children: [
      { name: "SQL Databases", icon: "database" },
      { name: "Terminal (Bash)", icon: "terminal" },
      { name: "MongoDB & NoSQL DBs", icon: "mongodb" },
      { name: "Git", icon: "git_branch" },
      { name: "Creative Problem Solving", icon: "stackoverflow" },
    ],
  }
]
