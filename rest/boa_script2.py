from dataloader import DataLoader
import os, json


dl = DataLoader("complaints_boa.csv")
df_boa = dl.df
fields = ['Product','Sub-product','Issue','Sub-issue']
df_dd = df_boa.drop_duplicates(subset=fields)
proj_root = dl.proj_root
dir_path = proj_root+"/data/vecs/dir1"

dir_dict = {}
for i in range(df_dd.shape[0]):
    name = ""
    for field in fields[:3]:
        name += str(df_dd[field].iloc[i])+"__"
    name += str(df_dd[fields[3]].iloc[i])
    dir_dict[name] = "vec" + str(i)
    path  = os.path.join(dir_path,"vec"+str(i))
    os.mkdir(path)

file = dir_path + "/directory.json"
with open(file,'w') as fo:
    json.dump(dir_dict,fo)






