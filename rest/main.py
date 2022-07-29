from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List

from t4 import T4

class Vec(BaseModel):
    fields: List[str]

class Clist(BaseModel):
    vectors: List[Vec]

class Ction(BaseModel):
    dictionary: Dict[str,List[List[str]]]
    name: str

class TermList(BaseModel):
    name: str
    terms: List[str]

class Name(BaseModel):
    name: str

class AvgQuery(BaseModel):
    ction: Ction
    termlist: TermList

class Query(BaseModel):
    ction: Ction
    query_type: str 
    max_n: int

    
class QueryText(BaseModel):
    ction: Ction
    query_type: str



t41 = T4()

app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=['*'],
        allow_headers=['*'],
        allow_methods=['*'],
 )



@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/ction/add/")
async def save_ction(ction: Ction):
    t41.save_ction(ction.name,ction.dictionary)
    return {"message":"saved"}

@app.post("/ction/get/")
async def get_ction(ction: Name):
    ction = t41.get_ction(ction.name)
    return {"ction":ction}

@app.get("/ction/get_all/")
async def get_ction_names():
    ctions = t41.get_ction_names()
    print(ctions)
    return {"message":ctions}

@app.post("/termlist/add/")
async def add_termlist(tlist: TermList):
    t41.save_termlist(tlist.name, tlist.terms)
    return {"message":"saved"}

@app.post("/termlist/get/")
async def get_termlist(termlist: Name):
    termlist = t41.get_termlist(termlist.name)
    return {"termlist":termlist}

@app.get("/termlist/get_all/")
async def get_termlist_names():
    termlists = t41.get_termlist_names()
    return {"termlists":termlists}

@app.get("/data/avg_query/")
async def avg_query(avg_query: AvgQuery):
    avg_query = t41.query_avg(avg_query.ction, avg_query.termlist)
    return {"C_avgs":avg_query}

@app.post("/data/lvec_sample")
async def get_lvec_sample(vec: Vec):
    print(vec)
    sample = t41.get_lvec_sample(vec.fields)
    print(sample)
    return {"Sample": sample}

@app.post("/data/query/")
async def get_query(query: Query):
    data = t41.query(query.ction.dictionary,query.query_type,query.max_n)
    return data


