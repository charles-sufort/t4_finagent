import json,os,shutil
import numpy as np
import pandas as pd
import tensorflow as tf

class MDL_MGR:
    def __init__(self):
        src_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        print(src_dir)
        self.data_dir = src_dir + "/data"
        self.db_dir = self.data_dir + "/models"

    def init_db(self):
        if not os.path.exists(self.db_dir):
            os.mkdir(self.db_dir)
        dir_md = {"models":{}}
        md_file = self.db_dir + "/directory.json"
        with open(md_file,'w') as fo:
            json.dump(dir_md,fo)

    def reset_db(self):
        if os.path.exists(self.db_dir):
            shutil.rmtree(self.db_dir)
        self.init_db()

    def load_md(self):
        md_file  = self.db_dir + "/directory.json"
        md = None
        with open(md_file,'r') as fo:
            md = json.load(fo)
            return md

    def save_md(self,md):
        md_file = self.db_dir +"/directory.json"
        with open(md_file,'w') as fo:
            json.dump(md,fo)

    def add_model(self,model):
        md = self.load_md()
        models = list(md["models"].keys())
        n = len(models)
        dir_name = "model_{}".format(n)
        if model not in models:
            model_dict = {"dir": dir_name}
            md["models"][model] = model_dict
            self.save_md(md)
        else:
            print("Model already defined")
            return
        dir_path =  self.db_dir + "/" + dir_name
        os.mkdir(dir_path)
        train_path = dir_path + "/train" 
        os.mkdir(train_path)
        dir_md = {"train_dict":{}}
        md_file = dir_path + "/directory.json"
        with open(md_file,'w') as fo:
            json.dump(dir_md,fo)
        

if __name__ == "__main__":
    mdl_mgr = MDL_MGR()
    mdl_mgr.reset_db()
    mdl_mgr.add_model("test_model")

