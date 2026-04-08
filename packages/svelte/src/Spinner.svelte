<script>
  export let size = 'md';
</script>

{#if size === 'sm'}
  <div class="cn-spinner cn-spinner-sm"></div>
{:else if size === 'lg'}
  <div class="cn-spinner cn-spinner-lg"></div>
{:else}
  <div class="cn-spinner"></div>
{/if}

<style>
  .cn-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #222222;
    border-top-color: #6b2323;
    border-radius: 50%;
    animation: cn-spin 0.8s linear infinite;
  }

  .cn-spinner-sm {
    width: 16px;
    height: 16px;
  }

  .cn-spinner-lg {
    width: 40px;
    height: 40px;
  }

  @keyframes cn-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
