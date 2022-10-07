import pymysql.cursors
from dataloader import DataLoader
from sqlalchemy import create_engine 
from sqlalchemy import Column, Integer, Text, MetaData, Table, String, JSON
import numpy as np


class DBClient2:
    def __init__(self):
        self.server = 'localhost' 
        self.database = 'boa' 
        self.username = 't4agent' 
        self.password = 't4agent'
        self.connection = f'mysql://{self.username}:{self.password}@{self.server}/{self.database}'

    def get_dataform_inds(self,table,inds):
        connection = pymysql.connect(\
        host=self.server,
        user=self.username,
        password=self.password,
        database=self.database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                rows = []
                for ind in inds:
                    index = ind['index']
                    sql = "SELECT * FROM {} WHERE `{}`=\"{}\"".format(table,'index',index)
                    cursor.execute(sql)
                    row = cursor.fetchone()
                    rows.append(row)
        return rows

    def create_table(self,database,name,df):
        self.connection = f'mysql://{self.username}:{self.password}@{self.server}/{database}'
        engine = create_engine(self.connection)
        engine.connect()
        print(df.to_sql(name, con=engine))

if __name__ == "__main__":
    dl = DataLoader()
    #print(dl.df.index[0])

    #company = "BANK OF AMERICA, NATIONAL ASSOCIATION"
    dbclient = DBClient2()
    print(dbclient.create_table("boa","Complaints",dl.df))

    #inds = [{"index":'4'},{"index":'89'}]
    #vec = ["BANK OF AMERICA, NATIONAL ASSOCIATION","Vehicle loan or lease","Loan","Managing the loan or lease","Billing problem"]

    #df_cmp = dl.get_company_df(company)
    #print(df.shape[0])
    #print(df.index[:10])

    #print(df.index.to_numpy())
    #print(df.shape[0])
    #dbclient.create_table("boa","Vec2",df)

