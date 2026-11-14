# oss-web — agent conventions

The website for Open SubSpace — the one public surface that is *served* rather than read
on GitHub, and the only one with no compiler, no tests and no CI to catch anything. Read
[`README.md`](README.md) for what the site is and how it is deployed; this file does not
repeat it. What follows is how to work here.

**This repository had never been audited until 2026-11-14** — it sat outside every sweep
and every rewrite, because it has no code in it. It was clean, in all of its history. It
is first in this file anyway, because "there is nothing in it to leak" is what was
assumed about the other three as well.

## What must never reach this repository

**This section is identical in all four public repositories. Change it in all four or
in none.** It exists because material that must not be public has reached a public
repository three times, in three different places, and each time the rule written
afterwards was aimed at the previous instance. So read the test first and the list
second — the list is worked examples of the test, not its boundary.

### The test

**Before anything is committed, ask: does this narrow the search for someone trying to
obtain the material that is being kept back?** If it does, it does not go in — however
small it is, however incidental to what you were doing, and whatever else in the commit
is perfectly fine.

That test is the rule. The classes below are the ones already known to have gone wrong;
**a thing can fail the test without appearing in any of them**, and when it does, the
answer is still no.

### The classes

- **The method itself, and any prose detailed enough to implement a step from.**
  Paraphrase counts. What is protected is a method, and a method survives paraphrase —
  "roughly how it works" *is* the disclosure. So is a diagram, a worked example, or a
  sequence of operations given in order.
- **How the material is put together** — its internal construction, how many parts it
  has, how they relate, what feeds what. This is disclosure on its own and needs no
  values attached to it.
- **Addresses, offsets or locations inside somebody else's binary**, named as such, with
  or without a behavioural claim attached. An address is a foothold whatever routine it
  names, and the audience best placed to use one is the audience this project is handed
  to.
- **The names of private tooling, private crates and the project's private
  repositories**, and any dependency stated between them. **A name can state a
  structure, and several of ours do** — so a bare name, with nothing else said about it,
  can be the whole leak.
- **Anything that characterises who the material is being kept back for**, or the
  circumstances under which that was settled. That the material exists and is not public
  may be said; for whom may not.
- **How this project is said to have come by anything.** Both directions are out:
  asserting it and denying it are equally disclosive, because the denial names the thing
  it denies.

### Where this applies

**Not only to file content.** All of it applies equally to:

- **commit messages**, subject and body — *the absence of this line is literally how the
  second incident happened*;
- **branch names and tag names**;
- code comments, test fixtures and their headers, documentation prose, changelog
  entries;
- issue and pull-request text, release notes, CI logs and workflow output;
- and anything a note or report quotes out of any of the above.

**A repository is its history, not its tip.** Taking something out at the tip does not
unpublish it. Once a commit is pushed, the only remedies are a rewrite and the lead's
decision, so the cheap moment is before the commit, every time.

### It applies to passing remarks

**The subject of a commit does not limit the rule.** The worst instance so far arrived
as an aside about machine load, inside a commit about an unrelated networking fix. The
file content was completely clean. Nobody was being careless — nobody was looking there.

So: an aside, a parenthesis, a "while I was at it", a tool named only to explain why a
measurement was noisy. Those are where this has actually gone wrong, not in the places
anyone was guarding.

### When you find a class that is not listed here

**Add it here, and to the guard, in the same change.** Do not handle it quietly and move
on. The recurring failure in this project has not been carelessness; it has been that
each fix was scoped to the thing that had just happened, so the next one surfaced
somewhere nobody had thought to look. A class that is noticed and not written down is a
class that gets rediscovered the hard way.

### What is permitted, so this is not read as a gag

- **Compatibility is permitted. The method is not.** A public client or server may be
  fully compatible with the original. What may not happen is telling anyone how.
- **The seam is deliberate and public-safe.** The cipher trait, the security hooks and
  the documentation describing their shape are this repository's own contents and belong
  here. They are not a leak of anything; they are what makes the rest work unchanged.
- **Saying the material exists and is being kept back is allowed**, including in public
  documentation, as long as the saying carries no part of the method and describes no
  part of its construction. The public repositories already say it, and should.
- **The VIE-era stack and OpenSec are public in full**, constants, vectors and all.
  Nothing in this section narrows them, and nothing here is a reason to redact them.

### The mechanical check

A local guard refuses a commit whose staged content, message or ref names match a
private pattern list. **The list is not in this repository and must never be**: a
denylist of forbidden terms, committed to a public repository, is itself a disclosure —
the most efficient index to the problem anyone could write. It is kept outside this
repository, and the hooks that read it live in `.git/hooks`, which is neither
committed nor cloned.

Three things about it that matter more than its existence:

- **It fails closed.** If it cannot find or read its list it refuses the commit and says
  so. A check that passes when it cannot find its list is worse than no check at all.
- **It is a floor, not a ceiling.** It matches known shapes. It has nothing to say about
  a class nobody has thought of yet, which is exactly how all three incidents happened.
  **The test at the top of this section is the rule; the guard only catches the part of
  it that a regular expression can see.**
- **A clone does not have it.** Anyone working from a fresh clone, without the private
  checkout, has no guard at all — only this section and review. That is the price of not
  publishing the list, and it is the right way round: the written rule travels, the index
  does not.

Bypassing the guard with `--no-verify` is a decision to report to the lead, not a step.

### When in doubt

**It does not go in.** There is no deadline that trades against this. It is an agreement
rather than a licensing question, so it cannot be reasoned around case by case, and it
does not expire. Ask the lead instead of deciding.

The reasoning behind all of the above is recorded as decisions **`D10`, `D17` and
`D19`**. If you think one of them is wrong, that is a question for the lead rather
than an edit.

## Working here

- **It is a hand-written static site: no build step, no framework, no third-party
  scripts, fonts or trackers, no cookies.** Keep it that way. Adding a dependency here
  adds a third party to every page view of the project's front door, and nothing on this
  site needs one.
- **Everything under `public/` is served exactly as committed.** There is no stage
  between this repository and the public internet — what lands on `main` is what the
  world reads, usually within a minute.
- **`main` requires a pull request.** Direct pushes are refused (set 2026-11-14).
  Required approvals is deliberately zero, because a single-admin repository cannot
  self-approve; the pull request is the pause, not the review.
- **Do not push.** The lead approves every push and every deploy, which here are the same
  event.
- **Stage your own files by name.** No `git add -A`, no `commit -a`, no `reset`, no
  `--amend`.
- **The screenshots are Continuum's own graphics and are not this project's work.** Do
  not add images without checking what is in the frame — a console, a debug overlay, a
  window title or a file path in a screenshot is published at full resolution. The four
  that are here were opened and looked at, not just listed.
- **Check prose against the section above before it ships, not after.** This site states
  the project's position in public, in plain English, more directly than any other file
  in any repository. That makes it the easiest place to say one sentence too many.
