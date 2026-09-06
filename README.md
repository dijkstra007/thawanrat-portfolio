# Thawanrat T. — Graphic Designer

Portfolio website for Thawanrat T., focused on packaging design, brand identity,
and visual communication.

## Live site

[View the portfolio](https://dijkstra007.github.io/thawanrat-portfolio/)

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The `main` branch deploys automatically to GitHub Pages through GitHub Actions.

## Search indexing

`/work` shows all projects; `/work?category=Packaging` links to a category.
Each case study has a stable `/work/[slug]` URL, defined in `content/projects.ts`.
Keep published slugs unchanged when editing titles or translations. Browser Back
and Forward follow project navigation; closing a case study returns to `/work`.

`public/sitemap.xml` lists the homepage, work index, and all case studies.
Update it when adding or removing projects. Update the absolute URLs in both `public/sitemap.xml`
and `public/robots.txt` if the production address changes.

GitHub Pages serves this project's robots file at
`/thawanrat-portfolio/robots.txt`. Crawlers read robots rules only from the host
root (`https://dijkstra007.github.io/robots.txt`), so that root site's robots file
must also reference this sitemap for automatic discovery, or the sitemap can
be submitted directly to search engines.

After a GitHub Pages build, run `npm run test:routes` to check exported case
studies, share metadata, project links, and stable slugs.
