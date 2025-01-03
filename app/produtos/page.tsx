'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import {Products} from '@/app/models/interfaces'
import ProductsCard from '@/components/ProductsCard/ProductsCard'

export default function Page() {
  
  const fetcher = (url: string) => fetch(url).then(res =>res.json())
  const{data, error, isLoading} = useSWR<Products[], Error>('api/products', fetcher)

  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data</div>

  
  return <section className="overflow-auto h-">
    { data.map(m => (
      <ProductsCard
      key={m.id}
      id={m.id}
      title={m.title}
      price={m.price}
      description={m.description}
      category={m.category}
      image={m.image}
    /> 
  ))}

  </section>
}
