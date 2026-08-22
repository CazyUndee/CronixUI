<script>
  export let steps = [];
  export let currentStep = 0;
  export let onStepClick = () => {};
</script>

<div class="cn-stepper" role="list" aria-label="Progress">
  {#each steps as step, index}
    <div
      class="cn-stepper-step"
      class:completed={index < currentStep}
      class:active={index === currentStep}
      class:pending={index > currentStep}
      role="listitem"
      aria-current={index === currentStep ? 'step' : undefined}
      on:click={() => onStepClick(index)}
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick(index); } }}
      tabindex={onStepClick ? 0 : undefined}
      style="cursor: {onStepClick ? 'pointer' : 'default'}"
    >
      <div class="cn-stepper-indicator">
        <span class="cn-stepper-number">
          {#if index < currentStep}✓{:else}{index + 1}{/if}
        </span>
      </div>
      <div class="cn-stepper-content">
        <div class="cn-stepper-label">{step.label}</div>
        {#if step.description}
          <div class="cn-stepper-description">{step.description}</div>
        {/if}
      </div>
      {#if index < steps.length - 1}
        <div class="cn-stepper-connector" class:completed={index < currentStep} aria-hidden="true"></div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .cn-stepper { display: flex; align-items: flex-start; gap: 0; }
  .cn-stepper-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
  .cn-stepper-indicator { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; border: 2px solid #2a2a2a; color: #888; background: transparent; z-index: 1; }
  .cn-stepper-step.completed .cn-stepper-indicator { background: #6b2323; border-color: #6b2323; color: #fff; }
  .cn-stepper-step.active .cn-stepper-indicator { background: #8b3a3a; border-color: #8b3a3a; color: #fff; }
  .cn-stepper-content { text-align: center; margin-top: 8px; }
  .cn-stepper-label { font-size: 14px; color: #ccc; }
  .cn-stepper-step.active .cn-stepper-label { color: #fff; font-weight: 600; }
  .cn-stepper-step.completed .cn-stepper-label { color: #6b2323; }
  .cn-stepper-description { font-size: 12px; color: #666; margin-top: 2px; }
  .cn-stepper-connector { position: absolute; top: 18px; left: 50%; width: 100%; height: 2px; background: #2a2a2a; z-index: 0; }
  .cn-stepper-connector.completed { background: #6b2323; }
</style>
