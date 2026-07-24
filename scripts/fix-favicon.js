/*
 * Fix the favicon disappearing on article pages.
 *
 * The jpazure theme hard-codes relative favicon paths in head.ejs
 * (e.g. <link rel="icon" href="./favicon.ico">). Relative paths resolve
 * correctly on the home page (/blog/) but break on nested article URLs
 * (e.g. /blog/intune/20260722_02/ -> /blog/intune/20260722_02/favicon.ico),
 * so the browser falls back to the default favicon.
 *
 * This site script injects a small head script that rewrites those relative
 * icon/manifest links to root-absolute paths, so they resolve on every page,
 * without modifying the theme submodule.
 */
const root = hexo.config.root || '/';
const sel = 'link[rel~="icon"],link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"],link[rel="mask-icon"],link[rel="manifest"]';
const script =
  '<script>(function(){var r=' + JSON.stringify(root) + ';' +
  'document.querySelectorAll(' + JSON.stringify(sel) + ').forEach(function(l){' +
  'var h=l.getAttribute("href");if(h&&h.indexOf("./")===0){l.setAttribute("href",r+h.slice(2));}' +
  '});})();</script>';

hexo.extend.injector.register('head_end', script, 'default');
