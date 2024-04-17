"use client"
import { useState, useEffect } from "react"
import { Rating } from "@mui/material"

export default function Home(){
    

    const [theProducts, setProducts] = useState({})
    const [theProductInfo, setProductInfo] = useState({})
    const [currentUser, setCurrUser] = useState("")
    const [myCMR, setmyCMR] = useState(0)    
    const [theRes, setRes] = useState("")
    const [theResSign, setResSign] = useState("")
    const [theProductId, setProductId] = useState("product2")
    const [theReviews, setTheReviews] = useState({})
    const [theUserReviewText, setUserReviewText] = useState("")
    const [theUserRatings, setUserRating] = useState(5)
    
    

    useEffect(()=>{
        fetch("http://localhost:3000/api/products").then(res => res.json()).then(data => setProducts(data))
    }, [])
    useEffect(()=>{
        fetch("http://localhost:3000/api/products/"+theProductId).then(res => res.json()).then(data => setProductInfo(data))
    }, [theProductId])
    useEffect(()=>{
        fetch("http://localhost:3000/api/reviews/"+theProductId).then(res => res.json()).then(data => setTheReviews(data))
    }, [theProductId, myCMR])
    
    
    function handleProductClick(p){
        setProductId(p)
        document.getElementById("productInfoDiv").style.display = "flex"
    }
    
    function hideTheInfoPopup(){
        document.getElementById("productInfoDiv").style.display = "none"
        setUserReviewText("")
    } 

    async function handleLogin(e){
        e.preventDefault();
        const myUsername = document.getElementById("myUsername").value
        const myPassword = document.getElementById("myPassword").value

        
        const fetchRes = await fetch("http://localhost:3000/api/checkuser", {
        method: "POST",
        body: JSON.stringify({
            "username": myUsername,
            "userpass": myPassword
        })
        }).then(res => res.json())

        setRes(fetchRes.res)
        if(fetchRes.res == "Done"){
            hideTheWHoleLoginPage()
            setCurrUser(fetchRes.username)
        }
    }

    function handleTheUserReviewText(e){
        e.preventDefault()
        if(currentUser != ""){
            fetch("http://localhost:3000/api/addReviews", {
                method: "POST",
                body: JSON.stringify({
                    "theuid":theProductId,
                    "theusername":currentUser,
                    "thereview":theUserReviewText,
                    "theratings":theUserRatings
                })
            }).then(res => res.json()).then(data => {
                if(data.theAddRewRes.acknowledged == true){
                    setmyCMR(myCMR+1)
                    setUserReviewText("")
                }else{
                    alert("Something went wrong")
                }
            })
        }else{
            showTheWHoleLoginPage()
        }
    }

    
    async function handleSignup(e){
        e.preventDefault();
        const myUsername = document.getElementById("myUsernameSign").value
        const myMail = document.getElementById("myMailSign").value
        const myPassword = document.getElementById("myPasswordSign").value

        
        const fetchRes = await fetch("http://localhost:3000/api/addUser", {
        method: "POST",
        body: JSON.stringify({
            "username": myUsername,
            "usermail": myMail,
            "userpass": myPassword
        })
        }).then(res => res.json())

        setResSign(fetchRes.res)
    }
    function showTheWHoleLoginPage(){
        document.getElementById("myLoginPage").style.display = "flex"
    }
    function hideTheWHoleLoginPage(){
        document.getElementById("myLoginPage").style.display = "none"
    }
    function hideLogin(){
        document.getElementsByClassName("myLoginForm")[0].style.display = "none"
        document.getElementsByClassName("mySignupForm")[0].style.display = "flex"
    }
    function showLogin(){
        document.getElementsByClassName("myLoginForm")[0].style.display = "flex"
        document.getElementsByClassName("mySignupForm")[0].style.display = "none"    
    }

    function handleOutClick(e){
        if(e.target.id == "myFormDiv"){
            hideTheWHoleLoginPage()
        }
    }


    
    
    return <>

    <div id="myNavBar">
        <div id="myNavData">
            <ul>
                <li onClick={()=>{
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>Home</li>
                <li onClick={()=>{
                    window.scrollTo({ top: document.getElementById("aboutUsDiv").offsetTop, behavior: 'smooth' });
                }}>About</li>
                <li onClick={()=>{
                    window.scrollTo({ top: document.getElementById("outProductDiv").offsetTop, behavior: 'smooth' });
                }}>Products</li>
                <li>Cart</li>
                {currentUser && currentUser != "" ? <li>Hi, {currentUser}!</li> : <li onClick={showTheWHoleLoginPage}>Login</li>}
            </ul>
        </div>
    </div>

    <div id="headerDiv">
        
            <div id="headerDivData">
                <h1>THE MERAKI BRAND</h1>
                <p>by creators for creators</p>
            </div>
    </div>

    <div id="aboutUsDiv">
        <div id="leftAbout">
            <img src="/images/aboutUs.png"/>
        </div>
        <div id="rightAbout">
            <h2>About Us</h2>
            <p>The Meraki Brand embodies the desire to inspire Our slogan ‘By creators for creators’ highlights the importance of constant creativity and fabrication of one’s individual passions.</p>
            <p>Found by Oscar and Thad, the brand is a symbol of cultural shift and change. Having grown up in and around London, the boys embarked on a new life down south in the ocean city of Plymouth, inspired by the new style of living, the brand was born, producing unique clothing that incorporates London Street and Plymouth seaside culture.</p>
        </div>
    </div>

    <div id="outProductDiv">
        <h1 id="productsTitle">Products</h1>
        <div id="innerProductDiv">            
            {theProducts.theProducts && theProducts.theProducts.map(res => {
                return <div id="product" onClick={()=>{
                    handleProductClick(res.uid)
                }}>
                    <div id="imageHolderforProduct"><img src={"/images/"+res.image}/></div>
                    <Rating value={res.ratings} id="myRatingHome" className="disableHover"/>
                    <h2>{res.name}</h2>
                    <h3>£{res.price}</h3>
                </div>
            }) }
        </div>
    </div>
    <div id="productInfoDiv">
        <div id="innerProductInfo">
            <button id="closeInfoBtn" onClick={hideTheInfoPopup}>X</button>
            {theProductInfo.theProducts && theProductInfo.theProducts.map(res => {
                return <div id="infoDivProduct">
                    <img src={"/images/"+res.image}/>
                    <h2>£{res.price}</h2>
                    <Rating value={res.ratings}  className="disableHover" id="productRevieInfoRating"/>
                    <h3>{res.name}</h3>
                    <p>{res.discription}</p>
                    <button id="addToCartBtn" onClick={()=>{
                        console.log(res.name)
                        handleCartAdd(res.uid, res.name, res.price, res.image)
                    }}>Add to Cart</button>
                </div>
            })}
        <div id="productReviews">
            <h3>Reviews</h3>
            {theReviews.theReview && theReviews.theReview.map(res => {
                return <div id="userReviews">
                    <h4>{res.username}</h4>
                    <Rating value={res.ratings} className="disableHover"/>
                    <p>{res.review}</p>
                </div>
            })}
        </div>
        <div id="addReviews">
            <form onSubmit={handleTheUserReviewText}>
                <Rating id="reviewRatings" value={theUserRatings} onChange={(e)=>{
                    setUserRating(e.target.value)
                }}/>
                <textarea placeholder="Write your Review here" value={theUserReviewText} onChange={(e)=>{
                    setUserReviewText(e.target.value)
                }}></textarea>
                <input type="submit" value="Add Review"/>
            </form> 
        </div>
        
        </div>
    </div>
    
    <div id="myLoginPage" onClick={handleOutClick}>
        <div id="myFormDiv" className="myLoginForm">
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" id="myUsername"/>
            <input type="password" placeholder="Password" id="myPassword"/>
            <input type="submit" value="Login"/>
            <p>{theRes}</p>
            <p id="altBtn" onClick={hideLogin}>Create an Account</p>
        </form>
        </div>

        <div id="myFormDiv" className="mySignupForm">
            <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" id="myUsernameSign"/>
            <input type="text" placeholder="Mail" id="myMailSign"/>
            <input type="password" placeholder="Password" id="myPasswordSign"/>
            <input type="submit" value="Signup"/>
            <p>{theResSign}</p>
            <p id="altBtn" onClick={showLogin}>Login</p>
            </form>
        </div>
    </div>

    
    
    
    </>
}