using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    /// <summary>
    /// FlColorPicker - Color selection control.
    /// </summary>
    public class FlColorPicker : Control
    {
        public static readonly DependencyProperty SelectedColorProperty =
            DependencyProperty.Register(nameof(SelectedColor), typeof(string), typeof(FlColorPicker), new PropertyMetadata("#6B2323"));

        public static readonly DependencyProperty PresetsProperty =
            DependencyProperty.Register(nameof(Presets), typeof(string), typeof(FlColorPicker), new PropertyMetadata("#6B2323,#8B3A3A,#C97A7A,#1A1A1A,#2A2A2A"));

        public string SelectedColor
        {
            get => (string)GetValue(SelectedColorProperty);
            set => SetValue(SelectedColorProperty, value);
        }

        public string Presets
        {
            get => (string)GetValue(PresetsProperty);
            set => SetValue(PresetsProperty, value);
        }

        public FlColorPicker()
        {
            DefaultStyleKey = typeof(FlColorPicker);
        }
    }
}
