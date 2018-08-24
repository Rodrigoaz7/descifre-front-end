import React from 'react';
const Descricao = () => (
    <section className="section section-components">
        <div className="container">
            <br /><hr />
            <h2 className="mb-5">
                <span>O que é o De$cifre?</span>
            </h2>

            <h4><i className="ni ni-controller"></i> O JOGO</h4>
            <p>O De$cifre é um jogo de quizzes onde seus jogadores podem ganhar cifras que podem ser trocadas por dinheiro ou mercadorias dos nossos parceiros.</p>
            <hr />
            <h4><i className="ni ni-time-alarm"></i> RODADAS</h4>
            <p>Rodadas são intervalos fechados de faixa de horários (Por exemplo 8 às 9), onde os usuários tem um tempo determinado para responder o máximo de questões que conseguirem. O usuário pode entrar em uma rodada até 10 minutos antes de ela ser fechada.</p>
            <hr />
            <h4><i className="ni ni-spaceship"></i> Quizzes</h4>
            <p>Um quiz é definido como um conjunto de perguntas que possuem respostas de múltiplas escolhas onde apenas uma alternativa está correta, cada pergunta possui uma pontuação definida que será acumulada a pontuação do jogador na rodada caso a resposta esteja correta.</p>
            <hr />
            <h4><i className="ni ni-shop"></i> Cifras</h4>
            <p>Cifra é a moeda usada dentro do jogo.<br />
                Para jogar o quiz de uma rodada é necessário pagar cifras, assim como para comprar itens de ajuda in game (remover uma resposta errada, trocar de pergunta, não contabilizar uma resposta errada, etc).
            </p>

        </div>
    </section>
);
export default Descricao;