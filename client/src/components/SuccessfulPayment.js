import React from "react";
import gifImage from "../img/gif2.gif"

const SuccessfulPayment = () => {
    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center ">
          <div className=" w-[750px] h-[600px] m-auto shadow-lg bg-white rounded-lg">
                <div className="flex flex-col items-center  h-screen">
                    <img src={gifImage} className="max-w-[400px]" />

                    <div className="text-center">
                        <p className="text-green-500 text-4xl font-bold">Your Payment is successful !</p>
                        <p className="font-semibold text-gray-700 p-7 ">You will be receiving a confirmation email with order details.</p>
                        <a href= "http://localhost:3000"className="font-bold bg-gray-500 rounded-lg  text-xl text-white p-3  ">Back to Home</a>
                    </div>
                </div>
         </div>

        </div>
    
    )
}


export default SuccessfulPayment;