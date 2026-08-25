using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;

namespace CronixUI.Controls;

/// <summary>
/// Displays the current AI connection/processing status.
/// Shows an indicator with appropriate color and label for different states.
/// </summary>
public sealed class FlAIStatus : Control
{
    private TextBlock _statusIcon;
    private TextBlock _statusLabel;
    private TextBlock _latencyText;
    private TextBlock _modelText;

    public FlAIStatus()
    {
        DefaultStyleKey = typeof(FlAIStatus);
    }

    #region Dependency Properties

    public static readonly DependencyProperty AIStatusProperty =
        DependencyProperty.Register(nameof(AIStatus), typeof(AIConnectionStatus), typeof(FlAIStatus), new PropertyMetadata(AIConnectionStatus.Idle, OnStatusChanged));

    public AIConnectionStatus AIStatus
    {
        get => (AIConnectionStatus)GetValue(AIStatusProperty);
        set => SetValue(AIStatusProperty, value);
    }

    public static readonly DependencyProperty LatencyProperty =
        DependencyProperty.Register(nameof(Latency), typeof(int?), typeof(FlAIStatus), new PropertyMetadata(null, OnStatusChanged));

    public int? Latency
    {
        get => (int?)GetValue(LatencyProperty);
        set => SetValue(LatencyProperty, value);
    }

    public static readonly DependencyProperty ModelNameProperty =
        DependencyProperty.Register(nameof(ModelName), typeof(string), typeof(FlAIStatus), new PropertyMetadata(null));

    public string ModelName
    {
        get => (string)GetValue(ModelNameProperty);
        set => SetValue(ModelNameProperty, value);
    }

    public static readonly DependencyProperty ShowLabelProperty =
        DependencyProperty.Register(nameof(ShowLabel), typeof(bool), typeof(FlAIStatus), new PropertyMetadata(true));

    public bool ShowLabel
    {
        get => (bool)GetValue(ShowLabelProperty);
        set => SetValue(ShowLabelProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();

        _statusIcon = GetTemplateChild("PART_StatusIcon") as TextBlock;
        _statusLabel = GetTemplateChild("PART_StatusLabel") as TextBlock;
        _latencyText = GetTemplateChild("PART_LatencyText") as TextBlock;
        _modelText = GetTemplateChild("PART_ModelText") as TextBlock;

        UpdateStatus();
    }

    private static void OnStatusChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlAIStatus status)
        {
            status.UpdateStatus();
        }
    }

    private void UpdateStatus()
    {
        var (icon, label, color) = AIStatus switch
        {
            AIConnectionStatus.Connected => ("●", "Connected", Microsoft.UI.Colors.Green),
            AIConnectionStatus.Disconnected => ("○", "Disconnected", Microsoft.UI.Colors.Gray),
            AIConnectionStatus.Connecting => ("◐", "Connecting...", Microsoft.UI.Colors.Orange),
            AIConnectionStatus.Error => ("✕", "Error", Microsoft.UI.Colors.Red),
            AIConnectionStatus.RateLimited => ("⏱", "Rate Limited", Microsoft.UI.Colors.Orange),
            AIConnectionStatus.Idle => ("◌", "Idle", Microsoft.UI.Colors.Gray),
            _ => ("◌", "Unknown", Microsoft.UI.Colors.Gray)
        };

        if (_statusIcon != null)
        {
            _statusIcon.Text = icon;
            _statusIcon.Foreground = new SolidColorBrush(color);
        }

        if (_statusLabel != null)
        {
            _statusLabel.Text = label;
            _statusLabel.Foreground = new SolidColorBrush(color);
            _statusLabel.Visibility = ShowLabel ? Visibility.Visible : Visibility.Collapsed;
        }

        if (_latencyText != null)
        {
            _latencyText.Text = Latency.HasValue ? $"{Latency.Value}ms" : string.Empty;
            _latencyText.Visibility = Latency.HasValue ? Visibility.Visible : Visibility.Collapsed;
        }

        if (_modelText != null)
        {
            _modelText.Text = !string.IsNullOrEmpty(ModelName) ? $"| {ModelName}" : string.Empty;
            _modelText.Visibility = !string.IsNullOrEmpty(ModelName) ? Visibility.Visible : Visibility.Collapsed;
        }
    }
}

/// <summary>
/// The connection status of an AI service.
/// </summary>
public enum AIConnectionStatus
{
    Connected,
    Disconnected,
    Connecting,
    Error,
    RateLimited,
    Idle
}
