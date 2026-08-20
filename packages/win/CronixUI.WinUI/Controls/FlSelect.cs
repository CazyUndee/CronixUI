using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlSelect : ComboBox
{
    public FlSelect()
    {
        DefaultStyleKey = typeof(FlSelect);
    }

    public static readonly DependencyProperty PlaceholderProperty =
        DependencyProperty.Register(nameof(Placeholder), typeof(string), typeof(FlSelect), new PropertyMetadata("Select an option"));

    public string Placeholder
    {
        get => (string)GetValue(PlaceholderProperty);
        set => SetValue(PlaceholderProperty, value);
    }

    public static readonly DependencyProperty IsSearchableProperty =
        DependencyProperty.Register(nameof(IsSearchable), typeof(bool), typeof(FlSelect), new PropertyMetadata(false));

    public bool IsSearchable
    {
        get => (bool)GetValue(IsSearchableProperty);
        set => SetValue(IsSearchableProperty, value);
    }
}
