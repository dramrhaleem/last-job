import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function githubDefaults() {
  const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? []
  const isUserSite =
    Boolean(owner && repository) &&
    repository.toLowerCase() === `${owner.toLowerCase()}.github.io`

  if (!owner || !repository) {
    return {
      base: '/',
      siteUrl: 'http://localhost:4173',
    }
  }

  return {
    base: isUserSite ? '/' : `/${repository}/`,
    siteUrl: isUserSite
      ? `https://${repository}`
      : `https://${owner}.github.io/${repository}`,
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const defaults = githubDefaults()

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          const siteUrl = (env.VITE_SITE_URL || defaults.siteUrl).replace(/\/$/, '')
          return html.replaceAll('__SITE_URL__', siteUrl)
        },
      },
    ],
    base: env.VITE_BASE_PATH || defaults.base,
  }
})
