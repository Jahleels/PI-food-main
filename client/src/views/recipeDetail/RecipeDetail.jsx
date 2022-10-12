import s from './recipeDetail.module.css'
import neu from '../../neu-card.module.css'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getRecipeDetail, clearRecipeDetail } from '../../redux/actions'
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from '../../res/close.svg'

const DietPill = styled.span`
padding: 7px 14px;
font-size: 16px;
font-weight: 600;
width: fit-content;
height: 34px;
border-radius: 50px;
background: #F0F0F3;
box-shadow:  10px 10px 20px #ceced1,
            -10px -10px 20px #ffffff;
animation: load 1s ease-in;
@keyframes load {
    from { opacity: 0;} to {opacity: 1;}
}
`

 export const Exit = styled.button`
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

const ImageAside = styled.aside`
height: 100vh;
position: absolute;
right: 0;
width: 30%;
background-image: url(${props => props.img});
background-repeat: no-repeat;
background-size: cover;
background-position: center;
animation: pageLoad 1.1s ease-in;


@keyframes pageLoad {
    from{opacity: 0;} to{opacity: 1;}
}
`

function RecipeDetail() {
    const { name, summary, procedure, healthScore, img, mixes } = useSelector(state => state.recipeDetail)
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    let counter = 0
    const close = (e) => {
        history.push('/home')
        dispatch(clearRecipeDetail())
    }
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [id, dispatch])



    return (
        <main className={s.main}>
            <ImageAside img={img} />
            <section className={s.container}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Exit onClick={close}><Logo /></Exit>
                </div>
                <div className={s.container_text}>
                    <h1>{name}</h1>
                    <div className={s.pills}>
                        <DietPill>Health Score: {healthScore}</DietPill>

                        {mixes?.map( mix => (<DietPill key={mix.diet.id}>{mix.diet.name}</DietPill>))}
                    </div>
                </div>
                <div className={s.summary}>
                    <p dangerouslySetInnerHTML={{__html: summary}}></p>
                </div>
                <div>
                    {procedure?.map(step => {
                        return (
                            <div className={neu.card}>
                                <h2>{`${++counter}. ${step.step}`}</h2>
                            </div>
                        )
                    })}

                </div>
            </section>
        </main>
    );
}

export default RecipeDetail;