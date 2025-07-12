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
  
  // Optimized update method using the new optimized neural network function
  updateOptimized(layers: Layer[], activationType: af_enum) {
    // Import the optimized function inline to avoid circular imports
    const neuralNetworkOptimized = (x: number | string, layers: Layer[], activationType: af_enum): number => {
      // Handle input type more efficiently
      x = typeof x === 'number' ? x : parseFloat(x);
      
      // Pre-allocate arrays for better performance
      const maxLayerSize = Math.max(...layers.slice(0, -1).map(l => l.neurons.length));
      let inputs = [x];
      let outputs = new Array(maxLayerSize);
      
      for (let i = 0; i < layers.length - 1; i++) {
        const layer = layers[i];
        const numNeurons = layer.neurons.length;
        const inputsLength = inputs.length;
        
        // Resize outputs array if needed
        if (outputs.length !== numNeurons) {
          outputs = new Array(numNeurons);
        }
        
        for (let j = 0; j < numNeurons; j++) {
          const neuron = layer.neurons[j];
          let weightedSum = neuron.bias;
          
          // Manual loop instead of reduce for better performance
          for (let k = 0; k < inputsLength; k++) {
            weightedSum += neuron.weights[k] * inputs[k];
          }
          
          // Inline activation functions for better performance
          let neuronOut: number;
          switch (activationType) {
            case af_enum.relu:
              neuronOut = weightedSum > 0 ? weightedSum : 0;
              break;
            case af_enum.sigmoid:
              neuronOut = 1 / (1 + Math.exp(-weightedSum));
              break;
            case af_enum.tanh:
              neuronOut = Math.tanh(weightedSum);
              break;
            case af_enum.binary:
              neuronOut = weightedSum > 0 ? 1 : 0;
              break;
            default:
              neuronOut = weightedSum > 0 ? weightedSum : 0; // Default to ReLU
          }
          
          outputs[j] = neuronOut;
        }
        
        // Swap arrays to avoid allocation
        [inputs, outputs] = [outputs.slice(0, numNeurons), inputs];
      }
      
      // Final sum using manual loop for better performance
      let sum = 0;
      for (let i = 0; i < inputs.length; i++) {
        sum += inputs[i];
      }
      return sum;
    };
    
    this.y = this.x.map((x) => neuralNetworkOptimized(x, layers, activationType));
  }
}