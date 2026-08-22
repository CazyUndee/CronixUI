<script>
	import { createEventDispatcher } from 'svelte';

	export let tabs = [];
	export let activeIndex = 0;

	const dispatch = createEventDispatcher();

	function selectTab(index) {
		if (index === activeIndex) return;
		activeIndex = index;
		dispatch('change', { activeIndex });
	}

	function handleKeydown(event, index) {
		let nextIndex = index;
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				nextIndex = (index + 1) % normalizedTabs.length;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				nextIndex = (index - 1 + normalizedTabs.length) % normalizedTabs.length;
				break;
			case 'Home':
				event.preventDefault();
				nextIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				nextIndex = normalizedTabs.length - 1;
				break;
			default:
				return;
		}
		selectTab(nextIndex);
	}

	$: normalizedTabs = tabs.map(tab => {
		if (typeof tab === 'string') {
			return { label: tab, content: null };
		}
		return tab;
	});
</script>

<div class="cn-tabs">
	<div class="cn-tabs-list" role="tablist">
		{#each normalizedTabs as tab, index}
			<button
				type="button"
				class="cn-tab"
				class:cn-tab-active={index === activeIndex}
				on:click={() => selectTab(index)}
				on:keydown={(e) => handleKeydown(e, index)}
				role="tab"
				aria-selected={index === activeIndex}
				aria-controls="cn-tabpanel-{index}"
				id="cn-tab-{index}"
				tabindex={index === activeIndex ? 0 : -1}
			>
				{tab.label}
			</button>
		{/each}
	</div>
</div>

<div class="cn-tab-content">
	{#each normalizedTabs as tab, index}
		<div
			class="cn-tab-panel"
			class:cn-tab-panel-active={index === activeIndex}
			role="tabpanel"
			id="cn-tabpanel-{index}"
			aria-labelledby="cn-tab-{index}"
			hidden={index !== activeIndex}
			tabindex={index === activeIndex ? 0 : -1}
		>
			{#if tab.content}
				{tab.content}
			{:else}
				<slot />
			{/if}
		</div>
	{/each}
</div>

<style>
	.cn-tabs {
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.cn-tabs-list {
		display: flex;
		gap: 4px;
	}

	.cn-tab {
		font-family: 'Outfit', sans-serif;
		font-size: 13px;
		font-weight: 500;
		padding: 12px 16px;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		background: transparent;
		color: rgba(240, 237, 232, 0.5);
		transition: all 0.15s ease;
		margin-bottom: -1px;
		outline: none;
	}

	.cn-tab:focus-visible {
		box-shadow: inset 0 0 0 2px #6b2323;
		border-radius: 4px 4px 0 0;
	}

	.cn-tab:hover {
		color: #f0ede8;
	}

	.cn-tab-active {
		color: #c97a7a;
		border-bottom-color: #6b2323;
	}

	.cn-tab-content {
		padding: 16px 0;
	}

	.cn-tab-panel {
		display: none;
	}

	.cn-tab-panel-active {
		display: block;
	}
</style>
