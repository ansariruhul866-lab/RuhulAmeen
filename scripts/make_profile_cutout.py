import cv2
import numpy as np
from PIL import Image

# Load source portrait
img_bgr = cv2.imread('public/images/profile.jpg')
h, w = img_bgr.shape[:2]

# Detect white background: pixels where R, G, B are all > 240
is_white = ((img_bgr[:, :, 0] > 238) & (img_bgr[:, :, 1] > 238) & (img_bgr[:, :, 2] > 238)).astype(np.uint8)

# Connected components from corners to get strictly exterior background
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(is_white)
bg_label = labels[0, 0]
bg_mask = (labels == bg_label).astype(np.uint8) * 255

# Ensure top-right and corners are included
if labels[0, w - 1] != bg_label and labels[0, w - 1] != 0:
    bg_mask = bg_mask | ((labels == labels[0, w - 1]).astype(np.uint8) * 255)

# Subject mask is inverse of exterior background
fg_mask = cv2.bitwise_not(bg_mask)

# Slight morphological closing to ensure no internal pinhole gaps
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel)

# Smooth edges for natural anti-aliased hair and suit outline
blurred_alpha = cv2.GaussianBlur(fg_mask, (5, 5), sigmaX=1.0, sigmaY=1.0)

# Convert BGR to RGBA
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
rgba = np.dstack((img_rgb, blurred_alpha))

# Defringe slightly around boundary: if alpha < 250 and pixel is very bright, blend towards edge color
alpha_norm = blurred_alpha.astype(np.float32) / 255.0
for c in range(3):
    # Prevent white edge fringe
    rgba[:, :, c] = np.where(
        (blurred_alpha > 0) & (blurred_alpha < 240) & (rgba[:, :, c] > 220),
        np.clip(rgba[:, :, c] * alpha_norm, 0, 255).astype(np.uint8),
        rgba[:, :, c]
    )

out_path = 'public/images/profile-cutout.png'
Image.fromarray(rgba).save(out_path, format='PNG', optimize=True)
print(f"Saved pristine transparent cutout to {out_path} ({w}x{h})")
