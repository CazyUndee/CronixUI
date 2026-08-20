using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls
{
    public class FlEmptyState : Control
    {
        public static readonly DependencyProperty TitleProperty =
            DependencyProperty.Register(nameof(Title), typeof(string), typeof(FlEmptyState), new PropertyMetadata(""));

        public static readonly DependencyProperty DescriptionProperty =
            DependencyProperty.Register(nameof(Description), typeof(string), typeof(FlEmptyState), new PropertyMetadata(""));

        public string Title
        {
            get => (string)GetValue(TitleProperty);
            set => SetValue(TitleProperty, value);
        }

        public string Description
        {
            get => (string)GetValue(DescriptionProperty);
            set => SetValue(DescriptionProperty, value);
        }

        public FlEmptyState() { DefaultStyleKey = typeof(FlEmptyState); }
    }
}
