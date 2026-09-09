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

## Google Analytics 4

The **Fahworks Portfolio** property contains the **Fahworks Website** web stream
for `https://www.fahworks.com/`, with Measurement ID `G-GV1LS2F6M0`.
Reporting uses Thailand time and Thai baht, with enhanced measurement enabled.
The public Measurement ID is configured as the repository Actions variable
`NEXT_PUBLIC_GA_MEASUREMENT_ID`.

To replace the analytics property:

1. Open [Google Analytics](https://analytics.google.com/) and create an account
   and a property named **Thawanrat Portfolio** (or use an existing property).
2. Add a **Web** data stream for
   `https://www.fahworks.com/` and copy its `G-…`
   Measurement ID. Leave enhanced measurement enabled for standard interactions.
3. In the GitHub repository, open **Settings → Secrets and variables → Actions →
   Variables**, then add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with that ID.
   This is a public tag identifier, not an API key or password.
4. Deploy the updated `main` branch, or run **Deploy portfolio to GitHub Pages**
   manually if the code is already on `main`. The ID is embedded at build time,
   so changing the variable requires a new deployment.
5. Visit the live site and check **Reports → Realtime** in Google Analytics.

For a local production build, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`.
Development mode never loads the tag. Missing or malformed IDs disable it.
Remove the variable and redeploy to disable analytics on the live site.

The shared document layout loads the tag on both English and Thai pages.
Enhanced measurement tracks page views and supported interactions.
No custom interaction events are configured.

See [Google's setup guide](https://support.google.com/analytics/answer/9304153).
