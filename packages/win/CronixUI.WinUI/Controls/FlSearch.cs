using System;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlSearch : Control
{
    public FlSearch()
    {
        DefaultStyleKey = typeof(FlSearch);
    }

    public static readonly DependencyProperty QueryProperty =
        DependencyProperty.Register(nameof(Query), typeof(string), typeof(FlSearch), new PropertyMetadata(string.Empty));

    public string Query
    {
        get => (string)GetValue(QueryProperty);
        set => SetValue(QueryProperty, value);
    }

    public static readonly DependencyProperty PlaceholderProperty =
        DependencyProperty.Register(nameof(Placeholder), typeof(string), typeof(FlSearch), new PropertyMetadata("Search..."));

    public string Placeholder
    {
        get => (string)GetValue(PlaceholderProperty);
        set => SetValue(PlaceholderProperty, value);
    }

    public event EventHandler<string>? QueryChanged;

    public void OnQueryChanged(string query)
    {
        QueryChanged?.Invoke(this, query);
    }
}
