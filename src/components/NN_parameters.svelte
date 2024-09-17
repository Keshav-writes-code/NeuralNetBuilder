<script>
  import {currentNeuron, hidOutLayers} from './store.ts'
  let localhidOutLayers

  hidOutLayers.subscribe(value => {
    localhidOutLayers = value
  })

  function updateNet(localhidOutLayers){
    hidOutLayers.set(localhidOutLayers)
  }

  $ : updateNet(localhidOutLayers)
  
  let localcurrentNeuron
  currentNeuron.subscribe(value => {
    localcurrentNeuron = value
  })
</script>

<div class="border-neutral rounded-lg  b-2 w-full max-w-xl p-10 shadow-2xl relative h-min">
    {#if localcurrentNeuron}
      <div class="text-2xl">
        Neuron
        <div class="badge badge-lg text-xl badge-neutral">
          {localcurrentNeuron.idx + 1}:{localcurrentNeuron.idy + 1}
        </div>
      </div>

      <label class="form-control ">
        <div class="label">
          <span class="label-text">Bias</span>
          <span class="label-text-alt"
            >Value = {localhidOutLayers[localcurrentNeuron.idx].neurons[
              localcurrentNeuron.idy
            ].bias}</span
          >
          <span class="label-text-alt">-1 to 1</span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.01"
          class="range range-lg w-full"
          bind:value={localhidOutLayers[localcurrentNeuron.idx].neurons[
            localcurrentNeuron.idy
          ].bias}
        />
      </label>
    {:else}
      <h1 class="text-2xl">Select a Neuron</h1>
      <label class="form-control opacity-50">
        <div class="label grid grid-cols-[1fr_auto_1fr] ">
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
        {#if localcurrentNeuron}
          {#each localhidOutLayers[localcurrentNeuron.idx].neurons[localcurrentNeuron.idy].weights as _, i}
            <label class="form-control">
              <div class="label">
                <span class="label-text">Weight {i + 1}</span>
                <span class="label-text-alt"
                  >Value = {localhidOutLayers[localcurrentNeuron.idx].neurons[
                    localcurrentNeuron.idy
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
                bind:value={localhidOutLayers[localcurrentNeuron.idx].neurons[
                  localcurrentNeuron.idy
                ].weights[i]}
              />
            </label>
          {/each}
        {:else}
          <label class="form-control opacity-50">
            <div class="label grid grid-cols-[1fr_auto_1fr] ">
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