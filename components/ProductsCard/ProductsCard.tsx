import React, { useState } from 'react'
import {Products} from '@/app/models/interfaces'
import Image from 'next/image'

export interface ProductsProps {
  id:string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  addToCart: ()=>void;
  showAddButton: boolean;
}

export default function ProductsCard({title, price, description, image, addToCart, showAddButton}: ProductsProps) {
  return <article className="m-2 p-2 bg-white rounded">
    
    <p className="flex justify-center"><b>{title}</b></p>
    <Image 
      src={image}
      width={500}
      height={300}
      alt="imagensprodutos"
    ></Image>
    <p>{description}</p>
    <p className="flex justify-center text-red-700"><b>Preço: {price}€</b></p>
    {showAddButton && (
    <p className="flex justify-center"><button
          onClick={() => addToCart()}  // Aqui usamos a lógica para adicionar o produto ao carrinho
          className="bg-red-700 text-white p-2 rounded-md hover:bg-red-800 transition duration-200"
        >
          Adicionar ao Carrinho
        </button></p>
    )}
    </article>
}
 
