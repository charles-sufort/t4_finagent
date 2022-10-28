import tensorflow as tf
import os, json
import logging
from td_mgr import TD_MGR
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Conv2D,Dropout,Flatten,MaxPooling2D
from keras.callbacks import CSVLogger
import sys
from contextlib import redirect_stdout

class NNWrapper_S:
    def __init__(self):
        src_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.data_dir = src_dir + "/data"
        self.model_dir = self.data_dir + "/models"
        if not os.path.exists(self.model_dir):
            os.mkdir(self.model_dir)
        self.log_dir = self.model_dir + "/logs"
        if not os.path.exists(self.log_dir):
            os.mkdir(self.log_dir)
        self.model = None


    def define(self,layers):
        self.layers = layers
        self.model = tf.keras.Sequential()
        self.def_layers = {"dense": self.define_dense_layer,\
                 "bidirectional": self.define_bidir_layer,\
                 "conv2d": self.define_conv2d_layer,\
                 "dropout": self.define_dropout_layer,\
                 "maxpooling2d": self.define_maxpooling2d_layer,\
                 "flatten":self.define_flatten_layer}
        for layer in layers:
            self.model.add(self.def_layers[layer["name"]](**layer["args"]))

    def save_arch(self,name):
        file = self.model_dir +"/" + name + ".opt"
        obj = {"layers":self.layers,"opts":self.compile_opts}
        with open(file,'w') as fo:
            print(obj)
            json.dump(obj,fo)

    def load_arch(self,name):
        file = self.model_dir + "/" + name + ".opt"
        obj = {}
        with open(file,'r') as fo:
            obj = json.load(fo)
        self.define(obj["layers"])
        self.compile(**obj["opts"])


    def compile(self,**kwargs):
        self.compile_opts = kwargs
        self.model.compile(**kwargs)

    def fit(self,X,Y,**kwargs):
        self.model.fit(X,Y,**kwargs)

    def evaluate(self,**kwargs):
        self.model.evaluate(**kwargs)

    def define_dense_layer(self,**kwargs):
        units = kwargs["units"]
        args = kwargs["args"]
        return tf.keras.layers.Dense(units,**args)


    def define_bidir_layer(self,**kwargs):
        name = layer["name"]
        layer = kwargs["layer"]
        units = layer["units"]
        args_l = layer["args"]
        args = kwargs["args"]
        layer1 = self.def_layers[name](units,**args_l)
        return tf.keras.layers.Bidirectional(layer,**args)

    def define_conv2d_layer(self,**kwargs):
        filters = kwargs["filters"]
        kernel_size = kwargs["kernel_size"]
        args = kwargs["args"]
        return tf.keras.layers.Conv2D(filters,kernel_size=kernel_size,**args)

    def define_dropout_layer(self,**kwargs):
        rate = kwargs["rate"]
        args = kwargs["args"]
        return tf.keras.layers.Dropout(rate,**args)

    def define_maxpooling2d_layer(self,**kwargs):
        return tf.keras.layers.MaxPooling2D(**kwargs)

    def define_flatten_layer(self,**kwargs):
        return tf.keras.layers.Flatten(**kwargs)

    def train(self,x_train,y_train,**fit_opts):    
#        with open(file,'a') as fo:
#            with redirect_stdout(fo):
        self.model.fit(x_train,y_train,**fit_opts)

    def evaluate(self,name,**eval_opts):
        file = self.model_dir + "/" + name + "status_eval"
#        with open(file,'a') as fo:
#            with redirect_stdout(fo):
        self.model.evaluate(**eval_opts)


#log = tf.get_logger()
#fh = logging.FileHandler('tf.log')
#log.addHandler(fh)

#lr_callback = tf.keras.callbacks.LearningRateScheduler(lr_schedule)
if __name__ == "__main__":

    nn = NNWrapper_S()
    if len(sys.argv) == 4:  
        model_name = sys.argv[1]
        data_name = sys.argv[2]
        epochs = sys.argv[3]
    else:
        model_name = "test_model1"
        data_name = "mnist_train"
        epochs = "2"
    nn.load_arch(model_name)
    tdmgr = TD_MGR()
    data = tdmgr.load_vecdata(data_name)

    fit_opts = {'epochs':int(epochs)}
    (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data(path="mnist.npz")
    X = np.array(data["X"])
    print(X.shape)
    Y = np.array(data["Y"])
    file = nn.model_dir + "/" + model_name + "status"
    with open(file, 'w') as fo:
        fo.write("")
    with open(file,'a') as fo:
        fo.write("here")
        with redirect_stdout(fo):
            nn.fit(X,Y,**fit_opts)





#if __name__ == "__main__":
#    (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data(path="mnist.npz")
#    nn = NNWrapper_S()
#    print(nn.model_dir)
#    layers = []
#    layers.append({"name":"conv2d","args":{"filters":28,"kernel_size":(3,3),"args":{"input_shape":(28,28,1)}}})
#    layers.append({"name":"maxpooling2d","args":{"pool_size":(2,2)}})
#    layers.append({"name":"flatten","args":{"input_shape":(28,28)}})
#    layers.append({"name":"dense","args":{"units":128,"args":{"activation":'relu'}}})
#    layers.append({"name":"dropout","args":{"rate":.05,"args":{}}})
#    layers.append({"name":"dense","args":{"units":10,"args":{"activation":'softmax'}}})
#    nn.define(layers)
#    compile_opts = {'optimizer':'adam','loss':'sparse_categorical_crossentropy','metrics':['accuracy']}
#    nn.compile(**compile_opts)
#    eval_opts = {'x':x_test,'y':y_test}
#    fit_opts = {'epochs':2}
#    nn.save_arch("test_model1")
#    file = nn.model_dir + "/status"
#    H = nn.fit(x_train,y_train,**fit_opts)
#    #nn.evaluate(**eval_opts)
#
#
#
#    with open(file,'a') as fo:
#        with redirect_stdout(fo):
#            H = nn.fit(x_train,y_train,**fit_opts)
#            nn.evaluate(**eval_opts)
##    nn2 = NNWrapper_S()
#    nn2.load_arch("test_model1")
#    H = nn2.fit(x_train,y_train,**fit_opts)
#    nn2.evaluate(**eval_opts)



