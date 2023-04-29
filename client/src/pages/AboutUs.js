import React from "react";
import photo from "../img/team.jpg"
import e1 from "../img/TomCook.jpg"
import e2 from "../img/KristinWatson.jpg"
import e3 from "../img/FloydMiles.jpg"
import e4 from "../img/AliciaBell.jpg"

const  AboutUs =  ()  => {
    return (
        <div className='w-full h-full  bg-gray-900'>
            <div className='max-w-[1240px] mx-auto'>
                <div className='text-center'>
                    <h2 className='text-5xl py-8 font-bold text-gray-200 '>Shop the latest and greatest in Yoox.</h2>
                    <p className='text-3xl p-4 text-gray-400'>We are changing the way people buy.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-2 px-2 text-center">
                     <div className='border py-8 rounded-xl shadow-xl'>
                        <p className='text-5xl font-bold text-orange-500'>100%</p>
                        <p className='text-gray-300 mt-2'>Completion</p>
                     </div>
                     <div className='border py-8 rounded-xl shadow-xl'>
                        <p className='text-5xl font-bold text-orange-500'>24/7</p>
                        <p className='text-gray-300 mt-2'>Delivery</p>
                     </div>
                     <div className='border py-8 rounded-xl shadow-xl'>
                        <p className='text-5xl font-bold text-orange-500'>100K</p>
                        <p className='text-gray-300 mt-2'>Transaction</p>
                     </div>
                </div>
        </div>
        <div className='w-full h-screen mt-24'>
                    <div className=" w-full h-[700px] bg-gray-900/90 absolute">
                        <img className= 'w-full h-full object-cover mix-blend-overlay ' src={photo} alt="/" />
                    </div>

                    <div className='max-w-[1240px] mx-auto text-white relative'>
                        <div className='px-3 py-5'>
                            <h2 className= 'text-5xl pt-8 text-white  uppercase text-center'>Our team</h2>
                            <h3 className='text-3xl py-6 text-gray-200 text-left'>Working hard together to bring you the best shopping experience.Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</h3>
                            <p></p>
                        </div>
                        
                        <div className='grid grid-cols- h-[570px] md:grid-cols-4 gap-10 px-4  md:pt-14 text-black '>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8 text-center'>
                                    <img className='w-[200px] rounded-full ' src ={e1} />
                                    <h3 className="font-bold pt-6 py-4 text-orange-500  text-2xl">Tom Cook</h3>
                                    <p>Web Developer</p>
                                </div>
                                
                            </div>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8 text-center'>
                                    <img className='w-[200px] rounded-full ' src= {e2} />
                                    <h3 className="font-bold pt-6 py-4 text-orange-500 text-2xl">Kristin Watson</h3>
                                    <p>UX-Designer</p>
                                </div>
                                
                            </div>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8 text-center'>
                                    <img className='w-[200px] rounded-full ' src={e3}/>
                                    <h3 className="font-bold text-2xl text-orange-500 py-4 pt-6">Floyd Miles</h3>
                                    <p>Content Creator</p>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8 text-center'>
                                    <img className='w-[200px] rounded-full ' src={e4} />
                                    <h3 className="font-bold pt-6 py-4 text-orange-500 text-2xl">Alicia Bell</h3>
                                    <p>Customer Service Representative</p>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    )

}




export default AboutUs