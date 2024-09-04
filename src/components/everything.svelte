<script lang="ts">
    // Things to DO!
    // - Make the graph animate on X axis changes
    // - Improve the NN function's algo
    // - Fix when changing a before Layer Length, the neurons weights of next Layers are not Updated
    
    class Neuron {
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

    class cNeuron{
        idx: number;
        idy: number;

        constructor(idx: number, idy: number){
            this.idx = idx
            this.idy = idy
        }
    }

    class Layer {
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

    //---------------------------------------------
    // Setting up the Input, Hidden & Output Layers
    //---------------------------------------------
    
    // Hidden Layers
    let hiddenLayersCount = 1;
    let hiddenLayersNeuronCount: number[] = [1];
    let hiddenLayers: Layer[];
    
    // I/O Layers
    let inputLayer = new Layer(1, 0);
    let outputLayer = new Layer(1, hiddenLayersNeuronCount[hiddenLayersNeuronCount.length - 1]);
    
    // Hidden & Output Layer Combined
    let hidOutLayers: Layer[];
    let currentNeuron: cNeuron | null = null
    function neuralNetwork(x: number | string, layers: Layer[]) {
        x = parseFloat(x.toString());
        let inputs = [x];

        for (const layer of layers) {
            const outputs = [];
            for (const neuron of layer.neurons) {
                const weightedSum = neuron.weights.reduce((sum, weight, i) => sum + weight * inputs[i], 0) + neuron.bias;
                const neuronOut = Math.max(0, weightedSum); // ReLU activation
                outputs.push(neuronOut);
            }
            inputs = outputs; // Set inputs for the next layer
        }

        return inputs.reduce((sum, output) => sum + output, 0); // Summing the final layer's outputs
    }


    // ---------------------------------------
    // -------------- Plotting ---------------
    // ---------------------------------------
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";

    let chart: Chart;
    let xValues: number[] = [];
    let yValues: number[] = [];
    const range = 10;

    // Function to generate new y values based on x values
    function updateYValues() {
        yValues = xValues.map((x) => neuralNetwork(x, hidOutLayers));
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
                        label: "f(x) = x^2",
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
        chart.update();
        
    });

    // ---------------------------------------
    // ---------- Reactivity Stuff -----------
    // ---------------------------------------
    function updateNet(hiddenLayersCount:number, hiddenLayersNeuronCount: number[]) {
        hiddenLayers = new Array(hiddenLayersCount).fill(0).map((_, i) => {
            return new Layer(
                hiddenLayersNeuronCount[i],
                hiddenLayersNeuronCount[i - 1] || 1
            );
        });
        hidOutLayers = [...hiddenLayers, outputLayer];
    }
    $: updateNet(hiddenLayersCount, hiddenLayersNeuronCount)
    
    $: {
        yValues = xValues.map((x) => {return neuralNetwork(x, hidOutLayers)})
        if (chart){
            chart.data.datasets[0].data = yValues;
            chart.update();
        }
    }
    
    if (chart){
        chart.data.datasets[0].data = yValues;
        chart.update();
    }
</script>

<main class="w-full grid place-items-center *:px-10 py-10">
    <section class="w-full flex gap-20 xl:flex-row flex-col-reverse justify-between items-center ">
        <div class=" w-full max-w-xl p-10 shadow-2xl relative h-min ">
            
            {#if currentNeuron}
            
            <div class="text-2xl">
                Neuron 
                <div class="badge badge-lg text-xl badge-neutral">{currentNeuron.idx+1}:{currentNeuron.idy+1} </div>
            </div>

            <label class="form-control">
                <div class="label">
                    <span class="label-text">Bias</span>
                    <span class="label-text-alt">Value = {hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].bias}</span>
                    <span class="label-text-alt">-10 to 10</span>
                </div>
                <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.01"
                    class="range range-lg w-full"
                    bind:value={hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].bias}
                />
            </label>
            {:else}
            <h1 class="text-2xl " >Select a Neuron</h1>
            <label class="form-control opacity-50 ">
                <div class="label">
                    <span class="label-text">Bias</span>
                    <span class="label-text-alt">Value Nothing</span>
                    <span class="label-text-alt">-∞ to ∞</span>
                </div>
                <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.01"
                    class="range range-lg w-full  "
                    disabled
                />
            </label>
            {/if}

            <div class="divider"></div>
            {#if currentNeuron}
                {#each hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].weights as _, i}
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Weight {i+1}</span>
                            <span class="label-text-alt">Value = {hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].weights[i]}</span>
                            <span class="label-text-alt">-10 to 10</span>
                        </div>
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.01"
                            class="range range-lg w-full"
                            bind:value={hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].weights[i]}
                        />
                    </label>
                {/each}
            {:else}
                <label class="form-control opacity-50 ">
                    <div class="label">
                        <span class="label-text">Weight None</span>
                        <span class="label-text-alt">Value = Nothing</span>
                        <span class="label-text-alt">-∞ to ∞</span>
                    </div>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.01"
                        class="range range-lg w-full"
                        disabled
                    />
                </label>
            {/if}
        </div>
        <div class=" w-full shadow-xl">
            <canvas class="w-full "  id="functionChart"></canvas>
        </div>
    </section>
    <!-- Neural Network DIagram -->
    <section class=" grid place-items-center w-full mt-10">
        <div class="my-2 flex items-center justify-between gap-10">
            <h1 class="text-3xl">Neural Network</h1>
            <!-- <div class="divider divider-horizontal"></div> -->
            <div class=" p-4 rounded-lg max-w-[350px]">
                <label class="text-gray-400 text-sm"> Hidden layers </label>
                <div class="relative mt-2 max-w-xs text-gray-300">
                    <div
                        class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
                        data-hs-input-number=""
                    >
                        <div class="flex items-center gap-x-1.5">
                            <button
                                type="button"
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-300 focus:bg-neutral-100 z-2"
                                tabindex="-1"
                                aria-label="Decrease"
                                data-hs-input-number-decrement=""
                                on:click={() => {
                                    if(!(hidOutLayers.length > 1)) return
                                    const newLayers = hidOutLayers 
                                    newLayers.pop()
                                    hidOutLayers = newLayers
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
                                bind:value={hidOutLayers.length}
                                data-hs-input-number-input=""
                            />
                            <button
                                type="button"
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                                tabindex="-1"
                                aria-label="Increase"
                                data-hs-input-number-increment=""
                                on:click={() => {
                                    if(!(hidOutLayers.length < 10)) return
                                    const newLayers = hidOutLayers
                                    const prevLayerSize = hidOutLayers[hidOutLayers.length - 2].neurons.length;
                                    const layer = new Layer(1, prevLayerSize)
                                    newLayers.splice(hidOutLayers.length - 1,0, layer)
                                    hidOutLayers = newLayers
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
        </div>

        <div
            class="flex sm:gap-8 h-[658px] b-gray-700 b-2 py-8 px-10 rounded-lg sm:box-content box-border max-w-[1444px] w-full"
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
                        /><polyline
                            points="7.5 4.21 12 6.81 16.5 4.21"
                        /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline
                            points="21 12 16.5 14.6 16.5 19.79"
                        /><polyline
                            points="3.27 6.96 12 12.01 20.73 6.96"
                        /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
                    >
                </button>
            </div>
            <div class="divider divider-horizontal"></div>
            <div
                class="flex gap-8 sm:max-w-[1104px] sm:w-full overflow-x-auto w-[180px]"
            >
                {#each { length: hidOutLayers.length -1 } as _, i}
                    <div class=" flex flex-col gap-2 items-center">
                        <div
                            class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
                            data-hs-input-number=""
                        >
                            <div class="flex items-center gap-x-1.5">
                                <button
                                    type="button"
                                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-300 focus:bg-neutral-100 z-2"
                                    tabindex="-1"
                                    aria-label="Decrease"
                                    data-hs-input-number-decrement=""
                                    on:click={() =>{
                                        if (!(hidOutLayers[i].neurons.length > 1)) return
                                        const newLayers = hidOutLayers 
                                        newLayers[i].neurons.pop()
                                        hidOutLayers = newLayers
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
                                    max="10"
                                    bind:value={hidOutLayers[i].neurons.length}
                                    data-hs-input-number-input=""
                                />
                                <button
                                    type="button"
                                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                                    tabindex="-1"
                                    aria-label="Increase"
                                    data-hs-input-number-increment=""
                                    on:click={() =>{
                                        if (!(hidOutLayers[i].neurons.length < 10)) return
                                        const newLayers = hidOutLayers 
                                        newLayers[i].neurons.push(new Neuron(hidOutLayers[i-1] ? hidOutLayers[i-1].neurons.length : 1))
                                        hidOutLayers = newLayers
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
                        <div class="divider"></div>
                        {#each { length: hidOutLayers[i].neurons.length } as _, i2}
                            <button
                                class="btn btn-success size-min"
                                on:click={() => {
                                    if (!currentNeuron) currentNeuron = new cNeuron(0, 0)
                                    currentNeuron.idx = i
                                    currentNeuron.idy = i2
                                    
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
                                    class="lucide lucide-codesandbox"
                                    ><path
                                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                                    /><polyline
                                        points="7.5 4.21 12 6.81 16.5 4.21"
                                    /><polyline
                                        points="7.5 19.79 7.5 14.6 3 12"
                                    /><polyline
                                        points="21 12 16.5 14.6 16.5 19.79"
                                    /><polyline
                                        points="3.27 6.96 12 12.01 20.73 6.96"
                                    /><line
                                        x1="12"
                                        x2="12"
                                        y1="22.08"
                                        y2="12"
                                    /></svg
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
                        /><polyline
                            points="7.5 4.21 12 6.81 16.5 4.21"
                        /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline
                            points="21 12 16.5 14.6 16.5 19.79"
                        /><polyline
                            points="3.27 6.96 12 12.01 20.73 6.96"
                        /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
                    >
                </button>
            </div>
        </div>
    </section>
</main>
