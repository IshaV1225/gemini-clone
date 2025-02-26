/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {
    
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
            {/** Show default home page with greet and cards if there have been no prompts */}
            {/** If showResult is NOT true (is false), show default page, else, if its true, show the result recieved from Gemini */}
            {!showResult ?
                <>
                    <div className="greet">
                        <p><span>Hello There!</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    {/**
                     * <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstrom team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                     */}
                    
                </>
            : 
            <div className='result'> 
                {/** Display the prompt and user */}
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                {/** Display the recieved data (text) from gemini and icon */}
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    
                    {/** If loading is true, display a loading animation, else, display the recieved text
                     * use 'dangerouslySetInnerHTML' to avoid any existing tags of improper fomatting */}
                    {loading ?
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                    :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                </div>
            </div> 
            }

            <div className="main-bottom">
                <div className="search-box">
                    {/** OnChange of input field, the input state variable value is set to the current prompt by the user */}
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask me anything...'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? 
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        : null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-chek its responses.
                </p>

            </div>
        </div>
    </div>
  )
}

export default Main