from sqlalchemy import create_engine 
from sqlalchemy import Column, Integer, Text, MetaData, Table, String, JSON
from sqlalchemy.sql import select
from sqlalchemy.orm import Session
import pymysql.cursors
import json

class DataClient:
    def __init__(self,):
        self.server = 'localhost' 
        self.database = 'finagent' 
        self.username = 't4agent' 
        self.password = 't4agent'
        self.connection = f'mysql://{self.username}:{self.password}@{self.server}/{self.database}'

    def get_cols_json(self,name):
        with open(name,'r') as fo:
            table_dict = json.load(fo)
        return table_dict

    def create_dataform_table(self,name,cols_dict):
        """
        Paramaters
        cols_dict -- dictionary with keys as column names and
        values as either 'text', 'int', num

        """
        cols = []
        for col in cols_dict:
            if cols_dict[col] == "int":
                cols.append(Column(col,Integer))
            elif cols_dict[col] == "text":
                cols.append(Column(col,Text))
            elif cols_dict[col] == "json":
                cols.append(Column(col,JSON))
            elif isinstance(cols_dict[col],int):
                cols.append(Column(col,String(cols_dict[col])))
        self.engine = create_engine(self.connection)
        self.engine.connect()
           
        metadata = MetaData()
        table = Table(name, metadata,*cols)
        table.create(bind=self.engine)
        self.engine.dispose()

    def create_directory_table(self,name):
        cols = [ Column("Company",String(85)),\
        Column("Product",String(76)),\
        Column("Sub-product",String(42)),\
        Column("Issue",String(80)),\
        Column("Sub-issue",String(85)),\
        ]
        name = name + "Directory"
        self.engine = create_engine(self.connection)
        self.engine.connect()
        metadata = MetaData()
        table = Table(name, metadata,*cols)
        table.create(bind=self.engine)
        self.engine.dispose()

    def create_dataform(self,file):
        cols_dict = self.get_cols_json(file)
        self.create_directory_table(cols_dict["name"])
        self.create_dataform_table(cols_dict["name"],cols_dict["col_names"])

    def get_vec(self,vec, keys):
        fields = ["Company","Product","Sub-product",\
                "Issue", "Sub-issue"]
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                sql = "SELECT `{}`".format(keys[0])
                for i in range(1,len(keys)):
                    sql += ",`{}`".format(keys[i])

                sql += " FROM complaints WHERE `{}`=\"{}\"".format(fields[0],vec[0])
                for i in range(1,len(vec)):
                    sql += " AND `{}`=\"{}\"".format(fields[i],vec[i])
                
                print(sql)
                cursor.execute(sql)
                rows = cursor.fetchall()
                data = []
                for row in rows:
                    row_dict = {}
                    for key in keys:
                        row_dict[key] = row[key]
                    data.append(row_dict)
        return data

    def get_vecs_dataform(self,name):
        fields = ["Company","Product","Sub-product",\
                "Issue", "Sub-issue"]
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        vecs = []
        with connection:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM {}".format(name)
                cursor.execute(sql)
                rows = cursor.fetchall()
                for row in rows:
                    vec = []
                    for field in fields:
                        vec.append(row[field])
                    vecs.append(vec)
        return vecs

    def add_vec_dataform(self,vec,data,file):    
        fields = ["Company","Product","Sub-product",\
                "Issue", "Sub-issue"]
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        rows = self.get_vec(vec,["index"])
        inds = set([row["index"] for row in rows])
        data_inds = set([row["index"] for row in data])
        tbl_dict = self.get_cols_json(file)
        cols_dict = tbl_dict["col_names"]
        name = tbl_dict["name"]
        keys = list(cols_dict.keys())
        val_f = []
        for key in keys:
            if cols_dict[key] == "int":
                val_f.append("%s")
            else:
                val_f.append("%s")
        values = [] 
        for row in data:
            vals = []
            for key in keys:
                if cols_dict[key] == "int":
                    vals.append(int(row[key]))
                elif cols_dict[key] == "json":
                    vals.append(json.dumps(row[key]))
                else:
                    vals.append(row[key])
            values.append(vals)
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO {}(`{}`".format(name,keys[0])
                for i in range(1,len(keys)):
                    sql += ", `{}`".format(keys[i])
                sql += ") VALUES ({}".format(val_f[0])   
                for i in range(1,len(val_f)):
                    sql += ",{}".format(val_f[i])
                sql += ")"
                print(sql)
                print(values[0])
                cursor.executemany(sql,values)
                for i in range(len(fields)-len(vec)):
                    vec.append("NA")
                sql = "INSERT INTO {}(`Company`,`Product`,`Sub-product`,\
`Issue`,`Sub-issue`) VALUES (%s,%s,%s,%s,%s)".format(name+"Directory")
                print(sql)
                cursor.execute(sql,vec)
            connection.commit()


    def get_dataform_vecs(self,vecs,file):
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        tbl_dict = self.get_cols_json(file)
        cols_dict = tbl_dict["col_names"]
        name = tbl_dict["name"]
        vec_dict = {}
        for vec in vecs:
            inds = self.get_vec(vec,['index'])
            print(self.get_dataform_inds(inds,file))

    def get_dataform_inds(self,inds,file):
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        tbl_dict = self.get_cols_json(file)
        cols_dict = tbl_dict["col_names"]
        name = tbl_dict["name"]
        with connection:
            with connection.cursor() as cursor:
                rows = []
                for ind in inds:
                    sql = "SELECT * FROM {} WHERE `{}`=\"{}\"".format(name,'index',ind['index'])
                    
                    cursor.execute(sql)
                    row = cursor.fetchone()
                    rows.append(row)
        return rows



if __name__ == "__main__":
    print("main")
    #
    #with open('LemmaFormTable.json','r') as fo:
    #    table_dict = json.load(fo)
    #    client = DataClient()
    #    client.create_dataform_table(table_dict["name"],table_dict["col_names"])
    #with open('NamedEntityTable.json','r') as fo:
    #    table_dict = json.load(fo)
    #    client = DataClient()
    #    client.create_dataform_table(table_dict["name"],table_dict["col_names"])
    #
    #
    client = DataClient()
    vecs = [["BANK OF AMERICA, NATIONAL ASSOCIATION","Mortgage","Reverse mortgage"]]

    print(client.get_dataform_vecs(vecs,"LemmaFormTable.json"))

#   print(client.get_dataforms_vec("LemmaFormDirectory"))
    #client.create_dataform("NounChunkTable.json")
    #client.directoryTable("NamedEntityFormDirectory")
#    client = DataClient()
#    client.create_dataform("LemmaFormTable.json")

    #vec = ["BANK OF AMERICA, NATIONAL ASSOCIATION","Vehicle loan or lease","Loan","Managing the loan or lease","Billing problem"]

    #data = client.get_vec(vec,["Consumer complaint narrative","index"])
    #print(data[:10])


    ##
    #test_form = [{"index": d['index'],"json":{"first":d['Consumer complaint narrative'][:10],"last":d['Consumer complaint narrative'][-10:]},"text":d['Consumer complaint narrative']} for d in data]
    #
    #client.add_vec_dataform(vec,test_form,"test_table.json")
    #
    #
