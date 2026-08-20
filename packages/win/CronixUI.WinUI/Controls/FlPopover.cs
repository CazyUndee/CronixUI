using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;
{
    /// <summary>
    /// FlPopover - Floating content box.
    /// </summary>
    public class FlPopover : ContentControl
    {
        public static readonly DependencyProperty IsOpenProperty =
            DependencyProperty.Register(nameof(IsOpen), typeof(bool), typeof(FlPopover), new PropertyMetadata(false));

        public static readonly DependencyProperty PlacementProperty =
            DependencyProperty.Register(nameof(Placement), typeof(string), typeof(FlPopover), new PropertyMetadata("Bottom"));

        public bool IsOpen
        {
            get => (bool)GetValue(IsOpenProperty);
            set => SetValue(IsOpenProperty, value);
        }

        public string Placement
        {
            get => (string)GetValue(PlacementProperty);
            set => SetValue(PlacementProperty, value);
        }

        public FlPopover()
        {
            DefaultStyleKey = typeof(FlPopover);
        }

        public void Show() => IsOpen = true;
        public void Hide() => IsOpen = false;
        public void Toggle() => IsOpen = !IsOpen;
    }
}
