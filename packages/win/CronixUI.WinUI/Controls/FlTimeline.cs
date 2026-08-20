using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    /// <summary>
    /// FlTimeline - Event timeline display.
    /// </summary>
    public class FlTimeline : Control
    {
        public static readonly DependencyProperty ItemsProperty =
            DependencyProperty.Register(nameof(Items), typeof(string), typeof(FlTimeline), new PropertyMetadata(""));

        public string Items
        {
            get => (string)GetValue(ItemsProperty);
            set => SetValue(ItemsProperty, value);
        }

        public FlTimeline()
        {
            DefaultStyleKey = typeof(FlTimeline);
        }
    }
}
