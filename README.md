# Thawanrat T. — Graphic Designer

Portfolio for packaging design, brand identity, and visual communication.

[View Fahworks](https://fahworks.com/)

## Local development

Requires Node.js 22.13 or newer. Run `npm ci`, then `npm run dev`.
The `main` branch deploys to GitHub Pages through GitHub Actions.

## Localized routes and SEO

English uses `/`, `/work/`, and `/work/[slug]/`. Thai uses `/th/`,
`/th/work/`, and `/th/work/[slug]/`. Both languages share the existing slugs
in `content/projects.ts`; keep them unchanged when editing project copy.
Only these two locale trees are exported. Unknown locales and slugs return 404.
GitHub Pages may redirect `/th` to the exported directory URL `/th/`, which returns 200.

Language links navigate to the same page in the other language. The URL is the
source of truth; browser storage cannot override it. Category filters remain
available at `/work/?category=Packaging` and `/th/work/?category=Packaging`.
Filtered views canonicalize to their locale’s unfiltered work index.

Separate root layouts render the correct HTML language. Shared SEO helpers emit
page-specific titles, descriptions, self-canonicals, EN/TH/x-default alternates,
social metadata, and Person/CreativeWork JSON-LD during rendering.
All public SEO URLs use `https://fahworks.com`, independent of build environment.
`app/sitemap.ts` generates the complete bilingual sitemap from project records.
`public/robots.txt` references that sitemap. No manual sitemap edits are needed.

## Validation

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH='' npm run build:pages
npm run test:routes
npm run test:images
```

Route tests inspect the exported HTML without JavaScript for every language/page
pair: metadata, one H1, structured data, image alts, language links, all project
links, sitemap coverage, heading spaces, and missing unsupported routes.
The PR workflow runs the Pages build and route checks before merge.

After deployment, run `npm run verify:live` to check live robots/sitemap URLs,
EN/TH home and work routes, one project pair, and language-switch link targets.
The deployment workflow runs this check automatically with a bounded retry for
Pages propagation. A failed live check does not roll back a completed deployment.

Owner action: submit `https://fahworks.com/sitemap.xml` in Google Search Console.
