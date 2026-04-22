import React, { useState } from 'react'
import './Login.css'

const Login = ({ users, setUsers, setCurrentUser, setShowLogin }) => {

    const [signState, setSignState] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    const handleSignup = (e) => {
        e.preventDefault();

        const newUser = {
            id: users.length,
            username,
            email,
            password,
            hand_warmers_placed: []
        };

        setUsers(prev => {
            const updated = [...prev, newUser];
            console.log("Updated users:", updated);
            return updated;
        });


        setCurrentUser(newUser);


        setShowLogin(false);


        setUsername("");
        setEmail("");
        setPassword("");
    };



    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            console.log("Logged in:", foundUser);
            setCurrentUser(foundUser);
            setShowLogin(false);   // ⭐ CLOSE POPUP
        }
        else {
            console.log("Invalid email or password");
        }
    };






    return (
        <div className='signState-container'>
            <div onClick={() => setShowLogin(false)}>X</div>
            {signState === "login" ? <h1>Log In</h1> : <h1>Sign up</h1>}

            <form onSubmit={signState === "signup" ? handleSignup : handleLogin}>


                {signState === "signup" && (
                    <input
                        required
                        className="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}

                <input
                    required
                    className="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    className="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='account-exist'>
                    {signState === "login" ?
                        <div>Don't have an account? <span onClick={() => setSignState("signup")}>Click here</span></div> :
                        <div>Already have an account? <span onClick={() => setSignState("login")}>Click here</span></div>}


                </div>
                <button className='submit' type="submit">{signState === "login" ? "Log In" : "Sign Up"}</button>

            </form>
        </div>
    )
}

export default Login
