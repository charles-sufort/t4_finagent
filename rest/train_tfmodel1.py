import sys
import numpy as np
import tensorflow as tf
from neuralnetworks_tf import NNWrapper_S
from td_mgr import TD_MGR
from contextlib import redirect_stdout

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
    X = np.array(data["X"])
    print(X.shape)
    Y = np.array(data["Y"])
    file = nn.model_dir + "/" + model_name + "trainstatus"
    with open(file, 'w') as fo:
        fo.write("")
    with open(file,'a') as fo:
        with redirect_stdout(fo):
            nn.fit(X,Y,**fit_opts)
    file = nn.model_dir + "/" + model_name + ".h5"
    nn.model.save(file)

    


