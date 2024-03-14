import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"


const Post = ({ buyNow, addToCart, product, variants, error }) => {
    const router = useRouter()
    const { slug } = router.query
    const [color, setColor] = useState()
    const [size, setSize] = useState()

    useEffect(() => {
        if (!error) {
            setColor(product.color);
            setSize(product.size)
        }
    }, [router.query])

    const refreshVariant = (newsize, newcolor) => {
        let url = `http://localhost:3000/product/${variants[newcolor][newsize]['slug']}}`
        router.push(url)
    }
    if (error == 404) {
        return <Error statusCode={404} />
    }

    return (
        <div>
            <div className="container px-5 py-14 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 md:px-32 object-cover object-top rounded" src={product.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Shopclues</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}({product.size}/{product.color})</h1>
                        <div className="flex mb-4">


                        </div>
                        <p className="leading-relaxed">{product.desp}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant(size, 'white') }} className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none ${color === "white" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === "red" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === "green" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'purple') }} className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color === "purple" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'yellow') }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === "yellow" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === "blue" ? 'border-black' : 'border-gray-300'}`}></button>}
                                {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant(size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "black" ? 'border-black' : 'border-gray-300'}`}></button>}

                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                        {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                        {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                                        {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                                        {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                        {color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}

                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            {product.quantity > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                            {product.quantity <= 0 && <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span>}
                            <button disabled={product.quantity <= 0} onClick={() => addToCart(slug, 1, size, product.name, product.price, color)} className="flex ml-8 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none disabled:bg-indigo-300 hover:bg-indigo-600 rounded">Add to Cart</button>
                            <button disabled={product.quantity <= 0} onClick={() => buyNow(slug, 1, size, product.name, product.price, color)} className="flex ml-4 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none disabled:bg-indigo-300 hover:bg-indigo-600 rounded">Buy Now</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let error = null;
    const prod = await fetch(`http://localhost:8080/api/products/${context.query.slug}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    let res = await prod.json()

    let product = res.product[0]
    let productName = product.name;

    if (product == null) {
        return {
            props: { error: 404 },
        }
    }
    let variant = await fetch(`http://localhost:8080/api/tshirt/${productName}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    let res2 = await variant.json()
    let variants = res2.product

    let colorSizeSlug = {}
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.id }
        }
        else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.id }
        }
    }

    return {
        props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }

    }
}

export default Post