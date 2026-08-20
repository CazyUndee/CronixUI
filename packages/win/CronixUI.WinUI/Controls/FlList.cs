using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlList : ItemsControl
{
    public FlList()
    {
        DefaultStyleKey = typeof(FlList);
    }

    public static readonly DependencyProperty SelectionModeProperty =
        DependencyProperty.Register(nameof(SelectionMode), typeof(ListSelectionMode), typeof(FlList), new PropertyMetadata(ListSelectionMode.Single));

    public ListSelectionMode SelectionMode
    {
        get => (ListSelectionMode)GetValue(SelectionModeProperty);
        set => SetValue(SelectionModeProperty, value);
    }

    public static readonly DependencyProperty IsSelectableProperty =
        DependencyProperty.Register(nameof(IsSelectable), typeof(bool), typeof(FlList), new PropertyMetadata(true));

    public bool IsSelectable
    {
        get => (bool)GetValue(IsSelectableProperty);
        set => SetValue(IsSelectableProperty, value);
    }
}
