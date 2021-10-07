export const jsonToArray = (jsonObject) => {
    const returnThis = [];
    Object.keys(jsonObject).forEach(key => returnThis.push({ name: key, value: jsonObject[key]}));
    return returnThis;
}

export const constructTime = (hours, minutes, tod) => {
    return ( hours + ":" + minutes + " " + tod );
}

export const finalizeTimeArray = (array) => {
    var finalArray = []
    array.forEach(element => {
        if(element.length < 2) {
            element = "0" + element;
        }
        finalArray.push(element);
    });
    return finalArray;
}
