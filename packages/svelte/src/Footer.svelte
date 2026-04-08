<script>
	export let copyright = '';
	export let links = [];
</script>

<footer class="cn-footer">
	<div class="cn-footer-content">
		<span class="cn-footer-copyright">{copyright}</span>
		<div class="cn-footer-links">
			{#each links as link}
				<a href={link.href} class="cn-footer-link">{link.label}</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.cn-footer {
		background: #111111;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding: 24px;
		margin-top: auto;
	}
	.cn-footer-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cn-footer-links {
		display: flex;
		gap: 24px;
	}
	.cn-footer-link {
		font-size: 12px;
		color: rgba(240, 237, 232, 0.5);
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.cn-footer-link:hover {
		color: #f0ede8;
	}
	.cn-footer-copyright {
		font-size: 12px;
		color: rgba(240, 237, 232, 0.25);
	}
</style>
