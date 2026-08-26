using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System;
using System.Windows;

namespace CronixUI.Controls;

/// <summary>
/// A horizontal stack layout container with configurable alignment and spacing.
/// </summary>
public class FlHStack : Panel
{
    public static readonly DependencyProperty SpacingProperty =
        DependencyProperty.Register(nameof(Spacing), typeof(double), typeof(FlHStack), new PropertyMetadata(8.0));

    public double Spacing
    {
        get => (double)GetValue(SpacingProperty);
        set => SetValue(SpacingProperty, value);
    }

    public static readonly DependencyProperty HorizontalAlignment2Property =
        DependencyProperty.Register(nameof(HorizontalAlignmentValue), typeof(HorizontalAlignment), typeof(FlHStack), new PropertyMetadata(HorizontalAlignment.Left));

    public HorizontalAlignment HorizontalAlignmentValue
    {
        get => (HorizontalAlignment)GetValue(HorizontalAlignment2Property);
        set => SetValue(HorizontalAlignment2Property, value);
    }

    public static readonly DependencyProperty VerticalAlignment2Property =
        DependencyProperty.Register(nameof(VerticalAlignmentValue), typeof(VerticalAlignment), typeof(FlHStack), new PropertyMetadata(VerticalAlignment.Center));

    public VerticalAlignment VerticalAlignmentValue
    {
        get => (VerticalAlignment)GetValue(VerticalAlignment2Property);
        set => SetValue(VerticalAlignment2Property, value);
    }

    protected override Size MeasureOverride(Size availableSize)
    {
        double totalWidth = 0;
        double maxHeight = 0;

        foreach (UIElement child in Children)
        {
            child.Measure(availableSize);
            totalWidth += child.DesiredSize.Width;
            maxHeight = Math.Max(maxHeight, child.DesiredSize.Height);
        }

        totalWidth += Math.Max(0, Children.Count - 1) * Spacing;

        return new Size(totalWidth, maxHeight);
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        double x = 0;

        foreach (UIElement child in Children)
        {
            double y = 0;
            if (VerticalAlignmentValue == VerticalAlignment.Center)
            {
                y = (finalSize.Height - child.DesiredSize.Height) / 2;
            }
            else if (VerticalAlignmentValue == VerticalAlignment.Bottom)
            {
                y = finalSize.Height - child.DesiredSize.Height;
            }

            child.Arrange(new Rect(x, y, child.DesiredSize.Width, child.DesiredSize.Height));
            x += child.DesiredSize.Width + Spacing;
        }

        return finalSize;
    }
}
