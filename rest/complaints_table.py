from sqlalchemy import create_engine 
from sqlalchemy import Column, Integer, Text, MetaData, Table, String
from datadescriptor import DataDescriptor

server = 'localhost' 
database = 'finagent' 
username = 't4agent' 
password = 't4agent'
connection = f'mysql://{username}:{password}@{server}/{database}'

engine = create_engine(connection)
engine.connect()
metadata = MetaData()

dd = DataDescriptor()
col_dict = dd.summary()
cols = []

for col in col_dict:
    if col_dict[col] == "int":
        cols.append(Column(col,Integer))
    elif col == "Consumer complaint narrative":
        cols.append(Column(col,Text))
    else:
        cols.append(Column(col,String(col_dict[col])))

messages = Table('complaints', metadata,*cols)

messages.create(bind=engine)
