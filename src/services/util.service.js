
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    debounce,
    animateCSS,
    getTimeStamp,
    getExistingProperties
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}


export function animateCSS(el, animation, options = {}) {

    const { isRemoveClass = true } = options

    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}


export function debounce(func, delay) {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}


export function getExistingProperties(obj) {
    const truthyObj = {}
    for (const key in obj) {
        const val = obj[key]
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val
        }
    }
    return truthyObj
}

function getTimeStamp() {

    const now = new Date();

    // Define options for the desired format
    const options = {
        weekday: 'short', // "Monday", "Tuesday", etc.
        year: 'numeric', // "2025"
        month: 'short',   // "September", "October", etc.
        day: 'numeric',  // "30"
        hour: '2-digit', // "09", "10", etc.
        minute: '2-digit', // "31", "05", etc.
        second: '2-digit', // "00", "15", etc.
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formatedDate = formatter.format(now)
    return formatedDate
}


