using System.Threading.Tasks;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace CronixUI.Controls;

public sealed class FlToast : ContentControl
{
    public FlToast()
    {
        DefaultStyleKey = typeof(FlToast);
    }

    public static readonly DependencyProperty MessageProperty =
        DependencyProperty.Register(nameof(Message), typeof(string), typeof(FlToast), new PropertyMetadata(string.Empty));

    public string Message
    {
        get => (string)GetValue(MessageProperty);
        set => SetValue(MessageProperty, value);
    }

    public static readonly DependencyProperty VariantProperty =
        DependencyProperty.Register(nameof(Variant), typeof(string), typeof(FlToast), new PropertyMetadata("default"));

    public string Variant
    {
        get => (string)GetValue(VariantProperty);
        set => SetValue(VariantProperty, value);
    }

    public static readonly DependencyProperty DurationProperty =
        DependencyProperty.Register(nameof(Duration), typeof(int), typeof(FlToast), new PropertyMetadata(3000));

    public int Duration
    {
        get => (int)GetValue(DurationProperty);
        set => SetValue(DurationProperty, value);
    }

    public async void Show(int durationMs = 0)
    {
        Visibility = Visibility.Visible;
        var delay = durationMs > 0 ? durationMs : Duration;
        await Task.Delay(delay);
        Visibility = Visibility.Collapsed;
    }

    public void Hide()
    {
        Visibility = Visibility.Collapsed;
    }
}
