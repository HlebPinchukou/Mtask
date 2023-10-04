// html.js
export function html({ bundles }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="frame-src https://autofill.yandex.ru/ 'self';">
      <title>Your App Title</title>
    </head>
    <body>
      <div id="app"></div>
      ${bundles.html ? `<script type="module" src="${bundles.html.imports[0].file}"></script>` : ''}
    </body>
    </html>
  `;
}
