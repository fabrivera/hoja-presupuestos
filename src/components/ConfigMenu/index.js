import { useState } from 'react'
import './ConfigMenu.css'

export default function ConfigMenu(props) {
    const [menuState, setMenuState] = useState(false)

    const openMenu = () => {
        setMenuState(!menuState)
    }

    return <>
        <ul className="config_menu" 
            style={{height: menuState ? '200px' : '50px', overflow: !menuState && 'hidden'}}>
            <li className={"config_menu--li " + (menuState && 'close')}
                onClick={openMenu}
                style={{background: menuState && 'var(--primary)'}}>
                <i className="fa fa-plus"
                   style={{color: menuState && '#fff'}}></i>
            </li>
            <li className="config_menu--li"
                onClick={props.changeLanguage}>
                <i className="fa fa-plus-circle"></i>
                <span className="tooltip">Acreditar</span>
            </li>
            <li className="config_menu--li">
                <i className="fa fa-minus-circle"></i>
                <span className="tooltip">Debitar</span>
            </li>
            <li className="config_menu--li">
                <i className="fa fa-user-circle"></i>
                <span className="tooltip">Usuario</span>
            </li>
        </ul>
    </>
}