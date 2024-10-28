import openpyxl
import os
import re



def remove_special_characters(text):
    # 使用正则表达式去除非英文字母和空格
    return re.sub(r'[^a-zA-Z\s]', '', text)

def camel_case(text):
    words = text.split()
    # 第一个单词小写，其他单词首字母大写，然后连接成一个字符串
    return ''.join(word.lower() if i == 0 else word.capitalize() for i, word in enumerate(words))

def truncate_words(text, max_words):
    words = text.split()
    # 取前max_words个单词
    truncated_words = words[:max_words]
    return ' '.join(truncated_words)

def generate_key(value):
    if value is None:
        return ""
    cleaned_text = remove_special_characters(value)
    truncated_text = truncate_words(cleaned_text, 4)
    camel_cased_text = camel_case(truncated_text)
    return camel_cased_text

def read_excel(filename):
    """
    读取 Excel 文件，并遍历每一行的前5列
    """
    wb = openpyxl.load_workbook(filename)
    sheet = wb.active
    
    print("▶️ 读书数据,从第二行开始,取前5列")
    for row in sheet.iter_rows(min_row=2, max_col=5):
        obj = {}
        index = 0
        for cell in row:
            cell_value = cell.value
            if cell_value is None:
                if (index == 0):
                    en_cellValue = row[2].value
                    key = generate_key(en_cellValue)
                    cell_value = key
                    print(f"❗️en=\"{en_cellValue}\" 自动生成: {key} ✅")
                else:
                    cell_value = ""

            if index == 0:                
                obj["key"] = cell_value
            elif index == 1:
                obj["zh"] = cell_value
            elif index == 2:
                obj["en"] = cell_value
            elif index == 3:
                obj["es"] = cell_value
            elif index == 4:
                obj["br"] = cell_value
            else:
                print("数据异常")
            index += 1

        yield obj

    wb.close()

def write_language_file(data, output_dir, language_code):
    """
    将特定语言的内容写入对应文件
    """
    # 打开文件并写入数据
    print(f"▶️ 写入文件:{output_dir}\{language_code}.ts")
    with open(os.path.join(output_dir, f"{language_code}.ts"), 'w', encoding='utf-8') as file:
        file.write("export default {\n")
        file.write(f"{data}\n")
        file.write("}")

def read_and_process_excel(filename):
    """
    读取 Excel 文件并处理数据，返回去重并排序后的结果列表
    """
    ori_list = []
    for value in read_excel(filename):
        ori_list.append(value)

    unique_keys = set()
    unique_sorted_data = []

    for item in ori_list:
        key = item['key']
        if key not in unique_keys:
            unique_sorted_data.append(item)
            unique_keys.add(key)

    sorted_data = sorted(unique_sorted_data, key=lambda x: x['key'])
    return sorted_data

def generate_language_content(sorted_data, language_code):
    """
    根据排序后的数据生成特定语言的内容字符串
    """
    content = ''
    for value in sorted_data:
        content += f"  {value['key']}: \"{value[language_code]}\",\n"
    return content

def write_language_files(sorted_data, output_dir):
    """
    将特定语言的内容写入对应文件
    """
    languages = ['br', 'en', 'zh', 'es']

    for language in languages:
        content = generate_language_content(sorted_data, language)
        write_language_file(content, output_dir, language)

def main():
    print("▶️ 准备翻译excel文档数据")
    filename = 'languages.xlsx'
    output_dir = '../src/language/modules/'
    
    sorted_data = read_and_process_excel(filename)
    print("▶️ 读取sorted_data信息")
    write_language_files(sorted_data, output_dir)
    print("▶️ 写入多语言文件")
    print("写入完成 ✅")

if __name__ == "__main__":
    main()
    