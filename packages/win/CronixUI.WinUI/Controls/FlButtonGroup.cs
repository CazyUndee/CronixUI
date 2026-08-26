using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

/// <summary>
/// Groups multiple buttons together with consistent spacing and borders.
/// Built on StackPanel for proper layout in WinUI 3.
/// </summary>
public class FlButtonGroup : StackPanel
{
    public static readonly DependencyProperty ItemSpacingProperty =
        DependencyProperty.Register(nameof(ItemSpacing), typeof(double), typeof(FlButtonGroup), 
            new PropertyMetadata(0.0, OnItemSpacingChanged));

    public double ItemSpacing
    {
        get => (double)GetValue(ItemSpacingProperty);
        set => SetValue(ItemSpacingProperty, value);
    }

    public static readonly DependencyProperty ButtonCornerRadiusProperty =
        DependencyProperty.Register(nameof(ButtonCornerRadius), typeof(CornerRadius), typeof(FlButtonGroup),
            new PropertyMetadata(new CornerRadius(4)));

    public CornerRadius ButtonCornerRadius
    {
        get => (CornerRadius)GetValue(ButtonCornerRadiusProperty);
        set => SetValue(ButtonCornerRadiusProperty, value);
    }

    public FlButtonGroup()
    {
        Spacing = 0;
        Orientation = Orientation.Horizontal;
    }

    private static void OnItemSpacingChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlButtonGroup group)
        {
            group.Spacing = (double)e.NewValue;
        }
    }
}
