// ! 	gets a HTML string, returns the number of words.
// TODO findElementByName("<div><h3 class="class__name">hello world!</h3></div>", 'h3');
// ?  	<h3 class="class__name">hello world!</h3>
export const wordCount = (text) => {
    const str = text.toLowerCase().replace(/[.,/#!@\\$%^&*;:{}=\-_`~()]/g, "");
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        // ! checks the a and i letters
        if ((str[i] === 'a') || (str[i] === 'i')) {
            if (str[i + 1] === ' ') {
                counter++;
                continue;
            }
        }
        // ! checks the rest of the letters
        if ((str[i] === ' ') && (str[i + 1] !== ' ')) {
            if (str[i + 1]) {
                counter++;
            }
        }
    }
    return counter;
}

// ! 	gets a string and the desired length.
// TODO changeStringLength("i am michael scharff", 12);
// ?  	i am michael
export const changeStringLength = (str, desiredLength) => {
    while (str.length > desiredLength) {
        str = str.substring(0, str.length - 1);
    }
};

// ! 	gets a HTML string, the element you want to exclude and true if its a react component. returns only the element.
// TODO findElementByName("<div><h3 class="class__name">hello world!</h3></div>", 'h3');
// ?  	<h3 class="class__name">hello world!</h3>
export const findElementByName = (str, elementToFind, isReactComponent = false) => {
    let newStr = '';
    const startIndex = str.indexOf(`<${elementToFind}`);
    const secondIndex = str.indexOf(`</${elementToFind}>`, (startIndex + 1));
    let endIndex = 0;
    newStr = str[startIndex];
    if (isReactComponent) {
        endIndex = str.indexOf(`/>`, (startIndex + 1)) + 2;
    } else {
        endIndex = secondIndex + elementToFind.length + 3;
    }
    const range = endIndex - startIndex;
    for (let i = 1; i < range; i++) {
        newStr += str[startIndex + i];
    }
    return newStr;
}

// ! 	gets an array of numbers and removes all the duplictes from it
// TODO removeDuplicates([1,1,1,2,2,3,4,5,5,5,4])
// ?  	[1,2,3,4,5]
export const removeDuplicates = (nums) => {
    let pointer = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[i + 1]) {
            nums[pointer] = nums[i];
            pointer++;
        }
    }
    return nums;
};

// ! 	gets an array of strings and sorts them by frequency.
// TODO sortArrayByFrequency(['hi','hi','html','hi','html','israel','html','hi','css','hello','css','css','html','hello','html','hi','hello','hi'])
// ?  	[hi, html, hello, css, israel]
export const sortArrayByFrequency = (articles) => {
    const keywordCounts = {};
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const keyword = article.keyword;
        if (keyword in keywordCounts) {
            keywordCounts[keyword]++;
        } else {
            keywordCounts[keyword] = 1;
        }
    }

    const sortedKeywords = Object.keys(keywordCounts).sort((a, b) => {
        return keywordCounts[b] - keywordCounts[a];
    });

    return sortedKeywords;
};

// ! 	gets an array of keywords and creates a string formatted like this: "Keyword 1, Keyword 2, Keyword 3, and N others".
// TODO formatKeywordsString([hi, html, hello, css, israel])
// ?  	'hi, html, hello, and 2 others'
export const formatKeywordsString = (keywordsArray) => {
    const MAX_DISPLAY_COUNT = 3;
    let displayCount = 0;
    let otherCount = 0;
    let outputString = '';

    for (let i = 0; i < keywordsArray.length; i++) {
        if (displayCount < MAX_DISPLAY_COUNT) {
            outputString += `${keywordsArray[i]}, `;
            displayCount++;
        } else {
            otherCount++;
        }
    }

    outputString = outputString.slice(0, -2);
    if (otherCount > 0) {
        if (displayCount > 0) {
            outputString += ',';
        }
        outputString += ` and ${otherCount} other${otherCount > 1 ? 's' : ''}`;
    }

    return outputString;
};

// ! 	gets a string and returns it with the first word capitalized
// TODO capitalizeFirstWord('hello world.')
// ?  	Hello world.
export const capitalizeFirstWord = (str) => {
    return str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
};

// ! 	gets a string path and returns the simplest path possible
// TODO simplifyPath('/home//foo/')
// ?  	/home/foo
export const simplifyPath = (path) => {
    const stack = [];
    const parts = path.split('/');
    for (const part of parts) {
        if (part === '' || part === '.') {
        } else if (part === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }
    return '/' + stack.join('/');
};

// ! 	gets a string and returns it as 5 words and ... at the end
// TODO shortenString("This is a long string with more than five words in it.")
// ?  	This is a long string with ...
export const shortenString = (str) => {
    let words = str.trim().split(/\s+/);
    let shortStr = words.slice(0, 5).join(" ");
    if (words.length > 5) {
        shortStr += " ...";
    }
    return shortStr;
};

// ! 	gets 2 locations and calculates distance between them (lat, lng)
// TODO calcDistance({ lat1: 31.89286, lon1: 35.03255, lat2: 31.88159, lon2: 34.99352 })
// ?  	3.892
export const calcDistance = ({ lat1, lon1, lat2, lon2 }) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return (distance.toFixed(3));
};

// ! 	gets a numeric degree and converts it to radians
// TODO deg2rad(31.88159 - 31.89286)
// ?  	-0.00019669860669975517
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// ! 	gets a string and removes the first letter
// TODO removeFirstLetter('ABCD')
// ?  	BCD
export const removeFirstLetter = (str) => {
    let tempStr = '';
    for (let i = 1; i < str.length; i++) {
        tempStr += str[i];
    }
    return tempStr;
};

// ! 	gets a string and index and removes the letter in the index
// TODO removeIndexedLetter('ABCD', 1), removeIndexedLetter('ABCD', 4)
// ?  	BCD, ABC
export const removeIndexedLetter = (str, index) => {
    let tempStr = '';
    for (let i = 0; i < str.length; i++) {
        if (i !== index - 1) {
            tempStr += str[i];
        }
    }
    return tempStr;
};

// ! 	gets a number and returns 1 if its positive -1 if its negative 0 if its 0 or null
// TODO signFunc(Number)
// ?  	123 ==> 1 | -123 ==> -1 | 0 ==> 0 | null/undifiend/NaN ==> 0
export const signFunc = (num) => {
    if (num > 0) {
        return 1;
    } else if (num < 0) {
        return -1;
    } else if (num === 0 || !num) {
        return 0;
    }
};

// ! 	gets a credit card number and returns a string XXXX XXXX XXXX XXXX 
// TODO formatCreditCardNumber(1111222233334444)
// ?  	1111 2222 3333 4444
export const formatCreditCardNumber = (number) => {
    const str = number.toString();
    let formattedText = '';
    for (let i = 0; i < str.length; i++) {
        if ((i + 1) % 4 === 0) {
            if (i < 15) {
                formattedText += `${str[i]} `;
            } else {
                formattedText += str[i];
            }
        } else {
            formattedText += str[i];
        }
    }
    return formattedText;
};