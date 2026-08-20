using System;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlPagination : Control
{
    public FlPagination()
    {
        DefaultStyleKey = typeof(FlPagination);
    }

    public static readonly DependencyProperty TotalPagesProperty =
        DependencyProperty.Register(nameof(TotalPages), typeof(int), typeof(FlPagination), new PropertyMetadata(1));

    public int TotalPages
    {
        get => (int)GetValue(TotalPagesProperty);
        set => SetValue(TotalPagesProperty, value);
    }

    public static readonly DependencyProperty CurrentPageProperty =
        DependencyProperty.Register(nameof(CurrentPage), typeof(int), typeof(FlPagination), new PropertyMetadata(1));

    public int CurrentPage
    {
        get => (int)GetValue(CurrentPageProperty);
        set => SetValue(CurrentPageProperty, value);
    }

    public event EventHandler<int>? PageChanged;

    public void OnPageChanged(int page)
    {
        PageChanged?.Invoke(this, page);
    }
}
