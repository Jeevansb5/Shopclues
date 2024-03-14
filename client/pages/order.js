import React, { useEffect, useState } from 'react'
import Head from "next/head";
import { useRouter } from 'next/router';

const Order = ({ clearCart, product, order }) => {
    const router = useRouter();
    useEffect(() => {
        if (router.query.clearCart == 1) {
            clearCart()
        }
    }, [])
    return (
        <>
            <Head>
                <title>Shopclues - Order</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPCLUES.COM</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order[0].order_id}</h1>

                            <p className="leading-relaxed mb-2">Your Order has been succefully placed.</p>

                            <div className="flex mb-4">
                                <a className="flex-grow text-center py-2 text-lg px-1">Description</a>
                                <a className="flex-grow text-center py-2 text-lg px-1">Quantity</a>
                                <a className="flex-grow text-center py-2 text-lg px-1">Price</a>
                            </div>

                            {Object.keys(product).map((item) => {
                                return <div key={item} className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500 mx-0">{product[item].name}({product[item].size}/{product[item].color}) </span>
                                    <span className=" text-gray-500 mx-auto">{order[0].quantity}</span>
                                    <span className=" text-gray-900 mx-auto">₹{product[item].price} X {order[0].quantity} = ₹{product[item].price * order[0].quantity} </span>
                                </div>
                            })}

                            <div className="flex flex-col">
                                <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order[0].price}</span>
                            </div>
                            <div className='my-2'>
                                <button className="flex mx-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>

                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded" src={product[0].image} />
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const prod = await fetch(`http://localhost:8080/api/products/${context.query.pid}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    let res = await prod.json()
    let product = res.product

    const ord = await fetch(`http://localhost:8080/api/order/oid/${context.query.oid}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    let res2 = await ord.json()
    let order = res2.order

    return {
        props: { product: JSON.parse(JSON.stringify(product)), order: JSON.parse(JSON.stringify(order)) }

    }
}
export default Order