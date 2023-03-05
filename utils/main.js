// @param {CONTENT} is from content.js

const screenText = document.getElementById("screenText")
let content = ""
let isExecuting = false
let isStop = false
let currentWordsArray = ""
let currentWords = ""
screenText.innerHTML = ""

const selectWords = (type) => {
    switch (type) {
        case "aboutMe":
            content = CONTENT.ABOUT_ME
            break
        case "html":
            content = CONTENT.HTML
            break
        case "css":
            content = CONTENT.CSS
            break
        case "js":
            content = CONTENT.JS
            break
        case "vue":
            content = CONTENT.VUE
            break
        default:
            content = ""
            break
    }
}

const typeWord = async () => {
    
    screenText.innerHTML = ""
    currentWordsArray = content.split("")
    currentWords = ""
    if (isExecuting) {
        isStop = true
        return
    }
    await startLoading()
    isExecuting = true
    for(let i = 0; i < currentWordsArray.length; i++) {
        if(isStop){
            isStop = false
            isExecuting = false
            typeWord()
            return
        }
        await timeout(50)
        currentWords += currentWordsArray[i]
        screenText.innerHTML = currentWords
    }
    isExecuting = false
}

const randomTime = () => {
    return Math.floor((Math.random() * 3) + 1)
}

const timeout = (delay) => {
    return new Promise(resolve => setTimeout(resolve, randomTime() * delay))
}

const startLoading = async () => {
    const loadingBlock = document.getElementById("loadingBlock")
    loadingBlock.classList.add("active-loading")
    await timeout(1000)
    loadingBlock.classList.remove("active-loading")
}

const getWordTyping = async (type) => {
    selectWords(type)
    // debounce()
    await typeWord()
    // throttle(await typeWord(), 2000)
}

// let timeoutId
// const debounce = (func, delay) => {
//     clearTimeout(timeoutId)
//     timeoutId = setTimeout(func, delay)
// }

// function throttle(func, delay) {
//     let isThrottled = false;
//     // return function() {
//       if (!isThrottled) {
//         isThrottled = true;
//         func();
//         setTimeout(function() {
//           isThrottled = false;
//         }, delay);
//       }
//     // }
//   }
