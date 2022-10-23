from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Literal
from t4 import T4

class Vec(BaseModel):
    fields: List[str]

class Clist(BaseModel):
    vectors: List[Vec]

class Layer(BaseModel):
    name: str
    args: dict

class Model1(BaseModel):
    layers:  List[Layer]
    options: dict

class Ction(BaseModel):
    dictionary: Dict[str,List[List[str]]]
    name: str

class TermList(BaseModel):
    dataform: Literal["ners","noun_chunks","lemma"]
    name: str
    terms: List[str]

class Name(BaseModel):
    name: str

class TermList2(BaseModel):
    dataform: Literal["ners","noun_chunks","lemma"]
    name: str

class AvgQuery(BaseModel):
    ction: Ction
    termlist: TermList

class Query(BaseModel):
    ction: Ction
    query_type: str 
    min_n: int
    
class QueryText(BaseModel):
    ction: Ction
    query_type: str

class ProcessCtion(BaseModel):
    ction: str
    dataform: Literal["ners","noun_chunks","lemma"]

class ProcessCompany(BaseModel):
    company: str
    dataform: Literal["ners","noun_chunks","lemma"]

class QueryCtionDFFreq(BaseModel):
    ction: Ction
    dataform: Literal["ners","noun_chunks","lemma"]
    key: str

class QueryCtionDFFreq2(BaseModel):
    ction: str
    dataform: Literal["ners","noun_chunks","lemma"]
    key: str

class QueryMetaData(BaseModel):
    company: str


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

# REST-1
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
    return {"message":ctions}

@app.post("/termlist/add/")
async def add_termlist(tlist: TermList):
    t41.save_termlist(tlist.dataform, tlist.name, tlist.terms)
    return {"message":"saved"}

@app.post("/termlist/get/") 
async def get_termlist(termlist: TermList2):
    termlist = t41.get_termlist(termlist.dataform,termlist.name)
    return {"termlist":termlist}

@app.get("/termlist/get_all/")
async def get_termlist_names():
    termlists = t41.get_termlist_names()
    return {"termlists":termlists}

@app.post("/data/lvec_sample")
async def get_lvec_sample(vec: Vec):
    sample = t41.get_lvec_sample(vec.fields)
    return {"Sample": sample}

# REST-2
@app.post("/data/ction/dataform/process")
async def process_dataform_ction(proc: ProcessCtion):
    t41.process_dataform_ction(proc.ctoin,proc.dataform)
    return "started"

@app.post("/data/company/dataform/process")
async def process_dataform_company(proc: ProcessCompany):
    t41.process_dataform_company(proc.company,proc.dataform)
    return "started"

#@app.post("/data/company/dataform/process/get")
#async def get_company_process(proc: ProcessCompany):
#    return t41.get_dataform_company_status(proc.company,proc.dataform)
#   
#@app.post("/data/ction/dataform/process/get")
#async def get_ction_dataform(proc: ProcessCtion):
#    return t41.get_dataform(proc.ction,proc.dataform)

@app.post("/data/company/dataform/status")
async def status_company_dataform(proc: ProcessCompany):
    return t41.get_company_dataform_status(proc.company,proc.dataform)

@app.post("/data/ction/dataform/status")
async def status_ction_dataform(proc: ProcessCtion):
    return t41.get_ction_dataform_status(proc.ction,proc.dataform)

@app.post("/data/company/dataform/progress")
async def status_company_dataform(proc: ProcessCompany):
    return t41.get_company_dataform_progress(proc.company,proc.dataform)



# REST-3
@app.post("/data/ction/dataform/freq/query")
async def get_ction_dataform_freq(query: QueryCtionDFFreq):
    return t41.count_dataform_freq(query.ction.dictionary,query.dataform,query.key)


@app.post("/data/ction/dataform/freq/query2")
async def get_ction_dataform_freq2(query: QueryCtionDFFreq2):
    ction = t41.get_ction(query.ction)
    return t41.count_dataform_freq(ction,query.dataform,query.key)

# REST-4

@app.post("/data/company/dataform/process/scan")
async def scan_company_dataform(proc: ProcessCompany):
    return t41.scan_company_dataform(proc.company,proc.dataform)

@app.post("/data/company/dataform/process/scan/status")
async def status_dataform_company(proc: ProcessCompany):
    return t41.company_dataform_scan_status(proc.company,proc.dataform)

@app.post("/data/company/dataform/process/scan/get")
async def get_company_dataform_scan(proc: ProcessCompany):
    return t41.company_dataform_scan_results(proc.company,proc.dataform)

@app.post("/data/company/dataform/process/scan/repair")
async def company_dataform_scan_repair(proc: ProcessCompany):
    return t41.company_dataform_scan_repair(proc.company,proc.dataform)


#@app.post("data/company/dataform/status")
#async def status_check_company_dataform(proc: ProcessCompany):
#    return t41.get_status_check_dataform_company(proc.company,proc.dataform)

@app.post("/data/company_md")
async def get_company_md(md: QueryMetaData):
    metadata = t41.company_metadata_summary(md.company)
    return metadata

@app.post("/data/company/tree")
async def get_company_tree(name: Name):
    datatree = t41.get_company_tree(name.name)
    return {"datatree":datatree}

@app.get("/data/company/get_all")
async def get_companies():
    companies = t41.get_companies()
    return {"companies":companies}

@app.post("/models/nnm/tf/add")
async def add_model_nnm_tf(mod: Model1):
    status = t41.add_model_nnm_tf()




# JUNK

@app.get("/data/avg_query/")
async def avg_query(avg_query: AvgQuery):
    avg_query = t41.query_avg(avg_query.ction, avg_query.termlist)
    return {"C_avgs":avg_query}

@app.post("/data/query/")
async def get_query(query: Query):
    data = t41.query(query.ction.dictionary,query.query_type,query.min_n)
    return data




    




