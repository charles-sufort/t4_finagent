import pandas as pd
from dataloader import DataLoader
from dataclient import DataClient
from text_section import TextSection


class T4Processor:
    def __init__(self):
        self.dl = DataLoader("complaints_boa.csv")
        pass

    def process_dataform_ction(self,ction,dataform):
        data_dict = self.dl.filter_vecs(ction)
        vecs_df = []
        vecs_set = set([tuple(vec) for vec in vecs_df])
        for cl in ction:
            vecs = ction[cl]
            vecs1_set = set([tuple(vec) for vec in vecs])
            vecs_diff = vecs1_set.difference(vecs_set)
            vecs = [list(vec) for vec in vecs_diff]
            for vec in vecs:
                vec = [vec[i] for i in range(len(vec)) if vec[i] != "NA" ]
                data_rows = self.client.get_vec(vec,['index','Consumer complaint narrative'])
                if dataform == "lemma":
                    data = self.process_lemma(data_rows)
                    self.client.add_vec_dataform(vec,data,"LemmaFormTable.json")
                elif dataform == "noun_chunks":
                    data = self.process_noun_chunks(data_rows)
                    self.client.add_vec_dataform(vec,data,"NounChunkTable.json")
               
    def process_dataform(self,data_rows,dataform):
        lemmas = []
        for row in data_rows:
            text = row['Consumer complaint narrative']
            lemma_dict = {}
            section = TextSection(text)
            if dataform == "lemma":
                data = section.get_lemmas()
            elif dataform == "noun_chunks":
                data = section.get_noun_chunks()
            elif dataform == "ners":
                data = section.get_ners()
            lemma_dict['text'] = text
            lemma_dict['data'] = data
            lemma_dict['index'] = row['index']
            lemmas.append(lemma_dict)
        return lemmas

if __name__ == "__main__":
    t4proc = T4Processor()
    ction = {"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","Reverse mortgage","NA","NA"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","VA mortgage","Closing on a mortgage","NA"]]}
                
    t4proc.process_dataform(ction,"lemma")



