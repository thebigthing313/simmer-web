export const combineRefs = (...refs: ((el: HTMLElement | null) => void)[]) => (el: HTMLElement | null) => {
	refs.forEach(ref => ref(el));
};