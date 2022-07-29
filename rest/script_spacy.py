import spacy



text = "A friend of mine is sending me money and he used a feature of sending money over phone using the Mobile banking feature of BANK Of America where one can send money using the mobile number. \nIn my case on XXXX XXXX he initiated {$1.00} test transaction from the mobil banking from his mobile and i received a message from bank of america saying a friend has initiated a transaction and amount will be credited to my account. \nafter which i he made XXXX more transaction totaling to XXXX $ and i received Message alerts for all the transaction. \nNow when i check my account i do not see the amount. I called Bank of america and they mentioned at the time of transfer i am not registered with my phone number but someone else is registerd ( maybe previous mobile ph number user ) so when my friend transferred money was taken from his account and was sent to the XXXX person. and currently Bank of america collected all the details and are in process of filing a claim. which if the XXXX person agrees they will refund the amount to my friend. \nIf they do NOT agree, i dont get my money back and Bank is not taking liability for this amount."

nlp = spacy.load("en_core_web_sm")

doc = nlp(text)
span = doc[doc[4].left_edge.i : doc[4].right_edge.i+1]
#with doc.retokenize() as retokenizer:
#    retokenizer.merge(span)

for chunk in doc.noun_chunks:
    print("text: {}, root: {},dep: {}, head: {}".format(chunk.text, chunk.root.text, chunk.root.dep_, chunk.root.head.text))


#print("dependency")
#deps = []
#for token in doc:
#    deps.append((token.text, token.pos_, token.dep_, token.head.text))
#
#print(deps)

#print(doc)
#
#print("Noun phrase: ", [chunk.text for chunk in doc.noun_chunks])
#print("Verbs: ", [token.lemma_ for token in doc if token.pos_ == "VERB" ])
#

#for entity in doc.ents:
#    print(entity.text, entity.label_)


