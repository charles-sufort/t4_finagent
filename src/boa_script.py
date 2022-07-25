from dataloader import DataLoader

dl = DataLoader("complaints.csv")
df = dl.df.loc[dl.df['Consumer complaint narrative'].notnull()]
df_reind = df.set_index(['Product','Sub-product','Issue','Sub-issue'])
df_boa = df.loc[df['Company']== 'BANK OF AMERICA, NATIONAL ASSOCIATION']
df_boa.loc[:,'Product'] = df_boa['Product'].str.replace(r"[\']",'')
df_boa.loc[:,'Sub-product'] = df_boa['Sub-product'].str.replace(r"[\']",'')
df_boa.loc[:,'Issue'] = df_boa['Issue'].str.replace(r"[\']",'')
df_boa.loc[:,'Sub-issue'] = df_boa['Sub-issue'].str.replace(r"[\']",'')



#df_boa['Product'] = df_boa['Product'].replace('\'','',regex=True,inplace=True)
#df_boa['Sub-product'] = df_boa['Sub-product'].replace('\'','',regex=True,inplace=True)
#df_boa['Issue'] = df_boa['Issue'].replace('\'','',regex=True,inplace=True)
#df_boa['Sub-issue'] = df_boa['Sub-issue'].replace('\'','',regex=True,inplace=True)

dl.save_df(df_boa,'complaints_boa.csv')

#print(df_reind.columns)
#print(df_reind[:4])
#print(df.loc[df['Product'] == 'Credit card or prepaid card']['Product'].shape[0])



