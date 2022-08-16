import os
import json

src_dir = os.path.dirname(os.path.abspath(__file__))
proj_root = os.path.dirname(src_dir)
dir_path = proj_root+"/data/vecs/dir1"
file = dir_path + "/directory.json"
js_dict = {}
with open(file,'r') as fo:
    js_dict = json.load(fo)

print(js_dict)



