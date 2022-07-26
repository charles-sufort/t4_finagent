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
# T4P-1
    def process_dataform_ction(self,ction,dataform):
        vec_strs_1 = []
        # add each vector of ction to processing queue 

        for cl in ction:
            vecs = ction[cl]
            cl_strs = [(vec[0],"__".join(vec[1:])) for vec in vecs]
            vec_strs_1 += cl_strs
        vec_strs = []
        # loop through processing queue
        for company,vec_str in vec_strs_1:
           # get metadata for vector
            vec_md = self.fdf_mgr.retrieve_vec_metadata(company,vec_str)
            if dataform not in vec_md["dataforms"]:
                vec_df = self.dl.df.iloc[vec_md["indices"]]
                #  process vec indices
                data = self.process_dataform(vec_df,dataform)
                # save vec data
                self.fdf_mgr.save_vec_data(company,vec_str,data,dataform)

    def process_dataform_vecs(self, vecs, dataform):
        vec_strs = [(vec[0],"__".join(vec[1:])) for vec in vecs]
        # loop through processing queue
        for company,vec_str in vec_strs:
           # get metadata for vector
            vec_md = self.fdf_mgr.retrieve_vec_metadata(company,vec_str)
            if dataform not in vec_md["dataforms"]:
                # process vec indices
                vec_df = self.dl.df.iloc[vec_md["indices"]]
                data = self.process_dataform(vec_df,dataform)
                # save vec data
                self.fdf_mgr.save_vec_data(company,vec_str,data,dataform)

    def process_dataform_company(self,company,dataform):
        company_md = self.fdf_mgr.get_company_metadata(company)
        vec_strs = [(company,vec) for vec in company_md]
        # loop through processing queue

        for company,vec_str in vec_strs:
           # get metadata for vector
            vec_md  = self.fdf_mgr.retrieve_vec_metadata(company,vec_str)
            if dataform not in company_md[vec_str]["dataforms"]:
                # process vec indices
                vec_df = self.dl.df.iloc[vec_md["indices"]]
                data = self.process_dataform(vec_df,dataform)
                # save vec data
                self.fdf_mgr.save_vec_data(company,vec_str,data,dataform)

    def process_dataform_vec_dict(self,vec_dict,dataform):
        for vec in vec_dict:
            inds = [ int(ind) for ind in vec_dict[vec]]
            inds_df = self.dl.df.iloc[inds]
            data = self.process_dataform(inds_df,dataform)

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
                ners = pipe.get_ners(text)
                data[inds[i]] = ners
        return data

# T4P-2

    def get_ction_dataform(ction,dataform):
        cl_dict = {}
        for cl in ction:
            vecs = [(vec[0],"__".join(vec[1:])) for vec in ction[cl]]
            cl_data = []
            for company, vec_str in vecs:
                data = self.fdf_mgr.retrieve_vec_data(company,vec,dataform)
                cl_data.appendChild(data)
            cl_dict[cl] = cl_data
        return cl_dict

    def get_vecs_dataform(self,dataform):
        fdf_jd = self.fdf_mgr.js_md
        companies = list(fdf_jd["companies"].keys())
        vecs = []
        for company in companies:
            company_md = self.fdf_mgr.get_company_metadata(company)
            for vec in company_md:
                vec_md = company_md[vec]
                if dataform in vec_md["dataforms"]:

                    if vec_md["dataforms"][dataform] == "Yes":
                        vecs.append(vec)
        return vecs


    def get_company_vecs_dataform(self,dataform,company):
        fdf_jd = self.fdf_mgr.js_md
        vecs = []
        company_md = self.fdf_mgr.get_company_metadata(company)
        for vec in company_md:
            vec_md = company_md[vec]
            if dataform in vec_md["dataforms"]:
                if vec_md["dataforms"][dataform] == "Yes":
                    vecs.append(vec)
        return vecs


