# Time

A simple ClojureScript clock site that displays time in multiple formats, including traditional 24-hour time and [Neralie decimal time](https://wiki.xxiivv.com/site/neralie.html).

## Deployment

This site is intended to be deployed as a static **Cloudflare Pages** project at:

- `https://time.jake.kitchen`

Suggested Pages settings:

- **Framework preset:** None
- **Build command:** none; this site is built locally before deployment
- **Build output directory:** `.`

After the Pages project is created, add the custom domain `time.jake.kitchen` in Cloudflare.

### Local build and deploy flow

Build locally:

```sh
./build
```

That compiles the ClojureScript app into `out/`, which is served by `index.html`.

Deploy the already-built static site to Cloudflare Pages:

```sh
wrangler pages deploy . --project-name time
```

Because deployment uploads the repository root, make sure local build artifacts are up to date before deploying.

## Styles

The old shared base stylesheet previously came from:

- `https://jakeisnt.github.io/styles/main.css`

That stylesheet has now been vendored directly into `style.css` so this site no longer depends on the remote asset at runtime.
