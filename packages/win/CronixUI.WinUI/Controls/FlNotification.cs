using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    public class FlNotification : ContentControl
    {
        public static readonly DependencyProperty MessageProperty =
            DependencyProperty.Register(nameof(Message), typeof(string), typeof(FlNotification), new PropertyMetadata(""));

        public static readonly DependencyProperty VariantProperty =
            DependencyProperty.Register(nameof(Variant), typeof(string), typeof(FlNotification), new PropertyMetadata("info"));

        public string Message
        {
            get => (string)GetValue(MessageProperty);
            set => SetValue(MessageProperty, value);
        }

        public string Variant
        {
            get => (string)GetValue(VariantProperty);
            set => SetValue(VariantProperty, value);
        }

        public FlNotification() { DefaultStyleKey = typeof(FlNotification); }
    }
}
