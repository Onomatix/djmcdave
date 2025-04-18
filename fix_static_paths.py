import os

# Configuration
target_dir = "dist"
search_text = "/public/lovable-uploads/"
replace_text = "/lovable-uploads/"
file_extensions = (".html", ".js", ".css", ".json")

def fix_paths_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    if search_text in content:
        updated_content = content.replace(search_text, replace_text)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"✔ Updated: {file_path}")
    else:
        print(f"— Skipped (no matches): {file_path}")

def walk_and_fix(root_dir):
    for root, _, files in os.walk(root_dir):
        for filename in files:
            if filename.endswith(file_extensions):
                file_path = os.path.join(root, filename)
                fix_paths_in_file(file_path)

if __name__ == "__main__":
    if os.path.exists(target_dir):
        print(f"🔍 Scanning '{target_dir}' for path fixes...")
        walk_and_fix(target_dir)
        print("✅ Path correction completed.")
    else:
        print(f"❌ Directory '{target_dir}' not found.")
