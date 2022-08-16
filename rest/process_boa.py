from dataloader import DataLoader 
from text_section import TextSection

dl = DataLoader("complaints_boa.csv")
vecs_js = dl.get_vecs_directory("BANK OF AMERICA, NATIONAL ASSOCIATION")
keys = list(vecs_js.keys())
vecs = [vec.split("__") for vec in keys]
print(vecs)
vec_dict = dl.filter_vecs(vecs)
proj_root = dl.proj_root
dir_path = proj_root+"/data/vecs/dir1"
tex_sect = TextSection()
for key in keys:
    print(key.split("__"))
    dir_vec = dir_path + "/" + vecs_js[key]
    vec_data = vec_dict[key]
    print(vec_data)
    break





