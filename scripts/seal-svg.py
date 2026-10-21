# Writes public/favicon.svg: the JungleCode seal with the katakana as outlines, so it renders
# identically everywhere without web fonts. Needs the Shippori Mincho B1 ExtraBold TTF in
# .taste-skill/fonts/ (see scripts/subset-jp.mjs).
#   uv tool run --from fonttools python scripts/seal-svg.py
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont('.taste-skill/fonts/ShipporiMinchoB1-ExtraBold.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font['head'].unitsPerEm
vert = {}
if 'GSUB' in font:  # the font's own vertical forms (the 'vert' feature) for small kana and the long-vowel mark
    gsub = font['GSUB'].table
    idx = {i for fr in gsub.FeatureList.FeatureRecord if fr.FeatureTag in ('vert', 'vrt2') for i in fr.Feature.LookupListIndex}
    for i in idx:
        for st in gsub.LookupList.Lookup[i].SubTable:
            st = getattr(st, 'ExtSubTable', st)
            vert.update(getattr(st, 'mapping', {}) or {})

name = ['ジ', 'ャ', 'ン', 'グ', 'ル', 'コ', 'ー', 'ド']
size = 19.5  # em size in the 100-unit seal
paths = []
for i, ch in enumerate(name):
    g = cmap[ord(ch)]
    g = vert.get(g, g)
    col = 66 if i < 4 else 34
    row = 22 + (i % 4) * 18.6
    s = size / upm
    pen = SVGPathPen(glyphs)
    # glyph origin is bottom-left with y up. Centre the em box on (col,row) and flip y.
    tp = TransformPen(pen, (s, 0, 0, -s, col - size / 2, row + size * 0.38))
    glyphs[g].draw(tp)
    paths.append(pen.getCommands())

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="4" y="4" width="92" height="92" rx="4" fill="#c3261d"/>
  <rect x="10.5" y="10.5" width="79" height="79" rx="2" fill="none" stroke="#fff" stroke-width="2.8"/>
  <path fill="#fff" d="{' '.join(paths)}"/>
</svg>
'''
open('public/favicon.svg', 'w').write(svg)
print('wrote public/favicon.svg', len(svg), 'bytes; vertical forms used:', sum(1 for c in name if vert.get(cmap[ord(c)])))
