import re
import json

def parse_lunna_raw(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    sections = []
    current_section = None
    current_list = None
    
    in_source = False

    for line in lines:
        line = line.strip()
        
        if not in_source:
            if "## 01. Capa e identificação" in line:
                in_source = True
            else:
                continue
                
        if line.startswith("## "):
            match = re.match(r"##\s+(\d+)\.\s+(.*)", line)
            if match:
                if current_section and current_list:
                    current_section['blocks'].append({
                        'type': 'list',
                        'content': current_list
                    })
                    current_list = None

                num = match.group(1)
                title = match.group(2)
                
                # Determine template
                template = 'Text'
                if num == '01': template = 'Cover'
                elif num == '03': template = 'TableOfContents'
                elif num in ['09', '10', '12', '16', '17', '18']: template = 'Matrix' # Just guesses, but we can default all to Text
                
                current_section = {
                    'id': f'sec-{num}',
                    'number': num,
                    'title': title,
                    'preferredTemplate': 'Text' if num not in ['01', '03'] else ('Cover' if num == '01' else 'TableOfContents'),
                    'blocks': []
                }
                sections.append(current_section)
                continue

        if not current_section:
            continue

        if not line:
            if current_list:
                current_section['blocks'].append({
                    'type': 'list',
                    'content': current_list
                })
                current_list = None
            continue

        # Check if line is a list item
        list_match = re.match(r"^(?:-|\d+\.)\s+(.*)", line)
        if list_match:
            if current_list is None:
                current_list = []
            current_list.append(list_match.group(1))
        else:
            if current_list:
                current_section['blocks'].append({
                    'type': 'list',
                    'content': current_list
                })
                current_list = None
            
            # Check for subheadings
            if line.startswith("### "):
                current_section['blocks'].append({
                    'type': 'subheading',
                    'content': line[4:].strip()
                })
            elif line.startswith("> "):
                current_section['blocks'].append({
                    'type': 'quote',
                    'content': line[2:].strip()
                })
            else:
                current_section['blocks'].append({
                    'type': 'paragraph',
                    'content': line
                })
                
    if current_list:
        sections[-1]['blocks'].append({
            'type': 'list',
            'content': current_list
        })

    # Add unique IDs to blocks
    for sec in sections:
        for i, block in enumerate(sec['blocks']):
            block['id'] = f"b{int(sec['number'])}-{i+1}"

    return sections

if __name__ == '__main__':
    sections = parse_lunna_raw('lunna_raw.txt')
    
    # Generate TypeScript file content
    ts_content = """import type { EditorialDocument } from '../types/editorial';

export const lunnaBlueprint: EditorialDocument = {
  id: 'lunna-001',
  version: '1.0',
  client: 'Lunna Atelier',
  date: '2026-08-26',
  scope: 'Blueprint Estratégico',
  sections: """ + json.dumps(sections, ensure_ascii=False, indent=2) + """\n};"""

    # Fix formatting issues like replacing double quotes with single quotes in keys if we wanted, but json.dumps is fine in TS
    
    with open('src/data/lunna-blueprint.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print("Successfully generated lunna-blueprint.ts with", len(sections), "sections")
