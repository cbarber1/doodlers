import { writable } from 'svelte/store';

export const state = writable(new Array(15*5).fill(false));