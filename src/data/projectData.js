import easyPic from "../img/projects/easy.png";
import busPic from "../img/projects/watbus.png";
import eqrscannerPic from "../img/projects/eqrscanner.png";
import websitePic from "../img/projects/alexieyizhewebsite.png";

export const projectsList = [
  {
    name: 'Personal Site',
    desc: 'Error: Maximum recursion depth exceeded. (memory_address: 0xObebebebe)',
    color: '#9CCDA1',
    imgSource: websitePic,
    techStack: [
      {name: 'React', icon: 'devicons devicons-atom', color: '#3DAEFF' },
      {name: 'JavaScript', icon: 'devicons devicons-javascript', color: '#0062A8' },
      {name: 'Gatsby', icon: 'devicons devicons-opensource', color: '#7C2ACF' },
      {name: 'Webpack', icon: 'devicons devicons-webplatform', color: '#424242' },
      {name: 'HTML', icon: 'devicons devicons-html5', color: '#EE8407' },
      {name: 'CSS Grid', icon: 'devicons devicons-css3', color: '#4173D5' },
    ],
    actionLinks: [
      {name: "Web Demo", icon: "monitor", url: "https://alexieyizhe.me"},
      {name: "View on Github", icon: "github", url: "https://github.com/alexieyizhe/alexieyizhe.github.io"},
    ]
  },
  {
    name: 'EQRScanner',
    desc: 'Heads up to all Equithon 2018 volunteers: your job just got a whole lot simpler!',
    color: '#8185DD',
    imgSource: eqrscannerPic,
    techStack: [
      {name: 'TypeScript', icon: 'devicons devicons-javascript', color: '#0062A8' },
      {name: 'Angular', icon: 'devicons devicons-angular', color: '#8E2704' },
      {name: 'Ionic', icon: 'devicons devicons-ionic', color: '#008CD2' },
      {name: 'MongoDB', icon: 'devicons devicons-mongodb', color: '#03A800' },
      {name: 'Meteor', icon: 'devicons devicons-meteor', color: '#DF6034' },
    ],
    actionLinks: [
      {name: "App Store", icon: "shopping_bag", url: "https://itunes.apple.com/US/app/id1380247687"},
      {name: "Play Store", icon: "play_circle", url: "https://play.google.com/store/apps/details?id=ionic.eqrscanner"},
      {name: "View on Github", icon: "github", url: "https://github.com/alexieyizhe/eqrscanner"},
    ]
  },
  {
    name: 'Easy Recipeasy',
    desc: 'The one stop shop for all your "I need something for dinner" needs.',
    color: '#E85A3B',
    imgSource: easyPic,
    techStack: [
      {name: 'Ruby', icon: 'devicons devicons-ruby', color: '#A82B00' },
      {name: 'Rails', icon: 'devicons devicons-ruby_on_rails', color: '#A82B00' },
      {name: 'HTML', icon: 'devicons devicons-html5', color: '#EE8407' },
      {name: 'CSS', icon: 'devicons devicons-css3', color: '#4173D5' },
      {name: 'Bootstrap', icon: 'devicons devicons-bootstrap', color: '#6122A8' },
      {name: 'Edamam API', icon:  'devicons devicons-codepen', color: '#323232' },
      {name: 'MySQL', icon:  'devicons devicons-mysql', color: '#86A1A3' },
      {name: 'Heroku', icon:  'devicons devicons-heroku', color: '#9943A7' },
    ],
    actionLinks: [
      {name: "View on Web", icon: "monitor", url: "https://easy-recipeasy.herokuapp.com"},
      {name: "View on Github", icon: "github", url: "https://github.com/alexieyizhe/easy-recipeasy"},
    ]
  },
  {
    name: 'WATBus',
    desc: 'Out of data and wondering when the next GRT bus is? Wonder no longer.',
    color: '#436ABB',
    imgSource: busPic,
    techStack: [
      {name: 'Python', icon: 'devicons devicons-python', color: '#EDDD00' },
      {name: 'Flask Microframework', icon: 'devicons devicons-mootools_badge', color: '#4D5788' },
      {name: 'Grand River Transit API', icon: 'devicons devicons-codepen', color: '#323232' },
      {name: 'Heroku', icon: 'devicons devicons-heroku', color: '#9943A7' },
    ],
    actionLinks: [
      {name: "FB Messenger Demo", icon: "message_square", url: "https://m.me/553923414986147"},
      {name: "View on Github", icon: "github", url: "https://github.com/alexieyizhe/wat-bus"},
    ]
  },
]
