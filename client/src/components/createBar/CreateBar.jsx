import s from './createBar.module.css'
import neu from '../../neu-card.module.css'
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../res/close.svg';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Exit = styled.button`
cursor: pointer;
position: fixed;
margin-top: 16px;
width: 48px;
height: 48px;
border-radius: 50px;
background: #F0F0F3;
box-shadow:  9px 9px 18px #cccccf,
            -9px -9px 18px #ffffff;
font-weight: 600;
border: none;

&:active {
    background: linear-gradient(145deg, #d8d8db, #ffffff);
}

& > * {
    position: absolute;
    top: 12px;
    left: 12px;
}
`

const Button = styled.button`
margin-top: 2rem;
cursor: pointer;
font-family: 'Inter';
font-weight: 600;
font-size: 16px;
background-color: #4E5533;
color: #F0F0F2;
border-radius: 28px;
border: none;
padding: 10px 40px;

&:active {
    border: none;
    background-color: #363b24;
}
`

function CreateRecipe() {
    const history = useHistory()
    const [ recipe, setRecipe ] = useState(()=>({
        name: '',
        summary: '',
        healthScore: 0,
        procedure: ''
    }))
    const handlerChange = e => setRecipe(prev => ({...prev, [e.target.name]: e.target.value}))

    // TODO: Hacer validaciones => TODO: Botón dinamico (disabled)

    // TODO: adaptación y envio de información TODO: Usar dispatch para agregar recipe a la lista recipeList

    const close = (e) => {
        e.preventDefault()
        history.push('/home')
    }

    return ( 
        <section className={s.container}>
            <form action="">
                <div style={{display:'flex', justifyContent: 'end'}}>
                    <Exit onClick={close}><Logo /></Exit>
                </div>

                <div className={s.header}>
                    <input value={recipe.name} onChange={handlerChange} name='name' className={s.title} type="text" placeholder='Titulo' />
                </div>
                {/* TODO: Agregar healthScore y controlarlo */}
                <div className={s.diet}>
                    <label className={s.label} htmlFor="diet">Vegetarian</label>
                    <input className={s.checkbox} type="checkbox" id="diet" />
                </div>

                <div>
                    <h3>Escribe un resumen</h3>
                    <textarea value={recipe.summary} onChange={handlerChange} name='summary' className={s.summary} cols="30" rows="10"></textarea>
                    <h3>Escribe los pasos, separalos por guíones</h3>
                    <textarea value={recipe.procedure} onChange={handlerChange} name='procedure' className={`${s.inputSteps} ${neu.card}`}  cols="30" rows="10"></textarea>
                </div>

                <div>
                    <Button type='submit'>Enviar datos</Button>
                </div>
            </form>
        </section>
     );
}

export default CreateRecipe;