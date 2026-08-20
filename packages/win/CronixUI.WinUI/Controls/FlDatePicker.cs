using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    /// <summary>
    /// FlDatePicker - Date selection control.
    /// </summary>
    public class FlDatePicker : Control
    {
        public static readonly DependencyProperty SelectedDateProperty =
            DependencyProperty.Register(nameof(SelectedDate), typeof(string), typeof(FlDatePicker), new PropertyMetadata(""));

        public static readonly DependencyProperty PlaceholderProperty =
            DependencyProperty.Register(nameof(Placeholder), typeof(string), typeof(FlDatePicker), new PropertyMetadata("Select date"));

        public string SelectedDate
        {
            get => (string)GetValue(SelectedDateProperty);
            set => SetValue(SelectedDateProperty, value);
        }

        public string Placeholder
        {
            get => (string)GetValue(PlaceholderProperty);
            set => SetValue(PlaceholderProperty, value);
        }

        public FlDatePicker()
        {
            DefaultStyleKey = typeof(FlDatePicker);
        }
    }
}
