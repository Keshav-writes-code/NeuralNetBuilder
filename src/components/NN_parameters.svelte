<script>
  import { currentNeuron_store, hidOutLayers_store } from "./store.ts";
  let hidOutLayers;

  hidOutLayers_store.subscribe(value => {
    hidOutLayers = value;
  });

  function updateNet(hidOutLayers) {
    hidOutLayers_store.set(hidOutLayers);
  }

  $: updateNet(hidOutLayers);

  let currentNeuron;
  currentNeuron_store.subscribe((value) => {
    currentNeuron = value;
  });
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
      <div class="label">
        <span class="label-text">Bias</span>
        <span class="label-text-alt"
          >Value = {hidOutLayers[currentNeuron.idx].neurons[currentNeuron.idy]
            .bias}</span
        >
        <span class="label-text-alt">-1 to 1</span>
      </div>
      <input
        type="range"
        min="-10"
        max="10"
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
          <div class="label">
            <span class="label-text">Weight {i + 1}</span>
            <span class="label-text-alt"
              >Value = {hidOutLayers[currentNeuron.idx].neurons[
                currentNeuron.idy
              ].weights[i]}</span
            >
            <span class="label-text-alt">-1 to 1</span>
          </div>
          <input
            type="range"
            min="-1"
            max="1"
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
