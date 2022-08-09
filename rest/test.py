from dataloader import DataLoader
from sqlalchemy import create_engine 
from sqlalchemy import Column, Integer, Text, MetaData, Table, String, JSON

#dl = DataLoader()
#
#print(dl.df.reset_index().columns)
#
server = 'localhost' 
database = 'finagent' 
username = 't4agent' 
password = 't4agent'
connection = f'mysql://{username}:{password}@{server}/{database}'

engine = create_engine(connection)
engine.connect()

#print(dl.df.to_sql('complaints', con=engine))
cols = [ Column("Company",String(85)),\
Column("Product",String(76)),\
Column("Sub-product",String(42)),\
Column("Issue",String(80)),\
Column("Sub-issue",String(85)),\
Column("Indexes",JSON),\
]


name = "VecIndexTable"
metadata = MetaData()
table = Table(name, metadata,*cols)
table.create(bind=engine)

print(l)
