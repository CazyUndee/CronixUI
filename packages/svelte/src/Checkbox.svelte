<script>
  export let checked = false;
  export let disabled = false;
</script>

<label class="cn-checkbox" class:disabled>
  <input type="checkbox" {disabled} bind:checked on:change />
  <span class="cn-checkbox-box"></span>
  <span class="cn-checkbox-label"><slot /></span>
</label>

<style>
  .cn-checkbox { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
  .cn-checkbox input { position: absolute; opacity: 0; width: 0; height: 0; }
  .cn-checkbox-box {
    width: 18px; height: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #111111;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s ease;
  }
  .cn-checkbox:hover .cn-checkbox-box { border-color: rgba(255, 255, 255, 0.15); }
  .cn-checkbox input:checked + .cn-checkbox-box { background: #6b2323; border-color: #6b2323; }
  .cn-checkbox-box::after {
    content: '';
    width: 5px; height: 9px;
    border: solid #f0ede8;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0);
    transition: transform 0.1s ease;
  }
  .cn-checkbox input:checked + .cn-checkbox-box::after { transform: rotate(45deg) scale(1); }
  .cn-checkbox-label { font-size: 13px; color: #f0ede8; }
  .cn-checkbox.disabled { opacity: 0.5; cursor: not-allowed; }
</style>
