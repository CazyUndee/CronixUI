using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;
{
    /// <summary>
    /// FlStepper - Step indicator control.
    /// </summary>
    public class FlStepper : Control
    {
        public static readonly DependencyProperty StepsProperty =
            DependencyProperty.Register(nameof(Steps), typeof(string), typeof(FlStepper), new PropertyMetadata("Step 1,Step 2,Step 3"));

        public static readonly DependencyProperty CurrentStepProperty =
            DependencyProperty.Register(nameof(CurrentStep), typeof(int), typeof(FlStepper), new PropertyMetadata(0));

        public string Steps
        {
            get => (string)GetValue(StepsProperty);
            set => SetValue(StepsProperty, value);
        }

        public int CurrentStep
        {
            get => (int)GetValue(CurrentStepProperty);
            set => SetValue(CurrentStepProperty, value);
        }

        public FlStepper()
        {
            DefaultStyleKey = typeof(FlStepper);
        }
    }
}
