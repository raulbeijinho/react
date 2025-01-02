import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import TecnologiasCard from '@/components/TecnologiasCard/TecnologiasCard';

export default function Page() {
  return <section className="overflow-auto h-">
      {tecnologias.map((tech) => (
    
    <TecnologiasCard
    key={tech.id}
    id={tech.id}
    title={tech.title}
    image={tech.image}
    description={tech.description}
    rating={tech.rating}
  />
))}

</section>

}
