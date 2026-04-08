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

	$: normalizedTabs = tabs.map(tab => {
		if (typeof tab === 'string') {
			return { label: tab, content: null };
		}
		return tab;
	});
</script>

<div class="cn-tabs">
	<div class="cn-tabs-list">
		{#each normalizedTabs as tab, index}
			<button
				type="button"
				class="cn-tab"
				class:cn-tab-active={index === activeIndex}
				on:click={() => selectTab(index)}
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
