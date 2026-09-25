# Frontier Conquest (OpenFront single-player build)

`/openfront/` is an unofficial, single-player-only build of
[OpenFront](https://github.com/openfrontio/OpenFrontIO): conquer the map
against AI nations and bots, entirely in the browser. It is not affiliated
with or endorsed by OpenFront.

© OpenFront and Contributors. Code is AGPL-3.0 (see `LICENSE`, including the
Section 7 additional terms); assets from OpenFront's `resources/` are
CC BY-SA 4.0 (see `LICENSE-ASSETS`). OpenFront's all-rights-reserved
`proprietary/` assets are not included. See `LICENSING.md` and `CREDITS.md`.

## Source

This folder is the complete corresponding source for `/openfront/`:

- upstream OpenFront at commit `22722dfe9aa9a7d7c6fe1b3fb4ace58ed8282731`
- plus `static-solo.patch` (our changes; see `static-solo/README.md` inside
  the patch for what it does)

Map data is loaded at runtime from jsDelivr, pinned to that same upstream
commit.

## Rebuilding

Needs Node 24, npm 12 and git.

```bash
./openfront-src/build.sh
```

This fetches upstream at the pinned commit, applies the patch, builds, and
replaces `openfront/` with the result.
