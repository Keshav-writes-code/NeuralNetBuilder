function decimalRounder(x: number) {
  return parseFloat(x.toFixed(2));
}

export class Neuron {
  value: number;
  bias: number;
  weights: number[];

  constructor(prevLayer_neurons: number, randomized: boolean = false) {
    const randRange = 10;
    this.value = 0;
    this.bias = 0
    this.weights = new Array(prevLayer_neurons).fill(0);
    if (randomized) {
      this.bias = decimalRounder(Math.random() * randRange * 2 - randRange);
      this.weights = this.weights.map(() =>
        decimalRounder(Math.random() * randRange * 2 - randRange)
      );
    }
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
  constructor(size: number, prevLayerSize: number, randomized: boolean = false) {    
    this.neurons = new Array(size).fill(0).map(() => new Neuron(prevLayerSize, randomized));
  }
}

export enum af_enum {
  relu = "ReLU",
  sigmoid = "Signmoid",
  tanh = "TanH",
  binary = "Binary"
}

export class XYDataCollector {
  x: number[];
  y: number[];
  constructor() {
    let rangeBi = 50
    this.x = []
    for (let i = -rangeBi; i <= rangeBi; i += 0.1) {
      this.x.push(i);
    }
    this.y = []
  }
  update(layers: Layer[], NNFunc: Function, activaFn: Function) {
    this.y = this.x.map((x) => NNFunc(x, layers, activaFn));
  }
}