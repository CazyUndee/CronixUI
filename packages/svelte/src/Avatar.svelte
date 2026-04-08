<script>
	export let initials = '';
	export let src = '';
	export let size = 'md';

	$: classes = [
		'cn-avatar',
		size !== 'md' && `cn-avatar-${size}`
	].filter(Boolean).join(' ');
</script>

<div class={classes}>
	{#if src}
		<img {src} alt={initials} />
	{:else}
		{initials}
	{/if}
</div>

<style>
	.cn-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #6b2323;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 600;
		color: #f0ede8;
		overflow: hidden;
	}

	.cn-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cn-avatar-sm {
		width: 32px;
		height: 32px;
		font-size: 11px;
	}

	.cn-avatar-lg {
		width: 48px;
		height: 48px;
		font-size: 13px;
	}

	.cn-avatar-xl {
		width: 64px;
		height: 64px;
		font-size: 16px;
	}
</style>
