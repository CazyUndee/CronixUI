using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Media;
using System;
using System.Collections.Generic;

namespace CronixUI.Controls;

/// <summary>
/// A complete chat interface for AI conversations.
/// Provides message display, input, model selection, and streaming support.
/// </summary>
public sealed class FlChatInterface : Control
{
    private TextBox _inputBox;
    private Button _sendButton;
    private ListView _messagesList;
    private ComboBox _modelSelector;
    private ProgressRing _statusIndicator;
    private TextBlock _statusText;
    private ScrollViewer _scrollViewer;

    public FlChatInterface()
    {
        DefaultStyleKey = typeof(FlChatInterface);
        Loaded += OnLoaded;
    }

    #region Dependency Properties

    public static readonly DependencyProperty MessagesProperty =
        DependencyProperty.Register(nameof(Messages), typeof(IList<ChatMessage>), typeof(FlChatInterface), new PropertyMetadata(null, OnMessagesChanged));

    public IList<ChatMessage> Messages
    {
        get => (IList<ChatMessage>)GetValue(MessagesProperty);
        set => SetValue(MessagesProperty, value);
    }

    public static readonly DependencyProperty ModelsProperty =
        DependencyProperty.Register(nameof(Models), typeof(IList<AIModel>), typeof(FlChatInterface), new PropertyMetadata(null));

    public IList<AIModel> Models
    {
        get => (IList<AIModel>)GetValue(ModelsProperty);
        set => SetValue(ModelsProperty, value);
    }

    public static readonly DependencyProperty SelectedModelProperty =
        DependencyProperty.Register(nameof(SelectedModel), typeof(string), typeof(FlChatInterface), new PropertyMetadata(null));

    public string SelectedModel
    {
        get => (string)GetValue(SelectedModelProperty);
        set => SetValue(SelectedModelProperty, value);
    }

    public static readonly DependencyProperty StatusProperty =
        DependencyProperty.Register(nameof(Status), typeof(ChatStatus), typeof(FlChatInterface), new PropertyMetadata(ChatStatus.Idle, OnStatusChanged));

    public ChatStatus Status
    {
        get => (ChatStatus)GetValue(StatusProperty);
        set => SetValue(StatusProperty, value);
    }

    public static readonly DependencyProperty PlaceholderProperty =
        DependencyProperty.Register(nameof(Placeholder), typeof(string), typeof(FlChatInterface), new PropertyMetadata("Type a message..."));

    public string Placeholder
    {
        get => (string)GetValue(PlaceholderProperty);
        set => SetValue(PlaceholderProperty, value);
    }

    public static readonly DependencyProperty ShowModelSelectorProperty =
        DependencyProperty.Register(nameof(ShowModelSelector), typeof(bool), typeof(FlChatInterface), new PropertyMetadata(true));

    public bool ShowModelSelector
    {
        get => (bool)GetValue(ShowModelSelectorProperty);
        set => SetValue(ShowModelSelectorProperty, value);
    }

    public static readonly DependencyProperty ShowTokenCountsProperty =
        DependencyProperty.Register(nameof(ShowTokenCounts), typeof(bool), typeof(FlChatInterface), new PropertyMetadata(false));

    public bool ShowTokenCounts
    {
        get => (bool)GetValue(ShowTokenCountsProperty);
        set => SetValue(ShowTokenCountsProperty, value);
    }

    #endregion

    #region Events

    public event EventHandler<ChatMessageSendEventArgs> MessageSend;
    public event EventHandler<ChatMessageRegenerateEventArgs> MessageRegenerate;
    public event EventHandler<ChatModelChangedEventArgs> ModelChanged;

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();

        _inputBox = GetTemplateChild("PART_InputBox") as TextBox;
        _sendButton = GetTemplateChild("PART_SendButton") as Button;
        _messagesList = GetTemplateChild("PART_MessagesList") as ListView;
        _modelSelector = GetTemplateChild("PART_ModelSelector") as ComboBox;
        _statusIndicator = GetTemplateChild("PART_StatusIndicator") as ProgressRing;
        _statusText = GetTemplateChild("PART_StatusText") as TextBlock;
        _scrollViewer = GetTemplateChild("PART_ScrollViewer") as ScrollViewer;

