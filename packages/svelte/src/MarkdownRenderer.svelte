<script>
  /** @type {string} */
  export let content = '';

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function parseMarkdown(text) {
    let html = text;
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || 'text';
      return `<pre class="cn-md-code-block"><div class="cn-md-code-lang">${language}</div><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    html = html.replace(/`([^`]+)`/g, '<code class="cn-md-inline-code">$1</code>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="cn-md-h3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="cn-md-h2">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="cn-md-h1">$1</h1>');
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="cn-md-link" href="$2" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/^> (.+)$/gm, '<blockquote class="cn-md-blockquote">$1</blockquote>');
    html = html.replace(/^[\-\*] (.+)$/gm, '<li class="cn-md-list-item">$1</li>');
    html = html.replace(/((?:<li class="cn-md-list-item">.*<\/li>\n?)+)/g, '<ul class="cn-md-list">$1</ul>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="cn-md-list-item-ordered">$1</li>');
    html = html.replace(/((?:<li class="cn-md-list-item-ordered">.*<\/li>\n?)+)/g, '<ol class="cn-md-list-ordered">$1</ol>');
    html = html.replace(/^---$/gm, '<hr class="cn-md-hr" />');
    html = html.replace(/^(?!<[a-z/])((?!^$).+)$/gm, '<p class="cn-md-paragraph">$1</p>');
    return html;
  }

  $: html = parseMarkdown(content);
</script>

<div class="cn-markdown-renderer">
  {@html html}
</div>

<style>
  .cn-markdown-renderer { line-height: 1.6; }
  :global(.cn-md-h1) { font-size: 1.5em; margin: 0.5em 0; font-weight: 600; }
  :global(.cn-md-h2) { font-size: 1.3em; margin: 0.5em 0; font-weight: 600; }
  :global(.cn-md-h3) { font-size: 1.1em; margin: 0.5em 0; font-weight: 600; }
  :global(.cn-md-inline-code) { background: var(--cn-surface-2); padding: 2px 6px; border-radius: var(--cn-radius); font-family: monospace; font-size: 0.9em; }
  :global(.cn-md-code-block) { background: var(--cn-code-bg, #1e1e1e); border-radius: var(--cn-radius); overflow: auto; margin: 1em 0; padding: 12px; font-family: monospace; font-size: 13px; }
  :global(.cn-md-blockquote) { border-left: 3px solid var(--cn-primary); padding-left: 12px; margin: 0.5em 0; color: var(--cn-text-muted); }
  :global(.cn-md-link) { color: var(--cn-primary); text-decoration: underline; }
  :global(.cn-md-list), :global(.cn-md-list-ordered) { padding-left: 1.5em; margin: 0.5em 0; }
  :global(.cn-md-list-item), :global(.cn-md-list-item-ordered) { margin: 0.25em 0; }
  :global(.cn-md-paragraph) { margin: 0.5em 0; }
  :global(.cn-md-hr) { border: none; border-top: 1px solid var(--cn-border); margin: 1em 0; }
</style>
