<script lang="ts">
  import {Layer, cNeuron} from './NN_classes.ts'
  import { currentNeuron_store, hidOutLayers_store } from "../store.ts";
  let hidOutLayers: Layer[];

  hidOutLayers_store.subscribe(value => {
    hidOutLayers = value;
  });

  function updateNet(hidOutLayers: Layer[]) {
    hidOutLayers_store.set(hidOutLayers);
  }

  $: updateNet(hidOutLayers);

  let currentNeuron: cNeuron | null;
  currentNeuron_store.subscribe((value) => {
    currentNeuron = value;
  });

  let biasRangeMax: number = 100
  let biasRangeMin: number = -100
  let wieghtRangeMax: number = 1
  let wieghtRangeMin: number = -1

</script>

<div
  class="border-neutral rounded-lg b-2 w-full max-w-xl p-10 shadow-2xl relative h-min"
>
  {#if currentNeuron}
    <div class="text-2xl">
      Neuron
      <div class="badge badge-lg text-xl badge-neutral">
        {currentNeuron.idx + 1}:{currentNeuron.idy + 1}
      </div>
    </div>

    <label class="form-control">
      <div class="label grid grid-cols-[1fr_auto_1fr]">
        <span class="label-text">Bias</span>
        <span class="label-text-alt"
          >Value = {hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy]
            .bias}</span
        >
        <span class="label-text-alt justify-self-end">
          <input type="text" placeholder="Type here" class=" text-center badge badge-neutral badge-lg w-[3.5rem]" bind:value={biasRangeMin} />
          to
          <input type="text" placeholder="Type here" class=" text-center badge badge-neutral badge-lg w-[3.5rem]" bind:value={biasRangeMax} />
        </span>
      </div>
      <input
        type="range"
        min={biasRangeMin}
        max={biasRangeMax}
        step="0.01"
        class="range range-lg w-full"
        bind:value={hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy]
          .bias}
      />
    </label>
  {:else}
    <h1 class="text-2xl">Select a Neuron</h1>
    <label class="form-control opacity-50">
      <div class="label grid grid-cols-[1fr_auto_1fr]">
        <span class="label-text">Bias</span>
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

  <div class="divider"></div>
  <div class="max-h-300px overflow-y-auto">
    {#if currentNeuron}
      {#each hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy].weights as _, i}
        <label class="form-control">
          <div class="label grid grid-cols-[1fr_auto_1fr]">
            <span class="label-text">Weight {i + 1}</span>
            <span class="label-text-alt"
              >Value = {hidOutLayers[currentNeuron.idx].neurons[
                currentNeuron.idy
              ].weights[i]}</span
            >
            <span class="label-text-alt justify-self-end">
              <input type="text" placeholder="Type here" class=" text-center badge badge-neutral badge-lg w-[3rem]" bind:value={wieghtRangeMin} />
              to
              <input type="text" placeholder="Type here" class=" text-center badge badge-neutral badge-lg w-[3rem]" bind:value={wieghtRangeMax} />
            </span>
          </div>
          <input
            type="range"
            min={wieghtRangeMin}
            max={wieghtRangeMax}
            step="0.01"
            class="range range-lg w-full"
            bind:value={hidOutLayers[currentNeuron.idx].neurons[
              currentNeuron.idy
            ].weights[i]}
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
