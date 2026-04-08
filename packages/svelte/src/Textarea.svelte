<script>
  export let placeholder = '';
  export let size = 'md';
  export let error = false;
  export let disabled = false;
  export let value = '';
</script>

<textarea
  class="cn-input cn-textarea"
  class:cn-input-sm={size === 'sm'}
  class:cn-input-lg={size === 'lg'}
  class:cn-input-error={error}
  {placeholder}
  {disabled}
  bind:value
  on:input
  on:focus
  on:blur
/>

<style>
  .cn-textarea {
    min-height: 100px;
    resize: vertical;
  }
</style>
