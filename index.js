const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '6984e1cb07msh9ef0598ba4c9455p19d87ajsnd592972b4b4f',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        q: 'Hello World!',
        source: 'en',
        target: 'de'
    })
};
async function translateText() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const translatedText = result.data.translations.translatedText[0];
        console.log(translatedText);
    } catch (error) {
        console.error(error);
    }
}
translateText();