// Updated Clean Language Manager for JungleCode
// Includes handling for additional translation keys
document.addEventListener('DOMContentLoaded', () => {
    console.log('Language manager initialized');
    initLanguageManager();
});

// Global variables
let currentLanguage = 'en';
let translations = {
    en: {},
    jp: {}
};

// Initialize language manager
async function initLanguageManager() {
    try {
        console.log('Loading language files...');
        
        // Try to load translations
        await loadTranslations();
        
        // Setup language switchers
        setupLanguageSwitchers();
        
        // Apply initial translations
        applyTranslations(currentLanguage);
    } catch (error) {
        console.error('Failed to initialize language manager:', error);
    }
}

// Load translations with multiple approaches
async function loadTranslations() {
    // Potential paths to try for language files
    const possiblePaths = [
        { en: 'assets/lang/en.json', jp: 'assets/lang/jp.json' },
        { en: './assets/lang/en.json', jp: './assets/lang/jp.json' },
        { en: '/assets/lang/en.json', jp: '/assets/lang/jp.json' },
        { en: '../assets/lang/en.json', jp: '../assets/lang/jp.json' },
        // Add absolute paths for debugging
        { en: window.location.origin + '/assets/lang/en.json', jp: window.location.origin + '/assets/lang/jp.json' }
    ];
    
    // Get the base path from the current script URL
    const scriptPath = getCurrentScriptPath();
    if (scriptPath) {
        // Add script-relative paths
        const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
        const langPath = basePath.substring(0, basePath.lastIndexOf('/')) + '/lang/';
        possiblePaths.unshift({
            en: langPath + 'en.json',
            jp: langPath + 'jp.json'
        });
    }
    
    let success = false;
    let loadedTranslations = { en: null, jp: null };
    
    // Debug info
    console.log('Attempting to load translations from the following paths:');
    possiblePaths.forEach(path => {
        console.log(`EN: ${path.en}, JP: ${path.jp}`);
    });
    
    for (const paths of possiblePaths) {
        try {
            console.log('Trying paths:', paths);
            
            // Try to load each language file independently
            let enData = null;
            let jpData = null;
            
            try {
                const enResponse = await fetch(paths.en, { cache: 'no-store' });
                if (enResponse.ok) {
                    enData = await enResponse.json();
                    console.log('Loaded English translations from:', paths.en);
                    loadedTranslations.en = enData;
                } else {
                    console.warn(`Failed to load English translations from ${paths.en}. Status: ${enResponse.status}`);
                }
            } catch (err) {
                console.warn('Error loading English translations:', err);
            }
            
            try {
                const jpResponse = await fetch(paths.jp, { cache: 'no-store' });
                if (jpResponse.ok) {
                    jpData = await jpResponse.json();
                    console.log('Loaded Japanese translations from:', paths.jp);
                    loadedTranslations.jp = jpData;
                } else {
                    console.warn(`Failed to load Japanese translations from ${paths.jp}. Status: ${jpResponse.status}`);
                }
            } catch (err) {
                console.warn('Error loading Japanese translations:', err);
            }
            
            if (enData || jpData) {
                // Apply any loaded translations
                if (enData) {
                    translations.en = enData;
                }
                
                if (jpData) {
                    translations.jp = jpData;
                }
                
                success = true;
                // Don't break here - try to load both languages from all possible paths
            }
        } catch (err) {
            console.log(`Error loading from paths:`, paths, err);
            // Continue to next path
        }
    }
    
    // Final check - use any translations that were loaded
    if (loadedTranslations.en) {
        translations.en = loadedTranslations.en;
        success = true;
    }
    
    if (loadedTranslations.jp) {
        translations.jp = loadedTranslations.jp;
        success = true;
    }
    
    // Log the loaded translations
    console.log('Final loaded translations:', {
        en: translations.en ? Object.keys(translations.en).length + ' keys' : 'Not loaded',
        jp: translations.jp ? Object.keys(translations.jp).length + ' keys' : 'Not loaded'
    });
    
    if (!success) {
        console.error('Could not load any translation files from any path');
    }
    
    return success;
}

// Get the path of the current script
function getCurrentScriptPath() {
    // Try to get the current script
    const scripts = document.getElementsByTagName('script');
    const currentScript = document.currentScript; // Modern browsers
    
    if (currentScript) {
        return currentScript.src;
    }
    
    // Fallback for older browsers
    for (const script of scripts) {
        if (script.src && script.src.includes('language-manager')) {
            return script.src;
        }
    }
    
    return null;
}

