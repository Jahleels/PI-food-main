import s from './landingPage.module.css'
import neu from '../../neu-card.module.css'
import apple from '../../res/comida.jpg'
import { useHistory } from 'react-router-dom'

function LandingPage(props) {
    const history = useHistory()

    const handleBtn = (e) => {
        e.preventDefault()
        history.push('/home')
    }

    return (
        <section className={s.header}>
            <div className={s.container}>
                <div className={s.container_img}>
                    <img className={s.img} src={apple} alt="apple" />
                </div>

                <div className={s.container_title}>
                    <h1 className={s.title}>Cocina comida saludable y deliciosa.</h1>
                    <p className={s.text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam tempora, quia quas error voluptates vitae tempore, a architecto quo sapiente dolorem in, harum amet praesentium voluptas nisi suscipit labore quaerat!</p>
                    <button onClick={handleBtn} className={`${neu.card_green} ${neu.btn_green}`}>¡Vamos allá!</button>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;