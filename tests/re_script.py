import re

text = "The sly cat ate a wolf's heart."
p = "[a-zA-Z\']+"

terms = re.findall(p,text)
print(terms)
