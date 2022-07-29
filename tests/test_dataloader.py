import sys
sys.path.append("../rest")

from dataloader import DataLoader
import unittest

class DataLoaderTest(unittest.TestCase):
    def test_match(self):
        ction = {"name":"T2","dictionary":{"C1":[['a','c','t','r']]}}
        dl = DataLoader('test_frame.csv')
        df_elem0 = dl.df.iloc[0]
        c_dict = ction['dictionary']
        self.assertTrue(dl.match_to_clabel(c_dict,df_elem0)=="C1")
        df_elem1 = dl.df.iloc[1]
        R1 = dl.match_to_clabel(c_dict,df_elem1)
        self.assertTrue(R1=="NA")

    def test_filter_vecs(self):
        ction = {"name":"T2","dictionary":{"C1":[['a','c','t','r']],"C2":[['b','l','s','t']]}}
        dl = DataLoader('test_frame2.csv')
        L = dl.filter_vecs(ction)
        test_L = {"C1":['abc','abc2']}
        L1 = L["C1"]
        L2 = L["C2"]

        self.assertTrue(L1.iloc[0]['Consumer complaint narrative'] == 'abc')
        self.assertTrue(L1.iloc[1]['Consumer complaint narrative'] == 'abc2')
        self.assertTrue(L2.iloc[0]['Consumer complaint narrative'] == 'cde')

    def test_term_avgs(self):
        dl = DataLoader('test_frame3.csv')
        ction = {"name":"T2","dictionary":{"C1":[['a','c','t','r']],"C2":[['b','l','s','t']]}}
        termlist = ["abc","def","hgi"]
        L = dl.filter_vecs(ction)
        C_avgs = dl.dfC_term_avgs(ction,termlist)
        self.assertTrue(C_avgs["C1"]["abc"] == 1.5)
        self.assertTrue(C_avgs["C1"]["def"] == 1)
        self.assertTrue(C_avgs["C1"]["hgi"] == 0)
        self.assertTrue(C_avgs["C2"]["def"] == 1)
        self.assertTrue(C_avgs["C2"]["hgi"] == .5)
        self.assertTrue(C_avgs["C2"]["abc"] == 0)

    def test_get_lvec_sample(self):
        dl = DataLoader('test_frame3.csv')
        sample = dl.get_lvec_sample(['a','c','t','r'])
        print("Sample: {}".format(sample))


    def test_filter_vecs1(self): 
        dl = DataLoader("complaints_boa.csv")
        ction = {"dictionary":{"C1":[["Student loan","Private student loan","NA","NA"]],"C2":[["Money transfers","International money transfer","NA","NA"]]},"name":"T"}
        print("here2")
        T = ["Student loan","Private student loan"]
        F = ['Product','Sub-product']
        L = dl.filter_vecs(ction["dictionary"])
        print(L["C1"].shape[0])
        print(L["C2"].shape[0])



if __name__=="__main__":

    unittest.main()
        

