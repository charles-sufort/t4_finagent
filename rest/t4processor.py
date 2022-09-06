import pandas as pd

from dataloader import DataLoader
from dataclient import DataClient
from fdf_mgr import FDF_MGR
from text_section import TextSection
import time


class T4Processor:
    def __init__(self):
        self.dl = DataLoader()
        self.fdf_mgr = FDF_MGR()

    def process_dataform_ction(self,ction,dataform):
        vec_strs_1 = []
        for cl in ction:
            vecs = ction[cl]
            cl_strs = [(vec[0],"__".join(vec[1:])) for vec in vecs]
            vec_strs_1 += cl_strs
        vec_strs = []
        for company,vec_str in vec_strs_1:
            vec_md = self.fdf_mgr.retrieve_vec_metadata(company,vec_str)
            if dataform not in vec_md["dataforms"]:
                vec_df = self.dl.df.iloc[vec_md["indices"]]
                data = self.process_dataform(vec_df,dataform)
                self.fdf_mgr.save_vec_data(company,vec_str,data,dataform)

    def process_dataform_vec(self, vecs, dataform):
        vec_strs = [(vec[0],"__".join(vec[1:])) for vec in vecs]
        for company,vec_str in vec_strs:
            vec_md = self.fdf_mgr.retrieve_vec_metadata(company,vec_str)
            if dataform not in vec_md["dataforms"]:
                vec_df = self.dl.df.iloc[vec_md["indices"]]
                data = self.process_dataform(vec_df,dataform)
                self.fdf_mgr.save_vec_data(company,vec_str,data,dataform)

    def get_vecs_dataform(self,dataform):
        fdf_jd = self.fdf_mgr.js_md
        companies = list(fdf_jd["companies"].keys())
        for company in companies:
            company_md = self.fdf_mgr.get_company_metadata(company)
            for vec in company_md:
                vec_md = company_md[vec]
                if dataform in vec_md:
                    pass




              
    def process_dataform(self,vec_df,dataform):
        lemmas = []
        inds = vec_df.index.values.tolist()
        self.text_section = TextSection()
        pipe = TextSection()
        data = {}
        for i in range(len(inds)):
            text = vec_df["Consumer complaint narrative"].iloc[i]
            if dataform == "lemma":
                data[inds[i]] = pipe.get_lemmas(text)
            elif dataform == "noun_chunks":
                data[inds[i]] = pipe.get_noun_chunks(text)
            elif dataform == "ners":
                data[inds[i]] = pipe.get_ners(text)
        return data

    def company_metadata_summary(self,company):
        js_md = self.fdf_mgr.js_md
        cmp_md = self.fdf_mgr.get_company_metadata(company)
        df_dict = {}
        for vec in cmp_md:
            for dataform in cmp_md[vec]["dataforms"]:
                if cmp_md[vec]["dataforms"][dataform] != "Yes":
                    continue
                if dataform not in df_dict:
                    df_dict[dataform] = []
                count = cmp_md[vec]["count"]
                df_dict[dataform].append([vec,count])
        return {"count": js_md["companies"][company]["count"], "dataframe": df_dict}

    def get_dataform_inventory(dataform):
        pass


    def check_ction_dataform(self,ction,dataform):
        vec_strs = []
        for cl in ction:
            vecs = ction[cl]
            cl_strs = [(vec[0],"__".join(vec[1:])) for vec in vecs]
            vec_strs += cl_strs
        for company, vec_str in vec_strs:
            cmp_md = self.company_metadata_summary(company)
            vec_strs = [tup[0] for tup in cmp_md["dataframe"][dataform]]
            if vec_str not in vec_strs:
                print(cmp_md)
                return False
        return True

    def count_dataform_freq(self,ction,dataform,key):
        if not t4proc.check_ction_dataform(ction,dataform):
            return "Data Not Processed"
        ction_dict = {}
        for cl in ction:
            cl_dict = {}
            cl_vals = []
            for vec in ction[cl]:
                company = vec[0]
                vec_str = "__".join(vec[1:])
                data = self.fdf_mgr.retrieve_vec_data(company,vec_str,dataform)
                for ind in data:
                    ind_data = data[ind]
                    vals = [ldict[key] for ldict in ind_data]
                    cl_vals += vals
            val_set = set(cl_vals)
            val_count = [[val, cl_vals.count(val)] for val in val_set]
            ction_dict[cl] = val_count
        return ction_dict



if __name__ == "__main__":
    t4proc = T4Processor()
    ction = {"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Debt collection","Auto debt","Attempts to collect debt not owed","Debt was paid"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Debt collection","Auto debt","Attempts to collect debt not owed","Debt is not yours"],["BANK OF AMERICA, NATIONAL ASSOCIATION","Checking or savings account","Savings account","Problem caused by your funds being low","Late or other fees"]]}

#    dataform = "lemma"
#    key = "lemma"
#    t4proc.process_dataform_ction(ction,dataform)

#    print(t4proc.check_ction_dataform(ction,dataform))
#    lem_count = t4proc.count_dataform_freq(ction,dataform,key)
#    l1 = lem_count["C1"]
#    l1 = sorted(l1,key=lambda tup: tup[1],reverse=True)
#    print(ction["C1"])
#    print(l1)
#    l2 = lem_count["C2"]
#    l2 = sorted(l2,key=lambda tup: tup[1],reverse=True)
#    print(ction["C2"])
#    print(l2)
#
#    start = time.time()
#    print(t4proc.check_ction_dataform(ction,"noun_chunks"))
#    finish = time.time()
#    print(t4proc.company_metadata_summary("BANK OF AMERICA, NATIONAL ASSOCIATION"))
#    print(finish-start)
