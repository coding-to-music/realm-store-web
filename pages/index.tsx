import Head from 'next/head'
import { useState, useEffect } from 'react'
import * as Realm from 'realm-web'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const REALM_APP_ID = 'products-vudbf'
    const app = new Realm.App({ id: REALM_APP_ID })
    const credentials = Realm.Credentials.anonymous()
    try {
      const user = await app.logIn(credentials)
      console.log('user', user)
      const allProducts = await user.functions.getAllProducts()
      setProducts(allProducts)
    } catch (error) {
      console.log('error  ', error)
    }
  }, [])
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Products App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    {products &&
    products.map(product => {
      return <p key={product.id}>{product.name}</p>
    }
      }
    // </div>
  )
}

// <div className="flex min-h-screen flex-col items-center justify-center py-2">
//   <Head>
//     <title>Create Next App</title>
//     <link rel="icon" href="/favicon.ico" />
//   </Head>

//   <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
//     <h1 className="text-4xl font-bold">
//   </main>
// </div>
