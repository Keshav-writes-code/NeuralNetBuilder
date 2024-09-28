<script lang="ts">
  // Libs Import
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";

  import { Layer, af_enum, XYDataCollector, Neuron } from "./NN_classes.ts";
  import {
    hidOutLayers_store,
    selActivaFn_store,
    hiddenLayersNeuronCount_store,
    hiddenLayersCount_store,
    currentNeuron_store,
    randomisedVals_store
  } from "../store.ts";

  //---------------------------------------------
  // --------------Some Variable-----------------
  //---------------------------------------------
  let currentNeuronLayers: Layer[] = [];

  const activaFn = {
    [af_enum.relu]: (x: number) => Math.max(0, x),
    [af_enum.sigmoid]: (x: number) => 1 / (1 + Math.exp(-x)),
    [af_enum.tanh]: (x: number) => Math.tanh(x),
    [af_enum.binary]: (x: number) => x > 0 ? 1 : 0,
  };

  //---------------------------------------------
  // Setting up the Input, Hidden & Output Layers
  //---------------------------------------------

  // Hidden Layers
  let hiddenLayers: Layer[];

  // I/O Layers
  let inputLayer = new Layer(1, 0);
  let outputLayer = new Layer(
    1,
    $hiddenLayersNeuronCount_store[$hiddenLayersNeuronCount_store.length - 1]
  );

  // Hidden & Output Layer Combined

  function neuralNetwork(x: number | string, layers: Layer[], func: Function) {
    x = parseFloat(x.toString());
    let inputs = [x];

    for (let i = 0; i < layers.length - 1; i++) {
      const layer = layers[i];
      const outputs = [];
      for (const neuron of layer.neurons) {
        const weightedSum =
          neuron.weights.reduce(
            (sum, weight, i) => sum + weight * inputs[i],
            0
          ) + neuron.bias;
        let neuronOut = func(weightedSum);
        outputs.push(neuronOut);
      }
      inputs = outputs; // Set inputs for the next layer
    }

    return inputs.reduce((sum, output) => sum + output, 0); // Summing the final layer's outputs
  }

  // ---------------------------------------
  // -------------- Plotting ---------------
  // ---------------------------------------
  let chart: Chart;
  let NN_sampler = new XYDataCollector()
  let currentNeuronOut_sampler = new XYDataCollector()
  onMount(() => {
    const ctx = (document.getElementById("functionChart") as HTMLCanvasElement)?.getContext("2d");
    if (!ctx) return
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: NN_sampler.x,
        datasets: [
          {
            label: " f(x) = NeuralNet(x)",
            data: NN_sampler.y,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
            tension: 0,
            pointRadius: 0,
          },
          {
            label: " f(x) = CurrentNeuronOut(x)",
            data: currentNeuronOut_sampler.y,
            borderColor: "rgb(0, 2, 192)",
            fill: false,
            tension: 0,
            pointRadius: 0,
          }
        ],
      },
      options: {
        plugins: {
          legend: {
              display: false,
          }
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            beginAtZero: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    NN_sampler.update($hidOutLayers_store, neuralNetwork, activaFn[$selActivaFn_store])
    currentNeuronOut_sampler.update(currentNeuronLayers, neuralNetwork, activaFn[$selActivaFn_store])
    chart.data.datasets[0].data = NN_sampler.y;
    chart.data.datasets[1].data = currentNeuronOut_sampler.y;
    chart.options.animation = false; // disables all animations
    chart.update();
  });

  // ---------------------------------------
  // ---------- Reactivity Stuff -----------
  // ---------------------------------------
  let oldHiddenLayers: Layer[]
  function updateNet(
    hiddenLayersCount: number,
    hiddenLayersNeuronCount: number[]
  ) {
    hiddenLayers = new Array(hiddenLayersCount).fill(0).map((_, i) => {
      return new Layer(
        hiddenLayersNeuronCount[i],
        hiddenLayersNeuronCount[i - 1] || 1,
        $randomisedVals_store
      );
    });
    if (oldHiddenLayers) {
      const shortestLayerLength = Math.min(oldHiddenLayers.length, hiddenLayers.length);
      
      for (let i = 0; i < shortestLayerLength; i++) {
        const oldLayer = oldHiddenLayers[i];
        const newLayer = hiddenLayers[i];
        
        const shortestNeuronLength = Math.min(oldLayer.neurons.length, newLayer.neurons.length);
        
        for (let j = 0; j < shortestNeuronLength; j++) {
          const oldNeuron = oldLayer.neurons[j];
          const newNeuron = newLayer.neurons[j];
          
          newNeuron.bias = oldNeuron.bias;
          
          const shortestWeightsLength = Math.min(oldNeuron.weights.length, newNeuron.weights.length);
          
          for (let k = 0; k < shortestWeightsLength; k++) {
            newNeuron.weights[k] = oldNeuron.weights[k];
          }
        }
      }
    }

    oldHiddenLayers = hiddenLayers
    hidOutLayers_store.set([...hiddenLayers, outputLayer]);
  }
  // update Network Structure when Neural Network Specs Changes
  $: updateNet($hiddenLayersCount_store, $hiddenLayersNeuronCount_store);
  
  // Update Current Neuron Out Graph when Current Neuron Changes
  currentNeuron_store.subscribe((value) => {
    currentNeuronLayers = [];
    if (!value) return
    for (let i = 0; i < $hidOutLayers_store.length; i++) {
      const layer = $hidOutLayers_store[i];
      if (value.idx > i) {
        currentNeuronLayers.push(layer);
      }
    }
    currentNeuronLayers.push({
      neurons: [
        $hidOutLayers_store[value.idx].neurons[value.idy],
      ]
    });
    currentNeuronLayers.push({
      neurons: [
        new Neuron(1),
      ]
    });

    currentNeuronOut_sampler.update(currentNeuronLayers, neuralNetwork, activaFn[$selActivaFn_store])
    if (chart) {
      chart.data.datasets[1].data = currentNeuronOut_sampler.y;
      chart.update();
    }
  })

  // Update NN Graphs when Neural Network Parameters Changes
  $: {
    NN_sampler.update($hidOutLayers_store, neuralNetwork, activaFn[$selActivaFn_store])
    currentNeuronOut_sampler.update(currentNeuronLayers, neuralNetwork, activaFn[$selActivaFn_store])
    
    if (chart) {
      chart.data.datasets[0].data = NN_sampler.y;
      chart.data.datasets[1].data = currentNeuronOut_sampler.y;
      chart.update();
    }
  }
</script>

<div class="rounded-lg w-full sm:aspect-[18/9] aspect-[4/3] border-base-content/20 b-1 shadow-2xl relative">
  <canvas id="functionChart"></canvas>
</div>
