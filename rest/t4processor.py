import pandas as pd
from dataloader import DataLoader
from dataclient import DataClient
from text_section import TextSection


class T4Processor:
    def __init__(self):
        self.client = DataClient()
        pass

    def get_data(self,ction,dataform):
        data_dict = {}
        for cl in ction:
            if dataform == "lemma":
                data_dict[cl] = self.client.get_dataform_vecs(ction[cl],"LemmaFormTable.json")
            elif dataform == "noun_chunks":
                data_dict[cl] = self.client.get_dataform_vecs(ction[cl],"NounChunkTable.json")

    def process_dataform(self,ction,dataform):
        if dataform == "lemma":
            vecs_df = self.client.get_vecs_dataform("LemmaFormDirectory")
        elif dataform == "noun_chunks":
            vecs_df = self.client.get_vecs_dataform("NounChunkDirectory")

        for cl in ction:
            vecs = ction[cl]
            for vec in vecs:
                vec = [vec[i] for i in range(len(vec)) if vec[i] != "NA" ]
                data_rows = self.client.get_vec(vec,['index','Consumer complaint narrative'])
                if dataform == "lemma":
                    data = self.process_lemma(data_rows)
                    self.client.add_vec_dataform(vec,data,"LemmaFormTable.json")
                elif dataform == "noun_chunks":
                    data = self.process_noun_chunks(data_rows)
                    self.client.add_vec_dataform(vec,data,"NounChunkTable.json")
               

    def process_lemma(self,data_rows):
        lemmas = []
        for row in data_rows:
            text = row['Consumer complaint narrative']
            lemma_dict = {}
            section = TextSection(text)
            data = section.get_lemmas()
            lemma_dict['text'] = text
            lemma_dict['data'] = data
            lemma_dict['index'] = row['index']
            lemmas.append(lemma_dict)
        return lemmas

#t4proc = T4Processor()
#ction = {"C1":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","Reverse mortgage","NA","NA"]],"C2":[["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","VA mortgage","Closing on a mortgage","NA"]]}
#            
#t4proc.process_dataform(ction,"lemma")



