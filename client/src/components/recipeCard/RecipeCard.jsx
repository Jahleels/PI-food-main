import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Card = styled.div`
margin-bottom: 16px;
max-width: 400px;
height: 200px;
border: none;
border-radius: 28px;
background: #C4D47F;
box-shadow:  5px 5px 10px #a7b46c,
        -5px -5px 10px #e1f492;
display: flex;

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

function RecipeCard({id, name, summary, image}) {
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
                <p>{shortSummary}</p>
                <div>
                    <Button onClick={handleRedirectToDetail}>Ver más</Button>
                </div>
            </div>
        </Card>
     );
}

export default RecipeCard;