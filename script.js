// Main application JavaScript for demo functionality

// Demo function for the button
function showInfo() {
    alert('This is a demo page. The DevTools detection system is running in the background.');
}

// Additional DevTools detection methods for enhanced coverage
class EnhancedDevToolsDetector {
    constructor() {
        this.additionalChecks();
    }

    additionalChecks() {
        // Method: Monitor for keyboard shortcuts
        this.monitorKeyboardShortcuts();
        
        // Method: Monitor console object tampering
        this.monitorConsoleObjectTampering();
        
        // Method: Detect via element inspection
        this.detectElementInspection();
    }

    monitorKeyboardShortcuts() {
        const devToolsShortcuts = [
            { key: 'F12' },
            { key: 'I', ctrlKey: true, shiftKey: true },
            { key: 'J', ctrlKey: true, shiftKey: true },
            { key: 'C', ctrlKey: true, shiftKey: true },
            { key: 'K', ctrlKey: true, shiftKey: true },
            { key: 'U', ctrlKey: true },
            { key: 'S', ctrlKey: true }
        ];

        document.addEventListener('keydown', (e) => {
            const shortcut = devToolsShortcuts.find(s => 
                e.key === s.key && 
                !!e.ctrlKey === !!s.ctrlKey && 
                !!e.shiftKey === !!s.shiftKey &&
                !!e.altKey === !!s.altKey
            );

            if (shortcut) {
                // Small delay to allow DevTools to open
                setTimeout(() => {
                    if (window.devToolsDetector) {
                        const result = window.devToolsDetector.detectDevTools();
                        window.devToolsDetector.handleDevToolsStateChange(result.detected, 'Keyboard Shortcut');
                    }
                }, 100);
            }
        });
    }



    monitorConsoleObjectTampering() {
        // Store original console methods
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info,
            debug: console.debug
        };

        // Override console methods to detect usage
        Object.keys(originalConsole).forEach(method => {
            console[method] = function(...args) {
                // If console is being used, there's a chance DevTools is open
                setTimeout(() => {
                    if (window.devToolsDetector) {
                        const result = window.devToolsDetector.detectDevTools();
                        if (result.detected) {
                            window.devToolsDetector.handleDevToolsStateChange(true, 'Console Usage');
                        }
                    }
                }, 10);
                
                return originalConsole[method].apply(console, args);
            };
        });
    }

    detectElementInspection() {
        // Create a hidden element that changes when inspected
        const detectElement = document.createElement('div');
        detectElement.style.display = 'none';
        detectElement.innerHTML = '<p>DevTools Detection Element</p>';
        document.body.appendChild(detectElement);

        // Monitor for changes to the element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    if (window.devToolsDetector) {
                        window.devToolsDetector.handleDevToolsStateChange(true, 'Element Inspection');
                    }
                }
            });
        });

        observer.observe(detectElement, {
            attributes: true,
            childList: true,
            subtree: true
        });

        // Also monitor for right-click events that might open context menu
        document.addEventListener('contextmenu', (e) => {
            setTimeout(() => {
                if (window.devToolsDetector) {
                    const result = window.devToolsDetector.detectDevTools();
                    if (result.detected) {
                        window.devToolsDetector.handleDevToolsStateChange(true, 'Context Menu');
                    }
                }
            }, 200);
        });
    }
}

// Initialize enhanced detection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the main detector to initialize
    setTimeout(() => {
        new EnhancedDevToolsDetector();
    }, 1000);
});



// Prevent common bypass attempts
(function() {
    'use strict';
    
    // Disable common debugging methods
    const originalEval = window.eval;
    window.eval = function(code) {
        if (typeof code === 'string' && code.includes('devToolsDetector')) {
            return;
        }
        return originalEval.call(this, code);
    };

    // Monitor for script injection attempts
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'SCRIPT') {
                        const scriptContent = node.textContent || node.innerHTML;
                        if (scriptContent.includes('devToolsDetector') || 
                            scriptContent.includes('clearInterval') ||
                            scriptContent.includes('warning-overlay')) {
                            node.remove();
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Protect against common anti-detection techniques
    let propertyDescriptor = Object.getPropertyDescriptor(window, 'console');
    if (!propertyDescriptor || propertyDescriptor.configurable) {
        Object.defineProperty(window, 'console', {
            value: window.console,
            writable: false,
            configurable: false
        });
    }
})();

// Add additional visual indicators
function addVisualIndicators() {
    // Add a small indicator in the corner when DevTools detection is active
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(231, 76, 60, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        z-index: 1000;
        user-select: none;
        pointer-events: none;
        font-family: Arial, sans-serif;
    `;
    indicator.textContent = '🛡️ DevTools Detection Active';
    document.body.appendChild(indicator);

    // Make the indicator pulse
    setInterval(() => {
        indicator.style.opacity = indicator.style.opacity === '0.5' ? '1' : '0.5';
    }, 1500);
}

// Initialize visual indicators
document.addEventListener('DOMContentLoaded', addVisualIndicators); 
