import { writable } from 'svelte/store';

export const state = writable(new Array(30*8).fill(false));