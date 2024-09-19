<script lang="ts">
  import { cNeuron, af_enum } from "./NN_classes.ts";
  import {
    hiddenLayersCount_store,
    hiddenLayersNeuronCount_store,
    currentNeuron_store,
    selActivaFn_store,
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

  let selActivaFn: af_enum;
  selActivaFn_store.subscribe((value) => {
    selActivaFn = value;
  })
</script>

<div
  class="w-full  rounded-lg grid grid-cols-2 place-items-center gap-8 mb-4 *:flex *:flex-col *:gap-2"
>
  <div class=" rounded-lg max-w-[350px] justify-self-end ">
    <p class="text-gray-400 text-sm" > Hidden layers </p>
    <div class="relative1 max-w-xs text-gray-300">
      <div
        class="py-2 px-3 inline-block border rounded-lg bg-neutral-900 border-neutral-700"
        data-hs-input-number=""
      >
        <div class="touch-manipulation flex items-center gap-x-1.5">
          <button
            type="button"
            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
            tabindex="-1"
            aria-label="Decrease"
            data-hs-input-number-decrement=""
            on:click={() => {
              if (hiddenLayersCount > 1) {
                hiddenLayersCount_store.update(val => val - 1);
                hiddenLayersNeuronCount_store.update(val => val.slice(0, -1));
              }
            }}
          >
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14"></path> </svg>
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
            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
            tabindex="-1"
            aria-label="Increase"
            data-hs-input-number-increment=""
            on:click={() => {
              if (hiddenLayersCount < 8) {
                hiddenLayersCount_store.update(val => val + 1);
                hiddenLayersNeuronCount_store.update(val => [...val, 1]);
              }
            }}
          >
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14"></path> <path d="M12 5v14"></path> </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class=" justify-self-start ">
    <p class="text-gray-400 text-sm"> Activation Function </p>
    <div class="dropdown ">
      <div tabindex="0" role="button" class="btn m-1">
        {selActivaFn}
        <svg width="12px" height="12px" class="inline-block h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" > <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" ></path> </svg>
      </div>
      <ul
        class="dropdown-content bg-base-300 rounded-box z-[1] min-w-52 p-2  shadow-2xl"
      >
        <li class="flex items-center" >
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="ReLU"
            value="business"
            on:click={() => (selActivaFn_store.set(af_enum.relu))}
          />
          <svg class="h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 375 225"  preserveAspectRatio="xMidYMid meet" version="1.0"><path stroke-linecap="round" transform="matrix(0.53033, -0.53033, 0.53033, 0.53033, 126.789326, 194.20462)" fill="none" stroke-linejoin="miter" d="M 32.502295 32.499475 L 344.284837 32.499475 " stroke="#999" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="round" transform="matrix(0.75, -0.000000000000000372, 0.000000000000000372, 0.75, 18.697188, 170.642902)" fill="none" stroke-linejoin="miter" d="M 32.497501 32.502174 L 180.257924 32.502174 " stroke="#999" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/></svg>

        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Sigmoid"
            value="dark"
            on:click={() => (selActivaFn_store.set(af_enum.sigmoid))}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="TanH"
            value="sunset"
            on:click={() => (selActivaFn_store.set(af_enum.tanh))}
          />
        </li>
        
      </ul>
    </div>
  </div>
</div>

