using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlContainer : ContentControl
{
    public FlContainer()
    {
        DefaultStyleKey = typeof(FlContainer);
    }

    public static readonly DependencyProperty PaddingProperty =
        DependencyProperty.Register(nameof(Padding), typeof(Thickness), typeof(FlContainer), new PropertyMetadata(new Thickness(16)));

    public new Thickness Padding
    {
        get => (Thickness)GetValue(PaddingProperty);
        set => SetValue(PaddingProperty, value);
    }

    public static readonly DependencyProperty HasBorderProperty =
        DependencyProperty.Register(nameof(HasBorder), typeof(bool), typeof(FlContainer), new PropertyMetadata(true));

    public bool HasBorder
    {
        get => (bool)GetValue(HasBorderProperty);
        set => SetValue(HasBorderProperty, value);
    }
}
