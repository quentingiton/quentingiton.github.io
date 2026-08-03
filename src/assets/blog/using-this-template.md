I, with the precious help of [MathisG179](https://github.com/MathisG179) and [Ca-Jou](https://github.com/Ca-Jou), wrote a small website. It is a [Vue](https://vuejs.org/) application with no backend, no database and no admin panel: the content lives in a handful of JSON files, the PDFs live in a folder, and the whole thing is served for free by GitHub Pages. The code is MIT licensed, so if it suits you, take it.

This post is the guided tour. It should take about an hour end to end.

## Getting it running

Fork [the repository](https://github.com/quentingiton/quentingiton.github.io) on GitHub, then clone your fork and start the development server:

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

Open the address it prints, usually `http://localhost:5173`. You should see my site, running on your machine. Every change you save appears in the browser immediately, so keep this running while you work through the rest.

## Making it yours

The first thing to do is remove me from it. My details are hardcoded in a small number of places, and it is worth doing all of them in one pass:

- `src/components/ProfileCard.vue`: the name, photo, affiliation, contact icons and the "About me" paragraph. This is the file you will spend the most time in, and honestly it is most of the visible site.
- `src/assets/images/`: replace `quentin_profile.jpg` with your own picture. Use something roughly square; it gets cropped to a circle.
- `src/App.vue`: the name in the top-left of the navigation bar.
- `index.html`: the page title, and **delete the `google-site-verification` meta tag**. That one is tied to my Search Console account and does nothing for you.

One thing that is easy to miss: `index.html` loads icons from a personal [Font Awesome](https://fontawesome.com/) kit registered to me. It works today, but it is my account, so sign up for a free kit of your own and swap the ID.

The contact icons themselves come from Font Awesome for the generic ones and [Academicons](https://jpswalsh.github.io/academicons/) for the academic ones — Google Scholar, arXiv, ORCID, HAL and so on. Adding one is a matter of copying an anchor tag in the `contact-icons` block and changing the class.

## Where the content lives

Everything else is data. Look in `src/assets/json/`:

```
publications.json    papers, preprints, reports
teaching.json        courses, with lecture notes and exercise sheets
talks.json           talks, with slides
notes.json           short informal notes
blog.json            the index of these posts
```

Each file is a plain array of objects. To add a talk, you add an object to `talks.json`; there is no build step to run and no metadata to regenerate.

The part I like most is what happens when a file is empty. Set it to `[]` and the section vanishes: the block disappears from the home page *and* the link disappears from the navigation bar. When I started I had no publications and no talks, and the site simply did not mention them rather than showing two sad empty headings. So begin by emptying every file you cannot fill yet, and let the site grow as you do.

A detail that confuses people reading the JSON for the first time: the `year`, `month` and `semester` fields are never displayed. They only control the ordering, newest first. That is why you will see `"year": 2425` for the 2024/2025 academic year: it is a sort key, not a label. If you want a visible date, write it in a text field such as `description`.

## Blog posts

A post is two files. The prose goes in a Markdown file under `src/assets/blog/`, and a matching entry goes in `blog.json`:

```json
{
  "id": 2,
  "date": "2026-09-14",
  "slug": "my-second-post",
  "title": "My second post",
  "summary": "A sentence or two, shown in the list of posts."
}
```

The `slug` is what ties the two together: it has to match the file name, so the entry above expects `src/assets/blog/my-second-post.md` and publishes it at `/blog/my-second-post`. That is the entire process — write the file, add the entry, done. One habit to pick up: do not start the Markdown with the title as a heading, because the page already prints it from the JSON.

The `date` here is worth a word, having just told you that the `year` fields elsewhere are only sort keys. This one is different: it is a real date, it orders the posts newest first *and* it is the date you see under the title. A post needs a visible date, and keeping a sort key and a label in sync for a single fact is precisely the sort of chore I would forget.

Because this started as a mathematician's website, the first thing I wanted from the blog was formulas. You get them for free: wrap something in `$...$` for inline maths, or `$$...$$` for a displayed equation, and MathJax renders it. There is nothing to configure and nothing to escape: write `$x_1 + x_2$` and you get exactly that ($x_1+x_2$), not an italicised mess. Markdown and TeX normally argue over what `_` and `\` mean, so the site lifts the formulas out of the way before parsing the Markdown and puts them back afterwards. You just write TeX and it appears.

## PDFs

Drop them anywhere under `public/pdf/` and link to them from the JSON with a leading slash, dropping the `public` part:

```
public/pdf/talks/25-26/CS26.pdf   ->   "file": "/pdf/talks/25-26/CS26.pdf"
```

Anything inside `public/` is copied to the site root untouched when the site is built. The subfolders are just my filing habit; reorganise them however you like.

## Colours

If you want the site to stop looking like mine, open `src/assets/less/variables.less` and change `@accent-color`. That single value is most of the site's personality. The rest of the shared layout lives in `main.less`, and each component carries its own styles at the bottom of its `.vue` file.

## Putting it online

Deployment is one command:

```sh
npm run deploy
```

This builds the site and pushes the result to a `gh-pages` branch of your repository. Then, once, go to **Settings → Pages** on GitHub and set the source to that branch. A minute later your site is live.

Two things to know. The first is that pushing to `main` does *not* update the live site: `main` holds the source, `gh-pages` holds the built site, so a normal working session ends with both:

```sh
git add .
git commit -m "Add a talk"
git push
npm run deploy
```

The second is more important, and it is the one thing I would get right before anything else: **name your repository `your-username.github.io`**. Do that and your site is served from the root of your domain and everything works with no configuration. Give it any other name and it is served from a subfolder, which means you have to set a `base` path in `vite.config.js` *and* fix every PDF link in your JSON files, because they all start from the root. It is a fifteen-minute detour that is entirely avoidable by picking the right name at the start.

## Where to look next

The [README](https://github.com/quentingiton/quentingiton.github.io#readme) has the reference material this post deliberately skips: the exact fields of every JSON file, which ones are optional, what each one renders, and the full project structure. I kept it out of here so there is only one copy to keep up to date.

If you build something with it, I would genuinely like to see it: my email is on the home page. And if you hit something that this post should have warned you about, tell me and I will add it.