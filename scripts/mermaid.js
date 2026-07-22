/*
 * Render Mermaid diagrams on the blog.
 *
 * The jpazure theme has no Mermaid support, and Hexo highlights ```mermaid
 * fenced blocks as a plain <figure class="highlight plaintext"> (with line
 * numbers), which Mermaid.js cannot consume directly. This site script injects
 * Mermaid.js and a small runtime that:
 *   1. finds highlighted code blocks whose content looks like a Mermaid diagram,
 *   2. reconstructs the raw source from the per-line spans,
 *   3. replaces the block with <pre class="mermaid"> and runs Mermaid.
 *
 * Implemented as a site script so the shared theme submodule is not modified.
 */
const mermaidHtml = `
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>
(function () {
  var KEYS = /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(-v2)?|erDiagram|gantt|pie|journey|gitGraph|mindmap|timeline|quadrantChart|requirementDiagram|C4Context|xychart-beta|sankey-beta)\\b/;
  function render() {
    var blocks = document.querySelectorAll('figure.highlight, pre > code');
    var targets = [];
    blocks.forEach(function (el) {
      var fig = el.closest('figure.highlight') || el;
      if (fig.dataset && fig.dataset.mermaidDone) return;
      var codeCell = fig.querySelector('.code') || fig;
      var lines = codeCell.querySelectorAll('.line');
      var text = lines.length
        ? Array.prototype.map.call(lines, function (s) { return s.textContent; }).join('\\n')
        : codeCell.textContent;
      if (!KEYS.test(text.trim())) return;
      var pre = document.createElement('pre');
      pre.className = 'mermaid';
      pre.textContent = text;
      fig.parentNode.replaceChild(pre, fig);
      targets.push(pre);
    });
    if (targets.length && window.mermaid) {
      window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'default' });
      window.mermaid.run({ nodes: targets });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
</script>
<style>
pre.mermaid { background: none; border: none; text-align: center; overflow-x: auto; }
</style>
`;

hexo.extend.injector.register('body_end', mermaidHtml, 'default');
