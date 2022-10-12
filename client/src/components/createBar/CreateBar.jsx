import s from './createBar.module.css'
import neu from '../../neu-card.module.css'
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../res/close.svg';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Exit } from '../../views/recipeDetail/RecipeDetail';

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

&:disabled {
    background-color: #a4a4a4;
    cursor: auto;
}
`

const Modal = styled.div`
    background-color: #EB5757;
    border-radius: 8px;
    width: 100%;
    padding: 1rem 2rem;
    margin: 1rem 0;
    color: #F0F0F2;
    font-family: 'Lora';
    font-weight: 600;
    display: ${props => props.display};
    animation: show 500ms;

    @keyframes show {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const Loading = styled.div`
    border: 4px solid rgba(0, 0, 0, .1);
    border-radius: 50%;
    border-left-color: transparent;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    @keyframes spin {
     0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`

function CreateRecipe({submit, diets, isLoading}) {
    const history = useHistory()
    const [disabledButton, setDisabledButton] = useState(true)
    const [disabledForm, setDisabledForm] = useState(false)
    const [isError, setError] = useState({
        isTitleNull: false,
        isSummaryNull: false,
        isHealthScoreNull: false,
        isDietNull: false
    })
    const [ recipe, setRecipe ] = useState(()=>({
        name: '',
        summary: '',
        healthScore: '',
        procedure: '',
        diet:[]
    }))
    const handlerChange = e => setRecipe(prev => {
        if(e.target.name === 'diet') return {...prev, diet: [...prev.diet, parseInt(e.target.id)]}
        return {...prev, [e.target.name]: e.target.value}
    })


    const strictValidate = (e) => {
        const value = e.target.value
        const name = e.target.name
        if (value === '') {
            switch (name) {
                case 'name':
                    setError(prev => ({...prev, isTitleNull:true}))
                    break;
                
                case 'summary':
                    setError(prev => ({...prev, isSummaryNull:true}))
                    break;
                
                case 'healthScore':
                    setError(prev => ({...prev, isHealthScoreNull:true}))
                    break;

                case 'diet':
                    setError(prev => ({...prev, isDietNull: true}))
                    break;

                default:
                    break;
            }
        } else {
            switch (name) {
                case 'name':
                    setError(prev => ({...prev, isTitleNull:false}))
                    break;
                
                case 'summary':
                    setError(prev => ({...prev, isSummaryNull:false}))
                    break;
                
                case 'healthScore':
                    setError(prev => ({...prev, isHealthScoreNull:false}))
                    break;

                case 'diet':
                    setError(prev => ({...prev, isDietNull: false}))
                    break;

                default:
                    break;
            }
            if (recipe.name.length && recipe.healthScore && recipe.summary.length && recipe.diet.length) setDisabledButton(false)
        }
    }

    const close = (e) => {
        e.preventDefault()
        history.push('/home')
    }

    return ( 
        <section className={s.container}>
            <form onSubmit={(e)=>{submit(e, recipe); setDisabledForm(true)}}>
                <div style={{display:'flex', justifyContent: 'end'}}>
                    <Exit onClick={close}><Logo /></Exit>
                </div>

                <div className={s.header}>
                    <Modal display={isError.isTitleNull ? 'block' : 'none'}>It should have a Title</Modal>
                    <input value={recipe.name} disabled={disabledForm} onChange={handlerChange} onBlur={strictValidate} name='name' className={`${s.title} ${isError.isTitleNull ? s.error : undefined}`} type="text" placeholder='Title' />
                </div>
                <div className={s.diet}>
                    <Modal display={isError.isHealthScoreNull || isError.isDietNull ? 'block' : 'none'}>'Health Score' can't be empty and you must choose some diet</Modal>
                    <label className={s.label} htmlFor='healthScore'>Health Score:</label>
                    <input className={`${s.healthScore} ${isError.isHealthScoreNull ? s.error : undefined}`} value={recipe.healthScore} disabled={disabledForm} onChange={handlerChange} onBlur={strictValidate} type="number" name='healthScore' />
                    {diets.map( diet => (
                        <div>
                        <label className={s.label} htmlFor={diet.id}>{diet.name}</label>
                        <input className={s.checkbox} type="checkbox" value={diet.name} disabled={disabledForm} onChange={handlerChange} name='diet' key={diet.id} id={diet.id} />
                    </div>
                    ))}
                </div>

                <div>
                    <Modal display={isError.isSummaryNull ? 'block' : 'none'}>It should be a summary</Modal>
                    <h3>Write a summary</h3>
                    <textarea value={recipe.summary} disabled={disabledForm} onBlur={strictValidate} onChange={handlerChange} name='summary' className={`${s.summary} ${isError.isSummaryNull && s.error}`} cols="30" rows="10"></textarea>
                    <h3>Write the procedure, write them by hyphens</h3>
                    <textarea value={recipe.procedure} disabled={disabledForm} onChange={handlerChange} name='procedure' className={`${s.inputSteps} ${neu.card}`}  cols="30" rows="10"></textarea>
                </div>

                <div>
                    <Button className={s.button} disabled={disabledButton} type='submit'>{isLoading ? <Loading/> : 'Send'}</Button>
                </div>
            </form>
        </section>
     );
}

export default CreateRecipe;