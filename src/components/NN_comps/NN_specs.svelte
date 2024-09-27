<script lang="ts">
  // Implement Theme CHanger BY
  // Changing the html tag  data-theme attribute on each select menu click

  import { af_enum } from "./NN_classes.ts";
  import {
    hiddenLayersCount_store,
    hiddenLayersNeuronCount_store,
    selActivaFn_store,
  } from "../store.ts";
</script>

<div
  class="w-full rounded-lg grid grid-cols-2 place-items-center gap-8 mb-4 *:flex *:flex-col *:gap-2"
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
              if ($hiddenLayersCount_store > 1) {
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
            bind:value={$hiddenLayersCount_store}
            data-hs-input-number-input=""
          />
          <button
            type="button"
            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800 focus:bg-neutral-800"
            tabindex="-1"
            aria-label="Increase"
            data-hs-input-number-increment=""
            on:click={() => {
              if ($hiddenLayersCount_store < 8) {
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
        {$selActivaFn_store}
        <svg width="12px" height="12px" class="inline-block h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" > <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" ></path> </svg>
      </div>
      <ul
        class="dropdown-content bg-base-300 rounded-box z-[1] p-2 shadow-2xl"
      >
        <li class="flex justify-between items-center" >
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="ReLU"
            value="business"
            on:click={() => {
              selActivaFn_store.set(af_enum.relu)
              document.documentElement.setAttribute('data-theme', 'business')
            }}
          />
          <svg class="h-4 stroke-neutral-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 375 225"  preserveAspectRatio="xMidYMid meet" version="1.0"><path stroke-linecap="round" transform="matrix(0.53033, -0.53033, 0.53033, 0.53033, 126.789326, 194.20462)" fill="inherit" stroke-linejoin="miter" d="M 32.502295 32.499475 L 344.284837 32.499475 " stroke="inherit" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="round" transform="matrix(0.75, -0.000000000000000372, 0.000000000000000372, 0.75, 18.697188, 170.642902)" fill="inherit" stroke-linejoin="miter" d="M 32.497501 32.502174 L 180.257924 32.502174 " stroke="inherit" stroke-width="65" stroke-opacity="1" stroke-miterlimit="4"/></svg>

        </li>
        <li class="flex justify-between items-center">
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Sigmoid"
            value="dark"
            on:click={() => {
              selActivaFn_store.set(af_enum.sigmoid)
              document.documentElement.setAttribute('data-theme', 'dark')

            }}
          />
          <svg class="h-4 w-min stroke-neutral-400 fill-neutral-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" zoomAndPan="magnify" viewBox="0 0 224.87999 149.999998" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="2be8f28244"><path d="M 0 0.0390625 L 224.761719 0.0390625 L 224.761719 149.960938 L 0 149.960938 Z M 0 0.0390625 " clip-rule="nonzero"/></clipPath><clipPath id="9555c5108b"><path d="M 21.4375 128.972656 L 68.664062 128.972656 L 68.664062 149.960938 L 21.4375 149.960938 Z M 21.4375 128.972656 " clip-rule="nonzero"/></clipPath><clipPath id="b6b1be75e8"><path d="M 45.039062 128.972656 C 32.003906 128.972656 21.4375 133.667969 21.4375 139.464844 C 21.4375 145.261719 32.003906 149.960938 45.039062 149.960938 C 58.074219 149.960938 68.640625 145.261719 68.640625 139.464844 C 68.640625 133.667969 58.074219 128.972656 45.039062 128.972656 Z M 45.039062 128.972656 " clip-rule="nonzero"/></clipPath><clipPath id="1659f5393d"><path d="M 44 107 L 54 107 L 54 132 L 44 132 Z M 44 107 " clip-rule="nonzero"/></clipPath><clipPath id="310ee644a9"><path d="M 41.910156 108.125 L 50.695312 107.046875 L 53.609375 130.867188 L 44.824219 131.941406 Z M 41.910156 108.125 " clip-rule="nonzero"/></clipPath><clipPath id="2c451615f8"><path d="M 46.304688 107.585938 L 53.609375 130.867188 L 44.824219 131.941406 Z M 46.304688 107.585938 " clip-rule="nonzero"/></clipPath><clipPath id="235014250d"><path d="M 158.015625 0.0390625 L 205.242188 0.0390625 L 205.242188 21.027344 L 158.015625 21.027344 Z M 158.015625 0.0390625 " clip-rule="nonzero"/></clipPath><clipPath id="dd89e20860"><path d="M 181.617188 0.0390625 C 168.582031 0.0390625 158.015625 4.738281 158.015625 10.535156 C 158.015625 16.332031 168.582031 21.027344 181.617188 21.027344 C 194.652344 21.027344 205.222656 16.332031 205.222656 10.535156 C 205.222656 4.738281 194.652344 0.0390625 181.617188 0.0390625 Z M 181.617188 0.0390625 " clip-rule="nonzero"/></clipPath><clipPath id="45a1be63d1"><path d="M 92 64 L 114 64 L 114 76 L 92 76 Z M 92 64 " clip-rule="nonzero"/></clipPath><clipPath id="af6670f4bc"><path d="M 114.488281 72.8125 L 112.292969 77.820312 L 92.214844 69.03125 L 94.40625 64.019531 Z M 114.488281 72.8125 " clip-rule="nonzero"/></clipPath><clipPath id="65ac6f4c8f"><path d="M 113.390625 75.316406 L 92.214844 69.03125 L 94.410156 64.023438 Z M 113.390625 75.316406 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#2be8f28244)"><path stroke-linecap="butt" transform="matrix(0.562829, -0.495099, 0.495099, 0.562829, 32.55966, 120.158884)" fill="none" stroke-linejoin="miter" d="M 12.3082 25.147326 C 48.142817 42.684804 83.973623 42.687522 119.804061 25.151569 " stroke="inherit" stroke-width="56" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(-0.7496, 0, 0, -0.7496, 46.592321, 149.959991)" fill="none" stroke-linejoin="miter" d="M -0.00190677 27.998048 C 20.717479 27.998048 41.436864 27.998048 62.15625 27.998048 " stroke="inherit" stroke-width="56" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(-0.578717, 0.476431, -0.476431, -0.578717, 196.786585, 30.35589)" fill="none" stroke-linejoin="miter" d="M 11.455337 25.549997 C 49.213446 42.473322 86.975161 42.47776 124.735749 25.552664 " stroke="inherit" stroke-width="56" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(-0.7496, 0, 0, -0.7496, 249.268976, 42.0176)" fill="none" stroke-linejoin="miter" d="M -0.000740565 28.001946 C 31.693249 28.001946 63.387238 28.001946 95.086439 28.001946 " stroke="inherit" stroke-width="56" stroke-opacity="1" stroke-miterlimit="4"/></g><g clip-path="url(#9555c5108b)"><g clip-path="url(#b6b1be75e8)"><path fill="inherit" d="M 21.4375 128.972656 L 68.664062 128.972656 L 68.664062 149.960938 L 21.4375 149.960938 Z M 21.4375 128.972656 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#1659f5393d)"><g clip-path="url(#310ee644a9)"><g clip-path="url(#2c451615f8)"><path fill="inherit" d="M 41.910156 108.125 L 50.695312 107.046875 L 53.609375 130.867188 L 44.824219 131.941406 Z M 41.910156 108.125 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#235014250d)"><g clip-path="url(#dd89e20860)"><path fill="inherit" d="M 158.015625 0.0390625 L 205.242188 0.0390625 L 205.242188 21.027344 L 158.015625 21.027344 Z M 158.015625 0.0390625 " fill-opacity="1" fill-rule="nonzero"/></g></g><g clip-path="url(#45a1be63d1)"><g clip-path="url(#af6670f4bc)"><g clip-path="url(#65ac6f4c8f)"><path fill="inherit" d="M 114.488281 72.8125 L 112.292969 77.820312 L 92.214844 69.03125 L 94.40625 64.019531 Z M 114.488281 72.8125 " fill-opacity="1" fill-rule="nonzero"/></g></g></g></svg>

        </li>
        <li class="flex justify-between items-center">
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="TanH"
            value="sunset"
            on:click={() => {
              selActivaFn_store.set(af_enum.tanh)
              document.documentElement.setAttribute('data-theme', 'forest')
            }}
          />
          <svg class="h-4 w-min stroke-neutral-400 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" zoomAndPan="magnify" viewBox="0 0 224.87999 149.999998" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="d53bd3bca6"><path d="M 0 0.0390625 L 224.761719 0.0390625 L 224.761719 149.960938 L 0 149.960938 Z M 0 0.0390625 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#d53bd3bca6)"><path stroke-linecap="butt" transform="matrix(0.7496, 0, 0, 0.7496, -0.447522, -0.116629)" fill="none" stroke-linejoin="miter" d="M 298.80817 22.000574 L 224.106864 22.000574 C 182.850482 22.000574 149.405559 55.445497 149.405559 96.701879 L 149.405559 103.121971 C 149.405559 144.378353 115.955424 177.823276 74.699042 177.823276 L -0.00226309 177.823276 " stroke="inherit" stroke-width="44" stroke-opacity="1" stroke-miterlimit="4"/></g></svg>
          
        </li>
        <li class="flex justify-between items-center">
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Binary"
            value="sunset"
            on:click={() => {
              selActivaFn_store.set(af_enum.binary)
              document.documentElement.setAttribute('data-theme', 'black')  
            }}
          />
          <svg class="h-4 w-min stroke-neutral-400 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" zoomAndPan="magnify" viewBox="0 0 224.87999 149.999998" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="bdae80a56a"><path d="M 0 0.0390625 L 224.761719 0.0390625 L 224.761719 149.960938 L 0 149.960938 Z M 0 0.0390625 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#bdae80a56a)"><path stroke-linecap="butt" transform="matrix(0.7496, 0, 0, 0.7496, 0, -1.459196)" fill="none" stroke-linejoin="miter" d="M 299.998567 21.998996 L 150.001889 21.998996 L 150.001889 182.001011 L 0 182.001011 " stroke="inherit" stroke-width="44" stroke-opacity="1" stroke-miterlimit="4"/></g></svg>
        </li>
      </ul>
    </div>
  </div>
</div>

