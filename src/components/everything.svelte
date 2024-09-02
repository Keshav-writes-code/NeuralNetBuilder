<script lang="ts">
    import Plotly from "plotly.js-dist";

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
    let NNlayersCount = 1;
    let NNlayersNeuronCount: number[] = [];
    $: NNlayersCount, NNlayersNeuronCount.push(1);
    let NNlayers = new Array(NNlayersCount).fill(0).map(() => new layer(1, 1));

    function neuralNetwork(x: number) {
        let result = 0;
        NNlayers.forEach((layer) => {
            result += layer.neurons[0].value;
        })
        return result;
    }

</script>

<main class="w-full grid place-items-center">
    <section>
        <div id="plot" class="" ></div>
    </section>
    <section class="flex gap-8 w-[1388px]">
        {#each { length: NNlayersCount } as _, i}
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
                            on:click={() => NNlayersNeuronCount[i] > 1 ? NNlayersNeuronCount[i]--: _ }

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
                            bind:value={NNlayersNeuronCount[i]}
                            data-hs-input-number-input=""
                        />
                        <button
                            type="button"
                            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border    shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
                            tabindex="-1"
                            aria-label="Increase"
                            data-hs-input-number-increment=""
                            on:click={() => NNlayersNeuronCount[i] < 10 ? NNlayersNeuronCount[i]++: _ }
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
                {#each { length: NNlayersNeuronCount[i] } as _, i}
                    <button class="btn btn-success size-min">
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
    </section>
    <section>
        <div class=" p-4 rounded-lg max-w-[350px]">
            <label class="text-gray-400 text-sm"> Number of layers </label>
            <div class="relative mt-2 max-w-xs text-gray-300">
                <input
                    type="number"
                    placeholder="1"
                    class="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg"
                    min="1"
                    max="10"
                    bind:value={NNlayersCount}
                />
            </div>
        </div>
    </section>
</main>
