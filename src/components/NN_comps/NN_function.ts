import { Layer, af_enum } from "./NN_classes.ts";

// Optimized neural network forward propagation
export function neuralNetwork(x: number | string, layers: Layer[], func: Function) {
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
      
      // Apply activation function
      outputs[j] = func(weightedSum);
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
}

// Optimized version with inline activation functions for even better performance
export function neuralNetworkOptimized(x: number | string, layers: Layer[], activationType: af_enum) {
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
}
