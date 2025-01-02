import React from 'react';
import Image from 'next/image';

interface Technology {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function TechnologyCard({title, image, description, rating}: Technology) {
  return <article className="m-2 p-2 bg-white rounded">
      <p className="flex justify-center"><b>{title}</b></p>
      <Image 
        src={image}
        width={500}
        height={300}
        alt="imagensprodutos"
      ></Image>
      <p>{description}</p>
      <p className="flex justify-center text-red-700"><b>Avaliação: {rating.rate}</b></p>
      <p className="flex justify-center text-red-700"><b>Usado por {rating.count} pessoas</b></p>
      </article>
}
