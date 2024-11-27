export const siteConfig = {
  name: 'SN 2.0',
  description: 'Next.js social networking platform',
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: 'https://your-domain.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/your-handle',
    github: 'https://github.com/your-handle',
  },
  creator: 'Your Name',
}

export type SiteConfig = typeof siteConfig
