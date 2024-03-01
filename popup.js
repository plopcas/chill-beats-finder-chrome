document.addEventListener('DOMContentLoaded', function () {
    // Restore checkbox states when the popup is opened
    const checkboxes = ['search-youtube', 'search-vimeo', 'search-dailymotion', 'search-soundcloud', 'search-spotify'];

    checkboxes.forEach(id => {
        chrome.storage.local.get([id], function (result) {
            document.getElementById(id).checked = result[id] !== undefined ? result[id] : true; // default to true if not set
        });
    });

    document.getElementById('search-btn').addEventListener('click', function () {
        const query = document.getElementById('search-query').value;
        if (query) {
            checkboxes.forEach(id => {
                const isChecked = document.getElementById(id).checked;
                // Save the current state
                chrome.storage.local.set({ [id]: isChecked });

                // Perform search if checked
                if (isChecked) {
                    const urls = {
                        'search-youtube': `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
                        'search-vimeo': `https://vimeo.com/search?q=${encodeURIComponent(query)}`,
                        'search-dailymotion': `https://www.dailymotion.com/search/${encodeURIComponent(query)}`,
                        'search-soundcloud': `https://soundcloud.com/search/sounds?q=${encodeURIComponent(query)}`,
                        'search-spotify': `https://open.spotify.com/search/${encodeURIComponent(query)}`
                    };
                    chrome.tabs.create({ url: urls[id] });
                }
            });
        }
    });
});
