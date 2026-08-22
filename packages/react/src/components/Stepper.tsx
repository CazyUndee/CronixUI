import * as React from 'react';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
  ...props
}) => {
  return (
    <div className={`cn-stepper ${className}`.trim()} role="list" aria-label="Progress" {...props}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`cn-stepper-step ${
            index < currentStep ? 'completed' :
            index === currentStep ? 'active' : 'pending'
          }`}
          role="listitem"
          aria-current={index === currentStep ? 'step' : undefined}
          onClick={() => onStepClick?.(index)}
          onKeyDown={(e) => {
            if (onStepClick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onStepClick(index);
            }
          }}
          tabIndex={onStepClick ? 0 : undefined}
        >
          <div className="cn-stepper-indicator">
            <span className="cn-stepper-number">
              {index < currentStep ? '✓' : index + 1}
            </span>
          </div>
          <div className="cn-stepper-content">
            <div className="cn-stepper-label">{step.label}</div>
            {step.description && (
              <div className="cn-stepper-description">{step.description}</div>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`cn-stepper-connector ${index < currentStep ? 'completed' : ''}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};

Stepper.displayName = 'Stepper';
export default Stepper;
