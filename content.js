let fontSize = 14;
let lineHeightRatio = 1.5; // Ensures proper text spacing
let extraSpacing = 5; // Minimal spacing between separate comments

function adjustCommentFontSize(change) {
    fontSize += change;

    // ✅ Apply font size adjustments to comment text
    document.querySelectorAll('.docos-replyview-body, .docos-anchoredreplyview-body, .docos-replyview-body-emoji-reactable')
      .forEach(el => {
          el.style.setProperty('font-size', `${fontSize}px`, 'important');
          el.style.setProperty('line-height', `${fontSize * lineHeightRatio}px`, 'important');
          el.style.setProperty('white-space', 'pre-wrap', 'important');
          el.style.setProperty('word-break', 'break-word', 'important');
          el.style.setProperty('display', 'block', 'important');
      });

    // ✅ Fix overlap between separate comments
    document.querySelectorAll('.docos-docoview-tesla-conflict, .docos-docoview, .docos-docoview-replycontainer')
      .forEach(el => {
          el.style.setProperty('height', 'auto', 'important');
          el.style.setProperty('min-height', `${fontSize * 3}px`, 'important'); // Dynamically expands height
          el.style.setProperty('max-height', 'none', 'important');
          el.style.setProperty('overflow', 'visible', 'important');
          el.style.setProperty('display', 'block', 'important');
          el.style.setProperty('flex-grow', '1', 'important');
          el.style.setProperty('position', 'relative', 'important'); 
          el.style.setProperty('margin-bottom', `${extraSpacing}px`, 'important'); // Ensures proper spacing
          el.style.setProperty('padding-bottom', `${extraSpacing}px`, 'important');
      });

    console.log(`[DEBUG] Applied font-size: ${fontSize}px, line-height: ${fontSize * lineHeightRatio}px, spacing: ${extraSpacing}px`);
}

// ✅ Resize comments dynamically as font changes
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "increase_font") {
        adjustCommentFontSize(2);
    } else if (request.action === "decrease_font") {
        adjustCommentFontSize(-2);
    }
});

// ✅ Ensure styles apply when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DEBUG] DOM Content Loaded, applying styles.");
    adjustCommentFontSize(0);
});
