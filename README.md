# oss-web

The website for **Open SubSpace** — [ossubspace.com](https://ossubspace.com).

Open SubSpace is the 1997 space shooter SubSpace written again in Rust, from the wire
protocol up. The code lives in three repositories; this one is only the website, kept in
the open so that you can see exactly what it serves.

| Repository | What it is |
|---|---|
| [oss-client](https://github.com/DangerMouseUK/oss-client) | The game client |
| [oss-server](https://github.com/DangerMouseUK/oss-server) | The zone server |
| [oss-core](https://github.com/DangerMouseUK/oss-core) | Shared protocol, transport, formats, physics and conformance suite |
| **oss-web** — you are here | This website |

## What is in it

A hand-written static site with no build step, no framework, no third-party scripts, fonts
or trackers, and no cookies.

```
public/            everything that is served, exactly as committed
  index.html       the page
  404.html         the not-found page
  styles.css
  site.js          the "Copy" buttons on command blocks; the page works without it
  favicon.svg
  images/          screenshots, taken from the client and server repositories' docs
  robots.txt
  sitemap.xml
.do/app.yaml       the DigitalOcean App Platform spec
```

The screenshots show Continuum's own graphics, which are not this project's work; see the
[client's asset notes](https://github.com/DangerMouseUK/oss-client/blob/main/assets/classic/README.md).

## Preview locally

Any static file server pointed at `public/` will do:

```sh
python -m http.server 8000 --directory public
```

Then open <http://localhost:8000>.

## Deploy

The site is a **static site component on DigitalOcean App Platform**, built from this
repository's `main` branch, with `public/` as its source directory. There is nothing to
build: App Platform serves `public/` as it is and redeploys on every push. [`.do/app.yaml`](.do/app.yaml) is the spec.

**First time:**

1. Create the app — either `doctl apps create --spec .do/app.yaml`, or in the control panel
   *Create App → GitHub → DangerMouseUK/oss-web → main* with **Source directories** set to
   `public`. App Platform detects a static site only from an `index.html` at the root of the
   source directory, so left blank it reports *"No components detected"*. It should then
   offer a **Static Site** with no build command.
2. Check the app's default `*.ondigitalocean.app` address serves the page.
3. Add the custom domain `ossubspace.com` to the app (the spec already lists it) and choose
   *"I'll manage my domain"*: DNS is at Cloudflare, not DigitalOcean.

**Cloudflare** (registrar, DNS and proxy):

1. In DNS, add `CNAME  @  <app>.ondigitalocean.app` (Cloudflare flattens a CNAME at the apex)
   and `CNAME  www  <app>.ondigitalocean.app`.
2. Leave both **DNS only (grey cloud)** until App Platform shows the domain as *Active* with
   its certificate issued — it cannot validate the domain while Cloudflare is answering for
   it. Then switch both to **Proxied (orange cloud)**.
3. SSL/TLS mode: **Full (strict)**. App Platform has a valid certificate for the domain, so
   strict works, and anything weaker invites redirect loops or an unverified hop.
4. Add a Redirect Rule sending `www.ossubspace.com/*` to `https://ossubspace.com/${1}`
   (301), so there is one canonical address.
5. Optional: *Always Use HTTPS* on, and HSTS once you are sure HTTPS is staying.

## Rules for this repository

- **Nothing secret goes in here, ever.** No tokens, keys, account or app IDs, internal
  addresses, private repository names, local paths or personal details — in files, commit
  messages or the app spec. The repository is public and so is its history; a secret
  committed and then deleted is still published.
- Claims on the site come from the public repositories' own READMEs and docs, and link to
  them. When those change, the site follows; it does not get ahead of them.
- No third-party requests from the page. The Content-Security-Policy in each page's `<head>`
  enforces it: anything not served from this site is blocked.

---

SubSpace and Continuum are the names of the original games. Open SubSpace is an independent,
compatible implementation and is not affiliated with their authors.
