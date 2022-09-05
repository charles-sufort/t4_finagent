import sys, os
import threading
from dataloader import DataLoader
import json
import re
from text_section import TextSection
from dataclient import DataClient
from t4processor import T4Processor


class T4:
    def __init__(self):
        self.dl = DataLoader('complaints_boa.csv')
        src_dir = os.path.dirname(os.path.abspath(__file__))
        self.proj_root = os.path.dirname(src_dir)
        self.ction_process = {}
        self.t4proc = T4Processor()

    def save_ction(self,name,ction):
        file = self.proj_root + "/data/ctions/" + name + ".json"
        ction = {"ction": ction}
        with open(file,'w') as fo:
            json.dump(ction,fo)
            
    def get_ction(self,name):
        file = self.proj_root + "/data/ctions/" + name + ".json"
        ction = self.__load_file(file)
        return ction["ction"]

    def get_ction_names(self):
        return self.__get_names("ctions/")

    def save_termlist(self,name, termlist):
        file = self.proj_root + "/data/termlists/" + name + ".json"
        termlist = {"terms": termlist}
        self.__save_file(file,termlist)

    def get_termlist(self,name):
        file = self.proj_root + "/data/termlists/" + name + ".json"
        return self.__load_file(file)["terms"]

    def get_termlist_names(self):
        return self.__get_names("termlists/")

    def query_term_avgs(self,ction, termlist):
        CL = self.dl.filter_vecs(ction)
        p = "[a-zA-Z\']+"
        CT_df = {}
        for cl in CL: 
            print("1: cl {}".format(cl))
            cl_df = CL[cl]
            df_ccn = cl_df['Consumer complaint narrative'].str.lower()
            re_df = cl_ccn.applymap(lambda x: re.findall(p,x))
            terms_df = {"index": range(terms_df.shape[0])}
            for term in termlist:
                term_df = re_df.applymap(lambda x: x.count(term))
                terms_df.insert(0,term,term_df)
            T[cl] = terms_df
        dict_avgs = {}
        for cl in  CL:
            print("2: cl {}".fomat(cl))
            dict_avgs[cl] = {}
            for term in termlist:
                dict_avgs[cl][term] = np.average(CT_df[cl].to_numpy())
        return dict_avgs

    def get_lvec_sample(self,vec):
        return self.dl.get_lvec_sample(vec)

    def avg_query(self,ction,termlist):
        return self.dl.dfC_term_avgs(ction,termlist)

    def query(self,ction,query_type,min_n):
        L = self.dl.filter_vecs(ction)
        query = {}
        for c in L:
            print("query: {}".format(c))
            Lc_dict = self.dl.query_text(L[c],query_type,min_n)
            Lc = [] 
            for term in Lc_dict:
                Lc.append([term,Lc_dict[term]])
            Lc = sorted(Lc,reverse=True,key=lambda tup:tup[1])
            query[c] = Lc
        return {"query":query}
        
    def process_dataform(self,ction,dataform):
        if ction.name not in self.ction_process:
            self.ction_process[ction.name] = {}
            self.ction_process[ction.name][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_thread,args=(ction,dataform))
            t.start()
        else:
            self.ction_process[ction.name][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_thread,args=(ction,dataform))
            t.start()

    def process_dataform_thread(self,ction,dataform):
        t4proc = T4Processor()
        t4proc.process_dataform_ction(ction.dictionary,dataform)
        self.ction_process[ction.name][dataform] = "finished"

    def get_dataform(self,ction,dataform):
        print("here")
        print(list(self.ction_process.keys()))
        if ction.name in self.ction_process:
            if dataform in self.ction_process[ction.name]:
                if self.ction_process[ction.name][dataform] == "finished": 
                    t4proc = T4Processor()
                    return t4proc.get_data(ction.dictionary,dataform)
                else:
                    return "Not Finished"
            else:
                return "Not Found"
        else:
            return "Not Found"

    def company_metadata_summary(self,company):
        return self.t4proc.company_metadata_summary(company)
    
    def __save_file(self,file,data):
        with open(file,'w') as fo:
            json.dump(data,fo)

    def __load_file(self, file):
        data = []
        with open(file,'r') as fo:
            data = json.load(fo)
        return data

    def __get_names(self,data_dir):
        dirname = self.proj_root + "/data/" + data_dir
        files = os.listdir(dirname)
        return [ file.split('.')[0] for file in files] 



