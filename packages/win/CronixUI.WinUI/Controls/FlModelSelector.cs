using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CronixUI.Controls;

/// <summary>
/// A dropdown selector for choosing AI models with optional metadata display.
/// </summary>
public sealed class FlModelSelector : Control
{
    private ComboBox _comboBox;
    private TextBlock _descriptionText;

    public FlModelSelector()
    {
        DefaultStyleKey = typeof(FlModelSelector);
    }

    #region Dependency Properties

    public static readonly DependencyProperty SelectedModelProperty =
        DependencyProperty.Register(nameof(SelectedModel), typeof(string), typeof(FlModelSelector), 
            new PropertyMetadata(string.Empty, OnSelectedModelChangedStatic));

    public string SelectedModel
    {
        get => (string)GetValue(SelectedModelProperty);
        set => SetValue(SelectedModelProperty, value);
    }

    public static readonly DependencyProperty ModelsProperty =
        DependencyProperty.Register(nameof(Models), typeof(ObservableCollection<ModelOption>), typeof(FlModelSelector), 
            new PropertyMetadata(null));

    public ObservableCollection<ModelOption> Models
    {
        get => (ObservableCollection<ModelOption>)GetValue(ModelsProperty);
        set => SetValue(ModelsProperty, value);
    }

    public static readonly DependencyProperty PlaceholderProperty =
        DependencyProperty.Register(nameof(Placeholder), typeof(string), typeof(FlModelSelector), 
            new PropertyMetadata("Select a model..."));

    public string Placeholder
    {
        get => (string)GetValue(PlaceholderProperty);
        set => SetValue(PlaceholderProperty, value);
    }

    public static readonly DependencyProperty ShowDescriptionProperty =
        DependencyProperty.Register(nameof(ShowDescription), typeof(bool), typeof(FlModelSelector), 
            new PropertyMetadata(true));

    public bool ShowDescription
    {
        get => (bool)GetValue(ShowDescriptionProperty);
        set => SetValue(ShowDescriptionProperty, value);
    }

    public static readonly DependencyProperty IsEnabledProperty =
        DependencyProperty.Register(nameof(IsEnabled), typeof(bool), typeof(FlModelSelector), 
            new PropertyMetadata(true));

    public new bool IsEnabled
    {
        get => (bool)GetValue(IsEnabledProperty);
        set => SetValue(IsEnabledProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();
        _comboBox = GetTemplateChild("PART_ComboBox") as ComboBox;
        _descriptionText = GetTemplateChild("PART_Description") as TextBlock;

        if (_comboBox != null)
        {
            _comboBox.SelectionChanged += OnComboBoxSelectionChanged;
        }

        LoadModels();
    }

    private static void OnSelectedModelChangedStatic(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is FlModelSelector selector)
        {
            selector.UpdateSelection();
        }
    }

    private void LoadModels()
    {
        if (_comboBox == null || Models == null) return;

        _comboBox.Items.Clear();
        foreach (var model in Models)
        {
            _comboBox.Items.Add(model.Name);
        }
        UpdateSelection();
    }

    private void UpdateSelection()
    {
        if (_comboBox == null || Models == null) return;

        for (int i = 0; i < Models.Count; i++)
        {
            if (Models[i].Name == SelectedModel)
            {
                _comboBox.SelectedIndex = i;
                UpdateDescription(Models[i]);
                return;
            }
        }
        _comboBox.SelectedIndex = -1;
    }

    private void OnComboBoxSelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (_comboBox.SelectedIndex >= 0 && Models != null && _comboBox.SelectedIndex < Models.Count)
        {
            var model = Models[_comboBox.SelectedIndex];
            SelectedModel = model.Name;
            UpdateDescription(model);
        }
    }

    private void UpdateDescription(ModelOption model)
    {
        if (_descriptionText == null) return;

        _descriptionText.Text = ShowDescription ? model.Description : string.Empty;
        _descriptionText.Visibility = ShowDescription && !string.IsNullOrEmpty(model.Description) 
            ? Visibility.Visible 
            : Visibility.Collapsed;
    }
}

/// <summary>
/// Represents an AI model option.
/// </summary>
public class ModelOption
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Provider { get; set; } = string.Empty;
    public int MaxTokens { get; set; } = 4096;
    public decimal CostPer1kTokens { get; set; }
}
