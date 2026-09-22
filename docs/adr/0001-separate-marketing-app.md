# Keep the public site in a separate app

Build Postora's marketing site and public documentation in apps/marketing-site, deployed at postora.com.br. Keep the authenticated app at app.postora.com.br. A separate app allows public pages to render and deploy independently of the existing authentication redirects and dashboard providers, at the cost of maintaining another application build. Use the app's design tokens to maintain visual consistency.
