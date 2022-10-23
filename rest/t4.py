import sys, os
import threading
from dataloader import DataLoader
import json
import re
from text_section import TextSection
from dataclient import DataClient
from t4processor import T4Processor
from datatree import DataTree


class T4:
    def __init__(self):
        self.dl = DataLoader()
        src_dir = os.path.dirname(os.path.abspath(__file__))
        self.proj_root = os.path.dirname(src_dir)
        self.ction_process = {}
        self.t4proc = T4Processor()
        self.company_process = {}
        self.company_scan_process = {}
        self.company_scan_results = {}
#T4-1
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

    def save_termlist(self,dataform,name, termlist):
        file = self.proj_root + "/data/termlists/" + dataform + "/" + name + ".json"
        termlist = {"terms": termlist}
        self.__save_file(file,termlist)

    def get_termlist(self,dataform,name):
        file = self.proj_root + "/data/termlists/" + dataform + "/" + name + ".json"
        return self.__load_file(file)["terms"]

    def get_termlist_names(self):
        return self.__get_names("termlists/")

    def get_lvec_sample(self,vec):
        return self.dl.get_lvec_sample(vec)

#T4-2
    def process_dataform_ction(self,ction_name,dataform):
        ction = this.get_ction(ction_name)
        if ction_name not in self.ction_process:
            self.ction_process[ction_name] = {}
            self.ction_process[ction_name][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_thread,args=(ction_name,ction,dataform))
            t.start()
        else:
            self.ction_process[ction_name][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_thread,args=(ction,dataform))
            t.start()

    def process_dataform_ction_thread(self,ction_name,ction,dataform):
        self.t4proc.process_dataform_ction(ction,dataform)
        self.ction_process[ction_name][dataform] = "finished"

    def get_ction_dataform_status(self,ction_name,dataform):
        return self.__check_process(this.ction_process,ction_name,dataform)

    def process_dataform_company(self,company,dataform):
        if company not in self.company_process:
            self.company_process[company] = {}
            self.company_process[company][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_company_thread,args=(company,dataform))
            t.start()
        else:
            self.company_process[company][dataform] = "started"
            t = threading.Thread(target=self.process_dataform_company_thread,args=(company,dataform))
            t.start()
    
    def process_dataform_company_thread(self,company,dataform):
        self.t4proc.process_dataform_company(company,dataform)
        self.company_process[company][dataform] = "finished"
    def notsure(self):
        if dataform in self.t4proc.fdf_mgr.js_md["companies"][company]["dataforms"]:
            vec_count = self.t4proc.fdf_mgr.js_md["companies"][company]["dataforms"][dataform]
        status = self.company_process[company][dataform]
        return {"vec_count": vec_count,"status":status}

    def get_company_dataform_status(self,company,dataform):
        return self.__check_process(self.company_process,company,dataform)

    def get_company_dataform_progress(self,company,dataform):
        return self.t4proc.get_company_dataform_progress(company,dataform)

    def get_dataform(self,ction,dataform):
        if ction.name in self.ction_process:
            if dataform in self.ction_process[ction.name]:
                if self.ction_process[ction.name][dataform] == "finished": 
                    return self.t4proc.get_data(ction.dictionary,dataform)
                else:
                    return "Not Finished"
            else:
                return "Not Found"
        else:
            return "Not Found"

#T4-3

    def scan_company_dataform(self,company,dataform):    
        if company not in self.company_scan_process:
            self.company_scan_process[company] = {}
            self.company_scan_process[company][dataform] = "started"
            t = threading.Thread(target=self.scan_company_dataform_thread,args=(company,dataform))
            t.start()
        else:
            self.company_scan_process[company][dataform] = "started"
            t = threading.Thread(target=self.scan_company_dataform_thread,args=(company,dataform))
            t.start()
        return "started"

    def scan_company_dataform_thread(self,company,dataform):
        fault_inds = self.t4proc.company_dataform_scan_faults(company,dataform)
        # schemascan
        self.company_scan_process[company][dataform] = "finished"
        if company in self.company_scan_results:
            self.company_scan_results[company][dataform] = fault_inds
        else:
            self.company_scan_results[company] = {}
            self.company_scan_results[company][dataform] = fault_inds

    def company_dataform_scan_status(self,company,dataform):

        return self.__check_process(self.company_scan_process,company,dataform)

    def company_dataform_scan_results(self,company,dataform):
        return self.company_scan_results[company][dataform]

    def company_dataform_scan_repair(self,company,dataform):
        inds = self.company_scan_results[company][dataform] 
        return "TODO"

#T4-4

    def company_metadata_summary(self,company):
        return self.t4proc.company_metadata_summary(company)

    def get_company_tree(self,company):
        datatree = DataTree(self.dl,company)
        return datatree.tree

    def get_companies(self):
        return self.t4proc.fdf_mgr.get_companies()


#T4-5
    def __save_file(self,file,data):
        with open(file,'w') as fo:
            json.dump(data,fo)

    def __load_file(self, file):
        data = []
        with open(file,'r') as fo:
            data = json.load(fo)
        return data

    def __check_process(self,process_dict,name,dataform):
        if name in process_dict:
            if dataform in process_dict[name]:
                return process_dict[name][dataform]
        return "No such process"

    def __get_names(self,data_dir):
        dirname = self.proj_root + "/data/" + data_dir
        files = os.listdir(dirname)
        return [ file.split('.')[0] for file in files] 

# JUNK

    def check_dataform_company(self,company,dataform):    
        if company not in self.check_process:
            self.check_process[company] = {}
            self.check_process[company][dataform] = "started"
            t = threading.Thread(target=self.check_dataform_company_thread,args=(company,dataform))
            t.start()
        else:
            self.check_process[company][dataform] = "started"
            t = threading.Thread(target=self.check_dataform_company_thread,args=(company,dataform))
            t.start()
        return self.t4proc.check_dataform_company(company,dataform)

    def query(self,ction,query_type,min_n):
        L = self.dl.filter_vecs(ction)
        query = {}
        for c in L:
            Lc_dict = self.dl.query_text(L[c],query_type,min_n)
            Lc = [] 
            for term in Lc_dict:
                Lc.append([term,Lc_dict[term]])
            Lc = sorted(Lc,reverse=True,key=lambda tup:tup[1])
            query[c] = Lc
        return {"query":query}

    def avg_query(self,ction,termlist):
        return self.dl.dfC_term_avgs(ction,termlist)

#JUNK

    def query_term_avgs(self,ction, termlist):
        CL = self.dl.filter_vecs(ction)
        p = "[a-zA-Z\']+"
        CT_df = {}
        for cl in CL: 
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
            dict_avgs[cl] = {}
            for term in termlist:
                dict_avgs[cl][term] = np.average(CT_df[cl].to_numpy())
        return dict_avgs

    def count_dataform_freq(self,ction,dataform,key):
        return self.t4proc.count_dataform_freq(ction,dataform,key)

