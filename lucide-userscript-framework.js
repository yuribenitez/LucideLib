// ==UserScript==
// @name         Unified Icon Framework
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @description  Shared static SVG icon library (Lucide + Custom) for Tampermonkey scripts
// @author       benderUnit
// @exclude      *
// ==/UserScript==

(function() {
    'use strict';

    // Prevent double-loading if multiple scripts require this
    if (window.IconFramework) return;

    // ============================================================
    //  1. Lucide Icons Registry
    // ============================================================
    const lucideIcons = {
        'arrow-up-to-line': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg>`,
        'arrow-down-to-line': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>`,
        'maximize': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
        'zoom-in': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`,
        'chevron-left': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
        'chevron-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
        'chevron-up': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
        'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
        'chevrons-down': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></svg>`,
        'chevrons-left': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>`,
        'chevrons-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>`,
        'bookmark': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
        'arrow-big-up': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21V10H5l7-7 7 7h-4v11z"/></svg>`,
        'panel-top-close': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="m15 14-3-3-3 3"/></svg>`,
        'panel-top-open': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="m15 14-3 3-3-3"/></svg>`,
        'copy-plus': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="15" x2="15" y1="12" y2="18"/><line x1="12" x2="18" y1="15" y2="15"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
        'images': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/></svg>`,
        'image': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
        'film': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`,
        'play': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
        'square-play': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 8 6 4-6 4Z"/></svg>`,
        'download': ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>`,
        'scan-search': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/></svg>`
    };

    // ============================================================
    //  2. Custom Icons Registry
    // ============================================================
    const customIcons = {
        'tracker-icon-on': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" version="1.1">
        <path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-linejoin="round" stroke-linecap="round"></path>
        <path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-width="2" stroke-opacity="1" fill="#212629" stroke="#b7cad4"></path>
        <path d="M9,16.5L12,19L16,14" stroke-linejoin="round" stroke-linecap="round" fill="none"></path>
        <path d="M9,16.5L12,19L16,14" stroke-width="2" stroke-opacity="1" fill-opacity=".2" fill="none" stroke="#b7cad4"></path>
        </svg>`,
        'tracker-icon-off': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" version="1.1">
        <path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-linejoin="round" stroke-linecap="round"></path>
        <path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-width="2" stroke-opacity="1" fill="#d93900" stroke="#b7cad4"></path>
        <path d="M9,16.5L12,19L16,14" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="none"></path>
        <path d="M9,16.5L12,19L16,14" stroke-width="2" stroke-opacity="1" fill-opacity=".2" fill="none" stroke="white"></path>
        </svg>`,
        'badgeVisited': `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3327 10.0007C18.3327 12.084 15.8327 16.6673 9.99935 16.6673C4.16602 16.6673 1.66602 12.084 1.66602 10.0007C1.66602 7.91732 4.16602 3.33398 9.99935 3.33398C15.8327 3.33398 18.3327 7.91732 18.3327 10.0007Z" stroke="#EFEEF0" stroke-width="1.5" stroke-linecap="round"></path><path d="M12.4993 10.0007C12.4993 11.3814 11.3801 12.5007 9.99935 12.5007C8.6186 12.5007 7.49935 11.3814 7.49935 10.0007C7.49935 8.6199 8.6186 7.50065 9.99935 7.50065C11.3801 7.50065 12.4993 8.6199 12.4993 10.0007Z" stroke="#EFEEF0" stroke-width="1.5" stroke-linecap="round"></path></svg>`,
        'btnVisited': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.63606 18.3639C9.15077 21.8786 14.8493 21.8786 18.364 18.3639C21.8787 14.8492 21.8787 9.1507 18.364 5.63598C14.8493 2.12126 9.15077 2.12126 5.63606 5.63598C3.87757 7.39447 2.99889 9.6996 3.00002 12.0044L3 13.9999" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 11.9999L3 13.9999L5 11.9999" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 7.99994L11 12.9999L16 12.9999" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        'btnStored': `<svg viewBox="0 0 24 24" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-linejoin="round" stroke-linecap="round"></path><path d="M6,16.5C4.33349609375,16.5,2,15.75,2,12.75C2,9.25,5.5,8.5,6.5,8.5C7,6.75,8,4,12,4C15.5,4,17,6,17.5,7.75C17.5,7.75,22,8.25,22,12.5C22,15.5,20,16.5,18,16.5" stroke-width="2" stroke-opacity="1"></path><path d="M9,16.5L12,19L16,14" stroke-linejoin="round" stroke-linecap="round" fill="none"></path><path d="M9,16.5L12,19L16,14" stroke-width="2" stroke-opacity="1" fill-opacity=".2"></path></svg>`,
        'btnLink': `<svg viewBox="0 0 22 22" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M13.3431396484375,12.1165771484375C12.3792724609375,13.0201416015625,10.8724365234375,12.9959716796875,9.9383544921875,12.061767578125C9.004150390625,11.127685546875,8.9798583984375,9.6207275390625,9.8834228515625,8.656982421875L12.0460205078125,6.49365234375C12.9515380859375,5.5892333984375,14.4012451171875,5.5352783203125,15.37158203125,6.369873046875M15.073486328125,3.466796875C15.6881103515625,2.831298828125,16.5975341796875,2.57666015625,17.4525146484375,2.8006591796875C18.3076171875,3.024658203125,18.9752197265625,3.6923828125,19.199462890625,4.5474853515625C19.4232177734375,5.402587890625,19.1685791015625,6.3118896484375,18.533203125,6.9263916015625L16.37060546875,9.0897216796875C15.4652099609375,9.994140625,14.015380859375,10.048095703125,13.0450439453125,9.2135009765625" fill="none" style="fill:none"/><path d="M13.3431396484375,12.1165771484375C12.3792724609375,13.0201416015625,10.8724365234375,12.9959716796875,9.9383544921875,12.061767578125C9.004150390625,11.127685546875,8.9798583984375,9.6207275390625,9.8834228515625,8.656982421875L12.0460205078125,6.49365234375C12.9515380859375,5.5892333984375,14.4012451171875,5.5352783203125,15.37158203125,6.369873046875M15.073486328125,3.466796875C15.6881103515625,2.831298828125,16.5975341796875,2.57666015625,17.4525146484375,2.8006591796875C18.3076171875,3.024658203125,18.9752197265625,3.6923828125,19.199462890625,4.5474853515625C19.4232177734375,5.402587890625,19.1685791015625,6.3118896484375,18.533203125,6.9263916015625L16.37060546875,9.0897216796875C15.4652099609375,9.994140625,14.015380859375,10.048095703125,13.0450439453125,9.2135009765625" fill="none" style="fill:none"/><path d="M13.3431396484375,12.1165771484375C12.3792724609375,13.0201416015625,10.8724365234375,12.9959716796875,9.9383544921875,12.061767578125C9.004150390625,11.127685546875,8.9798583984375,9.6207275390625,9.8834228515625,8.656982421875L12.0460205078125,6.49365234375C12.9515380859375,5.5892333984375,14.4012451171875,5.5352783203125,15.37158203125,6.369873046875M15.073486328125,3.466796875C15.6881103515625,2.831298828125,16.5975341796875,2.57666015625,17.4525146484375,2.8006591796875C18.3076171875,3.024658203125,18.9752197265625,3.6923828125,19.199462890625,4.5474853515625C19.4232177734375,5.402587890625,19.1685791015625,6.3118896484375,18.533203125,6.9263916015625L16.37060546875,9.0897216796875C15.4652099609375,9.994140625,14.015380859375,10.048095703125,13.0450439453125,9.2135009765625" fill="none" fill-opacity="none" stroke-width="1.5" stroke="#999090" stroke-opacity="0.8"/><path d="M9.625,2.75C6.61181640625,2.75,5.104736328125,2.75,4.0909423828125,3.582275390625C3.9052734375,3.734619140625,3.7349853515625,3.9046630859375,3.582275390625,4.0902099609375C2.75,5.1058349609375,2.75,6.611083984375,2.75,9.625L2.75,11.9166259765625C2.75,15.3734130859375,2.75,17.1021728515625,3.82421875,18.1756591796875C4.898681640625,19.2491455078125,6.6265869140625,19.25,10.0833740234375,19.25L12.375,19.25C15.38818359375,19.25,16.895263671875,19.25,17.909912109375,18.417724609375C18.095703125,18.264892578125,18.264892578125,18.095703125,18.417724609375,17.9097900390625C19.25,16.8941650390625,19.25,15.388916015625,19.25,12.375" fill="none" style="fill:none"/><path d="M9.625,2.75C6.61181640625,2.75,5.104736328125,2.75,4.0909423828125,3.582275390625C3.9052734375,3.734619140625,3.7349853515625,3.9046630859375,3.582275390625,4.0902099609375C2.75,5.1058349609375,2.75,6.611083984375,2.75,9.625L2.75,11.9166259765625C2.75,15.3734130859375,2.75,17.1021728515625,3.82421875,18.1756591796875C4.898681640625,19.2491455078125,6.6265869140625,19.25,10.0833740234375,19.25L12.375,19.25C15.38818359375,19.25,16.895263671875,19.25,17.909912109375,18.417724609375C18.095703125,18.264892578125,18.264892578125,18.095703125,18.417724609375,17.9097900390625C19.25,16.8941650390625,19.25,15.388916015625,19.25,12.375" fill="none" fill-opacity="none"/><path d="M9.625,2.75C6.61181640625,2.75,5.104736328125,2.75,4.0909423828125,3.582275390625C3.9052734375,3.734619140625,3.7349853515625,3.9046630859375,3.582275390625,4.0902099609375C2.75,5.1058349609375,2.75,6.611083984375,2.75,9.625L2.75,11.9166259765625C2.75,15.3734130859375,2.75,17.1021728515625,3.82421875,18.1756591796875C4.898681640625,19.2491455078125,6.6265869140625,19.25,10.0833740234375,19.25L12.375,19.25C15.38818359375,19.25,16.895263671875,19.25,17.909912109375,18.417724609375C18.095703125,18.264892578125,18.264892578125,18.095703125,18.417724609375,17.9097900390625C19.25,16.8941650390625,19.25,15.388916015625,19.25,12.375" fill="none" fill-opacity="none" stroke-width="2" stroke="#999090" stroke-opacity="0.8"/></svg>`
    };

    // Combine both libraries into one searchable registry
    const iconRegistry = { ...lucideIcons, ...customIcons };

    // ============================================================
    //  3. Framework API
    // ============================================================
    window.IconFramework = {

        /**
         * Creates an SVG DOM element.
         * @param {string} iconName - Key from either Lucide or Custom registry.
         * @param {Object} settings - Configuration settings (size, strokeWidth, customClass).
         * @returns {SVGElement|null} The injected SVG element.
         */
        getIcon: function(iconName, settings = {}) {
            if (!iconRegistry[iconName]) {
                console.error(`Icon "${iconName}" not found in framework.`);
                return null;
            }

            const template = document.createElement('template');
            template.innerHTML = iconRegistry[iconName].trim();
            const svgNode = template.content.firstChild;

            // Apply custom CSS classes if defined
            if (settings.customClass) {
                svgNode.classList.add(...settings.customClass.split(' '));
            }

            // Override hardcoded sizes dynamically to ensure uniformity
            if (settings.size) {
                svgNode.setAttribute('width', settings.size);
                svgNode.setAttribute('height', settings.size);
                // Also set inline CSS as a strict override for custom SVGs
                svgNode.style.width = settings.size;
                svgNode.style.height = settings.size;
            }

            // Override stroke-width on the parent SVG tag
            if (settings.strokeWidth) {
                svgNode.setAttribute('stroke-width', settings.strokeWidth);
            }

            return svgNode;
        },

        /**
         * Dynamically add or update an icon in the registry at runtime.
         * @param {string} iconName - The dictionary key for the new icon.
         * @param {string} svgString - The raw SVG template string.
         */
        addIcon: function(iconName, svgString) {
            iconRegistry[iconName] = svgString;
        },

        /**
         * Remove an icon from the registry.
         * @param {string} iconName - The dictionary key of the icon to remove.
         */
        removeIcon: function(iconName) {
            if (iconRegistry[iconName]) {
                delete iconRegistry[iconName];
            }
        }
    };

    // Alias for backward compatibility if scripts still call window.LucideFramework
    window.LucideFramework = window.IconFramework;
})();
