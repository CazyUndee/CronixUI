using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    public class FlFileUpload : Control
    {
        public static readonly DependencyProperty AcceptProperty =
            DependencyProperty.Register(nameof(Accept), typeof(string), typeof(FlFileUpload), new PropertyMetadata(""));

        public static readonly DependencyProperty MultipleProperty =
            DependencyProperty.Register(nameof(Multiple), typeof(bool), typeof(FlFileUpload), new PropertyMetadata(false));

        public string Accept
        {
            get => (string)GetValue(AcceptProperty);
            set => SetValue(AcceptProperty, value);
        }

        public bool Multiple
        {
            get => (bool)GetValue(MultipleProperty);
            set => SetValue(MultipleProperty, value);
        }

        public FlFileUpload() { DefaultStyleKey = typeof(FlFileUpload); }
    }
}