        if (_sendButton != null)
            _sendButton.Click += OnSendClick;

        if (_inputBox != null)
            _inputBox.KeyDown += OnInputKeyDown;

        if (_modelSelector != null)
            _modelSelector.SelectionChanged += OnModelSelectionChanged;
    }

    private void OnLoaded(object sender, RoutedEventArgs e)
    {
        UpdateStatusIndicator();
    }

    private void OnInputKeyDown(object sender, Microsoft.UI.Xaml.Input.KeyRoutedEventArgs e)
    {
        if (e.Key == Windows.System.VirtualKey.Enter && !_inputBox.Text.Equals(string.Empty))
        {
            SendMessage();
        }
    }

    private void OnSendClick(object sender, RoutedEventArgs e)
    {
        SendMessage();
    }

    private void SendMessage()
    {
        if (_inputBox?.Text is null || _inputBox.Text.Equals(string.Empty))
            return;

        var message = new ChatMessage
        {
            Role = MessageRole.User,
            Content = _inputBox.Text,
            Timestamp = DateTime.Now
        };

        _inputBox.Text = string.Empty;

        if (Messages != null)
        {
            Messages.Add(message);
            UpdateMessagesList();
        }

        MessageSend?.Invoke(this, new ChatMessageSendEventArgs(message));
    }

    private void OnModelSelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (_modelSelector.SelectedItem is AIModel model)
        {
            SelectedModel = model.Id;
            ModelChanged?.Invoke(this, new ChatModelChangedEventArgs(model.Id));
        }
    }

    private void OnMessagesChanged(DependencyPropertyChangedEventArgs e)
    {
        UpdateMessagesList();
    }

    private void OnStatusChanged(DependencyPropertyChangedEventArgs e)
    {
        UpdateStatusIndicator();
    }

    private void UpdateMessagesList()
    {
        if (_messagesList == null || Messages == null) return;

        _messagesList.ItemsSource = null;
        _messagesList.ItemsSource = Messages;

        // Auto-scroll to bottom
        if (_scrollViewer != null)
        {
            _scrollViewer.ScrollToEnd();
        }
    }

    private void UpdateStatusIndicator()
    {
        if (_statusIndicator == null || _statusText == null) return;

        switch (Status)
        {
            case ChatStatus.Generating:
            case ChatStatus.Streaming:
                _statusIndicator.Visibility = Visibility.Visible;
                _statusIndicator.IsActive = true;
                _statusText.Text = "Generating...";
                break;
            case ChatStatus.Error:
                _statusIndicator.Visibility = Visibility.Visible;
                _statusIndicator.IsActive = false;
                _statusText.Text = "Error occurred";
                break;
            default:
                _statusIndicator.Visibility = Visibility.Collapsed;
                _statusIndicator.IsActive = false;
                _statusText.Text = string.Empty;
                break;
        }
    }
}

/// <summary>
/// Represents a single chat message.
/// </summary>
public class ChatMessage
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public MessageRole Role { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public bool IsStreaming { get; set; }
    public int PromptTokens { get; set; }
    public int CompletionTokens { get; set; }
}

/// <summary>
/// The role of a chat message.
/// </summary>
public enum MessageRole
{
    User,
    Assistant,
    System
}

/// <summary>
/// The status of the chat interface.
/// </summary>
public enum ChatStatus
{
    Idle,
    Generating,
    Streaming,
    Error,
    Success
}

/// <summary>
/// Represents an AI model option.
/// </summary>
public class AIModel
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Provider { get; set; } = string.Empty;
}

public class ChatMessageSendEventArgs : EventArgs
{
    public ChatMessage Message { get; }
    public ChatMessageSendEventArgs(ChatMessage message) => Message = message;
}

public class ChatMessageRegenerateEventArgs : EventArgs
{
    public string MessageId { get; }
    public ChatMessageRegenerateEventArgs(string messageId) => MessageId = messageId;
}

public class ChatModelChangedEventArgs : EventArgs
{
    public string ModelId { get; }
    public ChatModelChangedEventArgs(string modelId) => ModelId = modelId;
}
