import { writable } from 'svelte/store';

export const state = writable(new Array(28*8).fill([false, false]));

