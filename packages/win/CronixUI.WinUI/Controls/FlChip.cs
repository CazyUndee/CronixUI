using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    /// <summary>
    /// FlChip - Selectable/removable tag.
    /// </summary>
    public class FlChip : Button
    {
        public static readonly DependencyProperty ChipTextProperty =
            DependencyProperty.Register(nameof(ChipText), typeof(string), typeof(FlChip), new PropertyMetadata(""));

        public static readonly DependencyProperty IsSelectedProperty =
            DependencyProperty.Register(nameof(IsSelected), typeof(bool), typeof(FlChip), new PropertyMetadata(false));

        public static readonly DependencyProperty RemovableProperty =
            DependencyProperty.Register(nameof(Removable), typeof(bool), typeof(FlChip), new PropertyMetadata(false));

        public string ChipText
        {
            get => (string)GetValue(ChipTextProperty);
            set => SetValue(ChipTextProperty, value);
        }

        public bool IsSelected
        {
            get => (bool)GetValue(IsSelectedProperty);
            set => SetValue(IsSelectedProperty, value);
        }

        public bool Removable
        {
            get => (bool)GetValue(RemovableProperty);
            set => SetValue(RemovableProperty, value);
        }

        public FlChip()
        {
            DefaultStyleKey = typeof(FlChip);
        }
    }
}
