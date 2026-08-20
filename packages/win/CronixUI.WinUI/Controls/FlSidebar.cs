using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlSidebar : ContentControl
{
    public FlSidebar()
    {
        DefaultStyleKey = typeof(FlSidebar);
    }

    public static readonly DependencyProperty IsCollapsedProperty =
        DependencyProperty.Register(nameof(IsCollapsed), typeof(bool), typeof(FlSidebar), new PropertyMetadata(false));

    public bool IsCollapsed
    {
        get => (bool)GetValue(IsCollapsedProperty);
        set => SetValue(IsCollapsedProperty, value);
    }

    public static readonly DependencyProperty WidthProperty =
        DependencyProperty.Register(nameof(Width), typeof(double), typeof(FlSidebar), new PropertyMetadata(256.0));

    public new double Width
    {
        get => (double)GetValue(WidthProperty);
        set => SetValue(WidthProperty, value);
    }

    public static readonly DependencyProperty CollapsedWidthProperty =
        DependencyProperty.Register(nameof(CollapsedWidthProperty), typeof(double), typeof(FlSidebar), new PropertyMetadata(64.0));

    public double CollapsedWidth
    {
        get => (double)GetValue(CollapsedWidthProperty);
        set => SetValue(CollapsedWidthProperty, value);
    }
}
