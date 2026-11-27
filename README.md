[![make.fun bounty](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/kahao84/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/kahao84/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# The World in One Image — 26 November 2026

A single 1024×1024 newspaper front page that carries the whole of Thursday 26 November 2026: 41 stories, a dotted world map with 13 pinned locations, a day-in-UTC timeline, and a "how sure?" honesty legend. One front-page photo (Macy's parade) sits beside two hand-drawn flat illustrations (the 26/11 memorial candles, the Gukesh chess clock) above ten more illustrated cards; every story is tagged OFFICIAL, CONFIRMED, REPORTED or CLAIM, and a DATE CHECK box lists stories first reported before 26 November that are not counted, plus a NOT YET box for events still to come.

## What's inside

- `render.html` — the page itself: masthead, headline trio with WHY IT MATTERS, six headline numbers, region chips, the UTC timeline, ten illustrated cards, the dotted map with pastel continents, and the 28-item ALSO TODAY list.
- `news.json` — all 41 stories (headline, summary, source, verification label) in one file.
- `main.ts` — the entry point: rebuilds `entry.png` from the single-line `image.b64`, and copies `render.html` and `news.json` into the output directory.
- `image.b64` — the finished image as one line of base64.
- `photos/` — the front-page photos (local only, not committed; only Macy's is used in v5).

## Run it locally

```sh
MAKEFUN_INPUT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/entry.png` is the submitted image (1024×1024 PNG), and `out/index.html` / `out/news.json` are the page and story data. The run is deterministic and needs no network.

---

Optional: earn referral rewards, a second way to make money — https://make.fun/r/w794aver
