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
    ctions = t41.get_ction_name()
    print(ctions)
    return {"message":ctions}

@app.post("/termlist/add/")
async def add_termlist(tlist: TermList):
    print("Here")
    t41.save_termlist(tlist.name, tlist.terms)
    return {"message":"saved"}

@app.get("/termlist/get_all/")
async def get_termlists():
    termlists = t41.get_termlists()
    return {"termlists":termlists}

@app.post("/termlist/get/")
async def get_termlist(termlist: Name):
    termlist = t41.get_termlist(termlist.name)
    return {"termlist":termlist}


