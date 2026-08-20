using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlStat : ContentControl
{
    public FlStat()
    {
        DefaultStyleKey = typeof(FlStat);
    }

    public static readonly DependencyProperty ValueProperty =
        DependencyProperty.Register(nameof(Value), typeof(string), typeof(FlStat), new PropertyMetadata(string.Empty));

    public string Value
    {
        get => (string)GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }

    public static readonly DependencyProperty LabelProperty =
        DependencyProperty.Register(nameof(Label), typeof(string), typeof(FlStat), new PropertyMetadata(string.Empty));

    public string Label
    {
        get => (string)GetValue(LabelProperty);
        set => SetValue(LabelProperty, value);
    }

    public static readonly DependencyProperty DeltaProperty =
        DependencyProperty.Register(nameof(Delta), typeof(string), typeof(FlStat), new PropertyMetadata(string.Empty));

    public string Delta
    {
        get => (string)GetValue(DeltaProperty);
        set => SetValue(DeltaProperty, value);
    }

    public static readonly DependencyProperty DeltaTypeProperty =
        DependencyProperty.Register(nameof(DeltaType), typeof(string), typeof(FlStat), new PropertyMetadata("neutral"));

    public string DeltaType
    {
        get => (string)GetValue(DeltaTypeProperty);
        set => SetValue(DeltaTypeProperty, value);
    }
}
