with open('src/content/projects.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed_lines = []
for line in lines:
    if line.strip().startswith("title: '") and line.strip().endswith("',"):
        # extract content between first ' and last '
        start = line.find("'")
        end = line.rfind("'")
        inner = line[start+1:end]
        # Replace unescaped single quotes
        fixed_inner = inner.replace("\\'", "'").replace("'", "\\'")
        fixed_line = line[:start] + "'" + fixed_inner + line[end:]
        fixed_lines.append(fixed_line)
    else:
        fixed_lines.append(line)

with open('src/content/projects.ts', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("Fixed quotes in titles!")
