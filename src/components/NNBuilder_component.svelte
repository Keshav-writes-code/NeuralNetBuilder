<script lang="ts">
  // Things to DO!
  // - Make the graph animate on X axis changes
  // - Improve the NN function's algo
  // - Fix when changing a before Layer Length, the neurons weights of next Layers are not Updated
  
  // Libs Import
  import { onMount } from "svelte";
  import { Chart } from "chart.js/auto";
  
  // Modules Import
  import { cNeuron, Layer } from "./NN_classes.ts";
  import NN_parameters from './NN_parameters.svelte'
  import {currentNeuron, hidOutLayers} from './store.ts'
  
  //---------------------------------------------
  // --------------Some Variable----------------- 
  //---------------------------------------------
  enum af_enum {
    relu = 'ReLU',
    sigmoid = 'Signmoid',
    tanh = 'TanH'
  }
  const activaFn = {
    [af_enum.relu]: (x: number) => Math.max(0, x),
    [af_enum.sigmoid]: (x: number) => 1 / (1 + Math.exp(-x)),
    [af_enum.tanh]: (x: number) => Math.tanh(x),
  };
  let selActivaFn = af_enum.relu;
  //---------------------------------------------
  // Setting up the Input, Hidden & Output Layers
  //---------------------------------------------

  // Hidden Layers
  let hiddenLayersCount = 1;
  let hiddenLayersNeuronCount: number[] = [1];
  let hiddenLayers: Layer[]

  // I/O Layers
  let inputLayer = new Layer(1, 0);
  let outputLayer = new Layer(
    1,
    hiddenLayersNeuronCount[hiddenLayersNeuronCount.length - 1]
  );

  // Hidden & Output Layer Combined
  function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
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
  let xValues: number[] = [];
  let yValues: number[] = [];
  const range = 10;

  // Function to generate new y values based on x values
  function updateYValues() {

    yValues = xValues.map((x) => neuralNetwork(x, hidOutLayers, activaFn[selActivaFn]));
  }

  // Generate x values
  for (let x = -range; x <= range; x += 0.1) {
    xValues.push(x); // Keep x values as strings for labels
  }

  onMount(() => {
    const ctx = document.getElementById("functionChart")?.getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: " f(x) = NeuralNet(x)",
            data: yValues,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
            tension: 0,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    });
    updateYValues();
    chart.data.datasets[0].data = yValues;
    chart.options.animation = false; // disables all animations
    chart.update();
  });

  // ---------------------------------------
  // ---------- Reactivity Stuff -----------
  // ---------------------------------------
  function updateNet(
    hiddenLayersCount: number,
    hiddenLayersNeuronCount: number[]
  ) {
    hiddenLayers = new Array(hiddenLayersCount).fill(0).map((_, i) => {
      return new Layer(
        hiddenLayersNeuronCount[i],
        hiddenLayersNeuronCount[i - 1] || 1
      );
    });
    hidOutLayers.set([...hiddenLayers, outputLayer]);
  }
  $: updateNet(hiddenLayersCount, hiddenLayersNeuronCount);

  hidOutLayers.subscribe(value=>{
    yValues = xValues.map((x) => {
      return neuralNetwork(x, value, activaFn[selActivaFn]);
    });
    if (chart) {
      chart.data.datasets[0].data = yValues;
      chart.update();
    }
  })

  if (chart) {
    chart.data.datasets[0].data = yValues;
    chart.update();
  }
</script>

