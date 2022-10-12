import CreateBar from "../../components/createBar/CreateBar";
import styled from "styled-components";
import s from "./createRecipe.module.css"
import axios from "axios";
import { createRecipe, PORT } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Exit } from "../recipeDetail/RecipeDetail";
import { ReactComponent as Logo } from '../../res/close.svg';

const ExitButton = styled(Exit)`
    background: rgba(255, 255, 255, 0.2);
    box-shadow:  20px 20px 60px #bfbfbf,
             -20px -20px 60px #ffffff;
    position: absolute;
    top: 0;
    right: 1rem;

    &:active {
        background: linear-gradient(145deg, #cbcbcb40, #f1f1f124);
    }

`

const ImageAside = styled.aside`
height: 100vh;
position: absolute;
right: 0;
width: 30%;
background: rgb(255,255,255);
background: linear-gradient(139deg, rgba(255,255,255,1) 0%, rgba(244,254,204,1) 35%, rgba(196,212,127,1) 100%);background-repeat: no-repeat;
background-size: cover;
`

const Modal = styled.div`
    display: ${props => props.display};
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5.5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    padding: 1rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3;
    z-index: 100;
    animation: show 300ms ease-in;

    &>h1 {
        font-size: 64px;
    }

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


function CreateRecipe() {
    const [isLoading, setLoading] = useState(false)
    const [ show, setShow ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const diets = useSelector(state => state.diets)

    const submit = (e, recipe) => {
        e.preventDefault()
        setLoading(true)
        recipe.id = 'c-' + recipe.name.charCodeAt(0) + recipe.name.charCodeAt(1) + recipe.name.charCodeAt(2) + recipe.name.at(recipe.name.length - 2)
        recipe.name = recipe.name.replace(/\w\S*/g,(w)=>(w.replace(/^\w/,(c)=>c.toUpperCase())))
        axios.post(`${PORT}/recipes`, recipe)
        .then(()=>{
            setShow(true)
            dispatch(createRecipe(recipe))
            setLoading(false)
        })
            
        .catch((err)=>{
            setLoading(false)
            console.log(err.response.status, err.response.data)
        })
    }

    const close = () => {
        history.push('/home')
    }


    return ( 
        <main className={s.main}>
            <Modal display={show ? 'flex' : 'none'} >
                <div>
                    <ExitButton onClick={close}><Logo /></ExitButton>
                </div>
                <h1>Correcto</h1>
                <p>La receta fue creada existosamente</p>
            </Modal>
            <ImageAside />
            <CreateBar diets={diets} submit={submit} isLoading={isLoading}/>
        </main>
     );
}

export default CreateRecipe;