using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlFooter : ContentControl
{
    public FlFooter()
    {
        DefaultStyleKey = typeof(FlFooter);
    }

    public static readonly DependencyProperty AlignmentProperty =
        DependencyProperty.Register(nameof(Alignment), typeof(HorizontalAlignment), typeof(FlFooter), new PropertyMetadata(HorizontalAlignment.Left));

    public HorizontalAlignment Alignment
    {
        get => (HorizontalAlignment)GetValue(AlignmentProperty);
        set => SetValue(AlignmentProperty, value);
    }
}
