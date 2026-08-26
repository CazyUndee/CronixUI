using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Windows;

namespace CronixUI.Controls;

/// <summary>
/// Groups multiple buttons together with consistent spacing and borders.
/// </summary>
public class FlButtonGroup : Panel
{
    public static readonly DependencyProperty DirectionProperty =
        DependencyProperty.Register(nameof(Direction), typeof(Orientation), typeof(FlButtonGroup), new PropertyMetadata(Orientation.Horizontal));

    public Orientation Direction
    {
        get => (Orientation)GetValue(DirectionProperty);
        set => SetValue(DirectionProperty, value);
    }

    public static readonly DependencyProperty ItemSpacingProperty =
        DependencyProperty.Register(nameof(ItemSpacing), typeof(double), typeof(FlButtonGroup), new PropertyMetadata(0.0));

    public double ItemSpacing
    {
        get => (double)GetValue(ItemSpacingProperty);
        set => SetValue(ItemSpacingProperty, value);
    }

    protected override Size MeasureOverride(Size availableSize)
    {
        double totalWidth = 0;
        double totalHeight = 0;
        double maxWidth = 0;
        double maxHeight = 0;

        foreach (UIElement child in Children)
        {
            child.Measure(availableSize);
            if (Direction == Orientation.Horizontal)
            {
                totalWidth += child.DesiredSize.Width + ItemSpacing;
                maxHeight = Math.Max(maxHeight, child.DesiredSize.Height);
            }
            else
            {
                totalHeight += child.DesiredSize.Height + ItemSpacing;
                maxWidth = Math.Max(maxWidth, child.DesiredSize.Width);
            }
        }

        if (Direction == Orientation.Horizontal)
            totalWidth -= ItemSpacing;
        else
            totalHeight -= ItemSpacing;

        return new Size(
            Direction == Orientation.Horizontal ? totalWidth : maxWidth,
            Direction == Orientation.Vertical ? totalHeight : maxHeight);
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        double x = 0;
        double y = 0;

        foreach (UIElement child in Children)
        {
            if (Direction == Orientation.Horizontal)
            {
                child.Arrange(new Rect(x, 0, child.DesiredSize.Width, finalSize.Height));
                x += child.DesiredSize.Width + ItemSpacing;
            }
            else
            {
                child.Arrange(new Rect(0, y, finalSize.Width, child.DesiredSize.Height));
                y += child.DesiredSize.Height + ItemSpacing;
            }
        }

        return finalSize;
    }
}
