import re

with open('src/content/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

with open('scripts/generated_video_projects.ts', 'r', encoding='utf-8') as f:
    video_projects_code = f.read()

# Find start of video section:
start_marker = "// 1. VIDEO EDITING"
end_marker = "// 2. THUMBNAIL DESIGN"

pos_start = content.find(start_marker)
pos_end = content.find(end_marker)

if pos_start != -1 and pos_end != -1:
    new_video_section = f"// 1. VIDEO EDITING ({45} Verified Production Reels & Long-Form Edits)\n  // ==========================================\n{video_projects_code}\n\n  // ==========================================\n  "
    updated_content = content[:pos_start] + new_video_section + content[pos_end:]
    with open('src/content/projects.ts', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Updated src/content/projects.ts successfully with all 45 videos!")
else:
    print("Markers not found:", pos_start, pos_end)
