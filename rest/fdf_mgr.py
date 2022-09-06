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

    def get_company_metadata(self,company):
        js_md = self.get_metadata()
        file = self.fdf_root + "/" + js_md["companies"][company]["dir"] + "/directory.json"
        cmp_md = {}
        with open(file,'r') as fo:
            cmp_md = json.load(fo)
        return cmp_md

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
            vec_df = self.dl.filter_vec(vec,company)
            indices = vec_df.index.values.tolist()
            ids = vec_df["Complaint ID"].values.tolist()
            dir_path = "vec" + str(i+1)
            vec_dict = {"dir":dir_path,"dataforms":{},"count":len(indices)}
            js_cpy[vec_str] = vec_dict
            dir_path = dir_cmp_path + "/" + dir_path
            os.mkdir(dir_path)
            vec_dir = {"indices":indices,"ids":ids}
            with open(dir_path+"/directory.json",'w') as fo:
                json.dump(vec_dir,fo)
        self.js_md["companies"][company] = {}
        self.js_md["companies"][company]["dir"] = dir_cmp
        self.js_md["companies"][company]["dataforms"] = []
        self.js_md["companies"][company]["count"] = self.dl.df.loc[self.dl.df["Company"] == company].shape[0]
        cmp_dir_path = dir_cmp_path + "/directory.json" 
        self.save_metadata(self.js_md)
        with open(cmp_dir_path,'w') as fo:
            json.dump(js_cpy,fo)


    def retrieve_vec_metadata(self,company,vec):
        """
        params
        company (str) -- company of vec
        vec (str) -- vec_str of vec

        returns
        vec_md -- combined vec metadata
        """
        dir_cmp = self.fdf_root + "/" + self.js_md["companies"][company]["dir"]
        cmp_md_path = dir_cmp + "/directory.json"
        cmp_md = {}
        with open(cmp_md_path,'r') as fo:
            cmp_md = json.load(fo)
        vec_md1 = cmp_md[vec]
        vec_path = dir_cmp + "/" + vec_md1["dir"] + "/directory.json"
        vec_md2 = {}
        with open(vec_path,'r') as fo:
            vec_md2 = json.load(fo)
        vec_md = {}
        vec_md['dataforms'] = vec_md1['dataforms']
        vec_md['count'] = vec_md1['count']
        vec_md['indices'] = vec_md2['indices']
        return vec_md

    def save_vec_data(self,company,vec,data,dataform):
        print("save_vec_data {}".format(vec))
        dir_cmp = self.fdf_root + "/" + self.js_md["companies"][company]["dir"]
        cmp_md_path = dir_cmp + "/directory.json"
        cmp_md = {}
        with open(cmp_md_path,'r') as fo:
            cmp_md = json.load(fo)
        vec_md1 = cmp_md[vec]
        vec_path = dir_cmp + "/" + vec_md1["dir"] + "/" +dataform + ".json"
        with open(vec_path,'w') as fo:
            json.dump(data,fo)
        cmp_md[vec]["dataforms"][dataform] = "Yes"
        with open(cmp_md_path,'w') as fo:
            json.dump(cmp_md,fo)

    def retrieve_vec_data(self,company,vec,dataform):
        dir_cmp = self.fdf_root + "/" + self.js_md["companies"][company]["dir"]
        cmp_md_path = dir_cmp + "/directory.json"
        cmp_md = {}
        with open(cmp_md_path,'r') as fo:
            cmp_md = json.load(fo)
        if dataform not in cmp_md[vec]["dataforms"]:
            print("not found")
            return -1
        elif cmp_md[vec]["dataforms"][dataform] != "Yes":
            print("not found")
            return -1
        vec_dir = dir_cmp + "/" + cmp_md[vec]["dir"]
        data_js_path = vec_dir + "/" + dataform + ".json"
        data_js = {}
        with open(data_js_path,'r') as fo:
            data_js = json.load(fo)
        return data_js


if __name__ == "__main__":
#   reinit_fdf()
    dbmgr = FDF_MGR()
#    dbmgr.add_company("BANK OF AMERICA, NATIONAL ASSOCIATION")
#    dbmgr = FDF_MGR()
    company = "BANK OF AMERICA, NATIONAL ASSOCIATION"
#    print(dbmgr.get_company_metadata(company))
    vec = ["Debt collection","Auto debt","Attempts to collect debt not owed","Debt was paid"]
    vec_str = "__".join(vec)
    data = dbmgr.retrieve_vec_data(company,vec_str,"lemma")
    print(data)
    #company = "BANK OF AMERICA, NATIONAL ASSOCIATION"
    #vec = "Debt collection","Auto debt","Attempts to collect debt not owed","Debt was paid"
    #vec_str = "__".join(vec)
    #print(dbmgr.retrieve_vec_metadata(company,vec_str))

