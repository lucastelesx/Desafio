import { useState, useEffect } from 'react'
import './styles/global.scss';

interface IlistCards{ 
  productName: string
  productDesc: string
  productIcon: string
  productPrice: number
  productDate: number
}
interface ImenuItens{ 
  name: string
  icon: string
  isActive: boolean 
}
export function App(){
  
  const [products, setProducts] = useState<IlistCards[]>([])
  
  const [allProducts, setAllProducts] = useState<IlistCards[]>([])
   
  const [menuItens, setMenuItens] = useState<ImenuItens[]>([])
  

  const menuList = [
    {name:"Todos",icon:"fa-globe", isActive:true},
    {name:"Profissional",icon: "fa-briefcase", isActive:false},
    {name:"Reguladores",icon: "fa-landmark", isActive:false},
    {name:"Sócio Ambiental",icon: "fa-tree", isActive:false},
    {name:"Jurídico",icon: "fa-gavel", isActive:false},
    {name:"Listas Restritivas",icon: "fa-ban", isActive:false},
    {name:"Mídia/Internet",icon: "fa-earth-americas" , isActive:false},
    {name:"Bens e Imóveis",icon: "fa-gem", isActive:false},
    {name:"Cadastro",icon: "fa-person", isActive:false},
    {name:"Financeiro",icon:"fa-piggy-bank", isActive:false}
  ]

  useEffect(() => {
    fetch('http://demo8580067.mockable.io/frontent-teste')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data.products)
        setProducts(data.products)
      })

    setMenuItens(menuList)
  }, [])
  
  function sortProducts(field: string) {
    const sortedProducts = [...products]
    sortedProducts.sort((a, b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0)
    setProducts(sortedProducts)
  }
  function filterProducts(name: string){
    const selectedMenus = [...menuItens]
    selectedMenus.forEach((selectedMenu,index) => {
      selectedMenus[index].isActive = selectedMenu.name == name;
      setMenuItens(selectedMenus)
    })
    
    const filteredProducts =allProducts.filter((product: IlistCards)=>{
      return (product.productName == name || name == "Todos")
    })
    setProducts(filteredProducts)
  } 
  return (
    <>
      <div className="handlerContent">
        <nav className="filter">
          {menuItens.map((menuItem,index) =>(
            <button key={index} onClick={(e) => filterProducts(menuItem.name)} className={`filter__item ${menuItem.isActive ? "filter__item--active" : ""}`}>
            <i className={`filter__icon fa-solid ${menuItem.icon} fa-2xs`}></i>
            {menuItem.name}
          </button>
          )) }
        </nav>
        <div className="sortDate">
          <p className="sortDate__title">Ordenar</p>
          <select className="sortDate__select" name="" id="" onChange={(e) => sortProducts(e.target.value)}> 
            <option value="productPrice">Preço</option>
            <option value="productDate">Lançamento</option>
          </select>
        </div>
        <ul className="cardsList">
        {products.map((product, index) => (
          <li className="cardsList__item" key={index}>
            <div className="cardsList__title">
              <i className={`cardsList__icon fa-solid ${product.productIcon} fa-2xs`}></i>
              <h2 className="cardsList__title">{product.productName}</h2>
              <p className="cardsList__desc">{product.productDesc}</p>
            </div>
            <div className="cardsList__footer">
              <p className="cardsList__price">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.productPrice)}</p>
              <p className="cardsList__moreInfo">Saiba mais</p>
            </div>
          </li>
        ))}
    </ul>
      </div>
    </>
  )
}