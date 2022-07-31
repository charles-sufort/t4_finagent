import spacy
import re

class TextSection:
    def __init__(self, text):
        self.text = text
        self.nlp = spacy.load("en_core_web_sm")
        self.doc = self.nlp(text)

    def get_lemmas(self):
        lemmas = []
        p = "[a-zA-Z\'\"]+"
        for token in self.doc:
            if token.lemma_ not in self.nlp.Defaults.stop_words:
                if bool(re.search(p,token.lemma_)):
                    lemmas.append(token.lemma_)
        return lemmas
    
    def get_ners(self):
        ners = []
        for ent in self.doc.ents:
            ners.append(( ent.text_,  ent.label_))
        return ners

    def get_noun_chunks(self):
        chunks = []
        for chunk in self.doc.noun_chunks:
            chunk_obj = {}
            chunk_obj["text"] = chunk.text
            chunk_obj["root"] = chunk.root.text
            chunk_obj["text"] = chunk.root.dep_
            chunk_obj["text"] = chunk.root.head.text
            chunks.append(chunk_obj)
        return chunks


text = "A friend of mine is sending me money and he used a feature of sending money over phone using the Mobile banking feature of BANK Of America where one can send money using the mobile number. \nIn my case on XXXX XXXX he initiated {$1.00} test transaction from the mobil banking from his mobile and i received a message from bank of america saying a friend has initiated a transaction and amount will be credited to my account. \nafter which i he made XXXX more transaction totaling to XXXX $ and i received Message alerts for all the transaction. \nNow when i check my account i do not see the amount. I called Bank of america and they mentioned at the time of transfer i am not registered with my phone number but someone else is registerd ( maybe previous mobile ph number user ) so when my friend transferred money was taken from his account and was sent to the XXXX person. and currently Bank of america collected all the details and are in process of filing a claim. which if the XXXX person agrees they will refund the amount to my friend. \nIf they do NOT agree, i dont get my money back and Bank is not taking liability for this amount."
