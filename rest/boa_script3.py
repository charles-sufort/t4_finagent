from dataloader import DataLoader
import os, json


dl = DataLoader("complaints_boa.csv")
print(dl.df.shape[0])
