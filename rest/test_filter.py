import os
from dataloader import DataLoader


cdicts = {"C1":[["Prepaid card","NA","NA","NA"]],"C2":[["Student loan","Federal student loan servicing","NA","NA"]]}

dl = DataLoader("complaints_boa.csv")
fields = ['Product','Sub-product','Issue','Sub-issue']
vec1 = ["Prepaid card","NA","NA","NA"]
vec2 = ["Student loan","Federal student loan servicing","NA","NA"]
l = dl.df.loc[dl.df[fields[:1]].isin(vec1[:1]).all(1)]
print(l)
l = dl.df.loc[dl.df[fields[:1]].isin(vec2[:1]).all(1)]
print(l)


l = dl.filter_vecs(cdicts)
print(l)

