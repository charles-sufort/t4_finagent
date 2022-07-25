import pandas as pd
import os

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


    
    def save_df(self,df,name):
        file = self.proj_root + "/data/" + name
        df.to_csv(file)






