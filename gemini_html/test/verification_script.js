
// verification_script.js
// Run this in the browser console of the respective pages.

const TESTS = {
    GDEDSE: async () => {
        console.group('Testing GDEDSE Privacy');
        try {
            // Check if .agent is in the file list
            const cards = document.querySelectorAll('.file-card');
            let foundAgent = false;
            cards.forEach(card => {
                if (card.innerText.includes('.agent')) foundAgent = true;
            });
            
            if (foundAgent) {
                console.error('FAIL: .agent directory is visible!');
            } else {
                console.log('PASS: .agent directory is hidden.');
            }
            
            // Validate Folder Count (should not include .agent)
            const statsText = document.getElementById('totalFolders').innerText;
            console.log('Info: Total folders displayed:', statsText);

        } catch (e) {
            console.error('Error running GDEDSE tests:', e);
        }
        console.groupEnd();
    },

    AED13WE: async () => {
        console.group('Testing AED13WE Display');
        try {
            // Assume we are in a state where content should be loaded (mimic click or check after load)
            // If we are just on the list view, we might need to trigger a view.
            
            // Check for Iframe
            const iframe = document.querySelector('iframe');
            if (iframe) {
                console.error('FAIL: iframe element found!');
            } else {
                console.log('PASS: No iframe element found.');
            }

            // Check Back Button
            const backBtn = document.querySelector('.back-button');
            if (backBtn && backBtn.offsetParent !== null) { // offsetParent is null if display: none
                 console.error('FAIL: Back button is visible!');
            } else {
                console.log('PASS: Back button is hidden or removed.');
            }

             // Check Content Container
            const contentFrame = document.getElementById('contentFrame');
            if(contentFrame) {
                 console.log('PASS: Content frame exists.');
                 // Check if it has content (only valid if a file is loaded)
                 if(contentFrame.children.length > 0 || contentFrame.innerText.trim().length > 0) {
                     console.log('PASS: Content frame is not empty.');
                 }
            } else {
                 console.error('FAIL: Content frame #contentFrame not found.');
            }

        } catch (e) {
            console.error('Error running AED13WE tests:', e);
        }
        console.groupEnd();
    }
};

console.log('Verification Script Loaded. Run TESTS.GDEDSE() or TESTS.AED13WE()');
