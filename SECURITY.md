# Security policy

This repository is the Open SubSpace website and nothing else. It is a
hand-written static site: no backend, no database, no accounts, no forms, no
cookies, no analytics and no third-party requests. Everything served is a file
in `public/`, exactly as committed. **The attack surface is genuinely small, and
this file is short because padding it would misrepresent that.**

## Reporting a vulnerability

**Use GitHub's private reporting, not a public issue.**

> **Security → Report a vulnerability**, or go straight to
> <https://github.com/DangerMouseUK/oss-web/security/advisories/new>

That opens a private thread with the maintainer, visible to nobody else unless
an advisory is published. If you are unsure whether what you found counts,
report it privately anyway — deciding that is our job.

## In scope

- **The Content-Security-Policy** in each page's `<head>`, which is what
  enforces the no-third-party-requests rule. A way around it is worth reporting.
- **Anything that could get content onto `ossubspace.com`** that the maintainer
  did not put there, including by way of this repository or its deployment.
- **Anything served from the site that harms a visitor.**

## Out of scope

- **The software the site describes.** The client, the server and the shared
  crates have their own security policies, and that is where code
  vulnerabilities belong:
  [oss-client](https://github.com/DangerMouseUK/oss-client/security/policy) ·
  [oss-server](https://github.com/DangerMouseUK/oss-server/security/policy) ·
  [oss-core](https://github.com/DangerMouseUK/oss-core/security/policy)
- **Missing hardening headers with no demonstrated impact**, and scanner output
  with no analysis attached. On a static site with no cookies, no accounts and
  no forms, most of that grade of finding has nothing to act on. Tell us what a
  visitor would actually lose.
- **The hosting and DNS providers themselves.** Report those to them.

## Which version

There are no releases or tags; the site is whatever `main` currently serves.
Say which page and when you saw it.

## What to expect

One volunteer maintainer. **Acknowledgement within seven days** — if you have
heard nothing after that, please ping the thread rather than assuming you were
ignored. Credit by whatever name you like, or none. **There is no bug bounty.**
