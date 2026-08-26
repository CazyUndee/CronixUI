using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using System;
using Windows.ApplicationModel.DataTransfer;
using Windows.System;
using Windows.UI.Core;

namespace CronixUI.Controls;

/// <summary>
/// A button that copies content to clipboard with visual feedback.
/// </summary>
public sealed class CopyButton : Button
{
    private TextBlock _textBlock;
    private bool _isCopied;

    public CopyButton()
    {
        DefaultStyleKey = typeof(CopyButton);
        Click += OnClick;
        PointerEntered += OnPointerEntered;
        PointerExited += OnPointerExited;
    }

    #region Dependency Properties

    public static readonly DependencyProperty ContentToCopyProperty =
        DependencyProperty.Register(nameof(ContentToCopy), typeof(string), typeof(CopyButton), new PropertyMetadata(string.Empty));

    public string ContentToCopy
    {
        get => (string)GetValue(ContentToCopyProperty);
        set => SetValue(ContentToCopyProperty, value);
    }

    public static readonly DependencyProperty CopyTextProperty =
        DependencyProperty.Register(nameof(CopyText), typeof(string), typeof(CopyButton), new PropertyMetadata("Copy"));

    public string CopyText
    {
        get => (string)GetValue(CopyTextProperty);
        set => SetValue(CopyTextProperty, value);
    }

    public static readonly DependencyProperty CopiedTextProperty =
        DependencyProperty.Register(nameof(CopiedText), typeof(string), typeof(CopyButton), new PropertyMetadata("Copied!"));

    public string CopiedText
    {
        get => (string)GetValue(CopiedTextProperty);
        set => SetValue(CopiedTextProperty, value);
    }

    public static readonly DependencyProperty ShowIconProperty =
        DependencyProperty.Register(nameof(ShowIcon), typeof(bool), typeof(CopyButton), new PropertyMetadata(true));

    public bool ShowIcon
    {
        get => (bool)GetValue(ShowIconProperty);
        set => SetValue(ShowIconProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();
        _textBlock = GetTemplateChild("PART_Text") as TextBlock;
        UpdateDisplay();
    }

    private void OnClick(object sender, RoutedEventArgs e)
    {
        if (string.IsNullOrEmpty(ContentToCopy)) return;

        try
        {
            var dataPackage = new DataPackage();
            dataPackage.SetText(ContentToCopy);
            Clipboard.SetContent(dataPackage);

            _isCopied = true;
            UpdateDisplay();

            // Reset after 2 seconds
            var timer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(2) };
            timer.Tick += (s, args) =>
            {
                _isCopied = false;
                UpdateDisplay();
                timer.Stop();
            };
            timer.Start();
        }
        catch
        {
            // Clipboard access might fail in some contexts
        }
    }

    private void OnPointerEntered(object sender, PointerRoutedEventArgs e)
    {
        VisualStateManager.GoToState(this, "PointerOver", true);
    }

    private void OnPointerExited(object sender, PointerRoutedEventArgs e)
    {
        VisualStateManager.GoToState(this, "Normal", true);
    }

    private void UpdateDisplay()
    {
        if (_textBlock != null)
        {
            _textBlock.Text = _isCopied ? CopiedText : CopyText;
        }
    }
}
