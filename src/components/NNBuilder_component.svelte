<script lang="ts">
  // Things to DO!
  // - Make the graph animate on X axis changes
  // - Improve the NN function's algo
  // - Fix when changing a before Layer Length, the neurons weights of next Layers are not Updated
  
  import NN_parameters from './NN_parameters.svelte'
  import NN_layers from './NN_layers.svelte';
  import NN_specs from './NN_specs.svelte';
  import NN_IOgraph from './NN_IOgraph.svelte';
</script>

<main class="w-full grid place-items-center *:sm:px-10 *:px-5 py-10">
  <section
    class="w-full flex gap-20 xl:flex-row flex-col-reverse justify-between items-center"
  >
    <NN_parameters/>
    <NN_IOgraph />
  </section>
  <section class=" grid place-items-center w-full mt-10">
    <div class="my-2 flex items-center justify-between gap-10">
      <h1 class="text-3xl">Neural Network</h1>
    </div>

    <div class="w-full max-w-[1530px]">
      <NN_specs />
      <NN_layers />
    </div>
  </section>
</main>
