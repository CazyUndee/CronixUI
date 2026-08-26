using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

/// <summary>
/// A horizontal stack layout container with configurable alignment and spacing.
/// Built on StackPanel for proper layout in WinUI 3.
/// </summary>
public class FlHStack : StackPanel
{
    public static readonly DependencyProperty ContentSpacingProperty =
        DependencyProperty.Register(nameof(ContentSpacing), typeof(double), typeof(FlHStack), 
            new PropertyMetadata(8.0, OnContentSpacingChanged));

    public double ContentSpacing
    {
        get => (double)GetValue(ContentSpacingProperty);
        set => SetValue(ContentSpacingProperty, value);
    }

    public FlHStack()
    {
        Orientation = Orientation.Horizontal;
        Spacing = 8;
    }

    private static void OnContentSpacingChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlHStack stack)
        {
            stack.Spacing = (double)e.NewValue;
        }
    }
}
