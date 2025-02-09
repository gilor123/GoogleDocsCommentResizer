chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return; // Ensure a tab is available

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: (cmd) => {
                let change = cmd === "increase_font" ? 2 : -2;
                document.querySelectorAll('.docos-replyview-body, .docos-anchoredreplyview-body, .docos-replyview-body-emoji-reactable')
                  .forEach(el => {
                      let currentFontSize = parseInt(window.getComputedStyle(el).fontSize);
                      let newFontSize = currentFontSize + change;
                      let newLineHeight = newFontSize * 1.6; // Ensure line-height scales properly

                      el.style.setProperty('font-size', `${newFontSize}px`, 'important');
                      el.style.setProperty('line-height', `${newLineHeight}px`, 'important');
                  });

                console.log(`[DEBUG] Updated font size: ${change > 0 ? "Increased" : "Decreased"}`);
            },
            args: [command]
        });
    });
});
