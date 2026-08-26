using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace CronixUI.Controls;

/// <summary>
/// Displays a group of avatars with optional overlap and overflow counter.
/// </summary>
public class FlAvatarGroup : Control
{
    private ItemsControl _itemsControl;
    private TextBlock _overflowText;

    public FlAvatarGroup()
    {
        DefaultStyleKey = typeof(FlAvatarGroup);
    }

    #region Dependency Properties

    public static readonly DependencyProperty MaxProperty =
        DependencyProperty.Register(nameof(Max), typeof(int), typeof(FlAvatarGroup), new PropertyMetadata(0, OnMaxChangedStatic));

    public int Max
    {
        get => (int)GetValue(MaxProperty);
        set => SetValue(MaxProperty, value);
    }

    public static readonly DependencyProperty SpacingProperty =
        DependencyProperty.Register(nameof(Spacing), typeof(double), typeof(FlAvatarGroup), new PropertyMetadata(-8.0));

    public double Spacing
    {
        get => (double)GetValue(SpacingProperty);
        set => SetValue(SpacingProperty, value);
    }

    public static readonly DependencyProperty ItemsSourceProperty =
        DependencyProperty.Register(nameof(ItemsSource), typeof(IEnumerable<string>), typeof(FlAvatarGroup), new PropertyMetadata(null));

    public IEnumerable<string> ItemsSource
    {
        get => (IEnumerable<string>)GetValue(ItemsSourceProperty);
        set => SetValue(ItemsSourceProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();
        _itemsControl = GetTemplateChild("PART_ItemsControl") as ItemsControl;
        _overflowText = GetTemplateChild("PART_OverflowText") as TextBlock;
        UpdateAvatars();
    }

    private static void OnMaxChangedStatic(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlAvatarGroup group)
        {
            group.UpdateAvatars();
        }
    }

    private void UpdateAvatars()
    {
        if (_itemsControl == null) return;

        var items = ItemsSource?.ToList() ?? new List<string>();
        _itemsControl.Items.Clear();

        int count = Max > 0 ? Math.Min(items.Count, Max) : items.Count;
        int overflow = Max > 0 ? Math.Max(0, items.Count - Max) : 0;

        for (int i = 0; i < count; i++)
        {
            var avatar = new FlAvatar
            {
                Initials = GetInitials(items[i]),
                Width = 32,
                Height = 32
            };
            Canvas.SetZIndex(avatar, items.Count - i);
            _itemsControl.Items.Add(avatar);
        }

        if (_overflowText != null)
        {
            _overflowText.Text = $"+{overflow}";
            _overflowText.Visibility = overflow > 0 ? Visibility.Visible : Visibility.Collapsed;
        }
    }

    private static string GetInitials(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return "?";
        var parts = name.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 1) return parts[0].Substring(0, Math.Min(2, parts[0].Length)).ToUpperInvariant();
        return $"{parts[0][0]}{parts[^1][0]}".ToUpperInvariant();
    }
}
