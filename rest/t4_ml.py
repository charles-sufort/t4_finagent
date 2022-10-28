from neuralnetworks_tf import NNWrapper_S
from td_mgr import TD_MGR
import re


class T4ML:
    def __init__(self):
        self.models = {}
        self.td_mgr = TD_MGR()
        self.nn = NNWrapper_S()

    def add_model(self,name,layers,options):
        model = NNWrapper_S()
        model.define(layers)
        model.compile(**options)
        self.models[name] = model

    def save_model_arch(self,name):
        model = self.models[name]
        model.save_arch(name)

    def load_model_arch(self,name):
        model = NNWrapper_S()
        model.load_arch(name)
        self.models[name] = model

    def train_model(self,model_name,data_name,epochs):
        model = self.models[model_name]
        data = self.td_mgr.load_vecdata(data_name)
        X = data["X"]
        Y = data["Y"]
        fit_opts = {"epochs":epochs}
        model.train(X,Y,model_name,**fit_opts)
        
    def evaluate_model(self,model_name,data_name):
        model = self.models[model_name]
        data = self.td_mgr.load_vecdata(data_name)
        X = data["X"]
        Y = data["Y"]
        eval_opts = {"x":X,"y":Y}
        model.evaluate(model_name,**eval_opts)

    def model_training_status(self,model_name):
        file = self.nn.model_dir + "/" + model_name + "trainstatus"
        with open(file,'r') as fo:
            text = fo.read()
            print(text)
            p = re.compile("[0-9]+\/[0-9]+")
            print(p.findall(text)[-1])
            p = re.compile("Epoch [0-9]+\/[0-9]+")
            print(p.findall(text)[-1])


        

if __name__ == "__main__":
    t4ml = T4ML()
    t4ml.model_training_status("test_model1")
#    layers = []
#    layers.append({"name":"conv2d","args":{"filters":28,"kernel_size":(3,3),"args":{"input_shape":(28,28,1)}}})
#    layers.append({"name":"maxpooling2d","args":{"pool_size":(2,2)}})
#    layers.append({"name":"flatten","args":{"input_shape":(28,28)}})
#    layers.append({"name":"dense","args":{"units":128,"args":{"activation":'relu'}}})
#    layers.append({"name":"dropout","args":{"rate":.05,"args":{}}})
#    layers.append({"name":"dense","args":{"units":10,"args":{"activation":'softmax'}}})
#    compile_opts = {'optimizer':'adam','loss':'sparse_categorical_crossentropy','metrics':['accuracy']}
#    t4ml.add_model("mnist_model",layers,compile_opts)
#    t4ml.train_model("mnist_model","mnist_train",2)
#    t4ml.evaluate_model("mnist_model","mnist_train")


