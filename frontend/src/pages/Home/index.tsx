import React from 'react';
import MapUsers from '../../components/MapUsers'

import logoImg from '../../assets/logo.png'
import telasImg from '../../assets/telas.png'
import ccrImg from '../../assets/ccr.png'
import twilioImg from '../../assets/twilio.png'
import whatsappImg from '../../assets/whatsapp.png'
import liveloImg from '../../assets/livelo.png'
import { useHistory } from 'react-router-dom'
import './styles.css';

const About: React.FC = () => {

  const history = useHistory();

  const handleNavigateToRegister = () => {
    history.push("/register")
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <img src={logoImg} width={200} alt="logo" />
          <p>
            A plataforma que conecta espaços para descanso e chuveiro aos caminhoneiros!
        </p>
          <div className="header-btns">
            <button type="button" className="btn bg-outlined" onClick={handleNavigateToRegister}>
              SOU ESTABELECIMENTO
            </button>
            &nbsp;&nbsp;&nbsp;
            <button type="button" className="btn bg-red">
              SOU CAMINHONEIRO
            </button>
          </div>
        </div>
        <section className="box-funcionamento">
          <div className="content-funcionamento">
            <h1>Como funciona?</h1>
            <p style={{ padding: 50 }}>
              Uma plataforma que conecta donos de espaços para descanso e chuveiro com caminhoneiros para melhorar a qualidade de vida nas estradas. Pessoas e estabelecimentos, atendendo a critérios mínimos, como espaço para estacionamento e localização em estradas, podem se cadastrar para oferecer duchas e pernoite aos caminhoneiros. Os caminhoneiros podem encontrar todos esses lugares no app do Parada e no WhatsApp. É só acessar o app, filtrar o que procura, por distância ou rota, e escolher uma parada. Se for um banheiro, ainda pode filtrar entre feminino e masculino. Tudo muito simples! Entre fazendas de beira de estrada, tendas, restaurantes, oficinas, postos e outros estabelecimentos o caminhoneiro pode ver fotos, conhecer as comodidades e ver as avaliações.
            </p>
          </div>
        </section>
        <section className="box-telas">
          <div className="content-telas">
              <img src={telasImg} alt="Design das telas" className="telasImg" style={{maxWidth: 500}} />
            <div>
              <h1>Vantagens {`&`} Benefícios</h1>
              <div>
                <div style={{ textAlign: "center", marginTop: 30 }}>
                  <h3 className="fontBlue">Lugares para dormir</h3>
                  <h3 className="fontRed">Mais segurança nas paradas</h3>
                  <h3 className="fontBlue">Programa de pontos</h3>
                  <h3 className="fontRed">Chuveiro de qualidade</h3>
                  <h3 className="fontBlue">Ótimo custo benefício</h3>
                  <h3 className="fontRed">Preço baixo</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="box-mapa">
          <div className="content-mapa">
            <h1>Usuários online agora</h1>
            <MapUsers />
          </div>
        </section>
        <section className="box-actions">
          <div>
            <h1 style={{ paddingBottom: 50 }}>Inscreva-se já:</h1>
            <button type="button" className="btn bg-outlined" onClick={handleNavigateToRegister}>
              SOU ESTABELECIMENTO
            </button>
            &nbsp;
            <button type="button" className="btn bg-outlined">
              SOU CAMINHONEIRO
            </button>
          </div>
        </section>
        <section className="box-parceiros">
          <h1 style={{ textAlign: "center" }}>Parceiros e integrações</h1>
          <div className="logos">
            <img src={ccrImg} alt="Logo CCR" width={240} />
            <img src={twilioImg} alt="Logo Twilio" width={220} />
            <img src={liveloImg} alt="Logo Livelo" width={220} />
            <img src={whatsappImg} alt="Logo Whatsapp" width={200} />
          </div>
        </section>
        <section className="box-footer">
          <div>
            <h1>Projeto Hackathon CCR Shawee 2020</h1>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;