using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;

namespace CronixUI.Controls;

/// <summary>
/// A horizontal or vertical separator line.
/// </summary>
public class FlDivider : Control
{
    public FlDivider()
    {
        DefaultStyleKey = typeof(FlDivider);
    }

    public static readonly DependencyProperty OrientationProperty =
        DependencyProperty.Register(nameof(Orientation), typeof(Orientation), typeof(FlDivider), new PropertyMetadata(Orientation.Horizontal));

    public Orientation Orientation
    {
        get => (Orientation)GetValue(OrientationProperty);
        set => SetValue(OrientationProperty, value);
    }

    public static readonly DependencyProperty ThicknessProperty =
        DependencyProperty.Register(nameof(Thickness), typeof(double), typeof(FlDivider), new PropertyMetadata(1.0));

    public double Thickness
    {
        get => (double)GetValue(ThicknessProperty);
        set => SetValue(ThicknessProperty, value);
    }

    public static readonly DependencyProperty DividerBrushProperty =
        DependencyProperty.Register(nameof(DividerBrush), typeof(Brush), typeof(FlDivider), 
            new PropertyMetadata(new SolidColorBrush(Microsoft.UI.Colors.LightGray)));

    public Brush DividerBrush
    {
        get => (Brush)GetValue(DividerBrushProperty);
        set => SetValue(DividerBrushProperty, value);
    }
}
