import { writable } from 'svelte/store'
import { cNeuron, Layer } from './NN_classes';

export let currentNeuron = writable<cNeuron | null>(null);
export let hidOutLayers = writable<Layer[]>([]);