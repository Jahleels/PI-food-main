import CreateBar from "../../components/createBar/CreateBar";
import styled from "styled-components";

const ImageAside = styled.aside`
height: 100vh;
position: absolute;
right: 0;
width: 30%;
background-color: red;
background-repeat: no-repeat;
background-size: cover;
`
function CreateRecipe() {
    return ( 
        <main style={{display: 'flex'}}>
            <CreateBar />
            <ImageAside />
        </main>
     );
}

export default CreateRecipe;