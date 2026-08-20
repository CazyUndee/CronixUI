<script>
  export let accept = '';
  export let multiple = false;
  export let onFiles = () => {};

  let isDragging = false;
  let inputEl;

  function handleDrop(e) {
    e.preventDefault();
    isDragging = false;
    onFiles(Array.from(e.dataTransfer.files));
  }

  function handleChange(e) {
    onFiles(Array.from(e.target.files));
  }
</script>

<div
  class="cn-fileupload"
  class:cn-fileupload-dragging={isDragging}
  on:dragover|preventDefault={() => { isDragging = true; }}
  on:dragleave={() => { isDragging = false; }}
  on:drop={handleDrop}
  on:click={() => inputEl.click()}
>
  <div class="cn-fileupload-content">
    <div class="cn-fileupload-icon">📁</div>
    <div class="cn-fileupload-text">Drag & drop files here or click to browse</div>
  </div>
  <input bind:this={inputEl} type="file" {accept} {multiple} class="cn-fileupload-input" on:change={handleChange} />
</div>

<style>
  .cn-fileupload { border: 2px dashed #2a2a2a; border-radius: 8px; padding: 32px; text-align: center; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
  .cn-fileupload:hover, .cn-fileupload-dragging { border-color: #6b2323; background: #2a1a1a; }
  .cn-fileupload-content { pointer-events: none; }
  .cn-fileupload-icon { font-size: 32px; margin-bottom: 8px; }
  .cn-fileupload-text { font-size: 13px; color: #888; }
  .cn-fileupload-input { display: none; }
</style>
