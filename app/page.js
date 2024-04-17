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
    const [theCartRec, setCartRec] = useState({})
    const [mySubTotal, setSubTotal] = useState(0)
    const [reloadCart, setReloadCart] = useState(0)
    
    

    useEffect(()=>{
        fetch("http://localhost:3000/api/products").then(res => res.json()).then(data => setProducts(data))
    }, [])
    useEffect(()=>{
        fetch("http://localhost:3000/api/products/"+theProductId).then(res => res.json()).then(data => setProductInfo(data))
    }, [theProductId])
    useEffect(()=>{
        fetch("http://localhost:3000/api/reviews/"+theProductId).then(res => res.json()).then(data => setTheReviews(data))
    }, [theProductId, myCMR])
    useEffect(()=>{
        fetch("http://localhost:3000/api/cart").then(res => res.json()).then(data => setCartRec(data))
    }, [reloadCart])
    useEffect(()=>{
        var theTotalAMount = 0;
        theCartRec.myAllCookies && theCartRec.myAllCookies.map(res => {
            const myCartDataAsJSON = JSON.parse(res.value)
            const thePriceIntoUnit = myCartDataAsJSON.price * myCartDataAsJSON.quantity
            theTotalAMount += thePriceIntoUnit
        })
        setSubTotal(theTotalAMount)
    }, [theCartRec])
    
    
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

    function showCart(){
        const theCartDiv = document.getElementById("myCartDiv")

        if(theCartDiv.className == "hidden"){
            theCartDiv.style.display = "flex";
            theCartDiv.className = "notHidden"
        }else{
            theCartDiv.style.display = "none";
            theCartDiv.className = "hidden"
        }
    }


    function handleCartAdd(id,pname,price,image){
        fetch("http://localhost:3000/api/cart/addCart/", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
                "pname": pname,
                "price": price,
                "image": image
            })
        }).then(res => res.json()).then(res => {
            if(res.res == "Done"){
                setReloadCart(reloadCart+1)
            }else{
                if(res.res != "Limit"){
                    alert("Something Went Wrong")
                }else{
                    alert("You can only Add Upto 5 Units")
                }
            }
        })       
        
        document.getElementById("myCartDiv").style.display = "flex";
        document.getElementById("myCartDiv").className = "notHidden"
    }

    function deleteThisFromCart(id){
        fetch("http://localhost:3000/api/cart/deleteCart/", {
            method: "POST",
            body: JSON.stringify({
                "id": id
            })
        }).then(res => res.json()).then(res => {
            if(res.res == "Done"){
                setReloadCart(reloadCart+1)
            }else{
                alert("Something Went Wrong")
            }
        })
    }

    function updateTheUnits(id, newq){
        console.log(id, newq)

        fetch("http://localhost:3000/api/cart/updateUnits/", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
                "q": newq
            })
        }).then(res => res.json()).then(res => {
            if(res.res != "Done"){
                console.log(res.res)
                alert("SOmething Went Wrong")
            }else{                
                setReloadCart(reloadCart+1)
            }
        })
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
                <li onClick={showCart}>Cart</li>
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

    <div id="myCartDiv" className="hidden">
        <button id="closeCartBtn" onClick={showCart}>X</button>
        <div id="innerCartDiv">

            {theCartRec.myAllCookies && theCartRec.myAllCookies.map(res => {
                var mySelectLoop = [1,2,3,4,5,6,7,8,9,10];
                if(res.name != "_ga"){
                    const myCartJson = JSON.parse(res.value)
                    return <div id="cartData">
                        <button id="removefromCart" onClick={()=>{
                            deleteThisFromCart(myCartJson.id)
                        }}>X</button>
                        <img src={"/images/"+myCartJson.image}/>
                        <select onChange={(e)=>{
                            updateTheUnits(myCartJson.id, e.target.value)
                        }}>
                            {mySelectLoop.map(res => {
                                if(res == myCartJson.quantity){
                                    return <option selected>{res}</option>
                                }
                                else{
                                    return <option>{res}</option>
                                }
                            })}
                        </select>
                        <h3>£ {myCartJson.price}</h3>
                        <p>{myCartJson.pname}</p>
                    </div>
                }
            })}
            <div id="cartSubtotal">
                {mySubTotal && mySubTotal!=0 ? <button>£{mySubTotal} Buy Now</button> : <button>Cart is Empty</button>}
            </div>
        </div>
    </div>

    
    
    
    </>
}