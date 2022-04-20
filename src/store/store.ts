import { writable } from 'svelte/store';
import { postsPerPage as pPP } from '$dictionary/config';

export const currentPage = writable('');
export const user = writable('');
export const postsPerPage = writable(pPP);
