import React from "react"

function LogInForm(props){
    return(
        <div>
            <form onSubmit={props.handleSubmit}>
                <input 
                    type="text"
                    name="email"
                    value={props.data.email} 
                    placeholder="Email"
                    onChange={props.handleChange}
                />  
                <br />
                <input 
                    type="password"
                    name="password"
                    value={props.data.password} 
                    placeholder="Password"
                    onChange={props.handleChange}
                /> 
                <br />
                <button>Log In</button>
            </form>
            

        </div>
    )
}

export default LogInForm