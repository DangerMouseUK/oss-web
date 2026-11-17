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
in none.** It is written as a test rather than a list on purpose: a rule written as a
list of past mistakes guards only the places where mistakes have already happened.

### The test

**Before anything is committed, ask: does this narrow the search for someone trying to
obtain the material that is being kept back?** If it does, it does not go in — however
small it is, however incidental to what you were doing, and whatever else in the commit
is perfectly fine.

That test is the rule. There is deliberately no list of examples under it: **an example
of what is being kept back would describe what is being kept back**, which is the thing
the test exists to prevent.

### What fails it

**Anything specific about the withheld material fails the test** — its nature, how it
works, how it is made or organised, where it came from, where it is kept, why it is kept
back, or anything about any of those. Paraphrase counts, and so does a partial answer: a
detail is not made safe by being small, vague or incomplete, because a search is
narrowed a little at a time. A denial counts too, since a denial names the thing it
denies.

**The names of anything private fail it as well** — repositories, tools, files, paths,
notes, and any relationship stated between them. A private name is a pointer, so a bare
name with nothing else said about it can be the whole leak.

**So does a signpost.** A sentence that tells a reader where withheld detail is kept, or
to look somewhere for it, fails the test even when it names nothing. Drop the sentence;
do not reword it into a vaguer signpost.

### Where this applies

**Not only to file content.** All of it applies equally to:

- **commit messages**, subject and body;
- **branch names and tag names**;
- code comments, test fixtures and their headers, documentation prose, changelog
  entries;
- issue and pull-request text, release notes, CI logs and workflow output;
- and anything a note or report quotes out of any of the above.

**A repository is its history, not its tip.** Taking something out at the tip does not
unpublish it. Once a commit is pushed, the only remedies are a rewrite and the lead's
decision, so the cheap moment is before the commit, every time.

### It applies to passing remarks

**The subject of a commit does not limit the rule.** A commit about something unrelated
is checked exactly as carefully as one about the private material, because that is
where nobody is looking. An aside, a parenthesis, a "while I was at it", a name
mentioned only to explain something else — those are where this kind of thing slips
through, not in the places anyone is guarding.

### When you find something the guard missed

**Report it to the lead, and add it to the guard, in the same change.** Do not handle it
quietly and move on: a gap that is noticed and not closed is a gap that gets found again
the hard way. **Do not add it to this section as an example** — this section is public,
and an example here would publish the very thing the guard was just taught to stop.

### What is permitted, so this is not read as a gag

- **Compatibility is permitted. The method is not.** A public client or server may be
  fully compatible with the original. What may not appear is anything about how.
- **Saying that something is supplied by a private module is allowed**, and so is naming
  the public interface it plugs into. The cipher trait, the security hooks and the
  documentation describing their shape are this repository's own contents and belong
  here. They are what makes the rest work unchanged.
- **Saying the material exists and is being kept back is allowed**, including in public
  documentation, as long as the saying carries nothing that fails the test above. The
  public repositories already say it, and should.
- **The VIE-era stack and OpenSec are public in full**, constants, vectors and all.
  Nothing in this section narrows them, and nothing here is a reason to redact them.

### The mechanical check

A local guard refuses a commit whose staged content, message or ref names match a
private pattern list. **The list is not in this repository and must never be**: a
denylist of forbidden terms, committed to a public repository, is itself a disclosure —
the most efficient index to the problem anyone could write. It is kept outside this
repository, and the hooks that read it live in `.git/hooks`, which is neither committed
nor cloned.

Three things about it that matter more than its existence:

- **It fails closed.** If it cannot find or read its list it refuses the commit and says
  so. A check that passes when it cannot find its list is worse than no check at all.
- **It is a floor, not a ceiling.** It matches known shapes and has nothing to say about
  one nobody has thought of yet. **The test at the top of this section is the rule; the
  guard only catches the part of it that a regular expression can see.**
- **A clone does not have it.** Anyone working from a fresh clone, without the private
  list, has no guard at all — only this section and review. That is the price of not
  publishing the list, and it is the right way round: the written rule travels, the index
  does not.

Bypassing the guard with `--no-verify` is a decision to report to the lead, not a step.

### When in doubt

**It does not go in.** There is no deadline that trades against this. It cannot be
reasoned around case by case, and it does not expire. Ask the lead instead of deciding.

The reasoning behind all of the above is recorded as decisions **`D10`, `D17`, `D19`
and `D33`**. If you think one of them is wrong, that is a question for the lead rather
than an edit.

## If the local-only card is not beside this file

This repository is one of several developed together, and what is agreed across them —
conventions, decisions already taken, and work already in progress — is recorded outside
it, in a checkout that the local-only card beside this file names. That card is
deliberately not committed, so a working copy can arrive without it: a fresh clone does,
and so does a secondary working tree made from this one.

**A missing card is not evidence that there is no earlier work.** If you are working
here and it is not present, stop and ask for it rather than carrying on from this file
alone. Do not re-decide something that has already been settled, and do not start work
that may already belong to somebody else.

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
