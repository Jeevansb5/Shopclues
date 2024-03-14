import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from 'next/router';

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()
  useEffect(() => {
    let exempted=['/checkout','/order','/orders','/myaccount']
    if (exempted.includes(router.pathname) ) {
      setSidebar(false)
    }
  }, [])


  const toggleCart = () => {
    setSidebar(!sidebar);
  }
  
  const ref = useRef()
  return (
    <>
      <div className={`flex flex-col md:flex-row h-16 md:justify-start justify-center items-center mb-1 py2 shadow-md sticky top-0 z-10 bg-white ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo mr-auto px-1 md:mx-5">
          <Link href='/' className='font-bold text-2xl text-indigo-600'>ShopClues</Link>
        </div>
        <div className="nav">
          <ul className='flex items-center text-xs md:text-xl space-x-6 font-bold md:text-md'>
            <Link href={'/tshirt'}><li className='hover:text-indigo-500'>Tshirt</li></Link>
            <Link href={'/hoodie'}> <li className='hover:text-indigo-500'>Hoodies</li></Link>
            <Link href={'/mobile'}><li className='hover:text-indigo-500'>Mobile</li></Link>
            <Link href={'/airdopes'}><li className='hover:text-indigo-500'>Airdopes</li></Link>
            <Link href={'/shoes'}><li className='hover:text-indigo-500'>Shoes</li></Link>
            <Link href={'/watches'}><li className='hover:text-indigo-500'>Watches</li></Link>
          </ul>
        </div>
        <div className="cart absolute right-0 top-2 mx-5 cursor-pointer items-center flex">
          <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl' />
        </div>
        <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0  bg-indigo-200 py-10 px-8  transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
          <h2 className='font-bold text-xl text-center'>Shoping Cart</h2>
          <span onClick={toggleCart} className='absolute top-4 right-3 cursor-pointer text-indigo-500 text-2xl'><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className='item flex my-5'>
                  <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className='w-1/3 font-semibold flex items-center justify-center text-lg'> <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].size, cart[k].name, cart[k].price, cart[k].variant) }} className='cursor-pointer text-indigo-500' /> <span className='mx-2 text-sm'>{cart[k].qty}</span> <AiFillPlusCircle className='cursor-pointer text-indigo-500' onClick={() => addToCart(k, 1, cart[k].size, cart[k].name, cart[k].price, cart[k].variant)} /> </div>
                </div>
              </li>
            })}

          </ol>
          <div className='font-bold my-2'>Subtotal:₹{subTotal}</div>
          <div className="flex">
            <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-indigo-300 flex mr-2  text-white bg-indigo-500 border-0 py-2 px-1 focus:outline-none hover:bg-indigo-600 rounded text-sm"> <BsBagCheckFill className='m-1' /> Check Out</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="flex  disabled:bg-indigo-300 bg-indigo-500 text-white py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded text-sm"> Clear Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
