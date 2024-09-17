import { writable } from 'svelte/store'
import { cNeuron, Layer } from './NN_classes';

export let currentNeuron_store = writable<cNeuron | null>(null);
export let hidOutLayers_store = writable<Layer[]>([]);