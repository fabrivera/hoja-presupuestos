import React, { useState, useEffect, useContext } from 'react'
import PageContext from '../../context/pageContext'
import './Page.css'
import {Logo, HorizonBar, TopBar, Firma} from './HorizonBar'
import ConfigMenu from '../ConfigMenu'

export default function Page(params) {
    console.log('loop')
    const { profile } = useContext(PageContext)
    const [ subtotal, setSubtotal ] = useState(0)
    const [ lista ] = useState([])
    const { print } = params
    const [ showDecimal ] = useState(false)

    const [showNewItem, setShowNewItem] = useState(true)
    const [newItem, setNewItem] = useState({
        item: '',
        description: '',
        price: "",
        amount: 1
    })

    useEffect(() => {
        params.returnPage(document.getElementById('page'))

        let count = 0
        lista.map(resolve => (
            count = count + (resolve.price * resolve.amount)
        ))
        setSubtotal(count)
    },[lista, params])

    const numberSetter = number => {
        const numberString = number.toString().split('.')
        const modify = numberString[0]
            .split('').reverse().join('')
            .match(/.{1,3}/g)
            .join('.')
            .split('').reverse().join('')

        if (showDecimal) {
            let decimal = '00'
            if (numberString[1]) {
                if (numberString[1].length >= 2) {
                    const getTwo = numberString[1].match(/.{1,2}/g)
                    decimal = getTwo[0]
                } else {
                    decimal = numberString[1] + '0'
                }
            }
            return modify.concat(',', decimal)
        }
        return modify
    }

    const addItem = () => {
        lista.push(newItem)
        setShowNewItem(!showNewItem)
        setSubtotal(subtotal + (newItem.price * newItem.amount))
        setNewItem({
            item: '',
            description: '',
            price: "",
            amount: 1
        })
    }

    const onInputChange = e => {
        
        if ( e.target.name === "price") {
            if (!isNaN(e.target.value)) setNewItem({...newItem, [e.target.name]: e.target.value})
        } else {
            setNewItem({...newItem, [e.target.name]: e.target.value})
        }
    }

    return <div id="page" className="page">
        <div className="title">
            <div className="logo">
                <Logo />
            </div>
            <h1>PRESUPUESTO</h1>
            <div className="blue-line">
                <TopBar />
            </div>
        </div>
        <div className="user-info">
            <h5>DATOS PERSONALES</h5>
            <h2>{profile.name}</h2>
            <h4>{profile.reference}</h4>
            <h4>Tel. {profile.phone}</h4>
            <h4>{profile.mail}</h4>
            <h2 className="date">Fecha: {profile.currentTime.day}-{profile.currentTime.month}-{profile.currentTime.year}</h2>
        </div>

        <div className="table">
            <div className="table-header">
                <HorizonBar />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="description">Descripción</th>
                        <th className="price">Precio</th>
                        <th className="count">Cantidad</th>
                        <th className="total">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((result, value) => <tr key={value}>
                            <td>
                                <h4>{result.item}</h4>
                                <p>{result.description}</p>
                            </td>
                            <td>${numberSetter(result.price)}</td>
                            <td>{result.amount}</td>
                            <td>${numberSetter(result.price * result.amount)}</td>
                        </tr>
                        )
                    }
                    <tr className="addForm"
                        style={{'display': showNewItem && 'none'}}
                    >
                            <td>
                                <h4>
                                    <input placeholder="Descripción" 
                                           style={{fontWeight: '600', fontSize: '.9rem'}}
                                           value={newItem.item}
                                           onChange={onInputChange}
                                           name="item"/>
                                </h4>
                                <p>
                                    <input placeholder="Detalle"
                                           value={newItem.description}
                                           onChange={onInputChange}
                                           name="description"/>
                                </p>
                            </td>
                            <td>
                                <input placeholder="$0"
                                       style={{fontWeight: '600', fontSize: '.9rem', textAlign: 'center' }}
                                       value={newItem.price}
                                       onChange={onInputChange}
                                       name="price"/>
                            </td>
                            <td>
                                <input placeholder="1"
                                       style={{fontWeight: '600', fontSize: '.9rem', textAlign: 'center' }}
                                       value={newItem.amount}
                                       onChange={onInputChange}
                                       name="amount"/>
                            </td>
                            <td>
                                <button className='button-add-small'
                                        onClick={addItem}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </td>
                    </tr>
                    <tr>
                        <div className="spaceSelected" 
                             style={{display: (print && 'none') || (!showNewItem && 'none')}}
                        >
                            <div onClick={() => setShowNewItem(!showNewItem)}>
                                <button className="addItem">
                                    <i className="fa fa-plus"></i>
                                </button>
                                <h3>Agregar Item</h3>
                            </div>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="information">
            <div className="info">
                <h3>Metodos de pago:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Efectivo</td>
                        </tr>
                        <tr>
                            <td>Tarjeta:</td>
                            <td>Con previo aviso</td>
                        </tr>
                        <tr>
                            <td>Cheque Físico:</td>
                            <td>Consultar</td>
                        </tr>
                        <tr>
                            <td>e-Cheq:</td>
                            <td>No se recibe</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Términos y Condiciones:</h3>
                <p>Plazo de entrega a convenir. Mantenimiento de la oferta 10 días.
                Condiciones de pago: 50% antes de realizar el trabajo y 50% al
                terminar.</p>
            </div>
            <div className="resume">
                <table>
                    <tbody>
                        <tr>
                            <td>Subtotal:</td>
                            <td>${numberSetter(subtotal)}</td>
                        </tr>
                        <tr>
                            <td>IVA (21%):</td>
                            <td>${numberSetter(subtotal*0.21)}</td>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <th>${numberSetter(subtotal*1.21)}</th>
                        </tr>
                    </tbody>
                </table>
                <div className="firma">
                    <h4>Firma</h4>
                    <div>
                        <Firma />
                    </div>
                </div>
            </div>
        </div>
        <footer className="footer">
            <h3><i className="fa fa-envelope"></i> creativo.en@gmail.com</h3>
            <h3><i className="fa fa-phone"></i> 264 427 6276</h3>
            <h3><i className="fa fa-home"></i> Mendoza Sur 1625 - Trinidad, San Juan</h3>
        </footer>

        <ConfigMenu />
    </div>
}