import pandas as pd
import os, re, time, json
import numpy as np
from text_section import TextSection

class DataLoader:
    def __init__(self,file=None):
        src_dir = os.path.dirname(os.path.abspath(__file__))
        self.proj_root = os.path.dirname(src_dir)
        if file is None:
            file = self.proj_root + "/data/complaints.csv"
            self.df = pd.read_csv(file)
        else:
            file = self.proj_root + "/data/" + file
            self.df = pd.read_csv(file)
        self.df = self.df.loc[self.df['Consumer complaint narrative'].notnull()]
        self.df.reset_index(drop=True,inplace=True)
        self.df['Product'].fillna("nan",inplace=True)
        self.df['Sub-product'].fillna("nan",inplace=True)
        self.df['Issue'].fillna("nan",inplace=True)
        self.df['Sub-issue'].fillna("nan",inplace=True)
 
    def get_ction(self,ction):
        cdict = ction['dictionary']

    def get_vecs(self,company):
        df_c = self.df.loc[self.df["Company"] == company]
        fields = ['Product','Sub-product','Issue','Sub-issue']
        df_dd = df_c.drop_duplicates(subset=fields)
        vecs = df_dd[fields].values.tolist()
        return vecs

    def get_companies(self):
        return self.df["Company"].drop_duplicates().values.tolist()

    def get_company_df(self,company):
        return self.df.loc[self.df["Company"] == company]

    def filter_vec(self,vec):
        company = vec[0]
        vec = vec[1:]
        fields = ['Product','Sub-product','Issue','Sub-issue']
        key = "__".join(vec)
        fields_1 = []
        vec_1 = []
        for i in range(4):
            if vec[i] != "NA":
                vec_1.append(vec[i])
                fields_1.append(fields[i])
        df = self.df.loc[self.df['Company'] == company]
        print(fields_1)
        print(vec_1)
        return df.loc[df[fields_1].isin(vec_1).all(1)]


    def filter_vecs(self,vecs,company=None):
        vec_keys =  ["__".join(vec) for vec in vecs]
        vec_dict = {}
        for i in range(len(vecs)):
            vec = vecs[i]
            vec_dict[vec_keys[i]] = self.filter_vec(vec,company)
        return vec_dict

    def filter_ction(self,c_dict):
        L = {}
        for C in c_dict:
            L[C] = []
        fields = ['Product','Sub-product','Issue','Sub-issue']
        for cl in c_dict:
            vecs = c_dict[cl]
            I_cl = pd.Index([])
            for vec in vecs:
                print(vec)
                n = 4
                for i in range(4):
                    if vec[i] == "NA":
                        n = i
                        break
                print(i)
                i_vec = self.df.loc[self.df[fields[:n]].isin(vec[:n]).all(1)].index
                print(i_vec)
                I_cl = I_cl.union(i_vec)
            L[cl] = I_cl
        for c in c_dict:
            L[c] = self.df.iloc[L[c]]
        return L

    def get_vecs_directory(self,company):
        dir_path = self.proj_root + "/data/vecs"
        file = dir_path + "/directory.json"
        js_dict = {}
        with open(file,'r') as fo:
            js_dict = json.load(fo)
        dir_path = dir_path + "/" + js_dict[company]
        file = dir_path + "/directory.json"
        with open(file,'r') as fo:
            js_dict = json.load(fo)
        return js_dict

    def get_lvec_sample(self,lvec):
        fields = ['Product','Sub-product','Issue','Sub-issue']
        n = 4
        for i in range(4):
            if lvec[i] == "NA":
                n = i
        print("fields: {}".format(fields[:n]))
        print("lvec: {}".format(lvec[:n]))
        lvec = self.df.loc[self.df[fields[:n]].isin(lvec[:n]).all(1)] 
        print("sample matches: {}".format(lvec))
        print("high: {}".format(lvec.shape[0]))
        i = np.random.randint(0,high=lvec.shape[0])
        elem  = lvec.iloc[i]
        print(elem)
        return elem['Consumer complaint narrative']
    
    def save_df(self,df,name):
        file = self.proj_root + "/data/" + name
        df.to_csv(file)

#JUNK

    def query_text(self,df,query_type,min_n):
        data = {}
        for i in range(df.shape[0]):
            txt = TextSection(df['Consumer complaint narrative'].iloc[i])
            if query_type == "ner":
                ners = txt.get_ners()
                for ner in ners:
                    if ner in data:
                        data[ner] = data[ner] + 1
                    else:
                        data[ner] = 1
            elif query_type == "lemmas":
                lems = txt.get_lemmas()
                for lem in lems:
                    if lem in data:
                        data[lem] = data[lem] + 1
                    else:
                        data[lem] = 1
            elif query_type == "noun_chunk":
                data = txt.get_noun_chunks()
        data2 = {}
        for key in data:
            if data[key] > min_n:
                data2[key] = data[key]
        return data2        

    def match_to_clabel(self,c_dict,df_elem):
        vec_elem = list(df_elem[['Product','Sub-product','Issue','Sub-issue']])
        matches = False
        for clabel in c_dict:
            vecs = c_dict[clabel]
            for vec in vecs:
                pass
        return "NA"

    def dfC_term_avgs(self,ction,termlist):
        CL = self.filter_vecs(ction)
        p = "[a-zA-Z\']+"
        CT_df = {}
        for cl in CL: 
            cl_df = CL[cl]
            df_ccn = cl_df['Consumer complaint narrative'].str.lower()
            re_df = df_ccn.map(lambda x: re.findall(p,x))
            terms_df = pd.DataFrame(data={"index": range(re_df.shape[0])})
            re_df = re_df.reset_index(drop=True)
            for term in termlist:
                terms_df[term] = re_df.apply(lambda x: x.count(term))
            CT_df[cl] = terms_df
        dict_avgs = {}
        for cl in  CL:
            dict_avgs[cl] = {}
            for term in termlist:
                dict_avgs[cl][term] = np.average(CT_df[cl][[term]].to_numpy())
        return dict_avgs



if __name__ == "__main__":
#    ction = {"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Vehicle loan or lease","Loan","Managing the loan or lease","Billing problem"]]}
#
#    dl = DataLoader()
#    start = time.perf_counter()
#
#    data = dl.filter_vecs(ction)
#    stop = time.perf_counter()
#    print(stop-start)
    dl = DataLoader()
    print(dl.df.columns)

    print(dl.df["Complaint ID"])
    vec = ["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","Conventional home mortgage","Trouble during payment process","nan"]
    df_vec = dl.filter_vec(vec)
    print(len(df_vec.index.values.tolist()))
#    vec[4] =  "NA"
#    print(vec)
#    df_vec = dl.filter_vec(vec)
#    print(len(df_vec.index.values.tolist()))



#    vecs = [["Vehicle loan or lease","Loan","Managing the loan or lease","Billing problem"],['Credit reporting, credit repair services, or other personal consumer reports', 'Credit reporting', 'Problem with a credit reporting companys investigation into an existing problem', 'Difficulty submitting a dispute or getting information about a dispute over the phone']]
#    vecs = dl.filter_vecs(vecs)
#    print(vecs)


#dl = DataLoader()
#
#print(list(dl.df["Company"].unique()))
