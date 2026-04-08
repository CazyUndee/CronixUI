<script>
	export let variant = 'text';
	export let width = '';
	
	$: classes = ['cn-skeleton', `cn-skeleton-${variant}`]
		.filter(Boolean)
		.join(' ');
	
	$: style = width ? `width: ${width}` : '';
</script>

<div class={classes} {style}></div>

<style>
	.cn-skeleton {
		background: linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%);
		background-size: 200% 100%;
		animation: cn-skeleton 1.5s infinite;
		border-radius: 6px;
	}

	@keyframes cn-skeleton {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.cn-skeleton-text {
		height: 14px;
		margin-bottom: 8px;
	}

	.cn-skeleton-title {
		height: 20px;
		width: 60%;
		margin-bottom: 12px;
	}

	.cn-skeleton-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
</style>
