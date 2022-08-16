import json, os
from dataloader import DataLoader
from fdf_script import reinit_fdf

class FDF_MGR:
    
    def __init__(self):
        self.dl = DataLoader()
        self.df = self.dl.df
        self.fdf_root = self.dl.proj_root + "/data/fdf"
        self.js_md  = self.get_metadata()

    def get_metadata(self):
        file = self.fdf_root + "/directory.json"
        js_md = {}
        with open(file,'r') as fo:
            js_md = json.load(fo)
        return js_md

    def save_metadata(self,js_md):
        file = self.fdf_root + "/directory.json"
        with open(file,'w') as fo:
            json.dump(js_md,fo)

    def add_dataform(self):
        pass

    def add_company(self,company):
        vecs = self.dl.get_vecs(company)
        js_cpy = {}
        for i in range(len(vecs)):
            vec = vecs[i]
            vec_str = "__".join(vec)
            indices = self.dl.filter_vec(vec).index.values.tolist()
            dir_path = "vec" + str(i+1)
            vec_dict = {"dir":dir_path,"dataforms":{},"indices":indices}
            js_cpy[vec_str] = vec_dict
        companies = list(self.js_md["companies"].keys())
        dir_cmp = "dir" + str(len(companies)+1) 
        self.js_md["companies"][company] = {}
        self.js_md["companies"][company]["file"] = dir_cmp
        self.js_md["companies"][company]["dataforms"] = []
        dir_cmp_path = self.fdf_root + "/" + dir_cmp
        cmp_dir_path = dir_cmp_path + "/directory.json" 
        os.mkdir(dir_cmp_path)
        self.save_metadata(self.js_md)
        with open(cmp_dir_path,'w') as fo:
            json.dump(js_cpy,fo)
        for vec in js_cpy:
            dir_path = dir_cmp_path + "/" + js_cpy[vec]["dir"]
            os.mkdir(dir_path)


    def retrieve_vec_data(self):
        pass

if __name__ == "__main__":
    reinit_fdf()
    dbmgr = FDF_MGR()
    dbmgr.add_company("CAPITAL ONE FINANCIAL CORPORATION")


