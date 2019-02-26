import { css } from 'styled-components';

const displaySizes = {
  desktop: 2160,
  tablet: 1024,
  phone: 425
}

// Iterate through the sizes and create a media template
export const mediaSize = Object.keys(displaySizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${displaySizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})



export const menuPageOptions = [
  {
    text: 'Home',
    route: '/',
    colour: '#F7A3F2'
  },
  {
    text: 'About',
    route: '/about',
    colour: '#8EE8A7'
  },
  {
    text: 'Experience',
    route: '/experience',
    colour: '#F4B276'
  },
  {
    text: 'Projects',
    route: '/projects',
    colour: '#A6CAF5'
  },
  {
    text: 'Blog',
    route: '/blog',
    colour: '#E7EC83'
  },
  {
    text: 'Archive',
    route: '/archive',
    colour: '#EE9AB8'
  },
];

export const contactOptions = [
  {
    text: 'say hi!',
  },
  {
    text: 'resume'
  },
  {
    text: 'github'
  },
  {
    text: 'linkedin'
  }
];

export const resumeOptions = [
  {
    name: 'Long Ago',
    previewSource: '/img/resume/2013-resume.jpg',
    downloadName: 'Alex Xie - Resume (I was 13 when I made this ok)',
    downloadSource: '/docs/2013-resume.pdf',
    color: '#cdc66b'
  },
  {
    name: 'Oct 2017',
    previewSource: '/img/resume/2017-10-resume.png',
    downloadName: 'Alex Xie - Resume (Oct 2017)',
    downloadSource: '/docs/2017-10-resume.pdf',
    color: '#F4B276'
  },
  {
    name: 'Feb 2018',
    previewSource: '/img/resume/2018-02-resume.png',
    downloadName: 'Alex Xie - Resume (Feb 2018)',
    downloadSource: '/docs/2018-02-resume.pdf',
    color: '#8EE8A7'
  },
  {
    name: 'July 2018',
    previewSource: '/img/resume/2018-07-resume.png',
    downloadName: 'Alex Xie - Resume (Aug 2018)',
    downloadSource: '/docs/2018-07-resume.pdf',
    color: '#EE9AB8'
  },
  {
    name: 'Current',
    previewSource: '/img/resume/2019-01-resume.png',
    downloadName: 'Alex Xie - Resume',
    downloadSource: '/docs/2019-01-resume.pdf',
    color: '#88dbe3'
  },
];

export const greetingOptions = ['Hi!', 'Hey!', 'Sup?', 'Howdy!', 'Heya!', 'Yo!', '你好!', 'Bonjour!', '👋 !']

export const particleConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 3500
      }
    },
    "color": {
      "value": ["#BD10E0","#B8E986","#50E3C2","#FFD300","#E86363"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.4,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4.008530152163807,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
