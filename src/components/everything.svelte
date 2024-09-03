<script lang="ts">
    class neuron {
        value: number;
        bias: number;
        weights: number[];

        constructor(nextLayer_neurons: number) {
            this.value = 0;
            this.bias = 0;
            this.weights = new Array(nextLayer_neurons).fill(0);
        }
        show() {
            console.log(this);
        }
    }

    class layer {
        neurons: neuron[];
        constructor(size: number, nextLayerSize: number) {
            this.neurons = new Array(size)
                .fill(0)
                .map(() => new neuron(nextLayerSize));
        }
        show() {
            console.log(this.neurons);
        }
    }

    let hiddenLayersCount = 1;
    let hiddenLayersNeuronCount: number[] = [1];
    let NNlayers: layer[] = new Array(hiddenLayersCount).fill(0).map((_, i) => {
        return new layer(hiddenLayersNeuronCount[i], hiddenLayersNeuronCount[i+1])
    });

    function neuralNetwork(x: number) {
        let result = 0;
        // NNlayers.forEach((layer) => {
        //     result += layer.neurons[0].value;
        // })
        return result;
    }

    let currentNeuron: neuron | null = null

    
    // ---------------------------------------
    // -------------- Plotting ---------------
    // ---------------------------------------
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';

    let chart;
    let xValues = [];
    let yValues = [];
    const range = 10;

    // Function to generate new y values based on x values
    function updateYValues() {
        yValues = xValues.map(x => neuralNetwork(x));
    }

    // Generate x values
    for (let x = -range; x <= range; x += 0.1) {
        xValues.push(x.toFixed(2));  // Keep x values as strings for labels
    }

    onMount(() => {
        const ctx = document.getElementById('functionChart').getContext('2d');

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: 'f(x) = x^2',
                    data: yValues,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    tension: 0,
                    pointRadius: 0
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        // Example of updating data
        setTimeout(() => {
            updateYValues();
            chart.data.datasets[0].data = yValues;
            chart.update();
        }, 2000);  // Update chart data after 2 seconds
    });
</script>

<main class="w-full grid place-items-center *:px-10 py-10">
    <section class="w-full grid grid-cols-2 place-items-center" >
        <div class=" w-full max-w-xl p-10 shadow-2xl" >
            <label class="form-control ">
                <div class="label">
                    <span class="label-text">Weight</span>
                    <span class="label-text-alt"
                        >Value = </span
                    >
                    <span class="label-text-alt"
                        >-1 to 1</span
                    >
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="range range-lg w-full"
                />
            </label>
            <label class="form-control ">
                <div class="label">
                    <span class="label-text">Weight</span>
                    <span class="label-text-alt"
                        >Value = </span
                    >
                    <span class="label-text-alt"
                        >-1 to 1</span
                    >
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="range range-lg w-full "
                />
            </label>
        </div>
        <div class="w-800px shadow-xl" ><canvas id="functionChart"></canvas></div>

    </section>
    <!-- Neural Network DIagram -->
    <section class=" grid place-items-center w-full mt-10">
        <div class="my-2 flex items-center justify-between gap-10">
            <h1 class="text-3xl " >Neural Network</h1>
            <!-- <div class="divider divider-horizontal"></div> -->
            <div class=" p-4 rounded-lg max-w-[350px] ">
                <label class="text-gray-400 text-sm"> Hidden layers </label>
                <div class="relative mt-2 max-w-xs text-gray-300">
                    <div
                        class="py-2 px-3 inline-block  border rounded-lg bg-neutral-900 border-neutral-700"
                        data-hs-input-number=""
                    >
                        <div class="flex items-center gap-x-1.5 ">
                            <button
                                type="button"
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-300 focus:bg-neutral-100 z-2"
                                tabindex="-1"
                                aria-label="Decrease"
                                data-hs-input-number-decrement=""
                                on:click={() => {hiddenLayersCount > 1 ? hiddenLayersCount--: _; hiddenLayersNeuronCount.pop()} }

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
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border    shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                                tabindex="-1"
                                aria-label="Increase"
                                data-hs-input-number-increment=""
                                on:click={() =>{ hiddenLayersCount < 8 ? hiddenLayersCount++: _; hiddenLayersNeuronCount.push(1)} }
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

        <div class="flex sm:gap-8 h-[658px] b-gray-700 b-2 py-8 px-10 rounded-lg sm:box-content  box-border max-w-[1444px] w-full">
            <div class=" flex flex-col gap-2 items-center">
                <div
                    class="py-2 px-3 inline-block  border rounded-lg bg-neutral-900 border-neutral-700"
                    data-hs-input-number=""
                >
                    <div class="flex items-center gap-x-1.5 ">
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
                        /><polyline
                            points="7.5 19.79 7.5 14.6 3 12"
                        /><polyline
                            points="21 12 16.5 14.6 16.5 19.79"
                        /><polyline
                            points="3.27 6.96 12 12.01 20.73 6.96"
                        /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
                    >
                </button>
            </div>
            <div class="divider divider-horizontal "></div>
            <div class="flex gap-8 sm:max-w-[1104px] sm:w-full overflow-x-auto w-[180px]  ">
                {#each { length: hiddenLayersCount  } as _, i}
                    <div class=" flex flex-col gap-2 items-center">
                        <div
                            class="py-2 px-3 inline-block  border rounded-lg bg-neutral-900 border-neutral-700"
                            data-hs-input-number=""
                        >
                            <div class="flex items-center gap-x-1.5 ">
                                <button
                                    type="button"
                                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 text-gray-800 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-300 focus:bg-neutral-100 z-2"
                                    tabindex="-1"
                                    aria-label="Decrease"
                                    data-hs-input-number-decrement=""
                                    on:click={() => hiddenLayersNeuronCount[i] > 1 ? hiddenLayersNeuronCount[i]--: _ }
    
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
                                    class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border    shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                                    tabindex="-1"
                                    aria-label="Increase"
                                    data-hs-input-number-increment=""
                                    on:click={() => hiddenLayersNeuronCount[i] < 10 ? hiddenLayersNeuronCount[i]++: _ }
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
                                class="btn btn-success size-min"
                                on:click={()=>{currentNeuron = NNlayers[i].neurons[i2]}}
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
                                    /><line x1="12" x2="12" y1="22.08" y2="12" /></svg
                                >
                            </button>
                        {/each}
                    </div>
                {/each}
            </div>
            <div class="divider divider-horizontal "></div>
            <div class=" flex flex-col gap-2 items-center">
                <div
                    class="py-2 px-3 inline-block  border rounded-lg bg-neutral-900 border-neutral-700"
                    data-hs-input-number=""
                >
                    <div class="flex items-center gap-x-1.5 ">
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
                        /><polyline
                            points="7.5 19.79 7.5 14.6 3 12"
                        /><polyline
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