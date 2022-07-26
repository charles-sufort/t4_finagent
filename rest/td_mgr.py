import json,os
import numpy as np
import pandas as pd
import tensorflow as tf

class TD_MGR:
    def __init__(self):
        src_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        print(src_dir)
        self.data_dir = src_dir + "/data"
        self.test_dir = self.data_dir + "/test"
        self.csv_dir = self.test_dir + "/csv"
        self.xy_dir = self.test_dir + "/xy"

        if not os.path.exists(self.test_dir):
            os.mkdir(self.test_dir)
        if not os.path.exists(self.csv_dir):
            os.mkdir(self.csv_dir)
        if not os.path.exists(self.xy_dir):
            os.mkdir(self.xy_dir)
    
    def add_csv(self,df,name):
        file = self.csv_dir + "/" + name + ".csv"
        df.to_csv(file)

    def load_csv(self,name):
        file = self.csv_dir + "/" + name + ".csv"
        df = pd.read_csv(file)
        return df

    def save_vecdata(self,X,Y,name):
        data = {"X":X.tolist(),"Y":Y.tolist()}
        file = self.xy_dir + "/" + name + ".dat"
        with open(file,'w') as fo:
            json.dump(data,fo)

    def load_vecdata(self,name):
        data = None
        file = self.xy_dir + "/" + name + ".dat"
        with open(file,'r') as fo:
            data = json.load(fo)
        return data
    

if __name__ == "__main__":
    (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data(path="mnist.npz")
    td_mgr = TD_MGR()
    file = td_mgr.data_dir + "/mnist_test.csv"
    df = pd.read_csv(file)
    td_mgr.add_csv(df,"mnist_test")
    df = td_mgr.load_csv("mnist_test")
    cols  = df.columns.tolist()[1:]
    cols.remove("label")
    X = df[cols].to_numpy()
    Y = df["label"].to_numpy()
    td_mgr.save_vecdata(x_train,y_train,"mnist_train")
    td_mgr.save_vecdata(x_test,y_test,"mnist_test")

