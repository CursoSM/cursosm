import { useState } from "react"
import "./CourseOverviewAuth.css"

import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import CustomButton from "../../Components/CustomButton/CustomButton";






const goalStyle = (index, currentIndex) => {
    const distance = Math.abs(currentIndex - index); // Distancia del elemento al actual
    const scaleFactor = Math.exp(-distance); // Factor de reducción exponencial

    return {
        width: `${80 * scaleFactor}%`, // Reduce el tamaño progresivamente
        height: `${100 - distance * 10}%`, // También reduce la altura progresivamente
        opacity: Math.max(1 - distance * 0.1, 0.1), // Asegura que la opacidad nunca sea menor a 0.2
        filter: `brightness(${1 - distance * 0.1})`,
        zIndex: distance
    };
};


const CourseOverviewAuth = () => {
    const [currentGoal, setCurrentGoal] = useState(0) // Inicializa con 0, o el índice que prefieras

    const handleNextGoal = () => {
        if (currentGoal < 5) {
            setCurrentGoal(currentGoal + 1)
        }
    }

    const handlePrevGoal = () => {
        if (currentGoal > 0) {
            setCurrentGoal(currentGoal - 1)
        }
    }




    return (
        <section className="course-overview-auth">
            <article className="course-overview">
                <div className="course-overview-container">
                    <h1 className="course-title">atrévete a ser la mejor versión de vos.</h1>
                    <h2 className="course-subtitle">Desarrolla tu potencial, supera tus límites y alcanza tus metas con nuestro enfoque único de aprendizaje.</h2>
                </div>
            </article>

            <article className="course-goals">
                <h2 className="subtitle">¿Qué Aprenderás en Este Curso?</h2>
                <div className="course-goals-list">
                    <div
                        className={`course-goal course-goal1 ${currentGoal == 0 ? "current-goal" : ""}`}
                        onClick={() => setCurrentGoal(0)}
                        style={goalStyle(0, currentGoal)}
                    >
                        <h2>Autoconocimiento Profundo</h2>
                        <p>
                            Descubre tus fortalezas, identifica áreas de mejora y comprende tus motivaciones internas para trazar
                            un camino alineado con tus verdaderos deseos.
                        </p>
                        <img className="bubble1" src="/Bubble.png" alt="Bubble" />
                        <img className="bubble2" src="/Bubble1.png" alt="Bubble" />

                    </div>
                    <div
                        className={`course-goal course-goal2 ${currentGoal == 1 ? "current-goal" : ""}`}
                        style={goalStyle(1, currentGoal)}
                        onClick={() => setCurrentGoal(1)}
                    >
                        <h2>Gestión Emocional Efectiva</h2>
                        <p>
                            Aprende a reconocer, comprender y canalizar tus emociones de manera saludable,
                            mejorando tus relaciones interpersonales y tu bienestar general.
                        </p>
                        <img className="bubble1" src="/Bubble1.png" alt="Bubble" />
                        <img className="bubble2" src="/Bubble.png" alt="Bubble" />
                    </div>
                    <div
                        className={`course-goal course-goal3 ${currentGoal == 2 ? "current-goal" : ""}`}
                        style={goalStyle(2, currentGoal)}
                        onClick={() => setCurrentGoal(2)}
                    >
                        <h2>Establecimiento de Metas y Planificación Estratégica</h2>
                        <p>
                            Desarrolla habilidades para definir objetivos claros y alcanzables, y crea planes de acción efectivos
                            que te mantengan enfocado y motivado.
                        </p>
                        <img className="bubble2" src="/Bubble1.png" alt="Bubble" />
                    </div>
                    <div
                        className={`course-goal course-goal4 ${currentGoal == 3 ? "current-goal" : ""}`}
                        style={goalStyle(3, currentGoal)}
                        onClick={() => setCurrentGoal(3)}
                    >
                        <h2>Técnicas de Motivación y Resiliencia</h2>
                        <p>
                            Adquiere estrategias para mantener una actitud positiva frente a desafíos,
                            cultivando la perseverancia y la capacidad de adaptarte a los cambios.
                        </p>
                        <img className="bubble1" src="/Bubble.png" alt="Bubble" />
                        <img className="bubble2" src="/Bubble1.png" alt="Bubble" />
                    </div>
                    <div
                        className={`course-goal course-goal5 ${currentGoal == 4 ? "current-goal" : ""}`}
                        style={goalStyle(4, currentGoal)}
                        onClick={() => setCurrentGoal(4)}
                    >
                        <h2>Relaciones y comunicación asertiva</h2>
                        <p>
                            Las relaciones juegan un papel fundamental en nuestra salud mental. Aprenderás a establecer
                            límites saludables, mejorar tu comunicación y manejar conflictos de manera efectiva.
                        </p>
                        <img className="bubble1" src="/Bubble.png" alt="Bubble" />
                    </div>
                    <div
                        className={`course-goal course-goal6 ${currentGoal == 5 ? "current-goal" : ""}`}
                        style={goalStyle(5, currentGoal)}
                        onClick={() => setCurrentGoal(5)}
                    >
                        <h2>Comunicación Asertiva y Liderazgo Personal</h2>
                        <p>Fortalece tus habilidades comunicativas y de liderazgo, aprendiendo a
                            influir positivamente en tu entorno y a inspirar a otros con tu ejemplo.
                        </p>
                        <img className="bubble1" src="/Bubble.png" alt="Bubble" />
                        <img className="bubble2" src="/Bubble1.png" alt="Bubble" />
                    </div>
                </div>
                <div className="course-goals-nav">
                    <CustomButton onClick={handlePrevGoal}><BiSolidLeftArrow /></CustomButton>
                    <div className={`course-goal-nav-index ${currentGoal == 0 ? "current-nav-index" : ""}`}></div>
                    <div className={`course-goal-nav-index ${currentGoal == 1 ? "current-nav-index" : ""}`}></div>
                    <div className={`course-goal-nav-index ${currentGoal == 2 ? "current-nav-index" : ""}`}></div>
                    <div className={`course-goal-nav-index ${currentGoal == 3 ? "current-nav-index" : ""}`}></div>
                    <div className={`course-goal-nav-index ${currentGoal == 4 ? "current-nav-index" : ""}`}></div>
                    <div className={`course-goal-nav-index ${currentGoal == 5 ? "current-nav-index" : ""}`}></div>
                    <CustomButton onClick={handleNextGoal}><BiSolidRightArrow /></CustomButton>
                </div>
            </article>

            <article className="video-presentation-0-article">
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/58cIOVjlXV4?si=tT-wjUD1dY4NIfEr"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>
                <div className="video-presentation-data">
                    <h2 className="subtitle">Video presentación</h2>
                    <ul>
                        <li>Elemento 1</li>
                        <li>Elemento 2</li>
                        <li>Elemento 3</li>
                        <li>Elemento 4</li>
                        <li>Elemento 5</li>
                        <li>Elemento 6</li>

                    </ul>
                </div>
            </article>


            <article className="course-benefits">
                <div class="course-benefits-container">
                    <div class="div1">
                        <h2>
                        Conviertete en esa persona que quieres ser
                        </h2>
                    </div>
                    <div class="div2"></div>
                    <div class="div3">
                        <h2>
                        Acceso ilimitado a más de 100 horas de mentorías grabadas para profundizar en tu aprendizaje.
                        </h2>
                    </div>
                    <div class="div4"></div>
                    <div class="div5"></div>
                    <div class="div6">
                        <h2 style={{textAlign: "left"}}>
                        Sesiones en vivo semanales para resolver tus dudas y compartir experiencias.
                        </h2>
                    </div>
                    <div class="div7"></div>
                    <div class="div8">
                        <h2 style={{textAlign: "left"}}>
                        Adopta hábitos y mentalidades que te acercarán a tus objetivos financieros y personales.
                        </h2>
                    </div>
                </div>

            </article>
        </section>
    )
}

export default CourseOverviewAuth
