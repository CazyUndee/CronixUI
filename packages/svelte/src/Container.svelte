<script>
  export let size = 'md';

  $: sizeClass = size !== 'lg' ? `cn-container-${size}` : '';
</script>

<div class="cn-container {sizeClass}">
  <slot />
</div>

<style>
  .cn-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .cn-container-sm {
    max-width: 640px;
  }
  .cn-container-md {
    max-width: 900px;
  }
  .cn-container-xl {
    max-width: 1400px;
  }
  .cn-container-fluid {
    max-width: 100%;
  }
</style>
