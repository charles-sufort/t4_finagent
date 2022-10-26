import tensorflow as tf
import logging
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Conv2D,Dropout,Flatten,MaxPooling2D
from keras.callbacks import CSVLogger
import sys
from contextlib import redirect_stdout

class NNWrapper_S:
    def __init__(self,layers):
        self.model = tf.keras.Sequential()
        src_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        print(src_dir)
        self.data_dir = src_dir + "/data"
        self.def_layers = {"dense": self.define_dense_layer,\
                 "bidirectional": self.define_bidir_layer,\
                 "conv2d": self.define_conv2d_layer,\
                 "dropout": self.define_dropout_layer,\
                 "maxpooling2d": self.define_maxpooling2d_layer,\
                 "flatten":self.define_flatten_layer}
        for layer in layers:
            self.model.add(self.def_layers[layer["name"]](**layer["args"]))

    def compile(self,**kwargs):
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



#log = tf.get_logger()
#fh = logging.FileHandler('tf.log')
#log.addHandler(fh)

#lr_callback = tf.keras.callbacks.LearningRateScheduler(lr_schedule)


#with open('tf.txt','a') as f:
#    with redirect_stdout(f):
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data(path="mnist.npz")

layers = []
layers.append({"name":"conv2d","args":{"filters":28,"kernel_size":(3,3),"args":{"input_shape":(28,28,1)}}})
layers.append({"name":"maxpooling2d","args":{"pool_size":(2,2)}})
layers.append({"name":"flatten","args":{"input_shape":(28,28)}})
layers.append({"name":"dense","args":{"units":128,"args":{"activation":tf.nn.relu}}})
layers.append({"name":"dropout","args":{"rate":.05,"args":{}}})
layers.append({"name":"dense","args":{"units":10,"args":{"activation":tf.nn.softmax}}})
nn = NNWrapper_TF(layers)
compile_opts = {'optimizer':'adam','loss':'sparse_categorical_crossentropy','metrics':['accuracy']}
nn.model.compile(**compile_opts)
fit_opts = {'epochs':2}
H = nn.fit(x_train,y_train,**fit_opts)
eval_opts = {'x':x_test,'y':y_test}
nn.evaluate(**eval_opts)




