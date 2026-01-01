import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  title: 'fbx-armbian',
  description: 'Documentation pour installer Armbian sur Freebox Player',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    outline: {
      label: 'Sur cette page'
    },

    returnToTopLabel: 'Retour en haut',

    darkModeSwitchLabel: 'Apparence',
    darkModeSwitchTitle: 'Passer en mode sombre',
    lightModeSwitchTitle: 'Passer en mode clair',

    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante'
    },

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Pop Player', link: '/pop-player/' },
      { text: 'Installation', link: '/pop-player/installation' },
      { text: 'Dépannage', link: '/pop-player/troubleshooting' }
    ],

    sidebar: {
      '/pop-player/': [
        {
          text: 'Freebox Pop Player',
          items: [
            { text: 'Vue d’ensemble', link: '/pop-player/' },
          ]
        },
        {
          text: 'Armbian',
          items: [
            { text: 'Installation', link: '/pop-player/installation' },
            { text: 'Dépannage', link: '/pop-player/troubleshooting' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Unpaperweighted/fbx-armbian' }
    ]
  }
})
