# Academic personal website template

A lightweight personal/academic website built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/), designed to be forked and turned into your own site in about an hour.

Live example: **[quentingiton.github.io](https://quentingiton.github.io)**

Most of the site is driven by JSON files: you edit a few `.json` files, drop your PDFs in a folder, replace one profile card, and deploy. No CMS, no backend, no database.

---

## What you get

- **Home page** with a profile card (photo, affiliation, contact icons, "About me") plus previews of your latest content
- **Five content sections** — Publications, Teaching, Talks, Short notes, Blog — each with its own page, all fed by JSON
- **Automatic hiding**: a section whose JSON file is an empty array disappears from both the home page and the navigation bar. Nothing to comment out.
- **PDF links** for papers, lecture notes, exercise sheets and slides
- **Blog** with posts written in Markdown, including LaTeX support
- **BibTeX "Cite" modal** with copy-to-clipboard for publications
- **Scripts section** for interactive demos (Plotly-based; two examples included)
- **MathJax** loaded globally, so you can write LaTeX in your content
- **One-command deploy** to GitHub Pages

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (developed on Node 22, npm 10)
- A GitHub account, if you want to deploy on GitHub Pages

## Quick start

```sh
# 1. Fork this repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev
```

Available scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Builds to `dist/`, then copies `index.html` to `404.html` (see [Deployment](#deployment)) |
| `npm run preview` | Serves the production build locally |
| `npm run deploy` | Builds and pushes `dist/` to the `gh-pages` branch |
| `npm run lint` / `npm run lint-fix` | ESLint check / autofix |

---

## Make it yours

### 1. Replace the personal identity

These are the only places where the original author's details are hardcoded. Go through all of them:

| File | What to change |
| --- | --- |
| [src/components/ProfileCard.vue](src/components/ProfileCard.vue) | Name, photo, affiliation link, email, Google Scholar link, "About me" text |
| [src/assets/images/](src/assets/images/) | Replace `quentin_profile.jpg` with your own picture (square, ~400×400 or larger — it is cropped to a circle) |
| [src/App.vue:4](src/App.vue#L4) | The name shown top-left in the navigation bar |
| [index.html:8](index.html#L8) | The `<title>` of the site |
| [index.html:5](index.html#L5) | **Delete** the `google-site-verification` meta tag — it belongs to the original owner's Search Console |
| [index.html:10](index.html#L10) | The Font Awesome kit URL is a personal kit. Sign up for a [free kit](https://fontawesome.com/kits) and swap the ID, or the icons may stop working for you one day |
| [package.json:2](package.json#L2) | The `name` field |
| [public/favicon.ico](public/favicon.ico) | Your favicon |

The contact icons use [Font Awesome](https://fontawesome.com/icons) (`fa-` classes) and [Academicons](https://jpswalsh.github.io/academicons/) (`ai-` classes, for Scholar / arXiv / ORCID / etc.). Add or remove `<a>` blocks in the `.contact-icons` div as you like.

### 2. Put in your own content

All content lives in [src/assets/json/](src/assets/json/). Each file is a plain JSON array of objects — see [Content reference](#content-reference) below for the fields.

Start by emptying the ones you don't need yet:

```json
[]
```

An empty array is enough to hide the section entirely — the home page block and the navbar link both disappear.

### 3. Add your PDFs

Put files anywhere under [public/pdf/](public/pdf/) and reference them from JSON with a **leading slash and no `public/` prefix**:

```
public/pdf/talks/25-26/CS26.pdf   →   "file": "/pdf/talks/25-26/CS26.pdf"
```

Anything in `public/` is copied as-is to the site root at build time. The existing subfolder layout (`publications/`, `teaching/`, `talks/`, `notes/`) is just a convention — reorganize it freely.

### 4. Adjust the look

Colors live in [src/assets/less/variables.less](src/assets/less/variables.less) — change `@accent-color` and you have changed most of the site's personality. Shared layout rules (the two-column `.container`, typography, buttons) are in [src/assets/less/main.less](src/assets/less/main.less). Component-specific styles are in `<style lang="less" scoped>` blocks inside each `.vue` file.

### 5. Add or remove sections

To **remove** a section completely (rather than just emptying it), delete its route in [src/router.js](src/router.js), its `<RouterLink>` in [src/App.vue](src/App.vue), and its block in [src/components/ComponentManager.vue](src/components/ComponentManager.vue).

To **add** one, the fastest path is to copy an existing trio and rename it: a view in [src/views/](src/views/) (full list page), a component in [src/components/](src/components/) (home-page preview), an item component (one entry), and a JSON file. Then register the route and the navbar link.

---

## Content reference

Fields marked *optional* can be omitted or left as `""` — the corresponding button or line simply won't render.

**`id`** must be unique within a file (it is used as the list key and for the abstract toggle).

**Sorting fields** (`year`, `month`, `day`, `semester`) are **never displayed** — they only control ordering, newest first. Their format is up to you as long as it sorts numerically and you stay consistent inside a file. The examples use `2425` for the 2024/2025 academic year and `24` for calendar year 2024; either works. If you want a visible date, put it in a text field such as `description`.

The home page shows the **4 most recent** items of each section; the dedicated page shows everything.

### `publications.json`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | unique |
| `year`, `month` | number | sorting only |
| `title` | string | |
| `authors` | string | free text, e.g. `"A. Author, B. Author"` |
| `file` | string *(optional)* | path to the PDF → shows a **PDF** button |
| `abstract` | string *(optional)* | shows an **Abstract** button (expand/collapse, truncated by default) |
| `citation` | string *(optional)* | BibTeX; shows a **Cite** button opening a modal with copy-to-clipboard |

A filled-in example is kept in [publi_template.json](src/assets/json/publi_template.json) for reference.

### `teaching.json`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | unique |
| `year`, `semester` | number | sorting only |
| `title` | string | course name |
| `description` | string *(optional)* | shown under the title — a good place for level, year and institution |
| `instructors` | string | free text |
| `LN` | string *(optional)* | lecture notes PDF → **Lecture Notes** button |
| `ES` | string *(optional)* | exercise sheets PDF → **Exercise sheets** button |

### `talks.json`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | unique |
| `year`, `month`, `day` | number | sorting only |
| `title` | string | |
| `conference` | string *(optional)* | shown under the title |
| `file` | string *(optional)* | slides PDF → **Beamer** button |

### `notes.json`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | unique |
| `year`, `semester` | number | sorting only |
| `title` | string | |
| `description` | string *(optional)* | shown under the title (the example uses it for the date) |
| `authors` | string | free text |
| `LN` | string *(optional)* | PDF → **PDF** button |

> If you rename a JSON field, update the matching component too — the field names in these files are read directly by the Vue templates.

### `blog.json` + Markdown posts

The blog is the one section that isn't stored entirely in JSON: `blog.json` holds the metadata, and the post body is a Markdown file in [src/assets/blog/](src/assets/blog/). The **`slug` is what ties them together** — it must match the `.md` filename and it becomes the URL.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | unique |
| `date` | string | `YYYY-MM-DD`. Unlike other sections, this one **is displayed**, and it sorts newest first |
| `slug` | string | must equal the Markdown filename without `.md`; the post lives at `/blog/<slug>` |
| `title` | string | shown in lists and as the page heading |
| `summary` | string *(optional)* | one or two sentences, shown in the list view |

To publish a post: drop `my-post.md` in `src/assets/blog/`, add an entry with `"slug": "my-post"` to `blog.json`. Nothing else to run — Vite picks up the file automatically.

Standard Markdown works (GitHub-flavoured, so tables and fenced code blocks included). Don't repeat the title as a heading in the file — the page renders it from `blog.json`.

**LaTeX in posts** works with `$...$` inline and `$$...$$` for display. Markdown and TeX normally fight over `_` and `\` — `$x_1 + x_2$` would come out italicised — so [src/utils/markdown.js](src/utils/markdown.js) lifts the formulas out before parsing and puts them back afterwards. One consequence: two dollar signs on the same line of prose are read as maths, so write `\$` if you mean currency.

### The Scripts section

Scripts are **not** JSON-driven: each demo is a hand-written Vue component. To add one, create the component in [src/components/](src/components/), wrap it in a view in [src/views/](src/views/), register a route under `/scripts/...` in [src/router.js](src/router.js), and add a thumbnail tile in [src/views/ScriptsView.vue](src/views/ScriptsView.vue).

The two examples use [Plotly](https://plotly.com/javascript/). If you remove the Scripts section entirely, you can also drop `plotly.js-dist-min` from `package.json`.

---

## Project structure

```
├── index.html               Page shell: title, favicon, Font Awesome, Academicons, MathJax
├── vite.config.js           Vite config — set `base` here for project-repo deploys
├── public/
│   ├── favicon.ico
│   └── pdf/                 All downloadable PDFs, served from the site root
└── src/
    ├── main.js              App entry point
    ├── App.vue              Navigation bar + layout shell
    ├── router.js            Route definitions
    ├── views/               One page per route
    ├── components/          Reusable blocks and single-item renderers
    │   └── ComponentManager.vue   Decides which home-page sections to render
    ├── utils/
    │   ├── posts.js         Joins blog.json with the Markdown files
    │   └── markdown.js      Markdown → HTML, keeping LaTeX intact
    └── assets/
        ├── json/            ← your content lives here
        ├── blog/            ← blog posts, one .md file each
        ├── images/          Profile picture, script thumbnails
        ├── icons/           Inline SVG icon components
        └── less/            variables.less (theme) + main.less (global styles)
```

---

## Deployment

The site is deployed to GitHub Pages from the `gh-pages` branch:

```sh
npm run deploy
```

This runs the build and pushes `dist/` to `gh-pages` using the [gh-pages](https://www.npmjs.com/package/gh-pages) package. On your fork, do this once in **Settings → Pages**: set the source to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.

> The workflow file in [.github/workflows/](.github/workflows/) is entirely commented out — deployment is manual, on purpose. Delete the file or uncomment it if you prefer CI-based deploys.

### Choose your repository name carefully

This is the single most common thing to get wrong when forking.

**User site (recommended, zero config).** Name your repo `<your-username>.github.io`. The site is served from the root of the domain, and everything works as-is.

**Project site (needs two changes).** If your repo has any other name, the site is served from `https://<your-username>.github.io/<repo-name>/` — a subpath. You must then:

1. Set the base path in [vite.config.js](vite.config.js):

   ```js
   export default defineConfig({
     base: "/<repo-name>/",
     // ...rest unchanged
   });
   ```

2. Fix your PDF links. The paths in the JSON files start with `/pdf/...`, which points at the domain root and will 404 on a subpath. Either prefix them (`/<repo-name>/pdf/...`) or move the PDFs out of `public/` and import them through Vite so it rewrites the URLs.

### Why `404.html` exists

The router uses HTML5 history mode, so `/publications` is a client-side route with no matching file on the server. GitHub Pages would return a 404 on a direct visit or a page refresh. The `build` script therefore copies `dist/index.html` to `dist/404.html`, which makes Pages serve the app for any unknown path and lets the router take over. Keep that step if you change the build command.

### Typical workflow

```sh
git add .
git commit -m "Update content"
git push          # updates the source on main
npm run deploy    # publishes the built site
```

Both steps are needed: pushing to `main` does not update the live site by itself.

---

## Good to know

- **Two places check for empty sections.** [App.vue](src/App.vue) (navbar links) and [ComponentManager.vue](src/components/ComponentManager.vue) (home-page blocks) each contain their own copy of the same emptiness check. If you add a section, remember both.
- **JSON files must stay valid JSON.** An empty file breaks the build; use `[]` instead. No comments, no trailing commas.
- **MathJax** is loaded from a CDN in `index.html`, configured there to accept `$...$` inline as well as `$$...$$`. It scans the page once on load, so anything rendered later has to be re-typeset by hand — see `typesetMath` in [src/utils/markdown.js](src/utils/markdown.js), which is what blog posts use.
- **Blog posts are rendered with `v-html`**, which scoped styles don't reach. The `.post-body` rules therefore live in `main.less` rather than in the view. Posts are your own content, so this is safe; don't reuse the pattern for anything user-submitted.
- **Unused leftovers** you can safely delete: `src/assets/json/conferences.json` (empty and imported nowhere) and `src/components/ConferencesComponent.vue`. `publi_template.json` is kept as a schema example only.
- **`dist/` and `node_modules/` are gitignored** — the published site lives on the `gh-pages` branch, not on `main`.
- **External CDNs.** Font Awesome, Academicons and MathJax are loaded from CDNs in `index.html`, so the site needs an internet connection to render icons and formulas.

## Reusing this template

The **code** is released under the [MIT License](LICENSE) — fork it, modify it, build your own site on it, commercial or not. The only obligation is to keep the copyright notice in the `LICENSE` file.

The **content is not** covered by that license: the PDFs under `public/pdf/`, the profile photo, the biography, and the publication, teaching and talk listings belong to the original author and remain their copyright. Replace all of it with your own rather than shipping a copy of someone else's academic record.
