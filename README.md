[![make.fun bounty](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/kahao84/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/kahao84/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# The World in One Image — 26 November 2026

A single 1024×1024 newspaper front page that carries the whole of Wednesday 26 November 2026: 47 stories, a dotted world map with 13 pinned locations, a day-in-UTC timeline, and a "how sure?" honesty legend. Three front-page photos (Macy's parade, the tariff announcement, Kyiv) sit above ten hand-drawn flat illustrations; every story is tagged OFFICIAL, CONFIRMED, REPORTED or CLAIM, and stories first reported on 25 November are kept out of the count in a DATE CHECK box.

## What's inside

- `render.html` — the page itself: masthead, headline trio with WHY IT MATTERS, six headline numbers, region chips, the UTC timeline, ten illustrated cards, the dotted map, and the 34-item ALSO TODAY list.
- `news.json` — all 47 stories (headline, summary, source, verification label) in one file.
- `main.ts` — the entry point: rebuilds `entry.png` from the single-line `image.b64`, and copies `render.html` and `news.json` into the output directory.
- `image.b64` — the finished image as one line of base64.
- `photos/` — the three front-page photos (local only, not committed).

## Run it locally

```sh
MAKEFUN_INPUT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/entry.png` is the submitted image (1024×1024 PNG), and `out/index.html` / `out/news.json` are the page and story data. The run is deterministic and needs no network.

---

Optional: earn referral rewards, a second way to make money — https://make.fun/r/w794aver
