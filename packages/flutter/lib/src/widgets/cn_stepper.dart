import 'package:flutter/material.dart';

class CnStepperStep {
  final String label;
  final String? description;

  const CnStepperStep({required this.label, this.description});
}

class CnStepper extends StatelessWidget {
  final List<CnStepperStep> steps;
  final int currentStep;
  final ValueChanged<int>? onStepTap;

  const CnStepper({
    super.key,
    required this.steps,
    this.currentStep = 0,
    this.onStepTap,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(steps.length, (index) {
        final step = steps[index];
        final isCompleted = index < currentStep;
        final isActive = index == currentStep;
        return Expanded(
          child: GestureDetector(
            onTap: onStepTap != null ? () => onStepTap!(index) : null,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isCompleted
                        ? const Color(0xFF6B2323)
                        : isActive
                            ? const Color(0xFF8B3A3A)
                            : Colors.transparent,
                    border: Border.all(
                      color: isCompleted
                          ? const Color(0xFF6B2323)
                          : isActive
                              ? const Color(0xFF8B3A3A)
                              : Colors.grey,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      isCompleted ? '✓' : '${index + 1}',
                      style: TextStyle(
                        color: isCompleted || isActive ? Colors.white : Colors.grey,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  step.label,
                  style: TextStyle(
                    fontSize: 12,
                    color: isActive ? Colors.white : Colors.grey,
                    fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                  ),
                  textAlign: TextAlign.center,
                ),
                if (step.description != null)
                  Text(
                    step.description!,
                    style: const TextStyle(fontSize: 10, color: Colors.grey),
                    textAlign: TextAlign.center,
                  ),
              ],
            ),
          ),
        );
      }),
    );
  }
}
