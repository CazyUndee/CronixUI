using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlBreadcrumb : ItemsControl
{
    public FlBreadcrumb()
    {
        DefaultStyleKey = typeof(FlBreadcrumb);
    }

    public static readonly DependencyProperty SeparatorProperty =
        DependencyProperty.Register(nameof(Separator), typeof(string), typeof(FlBreadcrumb), new PropertyMetadata("/"));

    public string Separator
    {
        get => (string)GetValue(SeparatorProperty);
        set => SetValue(SeparatorProperty, value);
    }
}
