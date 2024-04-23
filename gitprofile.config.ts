// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'manavcodaty', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 6, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['manavcodaty/StockMax', 'manavcodaty/Computer_Science', 'manavcodaty/Other_Projects'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'StockMax',
          description:
            'StockMax is a Ai powered app that uses Ai to predict the price of indivual stocks and can take into account your entire portfolio of stocks. It has other features such as a chaatbot powered by Gemini.',
          imageUrl:
            'https://cdn-icons-png.flaticon.com/512/564/564398.png',
          link: 'www.github.com/manavcodaty/StockMax',
        },
        {
          title: 'Other_Projects',
          description:
            'Other projects that I am doing in addition to my IGCSE Computer Science Course. Some projects include, learning Java, an inventory management program and a text based monopoly!',
          imageUrl:
            'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
          link: 'www.github.com/manavcodaty/Other_Projects',
        },
      ],
    },
  },
  seo: {
    title: 'Portfolio of Manav Codaty',
    description: 'This is the portfolio for Manav Codaty a passionate IGCSE Computer Science student studying in Dubai, UAE at Dubai English Speaking College',
    imageURL: '',
  },
  social: {
    linkedin: '',
    twitter: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: 'manavcodaty',
    youtube: '', // example: 'pewdiepie'
    dribbble: '',
    behance: '',
    medium: 'manavcodaty',
    dev: 'manavcodaty',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: 'This is my website!',
    phone: '+971 52 978 7466',
    email: 'manav.codaty@gmail.com',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Javascript',
    'Python',
    'Pandas',
    'Django',
    'SQL',
    'TensorFlow',
    'MySQL',
    'PostgreSQL',
    'Git',
    'Docker',
    'HTML',
    'CSS',
    'Javascript',
    'Figma',
  ],
  
  certifications: [
    {
      name: 'IGCSE Computer Science',
      body: 'CIE Exam Board',
      year: 'March 2027',
      link: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/',
    },
  ],
  educations: [
    {
      institution: 'Dubai English Speaking College',
      degree: 'Computer Science',
      from: '2020',
      to: '2027',
    },
    
  ],

  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'manavcodaty', // to hide blog section, keep it empty
    limit: 4, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made by <a 
      class="text-primary" href="https://github.com/manavcodaty/"
      target="_blank"
      rel="noreferrer"
    >Manav Codaty</a> and my genius`,

  enablePWA: true,
};

export default CONFIG;
