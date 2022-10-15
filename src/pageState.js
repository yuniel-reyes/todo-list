//  Keep track of the current page
const inPage = (() => {

    return {
        statePage: {
            'inbox': false,
            'today': false,
            'thisWeek': false,
        }
    }
})();

// Export inPage IIFE 
export {
    inPage
}