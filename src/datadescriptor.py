import pandas as pd
from dataloader import DataLoader

class DataDescriptor:
    def __init__(self,file=None):
        self.dl = DataLoader(file)
        self.df = self.dl.df
        self.count_values()
    
    def count_values(self):
        self.product_counts = self.df['Product'].value_counts()
        self.subproduct_counts = self.df['Sub-product'].value_counts()
        self.issue_counts = self.df['Issue'].value_counts()
        self.subissue_counts = self.df['Sub-issue'].value_counts()
        self.company = self.df['Company'].value_counts()
        self.vecs = self.df[['Product','Sub-product','Issue','Sub-issue']].value_counts()
        print(self.vecs.shape[0])
        print(self.df.shape[0])
        print(self.product_counts[:4])
        print(self.subproduct_counts[:4])
        print(self.issue_counts[:4])
        print(self.subissue_counts[:4])
        print(self.company[:10])
        print(self.vecs[:4])



dd = DataDescriptor("complaints.csv")




