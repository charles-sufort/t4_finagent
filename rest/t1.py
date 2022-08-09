from sqlalchemy import create_engine 
from sqlalchemy import Column, Integer, Text, MetaData, Table, String 
from sqlalchemy.sql import select
from sqlalchemy.orm import Session
import json

cols = [ Column("Company",String(85)),\
Column("Product",String(76)),\
Column("Sub-product",String(42)),\
Column("index",Integer),\
Column("Issue",String(80)),\
Column("Sub-issue",String(85)),\
]
metadata = MetaData()
complaints = Table("complaints",metadata,*cols)


server = 'localhost' 
database = 'finagent' 
username = 't4agent' 
password = 't4agent'
connection = f'mysql://{username}:{password}@{server}/{database}'
engine = create_engine(connection)
engine.connect()
with Session(engine) as session:
    s = select(complaints).where((complaints.c['Company'] == "EQUIFAX, INC." )& complaints.c['Sub-product'] == None)
    q = session.execute(s)
    print(q.first())


