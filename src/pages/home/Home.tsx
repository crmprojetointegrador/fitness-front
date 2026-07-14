import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                background: 'linear-gradient(to right, #C9EED9, #FFFFFF)',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '80vh'
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: '1fr 1fr',
                    color: '#2d3748',
                    width: '100%',
                    maxWidth: '1280px',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "2rem",
                        paddingBottom: "2rem",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            textAlign: "center",
                            lineHeight: "1.2"
                        }}
                    >
                        
                        <span
                            style={{
                                background: 'linear-gradient(to right, #2d3748, #38a169)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}
                        >
                             Olá, Bem-vinde ao 
                        </span><br />
                        <span style={{ color: "#2d3748" }}>🏋️ PowerPlace 🏋️</span>
                    </h2>

                    <p
                        style={{
                            fontSize: "1.25rem",
                            textAlign: "center",
                            color: "#4a5568"
                        }}
                    >
                        Onde até comprar é pensado para ser eficiente.
                    </p>

                    <Link
                        to="/categorias"
                        style={{
                            borderRadius: "0.5rem",
                            backgroundColor: "#38a169",
                            color: "white",
                            border: "none",
                            padding: "0.75rem 2rem",
                            cursor: "pointer",
                            textDecoration: "none",
                            fontSize: "1.1rem"
                        }}
                    >
                        Ver Categorias
                    </Link>
                </div>

                
                
            </div>
        </div>
    );
}

export default Home;