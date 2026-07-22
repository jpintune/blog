/*
 * Override the jpazure theme header banner color to a paler gray that
 * matches the Microsoft Intune admin center. Implemented as a site-level
 * Hexo script (injector) so the shared theme submodule is not modified.
 *
 * The default theme color is #333 (see themes/jpazure/source/css/_partial/header.styl).
 * #484644 is the exact background color of the Microsoft Intune admin center
 * top navigation bar (.fxs-topbar => rgb(72, 70, 68)).
 * Adjust the value below to fine-tune the shade.
 */
hexo.extend.injector.register(
  'head_end',
  '<style>#site-header-blog-wrapper{background-color:#484644;}</style>',
  'default'
);
