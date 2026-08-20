using System;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlTag : ContentControl
{
    public FlTag()
    {
        DefaultStyleKey = typeof(FlTag);
    }

    public static readonly DependencyProperty TextProperty =
        DependencyProperty.Register(nameof(Text), typeof(string), typeof(FlTag), new PropertyMetadata(string.Empty));

    public string Text
    {
        get => (string)GetValue(TextProperty);
        set => SetValue(TextProperty, value);
    }

    public static readonly DependencyProperty VariantProperty =
        DependencyProperty.Register(nameof(Variant), typeof(string), typeof(FlTag), new PropertyMetadata("default"));

    public string Variant
    {
        get => (string)GetValue(VariantProperty);
        set => SetValue(VariantProperty, value);
    }

    public static readonly DependencyProperty IsRemovableProperty =
        DependencyProperty.Register(nameof(IsRemovable), typeof(bool), typeof(FlTag), new PropertyMetadata(false));

    public bool IsRemovable
    {
        get => (bool)GetValue(IsRemovableProperty);
        set => SetValue(IsRemovableProperty, value);
    }

    public event EventHandler? Removed;

    public void OnRemoved()
    {
        Removed?.Invoke(this, EventArgs.Empty);
    }
}
