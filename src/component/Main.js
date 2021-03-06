import React, { Component } from 'react';
import { Icon, Progress } from 'semantic-ui-react';
import './Main.css';
import Title from "./../img/title.png";
import TitlePage from "./../gifs/title-page.gif";
import PlayGame from "./../img/play-game.png";
import Continue from "./../img/continue.png";
import HorseSmile from "./../img/horse-smile.png";
import HorseBaby from "./../img/horse-baby.png";
import HorseSad from "./../img/horse-sad.png";
import HorseHappy from "./../img/horse-happy.png";
import HorseIntrigue from "./../img/horse-intrigue.png";
import HorseDead from "./../img/horse-dead.png";
import MailAlert from "./../img/mail-alert.png";
import MailOpen from "./../img/mail-open.png";
import HorseIdle from "./../gifs/horse-idle.gif";
import HorseCarrot from "./../gifs/horse-carrot.gif";
import HorseHandHeart from "./../gifs/horse-hand-heart.gif";
import HorseWalk from "./../gifs/horse-walk.gif";
import Carrot from "./../img/carrot.png";
import CarrotClicked from "./../img/carrot-clicked.png";
import HandHeart from "./../img/hand-heart.png";
import HandHeartClicked from "./../img/hand-heart-clicked.png";
import Walk from "./../img/walk.png";
import WalkClicked from "./../img/walk-clicked.png";
import Music from "./../music/smilin-and-vibin.mp3";
import { Howl } from 'howler';

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
            gamePage: false,
            dayCounter: 1,
            secondCounter: 0,
            activity: "",
            hungerValue: 100,
            affectionValue: 100,
            fatigueValue: 0,
            isDead: false,
            showCredit: false,
            score: 0,
            hasSound: true,
            sound: new Howl({
                src: [Music]
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);

    }

    tick() {
        const activity = this.state.activity;
        this.checkDead();
        if (this.state.gamePage && !this.state.isDead) {
            if (!this.state.sound.playing([Music])) {
                this.state.sound.play();
            }
            this.handleDayIncrement();
            if (activity === "feed") {
                this.setState(prevState => ({
                    hungerValue: prevState.hungerValue < 100 ? prevState.hungerValue + 5 : prevState.hungerValue,
                    affectionValue: prevState.affectionValue > 0 ? prevState.affectionValue - 1 : prevState.affectionValue,
                    fatigueValue: prevState.fatigueValue > 0 ? prevState.fatigueValue - 1 : prevState.fatigueValue,
                    score: prevState.score + 350
                }));
            }
            else if (activity === "pet") {
                this.setState(prevState => ({
                    hungerValue: prevState.hungerValue > 0 ? prevState.hungerValue - 5 : prevState.hungerValue,
                    affectionValue: prevState.affectionValue < 100 ? prevState.affectionValue + 5 : prevState.affectionValue,
                    fatigueValue: prevState.fatigueValue < 100 ? prevState.fatigueValue + 1 : prevState.fatigueValue,
                    score: prevState.score + 150
                }));
            }
            else if (activity === "walk") {
                this.setState(prevState => ({
                    hungerValue: prevState.hungerValue > 0 ? prevState.hungerValue - 5 : prevState.hungerValue,
                    affectionValue: prevState.affectionValue > 0 ? prevState.affectionValue - 2 : prevState.affectionValue,
                    fatigueValue: prevState.fatigueValue < 100 ? prevState.fatigueValue + 5 : prevState.fatigueValue,
                    score: prevState.score + 550
                }));
            }
            else {
                this.setState(prevState => ({
                    hungerValue: prevState.hungerValue > 0 ? prevState.hungerValue - 1 : prevState.hungerValue,
                    affectionValue: prevState.affectionValue > 0 ? prevState.affectionValue - 2 : prevState.affectionValue,
                    fatigueValue: prevState.fatigueValue > 0 ? prevState.fatigueValue - 1 : prevState.fatigueValue
                }));
            }
        }
    }

    handleDayIncrement = () => {
        this.setState(prevState => ({
            secondCounter: prevState.secondCounter + 1
        }), () => {
            if (this.state.secondCounter % 60 === 0 && !this.isDead) {
                this.setState(prevState => ({
                    dayCounter: prevState.dayCounter + 1
                }))
            }
        })
    }

    checkDead = () => {
        if (this.state.hungerValue <= 0 || this.state.hungerValue > 100 || this.state.affectionValue <= 0 || this.state.fatigueValue > 100) {
            this.setState({
                isDead: true
            }, () => {
                this.state.sound.stop();
            })
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
        else {
            this.setState({
                playerName: "Bob"
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
        else {
            this.setState({
                horseName: "Herald"
            })
        }
    }

    incrementIntroPageNumber = () => {
        this.setState((prevState) => ({
            introPageNumber: prevState.introPageNumber + 1
        }))
    }

    setActivity = (activity) => {
        if (activity === "feed") {
            this.setState({
                activity: this.state.activity !== "feed" ? "feed" : "",
            })
        }
        else if (activity === "pet") {
            this.setState({
                activity: this.state.activity !== "pet" ? "pet" : ""
            })
        }
        else if (activity === "walk") {
            this.setState({
                activity: this.state.activity !== "walk" ? "walk" : ""
            })
        }
    }

    toggleClickedCarrot = () => {
        this.setActivity("feed");
    }

    toggleClickedHandHeart = () => {
        this.setActivity("pet");
    }

    toggleClickedWalk = () => {
        this.setActivity("walk");
    }

    toggleShowCredits = () => {
        this.setState({
            showCredit: true
        })
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    toggleSound = () => {
        this.setState(prevState => ({
            hasSound: !prevState.hasSound
        }), () => {
            if (this.state.hasSound) {
                if (!this.state.sound.playing([Music])) {
                    this.state.sound.play();
                }
            }
            else {
                this.state.sound.stop();
            }
        })
    }

    render() {
        const {
            menuPage,
            playerNameInputPage,
            horseNameInputPage,
            playerName,
            horseName,
            introPage,
            introPageNumber,
            gamePage,
            dayCounter,
            activity,
            hungerValue,
            affectionValue,
            fatigueValue,
            isDead,
            showCredit,
            score,
            hasSound
        } = this.state;

        const getIntroPage = () => {
            if (introPageNumber === 0) {
                return (
                    <>
                        <img className="container" alt="title_page" src={HorseSmile} />
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
                        <img className="container" alt="title_page" src={HorseBaby} />
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
                        <img className="container" alt="title_page" src={HorseSad} />
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
                        <img className="container" alt="title_page" src={HorseHappy} />
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
                        <img className="container" alt="title_page" src={HorseSmile} />
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
                        <img className="container" alt="title_page" src={HorseIntrigue} />
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            Oh look! The doctor's mail has arrived.
                        </div>
                    </>
                )
            }
            else if (introPageNumber === 6) {
                return (
                    <>
                        <img className="container" alt="title_page" src={HorseSmile} />
                        <button className="container-mail" onClick={this.incrementIntroPageNumber}>
                            <img src={MailAlert} alt="mail" />
                        </button>
                    </>
                )
            }
            else if (introPageNumber === 7) {
                return (
                    <>
                        <img className="container" alt="title_page" src={HorseHappy} />
                        <button className="container-mail" onClick={this.incrementIntroPageNumber}>
                            <img src={MailOpen} alt="mail" />
                        </button>
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            Yay! Doctor says
                            <span className="orange"> {this.state.horseName} </span>
                            can have carrots!
                        </div>
                    </>
                )
            }
            else {
                this.setState({
                    introPage: false,
                    gamePage: true
                })
            }
        }

        const getGamePage = () => {
            return (
                <>
                    {!isDead ?
                        <>
                            {getActivityDisplay()}
                            {getInfoDisplay()}
                            {getSoundDisplay()}
                            <div class="grid-container">
                                <button className="icons-button" title="Feed" onClick={this.toggleClickedCarrot}>
                                    <img className="button-img" src={activity === "feed" ? CarrotClicked : Carrot} alt="feed" />
                                </button>
                                <button className="icons-button" title="Pet" onClick={this.toggleClickedHandHeart}>
                                    <img className="button-img" src={activity === "pet" ? HandHeartClicked : HandHeart} alt="pet" />
                                </button>
                                <button className="icons-button" title="Walk" onClick={this.toggleClickedWalk}>
                                    <img className="button-img" src={activity === "walk" ? WalkClicked : Walk} alt="walk" />
                                </button>
                            </div>
                        </>
                        : <>{getDeathDisplay()}</>
                    }
                </>
            )
        }

        const getActivityDisplay = () => {
            return (
                <>
                    <img className="container" alt="title_page"
                        src={
                            activity === "feed" ?
                                HorseCarrot :
                                activity === "pet" ?
                                    HorseHandHeart :
                                    activity === "walk" ?
                                        HorseWalk :
                                        (hungerValue < 20 || affectionValue < 20 || fatigueValue > 80) ?
                                            HorseSad : HorseIdle


                        }
                    />
                    {hungerValue > 0 && hungerValue < 20 ?
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            <span className="orange"> {this.state.horseName} </span>
                            is feeling hungry!
                        </div> : null
                    }
                    {affectionValue > 0 && affectionValue < 20 ?
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            <span className="orange"> {this.state.horseName} </span>
                            is feeling sad!
                        </div> : null
                    }
                    {fatigueValue > 80 && fatigueValue < 100 ?
                        <div className="text-box" onClick={this.incrementIntroPageNumber}>
                            <span className="orange"> {this.state.horseName} </span>
                            is feeling tired!
                        </div> : null
                    }
                </>
            )
        }

        const getInfoDisplay = () => {
            return (
                <>
                    <div className="activity-bar">
                        <div className="activity-item">
                            <label >Hunger: </label>
                            <Progress
                                className="progress-bar"
                                percent={hungerValue}
                                success={hungerValue >= 70 ? true : false}
                                warning={hungerValue < 70 && hungerValue > 20 ? true : false}
                                error={hungerValue <= 20 ? true : false}
                                size='tiny'
                            >
                            </Progress>
                        </div>
                        <div className="activity-item">
                            <label >Affection: </label>
                            <Progress
                                className="progress-bar"
                                percent={affectionValue}
                                success={affectionValue >= 70 ? true : false}
                                warning={affectionValue < 70 && affectionValue > 20 ? true : false}
                                error={affectionValue <= 20 ? true : false}
                                size='tiny'
                            >
                            </Progress>
                        </div>
                        <div className="activity-item">
                            <label>Fatigue: </label>
                            <Progress
                                className="progress-bar"
                                percent={fatigueValue}
                                success={fatigueValue <= 30 ? true : false}
                                warning={fatigueValue < 80 && fatigueValue > 30 ? true : false}
                                error={fatigueValue >= 80 ? true : false}
                                size='tiny'
                            >
                            </Progress>
                        </div>
                    </div>

                    <div className="counter">Day: {dayCounter} </div>
                    <div className="score">Score: {score} </div>
                </>
            )
        }

        const getDeathDisplay = () => {
            return (
                <>
                    {!showCredit ?
                        <>
                            <div className="game-over">Game Over</div>
                            <div className="counter">Day: {dayCounter} </div>
                            <div className="score">Score: {score} </div>
                            <img className="container" alt="title_page" src={HorseDead} />
                            <div className="text-box" onClick={this.toggleShowCredits}>
                                <span className="orange"> {this.state.horseName} </span>
                                {this.state.hungerValue <= 0 ? 'starved to death...' : null}
                                {this.state.hungerValue > 100 ? 'got fat and died...' : null}
                                {this.state.affectionValue <= 0 ? 'is sad to death...' : null}
                                {this.state.fatigueValue > 100 ? 'is tired to death...' : null}
                            </div>
                        </>
                        :
                        <>
                            <h1>Thanks for playing!</h1>
                        </>
                    }
                </>
            )
        }

        const getSoundDisplay = () => {
            return (
                <>
                    <div className="sound" onClick={this.toggleSound}><Icon name={hasSound ? 'volume up' : 'volume off'} size='large' /></div>
                </>
            )
        }

        return (
            <div>
                <div className="center">
                    <img className="center" src={Title} alt="name" onClick={this.refreshPage} />
                </div>
                <div className="container">
                    {menuPage ? (
                        <div>
                            <img className="container" alt="title_page" src={TitlePage} />
                            <button className="top-button">
                                <img src={PlayGame} alt="play_game" onClick={this.showPlayerNameInput} />
                            </button>
                        </div>
                    ) : (
                        playerNameInputPage ? (
                            <div>
                                <img className="container" alt="title_page" src={TitlePage} />
                                <div className="text-box">What's your name? (Not that important)</div>
                                <form className="form-box">
                                    <input key="1" type="text" placeholder="Name" value={playerName} onChange={this.savePlayerName} />
                                </form>
                                <button class="top-button" onClick={this.showPetNameInput}>
                                    <img src={Continue} alt="continue_button"></img>
                                </button>
                            </div>
                        ) : (
                            horseNameInputPage ? (
                                <div>
                                    <img className="container" alt="title_page" src={TitlePage} />
                                    <div className="text-box">Name your pet horse.</div>
                                    <form className="form-box">
                                        <input key="2" type="text" placeholder="Name" value={horseName} onChange={this.saveHorseName} />
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

                    {gamePage ?
                        <div>
                            {getGamePage()}
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}
