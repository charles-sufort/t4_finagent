import sys
sys.path.append("../src/")
from dataloader import DataLoader


class T4:
    def __init__(self):
        self.df = DataLoader('complaints_boa.csv').df
        self.ctions = {}
        self.termlists = {}

    def save_ction(self,name,ction):
        self.ctions[name] = ction

    def get_ction(self,name):
        return self.ctions[name]

    def get_ction_name(self):
        return list(self.ctions.keys())

    def save_termlist(self,name, termlist):
        self.termlists[name] = termlist

    def get_termlists(self):
        return list(self.termlists.keys())

    def get_termlist(self,name):
        return self.termlists[name]










