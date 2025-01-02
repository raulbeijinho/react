import React from 'react'
import {Products} from '@/app/models/interfaces'
import Image from 'next/image'

export default function ProductsCard({id, title, price, description, category, image}: Products) {
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
    <p className="flex justify-center"><button className="bg-red-700 text-white p-2 rounded">Comprar</button></p>
    </article>
}
 