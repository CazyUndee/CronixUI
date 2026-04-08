<script>
	export let items = [];
	export let separator = '/';
</script>

<nav class="cn-breadcrumb">
	{#each items as item, i}
		{#if i > 0}
			<span class="cn-breadcrumb-separator">{separator}</span>
		{/if}
		{#if i === items.length - 1}
			<span class="cn-breadcrumb-current">{item.label}</span>
		{:else}
			<a href={item.href} class="cn-breadcrumb-item">{item.label}</a>
		{/if}
	{/each}
</nav>

<style>
	.cn-breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
	}
	.cn-breadcrumb-item {
		color: rgba(240, 237, 232, 0.5);
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.cn-breadcrumb-item:hover {
		color: #f0ede8;
	}
	.cn-breadcrumb-separator {
		color: rgba(240, 237, 232, 0.25);
	}
	.cn-breadcrumb-current {
		color: #f0ede8;
	}
</style>
