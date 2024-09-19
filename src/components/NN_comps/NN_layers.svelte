<script lang="ts">
  import { cNeuron } from "./NN_classes.ts";
  import {
    hiddenLayersCount_store,
    hiddenLayersNeuronCount_store,
    currentNeuron_store,
  } from "../store.ts";
  let hiddenLayersCount: number;
  hiddenLayersCount_store.subscribe((value) => {
    hiddenLayersCount = value;
  });

  let hiddenLayersNeuronCount: number[];
  hiddenLayersNeuronCount_store.subscribe((value) => {
    hiddenLayersNeuronCount = value;
  });

  let currentNeuron: cNeuron | null;
  currentNeuron_store.subscribe((value) => {
    currentNeuron = value;
  });
</script>

<div
  class="sm:gap-8 h-730px shadow-2xl border-neutral-700 b-1 py-8 sm:px-10 px-6 rounded-lg overflow-x-auto w-full grid grid-cols-[auto_auto_1fr_auto_auto] "
>
  <div class=" flex flex-col gap-2 items-center">
    <div
      class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
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
    {#each { length: $hiddenLayersCount_store } as _, i}
      <div class=" flex flex-col gap-2 items-center">
        <div
          class="touch-manipulation py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
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
                  ? hiddenLayersNeuronCount_store.update((value) =>{
                    const updatedValues = [...value];
                    updatedValues[i] = value[i] - 1;
                    return updatedValues
                  })
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
                  ? hiddenLayersNeuronCount_store.update((value) =>{
                    const updatedValues = [...value];
                    updatedValues[i] = value[i] + 1;
                    return updatedValues
                  })
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
                <path d="M5 12h14"></path> <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="divider"></div>
        {#each { length: hiddenLayersNeuronCount[i] } as _, i2}
          <button
            class="btn btn-success touch-manipulation size-min hover:scale-103 focus:bg-#36d39944 group"
            on:click={() => {
              if (!currentNeuron == null) {
                currentNeuron_store.set(new cNeuron(0, 0));
              }
              currentNeuron_store.set(new cNeuron(i, i2));
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
