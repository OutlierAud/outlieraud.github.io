// js/category_style.js — single source of truth for every category.
// The KEY (about, projects, stories, musings, contact) must match:
//   - the URL folder:   /projects/landing.html
//   - the JSON file:    /json/projects.json
//   - the content dir:  /json/content/projects/
// The "name" field is purely for display.

const categoryStyle = {
  about: {
    name: 'About',
    color: '#8e0072',
    url: '/about/landing.html',
    
  },
  projects: {
    name: 'Projects',
    color: '#b8860b',
    url: '/projects/landing.html',
    subhead: 'The silent rows of data tell a story, and I want to hear it.',
    description:
      'Each project starts with a real-world question and the desire to find out what the data has to say. From data validation to engineering, to analysis, inference, visualisation and storytelling, it\'s a process that requires careful planning, patience, and persistence to see it through. <br><br>Tedious? Yes. <br>Rewarding? Absolutely. <br>And dare I say, even fun. <br><br>I\'m such a sucker for pain.',
  },
  stories: {
    name: 'Data Storytelling',
    color: '#6b4a7a',
    url: '/stories/landing.html',
    subhead: 'And so the story goes... Embracing the narrative power of visualisation',
    description:
      'Not all data arrives in a glass slipper. Some of it needs a little coaxing, a change of outfit, and a fairy godmother with a flair for visual storytelling.<br><br>I aspire to be the fairy godmother of data. I want to turn numbers and findings into something tangible, relatable, and ready for the ball. A little visualisation here, a touch of personality there, and voilà!  Hopefully, a compelling data story that sparks curiosity, shifts perspectives, or inspires action. And, perhaps, even becomes a catalyst for change. 💫',
  },
  musings: {
    name: 'Musings',
    color: '#3f6b4a',
    url: '/musings/landing.html',
    subhead: 'When the luxury of time allows a little wandering...',
    description:
      'Ideas, questions, discoveries, and the occasional opinion. This is where I think out loud, turn things over in my mind, and explore where a little curiosity might lead. <br><br>Not everything needs a conclusion. Some things are worth chewing on. And so I chew.',
  },
  contact: {
    name: 'Contact',
    color: '#8e0072',
    url: '/contact/getintouch.html',
    
  },
};