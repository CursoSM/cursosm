import { useContext, useState } from "react"
import "./CourseOverviewAuth.css"

import { motion } from "framer-motion";

import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import CustomButton from "../../../Components/CustomButton/CustomButton";
import PlanCard from "../Plans/PlanCard/PlanCard";
import { AuthContext } from "../../../Contexts/AuthContext";




const plans = [
    {
        title: "Básico",
        description: `Empieza tu camino hacia el crecimiento personal con las herramientas esenciales. 
        Accede a materiales exclusivos, ejercicios prácticos y contenido diseñado para ayudarte a desbloquear tu potencial.`,
        benefits: [
            "Acceso al grupo privado de Telegram para soporte y comunidad",
            "Acceso al contenido del plan básico (videos, lecturas y ejercicios prácticos)",
            "Mentoría grupal limitada con feedback en sesiones en vivo",
            "Sesiones grupales mensuales de preguntas y respuestas"
        ],
        price: 900,
        isFeatured: false
    },
    {
        title: "Estándar",
        description: `Lleva tu desarrollo al siguiente nivel con sesiones en vivo, 
        acceso a una comunidad de apoyo y recursos avanzados. Obtén estrategias personalizadas para 
        aplicar en tu vida diaria y alcanzar resultados más rápidos.`,
        benefits: [
            "Acceso al grupo privado de Telegram",
            "Acceso al contenido del plan estándar (incluye todo el contenido del plan básico)",
            "Mentoría grupal con seguimiento y asesoramiento personalizado",
            "Sesiones grupales quincenales de coaching en vivo",
            "Desafíos y ejercicios prácticos exclusivos"
        ],
        price: 1200,
        isFeatured: false
    },
    {
        title: "VIP",
        description: `Transformación total con acompañamiento exclusivo. Disfruta de mentoría 
        1:1, acceso prioritario a nuevos contenidos y eventos privados. Este plan es para quienes 
        buscan cambios profundos y duraderos con el máximo nivel de soporte.`,
        benefits: [
            "Acceso al grupo privado de Telegram",
            "Acceso a todo el contenido del programa, incluyendo material inédito y exclusivo",
            "Mentoría prioritaria con seguimiento personalizado",
            "Sesiones grupales semanales de coaching en vivo",
            "Sesiones 1:1 mensuales para un acompañamiento profundo",
            "Acceso a eventos y talleres privados exclusivos"
        ],
        price: 1600,
        isFeatured: true
    },
];



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
    const { setAuthMode, setSlideBarOpen } = useContext(AuthContext)

    const [currentGoal, setCurrentGoal] = useState(0) // Inicializa con 0, o el índice que prefieras

    const [swipeDirection, setSwipeDirection] = useState(null);

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;




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



    // Detecta el inicio del toque
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX; // Guardamos la posición inicial en el eje X
        touchStartY = e.touches[0].clientY; // Guardamos la posición inicial en el eje Y
    };

    // Detecta el final del toque
    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].clientX; // Guardamos la posición final en el eje X
        touchEndY = e.changedTouches[0].clientY; // Guardamos la posición final en el eje Y

        const deltaX = touchEndX - touchStartX; // Distancia en el eje X
        const deltaY = touchEndY - touchStartY; // Distancia en el eje Y

        // Si el movimiento en el eje Y es mayor que en el eje X, no consideramos el deslizamiento
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            setSwipeDirection(null); // No es un deslizamiento horizontal
            return;
        }

        // Si el movimiento en el eje X es mayor, detectamos la dirección
        if (deltaX > 0) {
            handlePrevGoal(); // Deslizó a la derecha
        } else if (deltaX < 0) {
            handleNextGoal(); // Deslizó a la izquierda
        }
    };

    const handleLogIn = () => {
        setAuthMode("log-in")
        setSlideBarOpen(false)
    }
    const handleSignUp = () => {
        setAuthMode("sign-up")
        setSlideBarOpen(false)
    }

    return (
        <section className="course-overview-auth">
            <article className="course-overview">
                <div className="course-overview-container">
                    <div className="overview-video-container">
                        <motion.iframe
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}
                            src="https://www.youtube.com/embed/58cIOVjlXV4?si=tT-wjUD1dY4NIfEr"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </motion.iframe>
                    </div>
                    <div className="overview-titles">
                        <motion.h1
                            initial={{
                                scale: .5,
                                opacity: 0
                            }}
                            whileInView={{
                                scale: 1,
                                opacity: 1
                            }}
                            className="course-title">atrévete a ser la mejor versión de vos.</motion.h1>
                        <motion.h2
                            initial={{
                                scale: .5,
                                opacity: 0
                            }}
                            whileInView={{
                                scale: 1,
                                opacity: 1
                            }}
                            className="course-subtitle">Desarrolla tu potencial, supera tus límites y alcanza tus metas con nuestro enfoque único de aprendizaje.</motion.h2>
                    </div>
                </div>
            </article>


            <h1>{swipeDirection}</h1>
            <article className="course-goals">
                <motion.h2
                    initial={{
                        scale: .5,
                        opacity: 0
                    }}
                    whileInView={{
                        scale: 1,
                        opacity: 1
                    }}
                    className="subtitle">¿Qué Aprenderás en Este Curso?</motion.h2>
                <motion.div className="course-goals-list"
                    initial={{
                        scale: .5,
                        opacity: 0
                    }}
                    whileInView={{
                        scale: 1,
                        opacity: 1
                    }}
                >
                    <div
                        className={`course-goal course-goal1 ${currentGoal == 0 ? "current-goal" : ""}`}
                        onClick={() => setCurrentGoal(0)}
                        style={goalStyle(0, currentGoal)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
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
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
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
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
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
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
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
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
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
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <h2>Comunicación Asertiva y Liderazgo Personal</h2>
                        <p>Fortalece tus habilidades comunicativas y de liderazgo, aprendiendo a
                            influir positivamente en tu entorno y a inspirar a otros con tu ejemplo.
                        </p>
                        <img className="bubble1" src="/Bubble.png" alt="Bubble" />
                        <img className="bubble2" src="/Bubble1.png" alt="Bubble" />
                    </div>
                </motion.div>
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
                    <motion.iframe
                        initial={{
                            opacity: 0,
                            scale: .5
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1
                        }}
                        src="https://www.youtube.com/embed/58cIOVjlXV4?si=tT-wjUD1dY4NIfEr"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </motion.iframe>
                </div>
                <div className="video-presentation-data">
                    <motion.h2
                        className="subtitle"
                        initial={{
                            opacity: 0,
                            scale: .5
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1
                        }}>
                        Video presentación</motion.h2>
                    <ul>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Transforma tu vida profesional con nuestro curso</motion.li>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Acceso exclusivo a contenido de alta calidad</motion.li>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Metodología práctica y aplicada</motion.li>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Aprende a tu propio ritmo con soporte constante</motion.li>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Comunidad activa y networking</motion.li>
                        <motion.li
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1
                            }}>
                            Garantía de satisfacción y resultados medibles</motion.li>

                    </ul>
                </div>
            </article>


            <article className="course-benefits">
                <div class="course-benefits-container">
                    <motion.div
                        class="div1"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    >
                        <h2>
                            Conviertete en esa persona que quieres ser
                        </h2>
                    </motion.div>
                    <motion.div
                        class="div2"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    ></motion.div>
                    <motion.div
                        class="div3"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    >
                        <h2>
                            Acceso ilimitado a más de 100 horas de mentorías grabadas para profundizar en tu aprendizaje.
                        </h2>
                    </motion.div>
                    <motion.div
                        class="div4"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    ></motion.div>
                    <motion.div
                        class="div5"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    ></motion.div>
                    <motion.div
                        class="div6"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    >
                        <h2 style={{ textAlign: "left" }}>
                            Sesiones en vivo semanales para resolver tus dudas y compartir experiencias.
                        </h2>
                    </motion.div>
                    <motion.div
                        class="div7"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    ></motion.div>
                    <motion.div
                        class="div8"
                        initial={{
                            scale: .5,
                            opacity: 0
                        }}
                        whileInView={{
                            scale: 1,
                            opacity: 1
                        }}
                    >
                        <h2 style={{ textAlign: "left" }}>
                            Adopta hábitos y mentalidades que te acercarán a tus objetivos financieros y personales.
                        </h2>
                    </motion.div>
                </div>
            </article>

            <article className="user-auth-article">
                <div className="user-auth-article-bg" />
                <CustomButton
                    animationType="verticalScale"
                    onClick={handleLogIn}
                >Iniciar sesión
                </CustomButton>
                <CustomButton
                    className="sign-up"
                    animationType="verticalScale"
                    onClick={handleSignUp}
                >Registrarse
                </CustomButton>
            </article>

            <article className="plans-article">
                {
                    plans.map((current, index) => (
                        <PlanCard data={current} key={index} />
                    ))
                }
            </article>
        </section>
    )
}

export default CourseOverviewAuth
