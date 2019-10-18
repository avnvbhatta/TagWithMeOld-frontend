import React from "react"
import "Components/Profile/styles.profile.scss"
import * as Vibrant from 'node-vibrant'


class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imgVibrant: "",
            imgDarkVibrant: "",
            imgMuted: "",
            backgroundImage: "",
            userImgURL: "/Images/abhinav.jpg"

        }
    }

    componentDidMount(){
        
        Vibrant.from(this.state.userImgURL).getPalette()
        .then((palette) => {
            console.log(palette)
            this.setState({
                imgVibrant: palette.Vibrant.hex,
                imgDarkVibrant: palette.DarkVibrant.hex,
                imgMuted: palette.Muted.hex,
                background: {
                    backgroundImage: 
                    "linear-gradient(to bottom, "+palette.Vibrant.hex+" , "+palette.Muted.hex+")"
                },
                imgShadow:{
                    filter: "drop-shadow(0 0 3rem "+palette.LightVibrant.hex+")"
                }

            })
        })
        

        
    }

    render(){
        return(
            <div className="profile-container">
                <div className="profile-main" style={this.state.background}>
                    <div className="profile-user-image">
                        <img src={this.state.userImgURL} style={this.state.imgShadow} alt=""/>
                    </div>
                    <div className="profile-user-name">
                        <h1>Abhinav Bhatta</h1>
                    </div>
                    <div className="profile-user-location">
                        <img src="/Images/icon-locate.svg" alt=""/>
                        <h2>Stockton, CA</h2>
                    </div>
                    <div className="profile-user-social">
                        <img src="Images/facebook.svg" alt=""/>
                        <img src="Images/twitter.svg" alt=""/>
                        <img src="Images/instagram.svg" alt=""/>
                    </div>
                    <div className="profile-user-message">
                        <button><h2>message</h2></button>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="profile-events">
                    <div>Once Abhinav selects events, it will show up here.</div>
                </div>
                <div className="separator"></div>
                <div className="profile-likes">
                    <div>Once Abhinav selects stuff he likes, it will show up here.</div>
                </div>
            </div>
        )
    }

}

export default Profile