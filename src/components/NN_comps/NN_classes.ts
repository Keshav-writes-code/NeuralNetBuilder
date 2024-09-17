function decimalRounder(x: number) {
  return parseFloat(x.toFixed(2));
}

export class Neuron {
  value: number;
  bias: number;
  weights: number[];

  constructor(prevLayer_neurons: number) {
    const randRange = 1; //means -10 to 10
    this.value = 0;
    this.bias = decimalRounder(Math.random() * randRange * 2 - randRange);
    this.weights = new Array(prevLayer_neurons).fill(0);
    this.weights = this.weights.map(() =>
      decimalRounder(Math.random() * randRange * 2 - randRange)
    );
  }
}

export class cNeuron {
  idx: number;
  idy: number;

  constructor(idx: number, idy: number) {
    this.idx = idx;
    this.idy = idy;
  }
}

export class Layer {
  neurons: Neuron[];
  constructor(size: number, prevLayerSize: number) {
    this.neurons = new Array(size).fill(0).map(() => new Neuron(prevLayerSize));
  }
  show() {
    console.log(this.neurons);
  }
}

export enum af_enum {
  relu = "ReLU",
  sigmoid = "Signmoid",
  tanh = "TanH",
}
