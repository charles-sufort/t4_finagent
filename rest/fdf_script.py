import os, json
import shutil

def reinit_fdf():
    src_dir = os.path.dirname(os.path.abspath(__file__))
    proj_root = os.path.dirname(src_dir)
    data_dir = proj_root + "/data"
    db_dir = data_dir + "/fdf"
    if os.path.exists(db_dir):
        shutil.rmtree(db_dir)
    dir_js_path = db_dir + "/directory.json"
    dir_js = {"companies":{} }

    os.mkdir(db_dir)
    with open(dir_js_path,'w') as fo:
        json.dump(dir_js,fo)




