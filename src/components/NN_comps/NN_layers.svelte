<script lang="ts">
  import { cNeuron } from "./NN_classes.ts";
  import {
    hiddenLayersCount_store,
    hiddenLayersNeuronCount_store,
    currentNeuron_store,
  } from "../store.ts";
  import { blur, fade, fly, slide } from "svelte/transition";
  import { backOut, elasticOut } from "svelte/easing";
</script>

<div
  class=" sm:gap-8 h-739px shadow-2xl border-base-content/20 b-1 py-8 sm:px-10 px-6 rounded-btn overflow-x-auto w-full grid grid-cols-[auto_auto_1fr_auto_auto]"
>
  <div class=" flex flex-col gap-2 items-center">
    <div
      class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral"
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
    <div class=""></div>
    <button class="btn btn-success size-min" disabled>
      <div class="i-lucide:codesandbox size-6"></div>
    </button>
  </div>
  <div class="divider divider-horizontal"></div>
  <div class="flex gap-8">
    {#each { length: $hiddenLayersCount_store } as _, i}
      <div
        class=" flex flex-col gap-2 items-center"
        in:fly={{ x: -10, duration: 300, easing: backOut }}
        out:blur
      >
        <div
          class="touch-manipulation py-2 px-3 inline-block border rounded-btn bg-neutral-900 border-neutral"
          data-hs-input-number=""
        >
          <div class="flex items-center gap-x-1.5">
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral text-white hover:bg-neutral-800 focus:bg-neutral-800"
              tabindex="-1"
              aria-label="Decrease"
              data-hs-input-number-decrement=""
              onclick={() =>
                $hiddenLayersNeuronCount_store[i] > 1
                  ? hiddenLayersNeuronCount_store.update((value) => {
                      const updatedValues = [...value];
                      updatedValues[i] = value[i] - 1;
                      return updatedValues;
                    })
                  : _}
            >
              <div class="i-tabler-minus size-4.5"></div>
            </button>
            <input
              class="p-0 w-6 bg-transparent border-0 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-white"
              style="-moz-appearance: textfield;"
              type="number"
              aria-roledescription="Number field"
              placeholder="1"
              min="1"
              max="10"
              bind:value={$hiddenLayersNeuronCount_store[i]}
              data-hs-input-number-input=""
            />
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral text-white hover:bg-neutral-800 focus:bg-neutral-800"
              tabindex="-1"
              aria-label="Increase"
              data-hs-input-number-increment=""
              onclick={() =>
                $hiddenLayersNeuronCount_store[i] < 10
                  ? hiddenLayersNeuronCount_store.update((value) => {
                      const updatedValues = [...value];
                      updatedValues[i] = value[i] + 1;
                      return updatedValues;
                    })
                  : _}
            >
              <div class="i-tabler-plus size-4.5"></div>
            </button>
          </div>
        </div>
        <div class="divider"></div>
        {#each { length: $hiddenLayersNeuronCount_store[i] } as _, i2}
          <div
            class="flex flex-col"
            in:fly={{ y: -10, duration: 300, easing: backOut }}
            out:blur
          >
            <input
              id="neuron{i}{i2}"
              type="radio"
              class="peer hidden"
              name="neurons"
            />
            <label
              for="neuron{i}{i2}"
              class="btn peer-checked:*:color-#fff color-neutral btn-success touch-manipulation size-min hover:scale-103 peer-checked:bg-#36d39944 group"
              onclick={() => {
                if (!$currentNeuron_store == null) {
                  currentNeuron_store.set(new cNeuron(0, 0));
                }
                currentNeuron_store.set(new cNeuron(i, i2));
              }}
            >
              <div class="i-lucide:codesandbox size-6"></div>
            </label>
          </div>
        {/each}
      </div>
    {/each}
  </div>
  <div class="divider divider-horizontal"></div>
  <div class=" flex flex-col gap-2 items-center">
    <div
      class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral"
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
      <div class="i-lucide:codesandbox size-6"></div>
    </button>
  </div>
</div>
