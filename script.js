function toCamelCase(str){
    return str.split('-').map((word, index) => {
        if(index == 0){
            return word;
        } else {
            console.log(word[0].toUpperCase() + word.slice(1));
            console.log('slice', word.slice(1));
            return word[0].toUpperCase() + word.slice(1);
        }
    }).join('');
}

console.log(toCamelCase('the_stealth-warrior'));