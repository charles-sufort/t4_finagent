from dataloader import DataLoader


dl = DataLoader()
inds = list(dl.df.index)
inds.sort()

print(inds[:10])
