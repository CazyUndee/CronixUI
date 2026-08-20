import { mergeProps, For, createSignal } from 'solid-js';

export function Stepper(props) {
  const merged = mergeProps({ steps: [], currentStep: 0, onStepClick: () => {} }, props);

  return (
    <div class="cn-stepper">
      <For each={merged.steps}>
        {(step, index) => (
          <div
            class="cn-stepper-step"
            classList={{
              completed: index() < merged.currentStep,
              active: index() === merged.currentStep,
              pending: index() > merged.currentStep,
            }}
            style={{ cursor: merged.onStepClick ? 'pointer' : 'default' }}
            onClick={() => merged.onStepClick(index())}
          >
            <div class="cn-stepper-indicator">
              <span class="cn-stepper-number">
                {index() < merged.currentStep ? '✓' : index() + 1}
              </span>
            </div>
            <div class="cn-stepper-content">
              <div class="cn-stepper-label">{step.label}</div>
              {step.description && (
                <div class="cn-stepper-description">{step.description}</div>
              )}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
