import time
import sys
import numpy as np

sys.path.append("../rest")

from dataloader import DataLoader
from dbclient2 import DBClient2

class DBPerfTester:
    def __init__(self):
        self.dl = DataLoader()
        self.vec = ["BANK OF AMERICA, NATIONAL ASSOCIATION","Vehicle loan or lease","Loan","Managing the loan or lease","Billing problem"]
        self.company = "BANK OF AMERICA, NATIONAL ASSOCIATION" 
        self.client = DBClient2()

    def test_company(self):
        df_cmp = self.dl.get_company_df(self.company)
        inds1 = df_cmp.index.to_numpy()[np.random.randint(0,df_cmp.shape[0],size=(10))].tolist()
        inds = [ {"index":str(ind) for ind in inds1}]
        start = time.perf_counter()
        data = self.client.get_dataform_inds("full",inds)
        finish = time.perf_counter()
        print("MYSQL Cmp Table Time: {}".format(finish-start))
        start = time.perf_counter()
        data = self.dl.df.iloc[inds1]
        finish = time.perf_counter()
        print("FDF_MGR Table Time: {}".format(finish-start))

    def test_all(self):
        inds1 = self.dl.df.index.to_numpy()[np.random.randint(0,self.dl.df.shape[0],size=(10))].tolist()
        inds = [ {"index":str(ind) for ind in inds1}]
        start = time.perf_counter()
        data = self.client.get_dataform_inds("Complaints",inds)
        finish = time.perf_counter()
        print("MYSQL Full Table Time: {}".format(finish-start))
        start = time.perf_counter()
        data = self.dl.df.iloc[inds1]
        finish = time.perf_counter()
        print("Pandas Full Table Time: {}".format(finish-start))

    def test_vec(self):
        df = self.dl.filter_vec(self.vec)
        inds1 = df.index.to_numpy()[np.random.randint(0,df.shape[0],size=(10))].tolist()
        inds = [ {"index":str(ind) for ind in inds1}]
        start = time.perf_counter()
        data = self.client.get_dataform_inds("Vec2",inds)
        finish = time.perf_counter()
        print("MYSQL Vec Table Time: {}".format(finish-start))
        start = time.perf_counter()
        data = self.dl.df.iloc[inds1]
        finish = time.perf_counter()
        print("Pandas Vec Table Time: {}".format(finish-start))

    


pt = DBPerfTester()
pt.test_all()
pt.test_company()
pt.test_vec()


