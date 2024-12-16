// copy button
function setupCopyButton($button, textSelector) {
  $button.click(function () {
    var copyText =
      $button.siblings(textSelector).text() ||
      $button.closest(".form").find(textSelector).val();
    navigator.clipboard
      .writeText(copyText)
      .then(function () {
        $button.html("copied");
        setTimeout(function () {
          $button.html("copy");
        }, 2000);
      })
      .catch(function (err) {
        console.error("Unable to copy text", err);
      });
  });
}
$(document).ready(function () {
  setupCopyButton($(".copy"), "strong");
  setupCopyButton($(".copyinput"), ".copy-this");
});
