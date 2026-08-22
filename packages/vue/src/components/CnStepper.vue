<template>
  <div class="cn-stepper" role="list" aria-label="Progress">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="cn-stepper-step"
      :class="{
        completed: index < currentStep,
        active: index === currentStep,
        pending: index > currentStep,
      }"
      role="listitem"
      :aria-current="index === currentStep ? 'step' : undefined"
      :style="{ cursor: onStepClick ? 'pointer' : 'default' }"
      :tabindex="onStepClick ? 0 : undefined"
      @click="onStepClick && onStepClick(index)"
      @keydown.enter="onStepClick && onStepClick(index)"
      @keydown.space.prevent="onStepClick && onStepClick(index)"
    >
      <div class="cn-stepper-indicator">
        <span class="cn-stepper-number">
          {{ index < currentStep ? '✓' : index + 1 }}
        </span>
      </div>
      <div class="cn-stepper-content">
        <div class="cn-stepper-label">{{ step.label }}</div>
        <div v-if="step.description" class="cn-stepper-description">{{ step.description }}</div>
      </div>
      <div
        v-if="index < steps.length - 1"
        class="cn-stepper-connector"
        :class="{ completed: index < currentStep }"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, default: () => [] },
  currentStep: { type: Number, default: 0 },
  onStepClick: { type: Function, default: null },
});
</script>

<style scoped>
.cn-stepper { display: flex; align-items: flex-start; }
.cn-stepper-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; outline: none; }
.cn-stepper-step:focus-visible { box-shadow: inset 0 0 0 2px #6b2323; border-radius: 8px; }
.cn-stepper-indicator { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; border: 2px solid #2a2a2a; color: #888; background: transparent; z-index: 1; }
.cn-stepper-step.completed .cn-stepper-indicator { background: #6b2323; border-color: #6b2323; color: #fff; }
.cn-stepper-step.active .cn-stepper-indicator { background: #8b3a3a; border-color: #8b3a3a; color: #fff; }
.cn-stepper-content { text-align: center; margin-top: 8px; }
.cn-stepper-label { font-size: 14px; color: #ccc; }
.cn-stepper-step.active .cn-stepper-label { color: #fff; font-weight: 600; }
.cn-stepper-description { font-size: 12px; color: #666; margin-top: 2px; }
.cn-stepper-connector { position: absolute; top: 18px; left: 50%; width: 100%; height: 2px; background: #2a2a2a; z-index: 0; }
.cn-stepper-connector.completed { background: #6b2323; }
</style>
