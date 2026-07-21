from PIL import Image, ImageDraw

def make_icon(size, path):
    img = Image.new("RGB", (size, size), (11, 36, 54))  # navy
    d = ImageDraw.Draw(img)
    cx, cy = size/2, size/2
    r = size*0.32
    # emerald crescent: big circle minus offset circle
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(31,111,84))
    off = size*0.14
    r2 = r*0.82
    d.ellipse([cx-r2+off, cy-r2, cx+r2+off, cy+r2], fill=(11,36,54))
    # small gold dot (star)
    sr = size*0.045
    sx, sy = cx + r*0.75, cy - r*0.55
    d.ellipse([sx-sr, sy-sr, sx+sr, sy+sr], fill=(201,162,39))
    img.save(path)

make_icon(192, "icons/icon-192.png")
make_icon(512, "icons/icon-512.png")
print("done")