<main class="w-full grid place-items-center *:sm:px-10 *:px-5 py-10">
  <section
    class="w-full flex gap-20 xl:flex-row flex-col-reverse justify-between items-center"
  >
    <NN_parameters/>
    <div class="rounded-lg  w-full shadow-xl border-neutral b-2">
      <canvas class="w-full" id="functionChart"></canvas>
    </div>
  </section>
  <!-- Neural Network DIagram -->
  <section class=" grid place-items-center w-full mt-10">
    <div class="my-2 flex items-center justify-between gap-10">
      <h1 class="text-3xl">Neural Network</h1>
      <!-- <div class="divider divider-horizontal"></div> -->
    </div>

    <div class="w-full max-w-[1530px]">
      <div
        class="w-full  rounded-lg grid grid-cols-2 place-items-center gap-8 mb-4 *:flex *:flex-col *:gap-2"
      >
        <div class=" rounded-lg max-w-[350px] justify-self-end ">
          <label class="text-gray-400 text-sm"> Hidden layers </label>
          <div class="relative1 max-w-xs text-gray-300">
            <div
              class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
              data-hs-input-number=""
            >
              <div class="flex items-center gap-x-1.5">
                <button
                  type="button"
                  class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                  tabindex="-1"
                  aria-label="Decrease"
                  data-hs-input-number-decrement=""
                  on:click={() => {
                    hiddenLayersCount > 1 ? hiddenLayersCount-- : _;
                    hiddenLayersNeuronCount.pop();
                  }}
                >
                  <svg
                    class="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <input
                  class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
                  style="-moz-appearance: textfield;"
                  type="number"
                  aria-roledescription="Number field"
                  placeholder="1"
                  min="1"
                  max="8"
                  bind:value={hiddenLayersCount}
                  data-hs-input-number-input=""
                />
                <button
                  type="button"
                  class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                  tabindex="-1"
                  aria-label="Increase"
                  data-hs-input-number-increment=""
                  on:click={() => {
                    hiddenLayersCount < 8 ? hiddenLayersCount++ : _;
                    hiddenLayersNeuronCount.push(1);
                  }}
                >
                  <svg
                    class="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class=" justify-self-start ">
          <label class="text-gray-400 text-sm"> Activation Function </label>
          <div class="dropdown ">
            <div tabindex="0" role="button" class="btn m-1">
              {selActivaFn}
              <svg
                width="12px"
                height="12px"
                class="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path
                  d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                ></path>
              </svg>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content bg-base-300 rounded-box z-[1] min-w-52 p-2  shadow-2xl"
            >
              <li class="flex items-center" >
                <input
                  type="radio"
                  name="theme-dropdown"
                  class="theme-controller btn btn-sm btn-block btn-ghost justify-start w-full"
                  aria-label="ReLU"
                  value="business"
                  on:click={() => (selActivaFn = af_enum.relu)}
                />
                <svg class="h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 375 225"  preserveAspectRatio="xMidYMid meet" version="1.0"><path stroke-linecap="round" transform="matrix(0.53033, -0.53033, 0.53033, 0.53033, 126.789326, 194.20462)" fill="none" stroke-linejoin="miter" d="M 32.502295 32.499475 L 344.284837 32.499475 " stroke="#999" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="round" transform="matrix(0.75, -0.000000000000000372, 0.000000000000000372, 0.75, 18.697188, 170.642902)" fill="none" stroke-linejoin="miter" d="M 32.497501 32.502174 L 180.257924 32.502174 " stroke="#999" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/></svg>

              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Sigmoid"
                  value="dark"
                  on:click={() => (selActivaFn = af_enum.sigmoid)}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="TanH"
                  value="sunset"
                  on:click={() => (selActivaFn = af_enum.tanh)}
                />
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div
        class="flex sm:gap-8 h-730px border-neutral b-2 py-8 px-10 rounded-lg overflow-x-auto w-full"
      >
        <div class=" flex flex-col gap-2 items-center">
          <div
            class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
            data-hs-input-number=""
          >
            <div class="flex items-center gap-x-1.5">
              <input
                class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
                style="-moz-appearance: textfield;"
                type="number"
                aria-roledescription="Number field"
                placeholder="1"
                min="1"
                max="10"
                value="1"
                data-hs-input-number-input=""
                disabled
              />
            </div>
          </div>
          <div class="divider"></div>
          <button class="btn btn-success size-min" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-codesandbox"
              ><path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline
                points="7.5 19.79 7.5 14.6 3 12"
              /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline
                points="3.27 6.96 12 12.01 20.73 6.96"
              /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
            >
          </button>
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="flex gap-8">
          {#each { length: hiddenLayersCount } as _, i}
            <div class=" flex flex-col gap-2 items-center">
              <div
                class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
                data-hs-input-number=""
              >
                <div class="flex items-center gap-x-1.5">
                  <button
                    type="button"
                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                    tabindex="-1"
                    aria-label="Decrease"
                    data-hs-input-number-decrement=""
                    on:click={() =>
                      hiddenLayersNeuronCount[i] > 1
                        ? hiddenLayersNeuronCount[i]--
                        : _}
                  >
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <input
                    class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
                    style="-moz-appearance: textfield;"
                    type="number"
                    aria-roledescription="Number field"
                    placeholder="1"
                    min="1"
                    max="10"
                    bind:value={hiddenLayersNeuronCount[i]}
                    data-hs-input-number-input=""
                  />
                  <button
                    type="button"
                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                    tabindex="-1"
                    aria-label="Increase"
                    data-hs-input-number-increment=""
                    on:click={() =>
                      hiddenLayersNeuronCount[i] < 10
                        ? hiddenLayersNeuronCount[i]++
                        : _}
                  >
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="divider"></div>
              {#each { length: hiddenLayersNeuronCount[i] } as _, i2}
                <button
                  class="btn btn-success size-min hover:scale-103 focus:bg-#36d39944 group"
                  on:click={() => {
                    if (!currentNeuron==null) {
                      currentNeuron.set(new cNeuron(0, 0))
                    };
                    currentNeuron.set(new cNeuron(i, i2));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-codesandbox group-focus:stroke-#fff"
                    ><path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline
                      points="7.5 19.79 7.5 14.6 3 12"
                    /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline
                      points="3.27 6.96 12 12.01 20.73 6.96"
                    /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
                  >
                </button>
              {/each}
            </div>
          {/each}
        </div>
        <div class="divider divider-horizontal"></div>
        <div class=" flex flex-col gap-2 items-center">
          <div
            class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
            data-hs-input-number=""
          >
            <div class="flex items-center gap-x-1.5">
              <input
                class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
                style="-moz-appearance: textfield;"
                type="number"
                aria-roledescription="Number field"
                placeholder="1"
                min="1"
                max="10"
                value="1"
                data-hs-input-number-input=""
                disabled
              />
            </div>
          </div>
          <div class="divider"></div>
          <button class="btn btn-success size-min" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-codesandbox"
              ><path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline
                points="7.5 19.79 7.5 14.6 3 12"
              /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline
                points="3.27 6.96 12 12.01 20.73 6.96"
              /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</main>
