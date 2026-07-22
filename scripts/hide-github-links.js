/*
 * Hide the theme's per-article "feedback" and "GitHub で編集" links.
 *
 * The jpazure theme renders these (article.ejs: .article-github-issue-link /
 * .article-github-edit-link) whenever the site has a `github:` config. This
 * site script injects CSS to hide them without modifying the theme submodule.
 */
hexo.extend.injector.register(
  'head_end',
  '<style>.article-github-issue-link,.article-github-edit-link{display:none !important;}</style>',
  'default'
);
