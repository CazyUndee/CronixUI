using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlTable : ContentControl
{
    public FlTable()
    {
        DefaultStyleKey = typeof(FlTable);
    }

    public static readonly DependencyProperty HeadersProperty =
        DependencyProperty.Register(nameof(Headers), typeof(string[]), typeof(FlTable), new PropertyMetadata(Array.Empty<string>()));

    public string[] Headers
    {
        get => (string[])GetValue(HeadersProperty);
        set => SetValue(HeadersProperty, value);
    }

    public static readonly DependencyProperty RowsProperty =
        DependencyProperty.Register(nameof(Rows), typeof(string[][]), typeof(FlTable), new PropertyMetadata(Array.Empty<string[]>()));

    public string[][] Rows
    {
        get => (string[][])GetValue(RowsProperty);
        set => SetValue(RowsProperty, value);
    }

    public static readonly DependencyProperty IsStripedProperty =
        DependencyProperty.Register(nameof(IsStriped), typeof(bool), typeof(FlTable), new PropertyMetadata(true));

    public bool IsStriped
    {
        get => (bool)GetValue(IsStripedProperty);
        set => SetValue(IsStripedProperty, value);
    }

    public static readonly DependencyProperty IsBorderedProperty =
        DependencyProperty.Register(nameof(IsBordered), typeof(bool), typeof(FlTable), new PropertyMetadata(true));

    public bool IsBordered
    {
        get => (bool)GetValue(IsBorderedProperty);
        set => SetValue(IsBorderedProperty, value);
    }
}
