import { useState, useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'

export default function Home() {

  return(
    <>
    <div className="w-full">
      
      <div className="max-w-7xl mx-auto lg:p-4 md:p-3 p-1">
        
        <h2 className='text-center text-4xl font-bold mb-8'>Productos Destacados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <ProductCard nombre="Pienso Premium para Perros" descr="Alimento completo y balanceado para perros adultos, rico en proteínas y vitaminas." precio="29.99" tipo="Alimento" stock="50" url="/img/piensoPremium.png"/>
          <ProductCard nombre="Collar Antipulgas" descr="Collar repelente de pulgas y garrapatas, protección hasta 8 meses." precio="15.50" tipo="Accesorio" stock="120" url="/img/collarAntipulgas.png" />
          <ProductCard nombre="Arena Aglomerante para Gatos" descr="Arena higiénica con control de olores, fácil de limpiar." precio="12.00" tipo="Higiene y cuidado" stock="200" url="/img/arenaAglomeranteGatos.png"/>
          <ProductCard nombre="Pelota con Sonido" descr="Juguete interactivo para perros, resistente y divertido." precio="6.99" tipo="Juguete" stock="150" url="/img/pelota.png"/>
          <ProductCard nombre="Champú Antipulgas para Perros" descr="Champú dermatológicamente probado para eliminar pulgas y mantener la piel de tu perro sana y brillante." precio="15.99" tipo="Higiene y cuidado" stock="25" url="/img/champuAntipulgasPerro.png" />
          <ProductCard nombre="Acuario de 50 litros" descr="Acuario de vidrio con tapa y filtro incluido, perfecto para peces de agua dulce." precio="120.00" tipo="Hábitat" stock="10" url="/img/acuario.png"/>
        </div>
      </div>
    </div>
    </>
  )
}