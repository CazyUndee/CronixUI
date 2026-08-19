using System;
using Windows.Foundation;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;

namespace CronixUI.Controls;

/// <summary>
/// A star rating control. Tapping star <paramref name="n"/> sets the value to <paramref name="n"/>
/// and raises <see cref="ValueChanged"/>.
/// </summary>
public sealed class FlRating : UserControl
{
    private readonly int _max;
    private readonly StackPanel _panel;
    private int _value;

    /// <summary>Raised when the rating value changes.</summary>
    public event TypedEventHandler<FlRating, int>? ValueChanged;

    /// <summary>The currently selected rating (0 means none).</summary>
    public int Value => _value;

    public FlRating(int max = 5)
    {
        _max = Math.Max(1, max);
        _panel = new StackPanel
        {
            Orientation = Orientation.Horizontal,
            Spacing = 4,
        };

        for (int i = 1; i <= _max; i++)
        {
            int star = i;
            var text = CreateStar();
            text.Tapped += (_, e) =>
            {
                e.Handled = true;
                SetValue(star);
            };
            _panel.Children.Add(text);
        }

        Content = _panel;
        SetValue(0, raiseEvent: false);
    }

    /// <summary>Sets the rating value, clamped to the valid range.</summary>
    public void SetValue(int value)
    {
        SetValue(value, raiseEvent: true);
    }

    private void SetValue(int value, bool raiseEvent)
    {
        var clamped = Math.Clamp(value, 0, _max);
        _value = clamped;

        var filled = GetBrush("CnAccentBrush");
        var empty = GetBrush("CnSurface4Brush");

        for (int i = 0; i < _panel.Children.Count; i++)
        {
            if (_panel.Children[i] is TextBlock tb)
            {
                tb.Foreground = i < _value ? filled : empty;
            }
        }

        if (raiseEvent)
        {
            ValueChanged?.Invoke(this, _value);
        }
    }

    private static TextBlock CreateStar()
    {
        return new TextBlock
        {
            Text = "\u2605",
            FontSize = 24,
            Margin = new Thickness(2, 0, 2, 0),
            IsHitTestVisible = true,
        };
    }

    private static Brush GetBrush(string key)
    {
        if (Application.Current.Resources.TryGetValue(key, out var value) && value is Brush brush)
        {
            return brush;
        }
        return new SolidColorBrush(Microsoft.UI.Colors.Gray);
    }
}
