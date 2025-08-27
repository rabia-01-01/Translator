import React, { useState } from "react";

const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "zh-Hans", name: "Chinese (Simplified)" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
    { code: "ta", name: "Tamil" }

];

const RAPID_URL = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
const RAPID_KEY = "6984e1cb07msh9ef0598ba4c9455p19d87ajsnd592972b4b4f";
const RAPID_HOST = "deep-translate1.p.rapidapi.com";

export default function Translator() {
    const [input, setInput] = useState("");
    const [lang, setLang] = useState("hi");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleTranslate = async () => {
        if (!input.trim()) {
            setErrorMsg("Please enter some text to translate.");
            return;
        }
        setLoading(true);
        setOutput("");
        setErrorMsg("");

        try {
            const response = await fetch(RAPID_URL, {
                method: "POST",
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_APP_X_RapidAPI_Key,
                    "x-rapidapi-host": RAPID_HOST,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: input,
                    source: "en",
                    target: lang
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Translation failed");
                setOutput("[No translation received]");
            } else {
                const translatedText = data.data?.translations?.translatedText[0] || "[No translation received]";
                setOutput(translatedText);
            }
        } catch {
            setErrorMsg("Network or API error occurred.");
            setOutput("[No translation received]");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg ring-2 ring-orange-300">
            <h1 className="text-center text-3xl font-extrabold mb-8 text-orange-600">
                Text Translator
            </h1>

            <textarea
                placeholder="Type English text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition"
            />

            <div className="mt-6 flex items-center space-x-3">
                <label htmlFor="language" className="font-semibold text-gray-700">
                    To:
                </label>
                <select
                    id="language"
                    className="flex-grow rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                >
                    {languages.map(({ code, name }) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>

                <button
                    disabled={loading || !input.trim()}
                    onClick={handleTranslate}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition 
                      ${loading || !input.trim() ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
                >
                    {loading ? "Translating..." : "Translate"}
                </button>
            </div>

            {errorMsg && (
                <p className="mt-4 text-center text-red-600 font-medium">{errorMsg}</p>
            )}

            <div className="mt-6 min-h-[80px] bg-orange-50 rounded-lg p-5 text-gray-800 whitespace-pre-wrap text-lg font-medium shadow-inner select-text transition">
                {output || "Translation will appear here..."}
            </div>
        </div>
    );
}