# 
    def check_ction_dataform(self,ction,dataform):
        vec_strs = []
        for cl in ction:
            vecs = ction[cl]
            vecs2 = []
            for vec in vecs:
                vec = [vec[i] for i in range(4) if vec[i] != "NA" ]
                vecs2.append(vec)
            cl_strs = [(vec[0],"__".join(vec)) for vec in vecs ]
            vec_strs += cl_strs
        for company, vec_str in vec_strs:
            print(company,vec_str)
            cmp_md = self.fdf_mgr.get_company_metadata(company)
            print(cmp_md)
            cmp_vec_strs = [tup[0] for tup in cmp_md[vec_str]["dataforms"][dataform]]
            vec_in = False
            for cmp_vec_str in cmp_vec_strs:
                if vec_str in cmp_vec_str:
                    vec_in = True
                    break
        return True

    def get_company_dataform_progress(self,company,dataform):
        md = self.fdf_mgr.get_metadata()
        if company in md["companies"]:
            cmp_md = md["companies"][company]
            if dataform in cmp_md["dataforms"]:
                return {"processed":cmp_md["dataforms"][dataform],"total":cmp_md["count"]}
            else:
                return "not processed"
        else:
            return "no company"



    def count_dataform_freq(self,ction,dataform,key):
        if not self.check_ction_dataform(ction,dataform):
            return "Data Not Processed"
        ction_dict = {}
        for cl in ction:
            cl_dict = {}
            cl_vals = []
            for vec in ction[cl]:
                company = vec[0]
                vec_str = "__".join(vec)
                data = self.fdf_mgr.retrieve_vec_data(company,vec_str,dataform)
                for ind in data:
                    ind_data = data[ind]
                    vals = [ldict[key] for ldict in ind_data]
                    cl_vals += vals
            val_set = set(cl_vals)
            val_count = [[val, cl_vals.count(val)] for val in val_set]
            ction_dict[cl] = val_count
        return ction_dict

    def company_dataform_scan_faults(self,company,dataform):
        company_md = self.fdf_mgr.get_company_metadata(company)
        fault_inds = {}
        for vec in company_md:
            vec_dict = company_md[vec]
            if vec_dict["dataforms"][dataform] == "Yes":
                df_dict = self.fdf_mgr.retrieve_vec_data(company,vec,dataform)
                processed = True
                for ind in df_dict:
                    if df_dict[ind] == []:
                        if vec not in fault_inds:
                            fault_inds[vec] = []
                            processed = False
                            fault_inds[vec].append(ind)
                        else: 
                            processed = False
                            fault_inds[vec].append(ind)

            return fault_inds
#
#                if not processed:
#                    vec_md = self.fdf_mgr.retrieve_vec_metadata(company,vec)
#                    vec_df = self.dl.df.iloc[vec_md["indices"]]
#                    data = self.process_dataform(vec_df,dataform)
#                    self.fdf_mgr.save_vec_data(company,vec,data,dataform)
#
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




if __name__ == "__main__":
    t4proc = T4Processor()
    ction = {"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Debt collection","Auto debt","Attempts to collect debt not owed","Debt was paid"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Debt collection","Auto debt","Attempts to collect debt not owed","Debt is not yours"],["BANK OF AMERICA, NATIONAL ASSOCIATION","Checking or savings account","Savings account","Problem caused by your funds being low","Late or other fees"]]}

    dataform = "lemma"
#    print(t4proc.get_vecs_dataform(dataform))

    company = "BANK OF AMERICA, NATIONAL ASSOCIATION"
    vec_dict = {"Credit reporting, credit repair services, or other personal consumer reports__Credit reporting__Problem with a credit reporting company's investigation into an existing problem__Difficulty submitting a dispute or getting information about a dispute over the phone": ['23373', '738560']}
    t4proc.process_dataform_vec_dict(vec_dict,"noun_chunks")


#    print(t4proc.get_company_metadata(company))

#    print(t4proc.get_company_vecs_dataform(dataform,company))


    
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

