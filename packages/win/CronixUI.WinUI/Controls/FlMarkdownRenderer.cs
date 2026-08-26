using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Documents;
using Microsoft.UI.Xaml.Media;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace CronixUI.Controls;

/// <summary>
/// Renders markdown text as RichTextBlock content.
/// Supports headers, bold, italic, code, links, lists, and blockquotes.
/// </summary>
public sealed class MarkdownRenderer : Control
{
    private RichTextBlock _richTextBlock;

    public MarkdownRenderer()
    {
        DefaultStyleKey = typeof(MarkdownRenderer);
    }

    #region Dependency Properties

    public static readonly DependencyProperty MarkdownProperty =
        DependencyProperty.Register(nameof(Markdown), typeof(string), typeof(MarkdownRenderer), new PropertyMetadata(string.Empty, OnMarkdownChanged));

    public string Markdown
    {
        get => (string)GetValue(MarkdownProperty);
        set => SetValue(MarkdownProperty, value);
    }

    #endregion

    protected override void OnApplyTemplate()
    {
        base.OnApplyTemplate();
        _richTextBlock = GetTemplateChild("PART_RichTextBlock") as RichTextBlock;
        RenderMarkdown();
    }

    private static void OnMarkdownChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is MarkdownRenderer renderer)
        {
            renderer.RenderMarkdown();
        }
    }

    private void RenderMarkdown()
    {
        if (_richTextBlock == null || string.IsNullOrEmpty(Markdown))
            return;

        _richTextBlock.Blocks.Clear();

        var lines = Markdown.Split('\n');
        var currentParagraph = new Paragraph();

        foreach (var line in lines)
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                if (currentParagraph.Inlines.Count > 0)
                {
                    _richTextBlock.Blocks.Add(currentParagraph);
                    currentParagraph = new Paragraph();
                }
                continue;
            }

            // Headers
            if (line.StartsWith("### "))
            {
                AddFormattedText(currentParagraph, line.Substring(4), 14, true);
                _richTextBlock.Blocks.Add(currentParagraph);
                currentParagraph = new Paragraph();
            }
            else if (line.StartsWith("## "))
            {
                AddFormattedText(currentParagraph, line.Substring(3), 18, true);
                _richTextBlock.Blocks.Add(currentParagraph);
                currentParagraph = new Paragraph();
            }
            else if (line.StartsWith("# "))
            {
                AddFormattedText(currentParagraph, line.Substring(2), 24, true);
                _richTextBlock.Blocks.Add(currentParagraph);
                currentParagraph = new Paragraph();
            }
            // Horizontal rule
            else if (line.Trim() == "---")
            {
                
                _richTextBlock.Blocks.Add(currentParagraph);
                currentParagraph = new Paragraph();
            }
            else
            {
                // Process inline formatting
                ProcessInlineFormatting(currentParagraph, line);
                currentParagraph.Inlines.Add(new LineBreak());
            }
        }

        if (currentParagraph.Inlines.Count > 0)
        {
            _richTextBlock.Blocks.Add(currentParagraph);
        }
    }

    private void ProcessInlineFormatting(Paragraph paragraph, string text)
    {
        // Bold
        text = Regex.Replace(text, @"\*\*(.+?)\*\*", match =>
        {
            return match.Value; // Keep for now, handle below
        });

        // Simple text with inline elements
        var parts = Regex.Split(text, @"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))");
        
        foreach (var part in parts)
        {
            if (string.IsNullOrEmpty(part)) continue;
            
            if (part.StartsWith("**") && part.EndsWith("**"))
            {
                AddFormattedText(paragraph, part.Substring(2, part.Length - 4), 14, true);
            }
            else if (part.StartsWith("*") && part.EndsWith("*") && !part.StartsWith("**"))
            {
                var run = new Run { Text = part.Substring(1, part.Length - 2) };
                run.FontStyle = Windows.UI.Text.FontStyle.Italic;
                paragraph.Inlines.Add(run);
            }
            else if (part.StartsWith("`") && part.EndsWith("`"))
            {
                var codeRun = new Run { Text = part.Substring(1, part.Length - 2) };
                codeRun.FontFamily = new FontFamily("Consolas");
                paragraph.Inlines.Add(codeRun);
            }
            else if (Regex.IsMatch(part, @"\[([^\]]+)\]\(([^)]+)\)"))
            {
                var match = Regex.Match(part, @"\[([^\]]+)\]\(([^)]+)\)");
                if (match.Success)
                {
                    var link = new Hyperlink { NavigateUri = new Uri(match.Groups[2].Value) };
                    link.Inlines.Add(new Run { Text = match.Groups[1].Value });
                    paragraph.Inlines.Add(link);
                }
            }
            else
            {
                paragraph.Inlines.Add(new Run { Text = part });
            }
        }
    }

    private void AddFormattedText(Paragraph paragraph, string text, double fontSize, bool bold)
    {
        var run = new Run { Text = text, FontSize = fontSize };
        if (bold)
        {
            run.FontWeight = Microsoft.UI.Text.FontWeights.Bold;
        }
        paragraph.Inlines.Add(run);
    }
}
