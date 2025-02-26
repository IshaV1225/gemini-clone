/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    // States to keep track of types input by user
    const [input, setInput] = useState('');   //save input data
    const [recentPrompt, setRecentPrompt] = useState('');  //when send icon is clicked, prompt from input will be saved here and Displayed in Main component
    const [prevPrompts, setPrevPrompts] = useState([]);    // Array to save prompts and display in sidebar
    const [showResult, setShowResult] = useState(false);   // Once true, it will hide the Main Cards and display result
    const [loading, setLoading] = useState(false);          // If true, it will show 'Loading' animation, and when data is displayed, it will turn false
    const [resultData, setResultData] = useState('');       // Display our result on the data page

    //Delay the displayed text
    const delayParagraph = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        // Toggle between old and new chats, if prompt is new, give new response and add to side bar, else run prompt from recent chats
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }else{
            //Save chats in sidebar
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        
        //Whereever we encounter '**' in the response text, bold the text in between
        let responseArray = response.split("**");
        let newResponse = "";

        for(let i = 0; i < responseArray.length; i++){
            if (i === 0 || i % 2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+ responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayParagraph(i, nextWord + " ")
        }

        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider