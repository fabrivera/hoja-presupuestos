import React, { useState } from 'react'

const PageContext = React.createContext({})

export function PageContextProvider ({children}) {
    const [ profile, setProfile ] = useState({
        name: 'Fabricio J. Rivera',
        reference: 'Diseñador y CEO',
        phone: '+54 264 414 3272',
        mail: 'fabrivera.di@gmail.com',
        currentTime: {
            day:  new Date().getDate(),
            month:  new Date().getMonth()+1,
            year:  new Date().getFullYear()
        }})
    const [ page, setPage ] = useState([
        {
            "item": "Desarrollo y diseño de plataforma web y mobil (responsive design)",
            "description": "Desarrollo de landing page con e-comerce para Camping Arroyito",
            "price": 36000,
            "amount": 1
        },{
            "item": "Diseño de marca y logo Camping Arroyito",
            "description": "Diseño de logo, manual de marca y imágenes publicitarias",
            "price": 8000,
            "amount": 1
        },{
            "item": "Compra de dominio .com y .com.ar por 365 días",
            "description": "Registro y adquisición de los dominios campingarroyito.com y campingarroyito.com.ar",
            "price": 3500,
            "amount": 2
        },{
            "item": "Servicio de hosting, soporte y mantenimiento del sitio x 365 días",
            "description": "Actualización del sitio web y soporte técnico",
            "price": 10000,
            "amount": 1
        }
    
    ])

    return <PageContext.Provider value={{profile, setProfile, page, setPage }}>
        {children}
    </PageContext.Provider>
}

export default PageContext