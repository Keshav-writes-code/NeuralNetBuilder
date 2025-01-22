<script lang="ts">
  import { Layer } from "./NN_classes.ts";
  import { currentNeuron_store, hidOutLayers_store } from "../store.ts";
  import autoAnimate from "@formkit/auto-animate";

  function updateNet(hidOutLayers: Layer[]) {
    hidOutLayers_store.set(hidOutLayers);
  }

  $: updateNet($hidOutLayers_store);

  let biasRangeMax: number = 30;
  let biasRangeMin: number = -30;
  let wieghtRangeMax: number = 1;
  let wieghtRangeMin: number = -1;

  let lastTap = 0;
</script>

<div
  class="rounded-btn border-neutral b-1 w-full max-w-xl sm:p-10 p-5 shadow-2xl relative h-min"
>
  <div class="text-2xl">
    {#if $currentNeuron_store}
      Neuron
      <div class="badge badge-lg text-xl badge-neutral">
        {$currentNeuron_store.idx + 1}:{$currentNeuron_store.idy + 1}
      </div>
    {:else}
      <h1 class="sm:text-2xl font-bold">Select a Neuron</h1>
    {/if}
  </div>

  <label class="form-control">
    <div class="label grid grid-cols-[1fr_auto_1fr]">
      <span class="label-text {$currentNeuron_store ? '' : 'opacity-50'}"
        >Bias</span
      >
      {#if $currentNeuron_store}
        <span class="label-text-alt">
          Value = {$hidOutLayers_store[$currentNeuron_store.idx].neurons[
            $currentNeuron_store.idy
          ].bias}
        </span>
      {:else}
        <span class="label-text-alt opacity-50">Value = Nothing</span>
      {/if}

      {#if $currentNeuron_store}
        <span class="label-text-alt justify-self-end flex items-center gap-1">
          <input
            type="text"
            placeholder="Type here"
            class=" text-center badge badge-neutral badge-lg sm:w-3.5rem w-2.5rem sm:px-2 px-0"
            bind:value={biasRangeMin}
          />
          <span class="sm:block hidden">to</span>
          <input
            type="text"
            placeholder="Type here"
            class=" text-center badge badge-neutral badge-lg sm:w-3.5rem w-2.5rem sm:px-2 px-0"
            bind:value={biasRangeMax}
          />
        </span>
      {:else}
        <span class="label-text-alt justify-self-end opacity-50">-∞ to ∞</span>
      {/if}
    </div>
    {#if $currentNeuron_store}
      <input
        type="range"
        min={biasRangeMin}
        max={biasRangeMax}
        step="0.01"
        class="range range-lg w-full"
        bind:value={$hidOutLayers_store[$currentNeuron_store.idx].neurons[
          $currentNeuron_store.idy
        ].bias}
        on:dblclick={() => {
          if (!$currentNeuron_store) return;
          $hidOutLayers_store[$currentNeuron_store.idx].neurons[
            $currentNeuron_store.idy
          ].bias = 0;
        }}
        on:touchend={() => {
          if (!$currentNeuron_store) return;
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          if (tapLength < 200 && tapLength > 0) {
            // Adjust the interval as needed
            $hidOutLayers_store[$currentNeuron_store.idx].neurons[
              $currentNeuron_store.idy
            ].bias = 0;
          }
          lastTap = currentTime;
        }}
      />
    {:else}
      <input
        type="range"
        min="-10"
        max="10"
        step="0.01"
        class="range range-lg w-full opacity-50"
        disabled
      />
    {/if}
  </label>
  <div class="divider"></div>
  <div class="max-h-300px overflow-y-auto overflow-x-clip" use:autoAnimate>
    {#if $currentNeuron_store}
      {#each $hidOutLayers_store[$currentNeuron_store.idx].neurons[$currentNeuron_store.idy].weights as _, i}
        <label class="form-control">
          <div class="label grid grid-cols-[1fr_auto_1fr]">
            <span class="label-text">Weight {i + 1}</span>
            <span class="label-text-alt"
              >Value = {$hidOutLayers_store[$currentNeuron_store.idx].neurons[
                $currentNeuron_store.idy
              ].weights[i]}</span
            >
            <span
              class="label-text-alt justify-self-end gap-1 flex items-center"
            >
              <input
                type="text"
                placeholder="Type here"
                class=" text-center badge badge-neutral badge-lg sm:w-3rem w-2.3rem sm:px-2 px-0"
                bind:value={wieghtRangeMin}
              />
              <span class="sm:block hidden">to</span>
              <input
                type="text"
                placeholder="Type here"
                class=" text-center badge badge-neutral badge-lg sm:w-3rem w-2.3rem sm:px-2 px-0"
                bind:value={wieghtRangeMax}
              />
            </span>
          </div>
          <input
            type="range"
            min={wieghtRangeMin}
            max={wieghtRangeMax}
            step="0.01"
            class="range range-lg w-full"
            bind:value={$hidOutLayers_store[$currentNeuron_store.idx].neurons[
              $currentNeuron_store.idy
            ].weights[i]}
            on:dblclick={() => {
              if (!$currentNeuron_store) return;
              $hidOutLayers_store[$currentNeuron_store.idx].neurons[
                $currentNeuron_store.idy
              ].weights[i] = 0;
            }}
            on:touchend={() => {
              if (!$currentNeuron_store) return;
              const currentTime = new Date().getTime();
              const tapLength = currentTime - lastTap;
              if (tapLength < 300 && tapLength > 0) {
                // Adjust the interval as needed
                $hidOutLayers_store[$currentNeuron_store.idx].neurons[
                  $currentNeuron_store.idy
                ].weights[i] = 0;
              }
              lastTap = currentTime;
            }}
          />
        </label>
      {/each}
    {:else}
      <label class="form-control opacity-50">
        <div class="label grid grid-cols-[1fr_auto_1fr]">
          <span class="label-text">Weight None</span>
          <span class="label-text-alt">Value = Nothing</span>
          <span class="label-text-alt justify-self-end">-∞ to ∞</span>
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
</div>

<style>
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
  }
</style>

