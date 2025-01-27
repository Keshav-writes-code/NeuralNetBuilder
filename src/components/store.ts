import { writable } from "svelte/store";
import { cNeuron, Layer, af_enum } from "./NN_comps/NN_classes";
import { getPreference } from "../lib/db/localStorage";
export let currentNeuron_store = writable<cNeuron | null>(null);
export let hidOutLayers_store = writable<Layer[]>([]);
export let hiddenLayersCount_store = writable<number>(1);
export let hiddenLayersNeuronCount_store = writable<number[]>([1]);
export let selActivaFn_store = writable<af_enum>(
  getPreference<af_enum>("activation_function") || af_enum.relu
);
export let randomisedVals_store = writable(false);

