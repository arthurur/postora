# Platform and agent marks

Prepared on 2026-09-22. Used by the homepage, channel and agent directories, and their detail pages. Icons display at 20 CSS pixels, or 28 pixels in agent directory cards, with 4-pixel rounded corners and an adjacent text label.

## Sources

- `platforms/*.webp`: the seven corresponding PNG files in `apps/frontend/public/icons/platforms/`. Converted with Sharp to lossless WebP, retaining the original 50 × 50 dimensions, colors and transparency. Visible pixel values and alpha were verified against the originals. Combined size: 26,106 → 7,880 bytes (69.8% smaller). Original files remain unchanged. Use at 20–24 CSS pixels.
- `agents/claude.svg`: `Claude Spark - Clay.svg` from the [Anthropic press kit](https://www.anthropic.com/press-kit), linked by its [newsroom](https://www.anthropic.com/news). The Claude mark accompanies the Claude Code name.
- `agents/openai.svg`: `OpenAI-black-monoblossom.svg` from the [official OpenAI logo pack](https://cdn.openai.com/brand/OpenAI-Logos-2025.zip). The OpenAI mark accompanies the Codex name. See [OpenAI design guidelines](https://openai.com/brand/).
- `agents/cursor.svg`: `General Logos/Cube/SVG/CUBE_2D_LIGHT.svg` from the [official Cursor asset pack](https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/brand/cursor-brand-assets.zip), linked by [Cursor brand guidelines](https://cursor.com/brand).

SVG cleanup removes export comments, metadata and redundant whitespace without changing geometry, fill colors or viewBox. Before/after renders were compared at 200 × 200 pixels. The OpenAI SVG additionally uses a tighter square viewBox to remove excess transparent padding and match the other marks at the same display size. Its paths, colors and proportions are unchanged. No runtime third-party asset requests or new dependencies are needed.

These marks belong to their respective owners and identify integrations, not endorsements. Keep the supplied colors and proportions. Render with explicit dimensions and empty alt text when the adjacent visible name identifies the platform.
