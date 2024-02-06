import { writable } from 'svelte/store';

export const selections = writable(new Array(30*8).fill(false));