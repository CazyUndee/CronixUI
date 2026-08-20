<script>
  export let value = '';
  export let minDate = '';
  export let maxDate = '';
  export let disabled = false;
  export let onchange = () => {};
</script>

<div class="cn-datepicker">
  <input
    type="date"
    class="cn-datepicker-input"
    {value}
    min={minDate}
    max={maxDate}
    {disabled}
    on:change={(e) => onchange(e.target.value)}
  />
</div>

<style>
  .cn-datepicker { display: inline-block; }
  .cn-datepicker-input { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 8px 12px; color: #ccc; font-size: 14px; outline: none; transition: border-color 0.15s; }
  .cn-datepicker-input:focus { border-color: #6b2323; }
  .cn-datepicker-input::-webkit-calendar-picker-indicator { filter: invert(0.7); }
</style>