// Set up event listeners for language switchers
function setupLanguageSwitchers() {
    // Header language toggle
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        console.log('Language toggle button found');
        languageToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'jp' : 'en';
            console.log(`Switching language from ${currentLanguage} to ${newLang}`);
            switchLanguage(newLang);
        });
    } else {
        console.warn('Language toggle button not found');
    }
    
    // Footer language options
    const footerLanguageOptions = document.querySelectorAll('.language-option');
    if (footerLanguageOptions.length > 0) {
        console.log(`Found ${footerLanguageOptions.length} footer language options`);
        
        footerLanguageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                console.log(`Footer language option clicked: ${lang}`);
                
                if (lang && (lang === 'en' || lang === 'jp')) {
                    // Check if translations exist before switching
                    if (!translations[lang] || Object.keys(translations[lang]).length === 0) {
                        console.error(`Cannot switch to ${lang} - translations not available`);
                        // Fallback - try to reload the translations
                        reloadTranslationFile(lang).then(success => {
                            if (success) {
                                switchLanguage(lang);
                                updateActiveLanguageOption(lang, footerLanguageOptions);
                            } else {
                                console.error(`Failed to load ${lang} translations after retry`);
                            }
                        });
                    } else {
                        switchLanguage(lang);
                        updateActiveLanguageOption(lang, footerLanguageOptions);
                    }
                }
            });
        });
    } else {
        console.warn('No footer language options found');
    }
}

// Update active class for language options
function updateActiveLanguageOption(lang, options) {
    options.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        }
    });
}

// Force reload of a specific translation file
async function reloadTranslationFile(lang) {
    const paths = [
        `assets/lang/${lang}.json`,
        `./assets/lang/${lang}.json`,
        `/assets/lang/${lang}.json`,
        `../assets/lang/${lang}.json`,
        `${window.location.origin}/assets/lang/${lang}.json`
    ];
    
    for (const path of paths) {
        try {
            console.log(`Attempting to reload ${lang} translations from: ${path}`);
            const response = await fetch(path, { 
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    translations[lang] = data;
                    console.log(`Successfully reloaded ${lang} translations with ${Object.keys(data).length} keys`);
                    return true;
                }
            } else {
                console.warn(`Failed to reload from ${path}. Status: ${response.status}`);
            }
        } catch (err) {
            console.warn(`Error reloading from ${path}:`, err);
        }
    }
    
    return false;
}

// Apply translations to the UI
function applyTranslations(lang) {
    if (!translations[lang] || Object.keys(translations[lang]).length === 0) {
        console.error(`Translations for ${lang} not available or empty`);
        return;
    }
    
    console.log(`Applying translations for language: ${lang}`);
    
    // Apply translations using data-lang attributes
    const elementsWithLang = document.querySelectorAll('[data-lang]');
    console.log(`Found ${elementsWithLang.length} elements with data-lang attributes`);
    
    elementsWithLang.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (!key) return;
        
        try {
            const value = getNestedProperty(translations[lang], key);
            
            if (value !== undefined) {
                element.textContent = value;
            } else {
                console.warn(`Missing translation for key: ${key} in language: ${lang}`);
            }
        } catch (err) {
            console.error(`Error applying translation for key ${key}:`, err);
        }
    });
    
    // Apply translations to placeholders
    const elementsWithPlaceholder = document.querySelectorAll('[data-lang-placeholder]');
    console.log(`Found ${elementsWithPlaceholder.length} elements with data-lang-placeholder attributes`);
    
    elementsWithPlaceholder.forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (!key) return;
        
        try {
            const value = getNestedProperty(translations[lang], key);
            
            if (value !== undefined) {
                element.placeholder = value;
            } else {
                console.warn(`Missing placeholder translation for key: ${key} in language: ${lang}`);
            }
        } catch (err) {
            console.error(`Error applying placeholder translation for key ${key}:`, err);
        }
    });
    
    // Apply translations to select options
    const selectElements = document.querySelectorAll('select option[data-lang]');
    console.log(`Found ${selectElements.length} select options with data-lang attributes`);
    
    selectElements.forEach(option => {
        const key = option.getAttribute('data-lang');
        if (!key) return;
        
        try {
            const value = getNestedProperty(translations[lang], key);
            
            if (value !== undefined) {
                option.textContent = value;
            } else {
                console.warn(`Missing select option translation for key: ${key} in language: ${lang}`);
            }
        } catch (err) {
            console.error(`Error applying select option translation for key ${key}:`, err);
        }
    });
    
    // Special handling for elements without data-lang attributes
    updateSpecialElements(lang);
    
    // Update page title if translation exists
    if (translations[lang].siteTitle) {
        document.title = translations[lang].siteTitle;
    }
}

