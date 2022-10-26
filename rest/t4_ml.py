from neuralnetworks_tf import NNWrapper_S


class T4ML:
    def __init__(self):
        self.models = {}

    def add_model(name,layers,options):
        model = NNWrapper_S(layers)
        model.compile(**options)


