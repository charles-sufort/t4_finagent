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

    def get_company_metadata(self,company):
        path = self.fdf_root + "/" + self.js_md["companies"][company]["dir"] + "/" + "directory.json"
        with open(path,'r') as fo:
            return json.load(fo)

    def save_metadata(self,js_md):
        file = self.fdf_root + "/directory.json"
        with open(file,'w') as fo:
            json.dump(js_md,fo)

    def add_dataform(self):
        pass

    def add_company(self,company):
        vecs = self.dl.get_vecs(company)
        js_cpy = {}
        companies = list(self.js_md["companies"].keys())
        dir_cmp = "dir" + str(len(companies)+1) 
        dir_cmp_path = self.fdf_root + "/" + dir_cmp
        os.mkdir(dir_cmp_path)
        for i in range(len(vecs)):
            vec = vecs[i]
            vec_str = "__".join(vec)
            indices = self.dl.filter_vec(vec).index.values.tolist()
            dir_path = "vec" + str(i+1)
            vec_dict = {"dir":dir_path,"dataforms":{},"count":len(indices)}
            js_cpy[vec_str] = vec_dict
            dir_path = dir_cmp_path + "/" + dir_path
            os.mkdir(dir_path)
            vec_dir = {"indices":indices}
            with open(dir_path+"/directory.json",'w') as fo:
                json.dump(vec_dir,fo)
        self.js_md["companies"][company] = {}
        self.js_md["companies"][company]["file"] = dir_cmp
        self.js_md["companies"][company]["dataforms"] = []
        cmp_dir_path = dir_cmp_path + "/directory.json" 
        self.save_metadata(self.js_md)
        with open(cmp_dir_path,'w') as fo:
            json.dump(js_cpy,fo)

    def retrieve_vec_data(self,company,vec):
        """
        params
        company (str) -- company of vec
        vec (str) -- vec_str of vec

        returns
        vec_md -- combined vec metadata
        """
        dir_cmp = self.fdf_root + "/" + self.js_md[company][file][vec]

    def save_vec_data(self,company,vec,data,dataform):        
        company_path = self.fdf_root + "/" + self.js_md[company]["dir"] 
        with open(path,'w') as fo:
            json.dump(data)

if __name__ == "__main__":
    #reinit_fdf()
    dbmgr = FDF_MGR() 
    print(dbmgr.get_company_metadata("BANK OF AMERICA, NATIONAL ASSOCIATION")) 
    #dbmgr.add_company("BANK OF AMERICA, NATIONAL ASSOCIATION")



