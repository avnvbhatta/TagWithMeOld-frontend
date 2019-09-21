import React from "react"

function SignUpForm(props){
    return(
        <div>
            <form onSubmit={props.handleSubmit}>
                <input 
                    type="text"
                    name="first_name"
                    value={props.data.first_name} 
                    placeholder="First Name"
                    onChange={props.handleChange}
                />
                <br />
                <input 
                    type="text"
                    name="last_name"
                    value={props.data.last_name} 
                    placeholder="Last Name"
                    onChange={props.handleChange}
                />  
                <br />
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
                    name="password1"
                    value={props.data.password1} 
                    placeholder="Password"
                    onChange={props.handleChange}
                /> 
                <input 
                    type="password"
                    name="password2"
                    value={props.data.password2} 
                    placeholder="Re-Enter Password"
                    onChange={props.handleChange}
                /> 
                <br />
                <button>Sign Up</button>
            </form>
            

        </div>
    )
}

export default SignUpForm