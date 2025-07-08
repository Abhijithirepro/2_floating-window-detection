/* Basic page styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
}

h2 {
    color: #34495e;
    margin-bottom: 15px;
}

p {
    margin-bottom: 15px;
}

button {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

button:hover {
    background: #2980b9;
}

.content {
    margin-top: 30px;
    padding: 20px;
    background: #ecf0f1;
    border-radius: 5px;
}

/* Warning Overlay Styles */
.warning-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(231, 76, 60, 0.95);
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    animation: warningPulse 2s infinite alternate;
}

.warning-overlay.hidden {
    display: none;
}

.warning-content {
    background: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 5px solid #e74c3c;
    position: relative;
    overflow: hidden;
}

.warning-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #e74c3c);
    animation: warningStripe 2s linear infinite;
}

.warning-header {
    text-align: center;
    margin-bottom: 20px;
}

.warning-header h2 {
    color: #e74c3c;
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.warning-body {
    text-align: center;
    margin-bottom: 30px;
}

.warning-body p {
    font-size: 1.2em;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 500;
}

.warning-footer {
    border-top: 2px solid #ecf0f1;
    padding-top: 20px;
}

#detection-log {
    max-height: 200px;
    overflow-y: auto;
}

#detection-log h3 {
    color: #e74c3c;
    margin-bottom: 15px;
    font-size: 1.3em;
}

#log-entries {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    border-left: 4px solid #e74c3c;
}

.log-entry {
    background: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border-left: 3px solid #f39c12;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #2c3e50;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.log-entry:last-child {
    margin-bottom: 0;
}

.timestamp {
    color: #7f8c8d;
    font-weight: bold;
}

.detection-method {
    color: #e74c3c;
    font-weight: bold;
}

.cross-tab-warning {
    background: #f39c12;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: 15px;
    border-left: 4px solid #e67e22;
    animation: crossTabPulse 1.5s infinite;
}

@keyframes crossTabPulse {
    0%, 100% {
        background: #f39c12;
    }
    50% {
        background: #e67e22;
    }
}

/* Animations */
@keyframes warningPulse {
    0% {
        background: rgba(231, 76, 60, 0.9);
    }
    100% {
        background: rgba(231, 76, 60, 0.95);
    }
}

@keyframes warningStripe {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

/* Prevent user interactions when warning is shown */
.warning-overlay.active ~ .container {
    pointer-events: none;
    filter: blur(2px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .warning-content {
        width: 95%;
        padding: 20px;
    }
    
    .warning-header h2 {
        font-size: 2em;
    }
    
    .warning-body p {
        font-size: 1em;
    }
}

/* Anti-tampering styles - make it harder to hide via inspect element */
.warning-overlay {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
}

/* High specificity to prevent easy override */
body .warning-overlay#devtools-warning.warning-overlay {
    display: flex !important;
    position: fixed !important;
    z-index: 999999 !important;
}

body .warning-overlay#devtools-warning.warning-overlay.hidden {
    display: none !important;
} 
