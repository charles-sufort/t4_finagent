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
#        print(df.loc[pd.isnull(df['Sub-product'])][['Product','Sub-product','Issue','Sub-issue']])
#
#        print(self.vecs.shape[0])
#        print(self.df.shape[0])
#        print(self.product_counts[:4])
#        print(self.subproduct_counts[:4])
#        print(self.issue_counts[:4])
#        print(self.subissue_counts[:4])
#        print(self.company[:10])
#        print(self.vecs[:4])

    def summary(self):
        fields = ['Product','Sub-product','Issue','Sub-issue']
        df_dd = self.df.drop_duplicates(subset=fields)
        print(df_dd.shape[0])
        print(df_dd[fields].values.tolist())
#        print(df_dd.shape)
#        print(self.df['ZIP code'])
#        print(self.df.dtypes)
#
#        print(self.df.dtypes[1]=="object")
#        print(self.df.dtypes[3])
#        types = self.df.dtypes
#        columns = self.df.columns
#
#        col_dict = {}
#        for i in range(len(types)):
#            if types[i] == "object":
#                col = columns[i]
#                lengths = self.df[col].str.len()
#                col_dict[col] = lengths.max()
#            
#        col_dict['Complaint ID'] = "int"
#        print(col_dict)        
#        return col_dict


dd = DataDescriptor("complaints.csv")
dd.summary()
