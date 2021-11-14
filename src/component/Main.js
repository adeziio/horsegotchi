import React, { Component } from 'react';
import './Main.css';
import Title from "./../img/title.png";
import TitlePage from "./../gifs/title-page.gif";
import PlayGame from "./../img/play-game.png";
import Continue from "./../img/continue.png";
import HorseSmile from "./../img/horse-smile.png";
import BabyHorse from "./../img/baby-horse.png";
import HorseSad from "./../img/horse-sad.png";
import HorseHappy from "./../img/horse-happy.png";
import HorseIntrigue from "./../img/horse-intrigue.png";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPage: true,
            playerNameInputPage: false,
            horseNameInputPage: false,
            playerName: "",
            horseName: "",
            introPage: false,
            introPageNumber: 0,
        }
    }

    showPlayerNameInput = () => {
        this.setState({
            menuPage: false,
            playerNameInputPage: true
        })
    }

    showPetNameInput = () => {
        if (this.state.playerName !== "") {
            this.setState({
                playerNameInputPage: false,
                horseNameInputPage: true
            })
        }
    }

    savePlayerName = (e) => {
        this.setState({
            playerName: e.target.value
        })
    }

    saveHorseName = (e) => {
        this.setState({
            horseName: e.target.value
        })
    }

    showIntro = () => {
        if (this.state.horseName !== "") {
            this.setState({
                horseNameInputPage: false,
                introPage: true
            })
        }
    }

    incrementIntroPageNumber = () => {
        this.setState((prevState) => ({
            introPageNumber: prevState.introPageNumber + 1
        }))
    }


    render() {
        const {
            menuPage,
            playerNameInputPage,
            horseNameInputPage,
            playerName,
            horseName,
            introPage,
            introPageNumber
        } = this.state;

        const getIntroPage = () => {
            if (introPageNumber === 0) {
                return (
                    <>
                        <img alt="title_page" src={HorseSmile} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            This is
                            <span className="orange"> {this.state.horseName} </span>.
                            You and
                            <span className="orange"> {this.state.horseName} </span>
                            have been best friends for a very long time.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 1) {
                return (
                    <>
                        <img alt="title_page" src={BabyHorse} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            In fact,
                            <span className="orange"> {this.state.horseName} </span>
                            came to you as an orphaned foal.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 2) {
                return (
                    <>
                        <img alt="title_page" src={HorseSad} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            <span className="orange"> {this.state.horseName}</span>
                            's favorite snacks are carrots. It's unfortunate that Herald is allergic to it.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 3) {
                return (
                    <>
                        <img alt="title_page" src={HorseHappy} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            HOWEVER,
                            <span className="orange"> {this.state.horseName}</span>
                            's 100th birthday is coming up so you asked the doctor if
                            <span className="orange"> {this.state.horseName} </span>
                            could have a tiny bit of carrot.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 4) {
                return (
                    <>
                        <img alt="title_page" src={HorseSmile} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            Now you and
                            <span className="orange"> {this.state.horseName} </span>
                            have to wait for the doctor's reply.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 5) {
                return (
                    <>
                        <img alt="title_page" src={HorseIntrigue} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            Oh wait! The doctor's mail has arrived.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 6) {
                return (
                    <>
                        <img alt="title_page" src={HorseIntrigue} />
                        <div className="text-box" >
                            To be continued...
                        </div>
                    </>
                )
            }
        }

        return (
            <div>
                <div className="center">
                    <img src={Title} alt="name" />
                </div>
                <div className="container">
                    {menuPage ? (
                        <div>
                            <img alt="title_page" src={TitlePage} />
                            <button className="top-button">
                                <img src={PlayGame} alt="play_game" onClick={this.showPlayerNameInput} />
                            </button>
                        </div>
                    ) : (
                        playerNameInputPage ? (
                            <div>
                                <img alt="title_page" src={TitlePage} />
                                <div className="text-box">What's your name? (Not that important)</div>
                                <form className="form-box">
                                    <input key="1" type="text" placeholder="Name" onChange={this.savePlayerName} />
                                </form>
                                <button class="top-button" onClick={this.showPetNameInput}>
                                    <img src={Continue} alt="continue_button"></img>
                                </button>
                            </div>
                        ) : (
                            horseNameInputPage ? (
                                <div>
                                    <img alt="title_page" src={TitlePage} />
                                    <div className="text-box">Name your pet horse.</div>
                                    <form className="form-box">
                                        <input key="2" type="text" placeholder="Name" onChange={this.saveHorseName} />
                                    </form>
                                    <button className="top-button" onClick={this.showIntro}>
                                        <img src={Continue} alt="continue_button"></img>
                                    </button>
                                </div>
                            ) : null
                        )
                    )}

                    {introPage ?
                        <div>
                            {getIntroPage()}
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}
