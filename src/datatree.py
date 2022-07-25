from dataloader import DataLoader
import json
import os

class DataTree:
    def __init__(self, df):
        src_dir = os.path.dirname(os.path.abspath(__file__))
        self.proj_root = os.path.dirname(src_dir)
        products = list(df['Product'].unique())
        tree = {}
        tree['nodes'] = {}
        tree['count'] = len(products)
        for p in products:
            df_p = df.loc[df['Product'] == p]
            subproducts = df_p['Sub-product'].unique()
            tree['nodes'][p] = {}
            tree['nodes'][p]['nodes'] = {}
            tree['nodes'][p]['count'] = df_p.shape[0]
            for sp in subproducts:
                df_sp = df_p.loc[df_p['Sub-product'] == sp]
                issues = list(df_sp['Issue'].unique())
                tree['nodes'][p]['nodes'][sp] = {}
                tree['nodes'][p]['nodes'][sp]['count'] = df_sp.shape[0]
                tree['nodes'][p]['nodes'][sp]['nodes'] = {}
                for i in issues:
                    df_i = df_sp.loc[df_sp['Issue'] == i]
                    subissues = list(df_i['Sub-issue'].unique())
                    tree['nodes'][p]['nodes'][sp]['nodes'][i] = {} 
                    tree['nodes'][p]['nodes'][sp]['nodes'][i]['count'] = df_i.shape[0] 
                    tree['nodes'][p]['nodes'][sp]['nodes'][i]['nodes'] = {} 
                    for si in subissues:
                        df_si = df_i.loc[df_i['Sub-issue'] == si]
                        tree['nodes'][p]['nodes'][sp]['nodes'][i]['nodes'][si] = {}
                        tree['nodes'][p]['nodes'][sp]['nodes'][i]['nodes'][si]['count'] = df_si.shape[0]
        self.tree = tree

    def save_tree(self,name):
        file = self.proj_root + "/data/" + name
        with open(file,'w') as fo:
            json.dump(self.tree, fo)


dl = DataLoader('complaints_boa.csv')
dt = DataTree(dl.df)
dt.save_tree('boa_tree.json')


