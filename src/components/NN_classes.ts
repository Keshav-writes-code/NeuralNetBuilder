export class Neuron {
    value: number;
    bias: number;
    weights: number[];

    constructor(prevLayer_neurons: number) {
        this.value = 0;
        this.bias = 0;
        this.weights = new Array(prevLayer_neurons).fill(1);
    }
    show() {
        console.log(this);
    }
}

export class cNeuron{
    idx: number;
    idy: number;

    constructor(idx: number, idy: number){
        this.idx = idx
        this.idy = idy
    }
}

export class Layer {
    neurons: Neuron[];
    constructor(size: number, prevLayerSize: number) {
        this.neurons = new Array(size)
            .fill(0)
            .map(() => new Neuron(prevLayerSize));
    }
    show() {
        console.log(this.neurons);
    }
}