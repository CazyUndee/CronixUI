using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using System;

namespace CronixUI.Controls;

/// <summary>
/// Displays token usage with an optional progress bar.
/// Useful for tracking LLM token consumption in AI interfaces.
/// </summary>
public sealed class FlTokenCounter : Control
{
    private TextBlock _countText;
    private ProgressBar _progressBar;
    private TextBlock _labelText;

    public FlTokenCounter()
    {
        DefaultStyleKey = typeof(FlTokenCounter);
    }

    #region Dependency Properties

    public static readonly DependencyProperty CountProperty =
        DependencyProperty.Register(nameof(Count), typeof(int), typeof(FlTokenCounter), new PropertyMetadata(0, OnTokenCountChanged));

    public int Count
    {
        get => (int)GetValue(CountProperty);
        set => SetValue(CountProperty, value);
    }

    public static readonly DependencyProperty MaxTokensProperty =
        DependencyProperty.Register(nameof(MaxTokens), typeof(int), typeof(FlTokenCounter), new PropertyMetadata(0, OnTokenCountChanged));

    public int MaxTokens
    {
        get => (int)GetValue(MaxTokensProperty);
        set => SetValue(MaxTokensProperty, value);
    }

    public static readonly DependencyProperty ShowProgressBarProperty =
        DependencyProperty.Register(nameof(ShowProgressBar), typeof(bool), typeof(FlTokenCounter), new PropertyMetadata(true));

    public bool ShowProgressBar
    {
        get => (bool)GetValue(ShowProgressBarProperty);
        set => SetValue(ShowProgressBarProperty, value);
    }

    public static readonly DependencyProperty ShowLabelProperty =
        DependencyProperty.Register(nameof(ShowLabel), typeof(bool), typeof(FlTokenCounter), new PropertyMetadata(true));

    public bool ShowLabel
    {
        get => (bool)GetValue(ShowLabelProperty);
        set => SetValue(ShowLabelProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();

        _countText = GetTemplateChild("PART_CountText") as TextBlock;
        _progressBar = GetTemplateChild("PART_ProgressBar") as ProgressBar;
        _labelText = GetTemplateChild("PART_LabelText") as TextBlock;

        UpdateDisplay();
    }

    private static void OnTokenCountChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlTokenCounter counter)
        {
            counter.UpdateDisplay();
        }
    }

    private void UpdateDisplay()
    {
        if (_countText == null) return;

        _countText.Text = FormatCount(Count);

        if (_labelText != null)
        {
            _labelText.Text = "Tokens";
            _labelText.Visibility = ShowLabel ? Visibility.Visible : Visibility.Collapsed;
        }

        if (_progressBar != null)
        {
            _progressBar.Visibility = ShowProgressBar && MaxTokens > 0 ? Visibility.Visible : Visibility.Collapsed;

            if (MaxTokens > 0)
            {
                var progress = Math.Min(1.0, (double)Count / MaxTokens);
                _progressBar.Value = progress * 100;

                // Color the progress bar based on usage
                if (progress >= 0.9)
                {
                    _progressBar.Foreground = new SolidColorBrush(Microsoft.UI.Colors.Red);
                }
                else if (progress >= 0.7)
                {
                    _progressBar.Foreground = new SolidColorBrush(Microsoft.UI.Colors.Orange);
                }
                else
                {
                    _progressBar.Foreground = new SolidColorBrush(Microsoft.UI.Colors.Teal);
                }
            }
        }
    }

    private static string FormatCount(int count)
    {
        if (count >= 1_000_000)
        {
            return $"{count / 1_000_000.0:F1}M";
        }
        if (count >= 1_000)
        {
            return $"{count / 1_000.0:F1}k";
        }
        return count.ToString();
    }
}
