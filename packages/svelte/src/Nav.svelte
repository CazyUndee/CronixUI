<script>
	import { createEventDispatcher } from 'svelte';

	export let items = [];
	export let activeIndex = 0;

	const dispatch = createEventDispatcher();

	function handleClick(index) {
		dispatch('change', { index, item: items[index] });
	}

	function getLabel(item) {
		return typeof item === 'string' ? item : item.label;
	}

	function getHref(item) {
		return typeof item === 'string' ? null : item.href;
	}
</script>

<nav class="cn-nav">
	{#each items as item, index}
		{#if getHref(item)}
			<a
				href={getHref(item)}
				class="cn-nav-item"
				class:cn-nav-active={index === activeIndex}
				on:click={() => handleClick(index)}
			>
				{getLabel(item)}
			</a>
		{:else}
			<button
				class="cn-nav-item"
				class:cn-nav-active={index === activeIndex}
				on:click={() => handleClick(index)}
			>
				{getLabel(item)}
			</button>
		{/if}
	{/each}
</nav>

<style>
	.cn-nav {
		display: flex;
		gap: 4px;
		background: #111111;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		padding: 4px;
		width: fit-content;
	}

	.cn-nav-item {
		font-family: 'Outfit', sans-serif;
		font-size: 12px;
		font-weight: 500;
		padding: 8px 16px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		background: transparent;
		color: rgba(240, 237, 232, 0.5);
		transition: all 0.15s ease;
		text-decoration: none;
		display: inline-block;
	}

	.cn-nav-item:hover:not(.cn-nav-active) {
		color: #f0ede8;
	}

	.cn-nav-active {
		background: #222222;
		color: #f0ede8;
	}
</style>
