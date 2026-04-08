<script>
	export let brand = '';
	export let sticky = true;
</script>

<header
	class="cn-header"
	class:cn-header-sticky={sticky}
>
	{#if brand}
		<a href="/" class="cn-header-brand">{brand}</a>
	{/if}
	{#if $$slots.nav}
		<nav class="cn-header-nav">
			<slot name="nav" />
		</nav>
	{/if}
	{#if $$slots.actions}
		<div class="cn-header-actions">
			<slot name="actions" />
		</div>
	{/if}
</header>

<style>
	.cn-header {
		height: 56px;
		background: #111111;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		padding: 0 24px;
		z-index: 200;
	}

	.cn-header-sticky {
		position: sticky;
		top: 0;
	}

	.cn-header-brand {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: 'Outfit', sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: #f0ede8;
		text-decoration: none;
	}

	.cn-header-brand:hover {
		color: #f0ede8;
	}

	.cn-header-nav {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: 32px;
	}

	.cn-header-actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>
