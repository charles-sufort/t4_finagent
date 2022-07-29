import sys, os
import pandas as pd
sys.path.append("../src/")
src_dir  = os.path.dirname(os.path.abspath(__file__))
proj_root =  os.path.dirname(src_dir)

df_dict = {'Product': ["a","b"],'Sub-product': ["c","l"],"Issue": ["t","s"],       "Sub-issue": ["r","t"], "text": ["abc","cde"]}

df = pd.DataFrame(data=df_dict)
print(df.iloc[0]['Product'])

file = "../data/test_frame.csv"

df.to_csv(file)


