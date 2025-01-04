'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Products } from '@/app/models/interfaces'
import ProductsCard from '@/components/ProductsCard/ProductsCard'

export default function Page() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Products[], Error>('api/products', fetcher)
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<Products[]>([])
  const [cart, setCart] = useState<Products[]>([]) 

    if (error) return <div>Error loading data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data</div>
  
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredData(newFilteredData)
    }
  }, [search, data])

  const addToCart = (product: Products) => {
    setCart(prevCart => [...prevCart, product])

  }

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if(cart) {
      setCart(JSON.parse(cart))
    }
}, [])

const buy = () => {
  fetch("/api/deishop/buy", {
    method: "POST",
    body: JSON.stringify({
      products: cart.map(product => product.id),
      name: "",
      student: false,
      coupon: ""
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log('Response:', response);  // Verifique a resposta do servidor
    return response.json();
  })
  .then(response => {
    if (response) {
      console.log('Compra bem-sucedida', response);
      setCart([]);
    } else {
      console.log('Nenhuma resposta de compra recebida');
    }
  })
  .catch((error) => {
    console.log("Erro ao comprar:", error);
  });
};

if (error) return <div>Error loading data</div>
if (isLoading) return <div>Loading...</div>
if (!data) return <div>No data</div>

  return (
    <section className="overflow-auto h-full">
      <input
        className="m-2 p-2 border rounded w-auto"
        placeholder="Pesquisar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredData.length > 0 ? (
        filteredData.map(product => (
          <ProductsCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            addToCart={() => addToCart(product)}
            showAddButton={true}
          />
        ))
      ) : (
        <div className="text-center text-black">Nenhum produto encontrado</div>
      )}
      
      {/* Carrinho de Compras */}
      <div className="cart-summary mt-4">
        <h3 className="text-xl font-semibold text-center">Carrinho de Compras</h3>
        {cart.length > 0 ? (
          <div>
            {cart.map((product, index) => (
              <div key={index}>
                <ProductsCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                  addToCart={() => addToCart(product)}
                  showAddButton={false}  // Aqui, apenas se o cliente quiser adicionar novamente o produto
                />
              </div>
            ))}
          {/* Botão para finalizar a compra */}
          <div className="flex justify-center mt-4">
            <button
              onClick={buy}  // Chama a função de compra
              className="bg-red-700 text-white p-2 rounded-md hover:bg-red-800"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
        ) : (
          <p className="text-center">Carrinho vazio</p>
        )}
      </div>
    </section>

    
  )
}
