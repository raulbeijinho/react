import Link from 'next/link'
import React from 'react'

export default function page() {
  return <>
    <h1>React e Next.js</h1>
    <p>Bem vindo à minha app em React e Next.js</p>
    <Link href="/produtos">Produtos</Link>
    <p></p>
    <Link href="/tecnologias">Tecnologias</Link>
  </>
}
