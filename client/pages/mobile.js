import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from "next/head";

const Mobile = () => {

    const [mobile, setmobile] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/api/tshirt/mobile/").then(
            response => response.json()
        ).then(
            data => {
                let mobile = data.mobile
                setmobile(mobile)
            }
        )
    }, [])

    return (
        <>
            <Head>
                <title>Shopclues - mobiles</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="text-gray-600 body-font min-h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap m-4 md:mx-20 justify-center">
                        {Object.keys(mobile).map((item) => {
                            return <div key={mobile[item].id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
                                <Link passHref={true} href={`/product/${mobile[item].id}`} className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={mobile[item].image} />
                                </Link>

                                <Link href={`/product/${mobile[item].id}`}> <div className="mt-4 text-center md:text-left">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">mobile</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{mobile[item].name}</h2>
                                    <p className="mt-1">₹{mobile[item].price}</p>
                                    <div className="mt-1">
                                        {mobile[item].size.includes('S') && <span className='border border-gray-400 px-1 mx-1'>S</span>}
                                        {mobile[item].size.includes('M') && <span className='border border-gray-400 px-1 mx-1'>M</span>}
                                        {mobile[item].size.includes('L') && <span className='border border-gray-400 px-1 mx-1'>L</span>}
                                        {mobile[item].size.includes('XL') && <span className='border border-gray-400 px-1 mx-1'>XL</span>}
                                        {mobile[item].size.includes('XXL') && <span className='border border-gray-400 px-1 mx-1'>XXL</span>}

                                    </div>
                                    <div className='my-1'>
                                        {mobile[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-800 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {mobile[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                                    </div>
                                </div>
                                </Link>
                            </div>
                        })}


                    </div>
                </div>
            </section>
        </>
    )
}


export default Mobile