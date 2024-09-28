import { Layer, Neuron } from "./NN_classes.ts";

export function neuralNetwork(x: number | string, layers: Layer[], func: Function) {
  x = parseFloat(x.toString());
  let inputs = [x];
  
  for (let i = 0; i < layers.length - 1; i++) {
    const layer = layers[i];
    const outputs = [];
    for (const neuron of layer.neurons) {
      const weightedSum =
        neuron.weights.reduce((sum, weight, i) => sum + weight * inputs[i], 0) +
        neuron.bias;
      let neuronOut = func(weightedSum);
      outputs.push(neuronOut);
    }
    inputs = outputs; // Set inputs for the next layer
  }
  return inputs.reduce((sum, output) => sum + output, 0); // Summing the final layer's outputs
}
