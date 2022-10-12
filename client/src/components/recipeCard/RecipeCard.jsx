import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Card = styled.div`
margin-bottom: 16px;
max-width: 420px;
height: 200px;
border: none;
border-radius: 28px;
background: #C4D47F;
box-shadow:  5px 5px 10px #a7b46c,
        -5px -5px 10px #e1f492;
display: flex;
animation: cardLoad 400ms ease-in;

@keyframes cardLoad {
    from {
        box-shadow: 0 0 0 transparent, 0 0 0 transparent;
    }
    to {
        box-shadow:  5px 5px 10px #a7b46c,
        -5px -5px 10px #e1f492;
    }
}
@keyframes cardContentLoad {
    from {
        opacity: 0.5;
        transform: translateX(-5px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

& .img_card {
    width: 70vh;
    max-width: 150px;
    background-image: url(${props => props.img});
    background-position: center;
    border-radius: 28px 0 0 28px;
}

& > * {
    margin-right: 10px;
}

& .body_card p{
    font-size: 14px;
}

& .body_card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    animation: cardContentLoad 100ms ease-in;

}
`


const Button = styled.button`
cursor: pointer;
font-family: 'Inter';
font-weight: 600;
font-size: 14px;
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

const Pill = styled.div`
    display: inline-block;
    background-color: #40a70076;
    color: #F0F0F2;
    padding: 5px 12px;
    border-radius: 28px;
    font-size: 10px;
    font-weight: 600;
    font-family: 'Lato';
    margin-left: 6px;
    margin-top: 2px;
    margin-bottom: 1px;
`
const PillWraper = styled.div`
    width: 250px;
    white-space: nowrap;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #30303035;
        border-radius: 6px;
    }
`

function RecipeCard({id, name, summary, image, diets}) {
    const history = useHistory()
    let correctSummary = summary.replace(/(<([^>]+)>)/ig, '')
    let shortSummary = correctSummary.slice(0, 60) + '...'
    let shortName = name.length > 35 ? name.slice(0, 33) + '...' : name
    
    const handleRedirectToDetail = (e) => {
        e.preventDefault()
        history.push(`recipe/${id}`)
    }


    
    return ( 
        <Card img={image}>
            <div className='img_card'>
            </div>

            <div className='body_card'>
                <h2>{shortName}</h2>
                <PillWraper>
                    {diets?.map(mix => <Pill key={mix.diet.dietId}>{mix.diet.name}</Pill>)}
                </PillWraper>
                <p>{shortSummary}</p>
                <div>
                    <Button onClick={handleRedirectToDetail}>See more</Button>
                </div>
            </div>
        </Card>
     );
}

export default RecipeCard;