// Special handling for elements without data-lang attributes
function updateSpecialElements(lang) {
    // Footer "Languages:" text
    const languagesText = document.querySelector('.footer-language > p');
    if (languagesText && translations[lang].footer && translations[lang].footer.languages) {
        languagesText.textContent = translations[lang].footer.languages;
    }
    
    // Dropdown placeholders
    updateDropdownPlaceholders(lang);
    
    // Update privacy policy link text
    const privacyLink = document.querySelector('.footer-link[href="/privacy"]');
    if (privacyLink && translations[lang].footer && translations[lang].footer.links && 
        translations[lang].footer.links[0] && translations[lang].footer.links[0].label) {
        privacyLink.textContent = translations[lang].footer.links[0].label;
    }
    
    // Update terms of service link text
    const termsLink = document.querySelector('.footer-link[href="/terms"]');
    if (termsLink && translations[lang].footer && translations[lang].footer.links && 
        translations[lang].footer.links[1] && translations[lang].footer.links[1].label) {
        termsLink.textContent = translations[lang].footer.links[1].label;
    }

    // Update "Deliverable:" labels
    updateDeliverableLabels(lang);
    
    // Update "Challenge:" and "Solution:" labels
    updateChallengeLabels(lang);
}

// Update dropdown placeholders
function updateDropdownPlaceholders(lang) {
    // Market presence dropdown placeholder
    const marketPresenceSelect = document.getElementById('marketPresence');
    if (marketPresenceSelect) {
        const firstOption = marketPresenceSelect.querySelector('option[disabled][selected]');
        if (firstOption && translations[lang].contact && translations[lang].contact.selectPresence) {
            firstOption.textContent = translations[lang].contact.selectPresence;
        }
    }
    
    // Timeline dropdown placeholder
    const timelineSelect = document.getElementById('timeline');
    if (timelineSelect) {
        const firstOption = timelineSelect.querySelector('option[disabled][selected]');
        if (firstOption && translations[lang].contact && translations[lang].contact.selectTimeline) {
            firstOption.textContent = translations[lang].contact.selectTimeline;
        }
    }
}

// Update "Deliverable:" labels in process steps
function updateDeliverableLabels(lang) {
    const deliverableLabels = document.querySelectorAll('.step-deliverable');
    
    if (deliverableLabels.length > 0 && 
        translations[lang].process && 
        translations[lang].process.steps && 
        translations[lang].process.steps[0] && 
        translations[lang].process.steps[0].deliverableLabel) {
        
        const labelText = translations[lang].process.steps[0].deliverableLabel;
        
        deliverableLabels.forEach(label => {
            // Get the current text
            const currentText = label.textContent;
            // Check if the text starts with "Deliverable:" (or its translation)
            if (currentText.includes(':')) {
                // Only replace the label part, keeping the actual deliverable content
                const contentPart = currentText.split(':')[1];
                label.textContent = labelText + contentPart;
            }
        });
    }
}

// Update "Challenge:" and "Solution:" labels
function updateChallengeLabels(lang) {
    if (translations[lang].challenges) {
        // Handle "Challenge:" labels
        if (translations[lang].challenges.challengeLabel) {
            const challengeLabels = document.querySelectorAll('.challenge-text p:first-child strong');
            challengeLabels.forEach(label => {
                label.textContent = translations[lang].challenges.challengeLabel;
            });
        }
        
        // Handle "Solution:" labels
        if (translations[lang].challenges.solutionLabel) {
            const solutionLabels = document.querySelectorAll('.challenge-text p:last-child strong');
            solutionLabels.forEach(label => {
                label.textContent = translations[lang].challenges.solutionLabel;
            });
        }
    }
}

// Main function to switch language
function switchLanguage(lang) {
    if (!translations[lang] || Object.keys(translations[lang]).length === 0) {
        console.error(`Translations for ${lang} not available or empty`);
        return false;
    }
    
    currentLanguage = lang;
    
    // Update language toggle button text
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.textContent = lang === 'en' ? 'EN | JP' : 'JP | EN';
    }
    
    // Apply the translations
    applyTranslations(lang);
    
    return true;
}

// Helper function to get nested property using dot notation
function getNestedProperty(obj, path) {
    if (!obj || !path) return undefined;
    
    try {
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            // Handle array indices
            if (key.includes('[') && key.includes(']')) {
                const propName = key.substring(0, key.indexOf('['));
                const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
                
                if (current[propName] && Array.isArray(current[propName]) && current[propName][index] !== undefined) {
                    current = current[propName][index];
                } else {
                    return undefined;
                }
            }
            // Regular property access
            else if (current[key] !== undefined) {
                current = current[key];
            } else {
                return undefined;
            }
        }
        
        return current;
    } catch (err) {
        console.error(`Error getting nested property for path ${path}:`, err);
        return undefined;
    }
}