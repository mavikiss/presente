const presente = document.getElementById("presente");

const confetes = document.getElementById("confetes");

const tela = document.getElementById("tela");

const npc = document.getElementById("npc");

const caixaFala = document.getElementById("caixa-fala");

const textoFala = document.getElementById("texto-fala");

const confetesFundo = document.getElementById("confetes-caindo");

const cenaQuarto = document.getElementById("cena-quarto");

const cenaPc = document.getElementById("cena-pc");

const cenaFinal = document.getElementById("cena-final");

const quartoStage = document.getElementById("quarto-stage");

const overlayFala = document.getElementById("overlay-fala");

const textoJogo = document.getElementById("texto-jogo");

const inventarioItens = document.getElementById("inventario-itens");

const pcJanela = document.getElementById("pc-janela");

const pcJanelaTitulo = document.getElementById("pc-janela-titulo");

const pcJanelaCorpo = document.getElementById("pc-janela-corpo");

const musicaExploracao = document.getElementById("musica-exploracao");

const musicaFinal = document.getElementById("musica-final");

const btnMusica = document.getElementById("btn-musica");


let estado = "presente";

let clicado = false;

let falaAtual = 0;

let dialogoIniciado = false;

let bocaIntervalo = null;

let confetesFundoIntervalo = null;

let filaFalas = [];

let indiceFila = 0;

let aoTerminarFala = null;

let senhaDigitada = "";

let musicaAtual = null;

let musicaPausada = false;


const progresso = {

    pistaEstante: false,

    secretLiberado: false,

    temChave: false,

    caixaAberta: false,

    viuCama: false,

    janelaTocada: false

};


/* ========== EDITÁVEL ========== */

const SENHA_SECRETA = "314";


const MEMORIA_1 = {

    titulo: "MEMORY 01",

    foto: "imagens/foto1.jpg",

    data: "seu dia",

    texto:
        "hoje é um dia especial porque é o dia que vc nasceu. eu espero que vc nunca esqueça o quanto é importante e o quanto é querido."

};


const MEMORIA_2 = {

    titulo: "MEMORY 02",

    foto: "imagens/foto2.jpg",

    data: "sobre vc",

    texto:
        "eu espero que vc consiga enxergar em vc mesmo tudo de bom que eu enxergo. vc merece muita coisa boa e merece ser feliz de verdade."

};


const MEMORIA_3 = {

    titulo: "MEMORY 03",

    foto: "imagens/foto3.jpg",

    data: "mais um ano",

    texto:
        "mais um ano da sua vida começando, e eu espero poder acompanhar muitos deles ainda. que esse seja só o começo de um ano muito bom pra vc."

};


const FOTO_FINAL = "imagens/foto1.jpg";


const MENSAGEM_FINAL = `eu te amo muito. muito mesmo.

eu queria poder estar aí agora, te abraçar, te encher de beijo e ficar pertinho de você nesse dia.

você é uma das pessoas mais importantes da minha vida, e eu sou muito feliz por ter você comigo.

eu amo você, amo seu jeitinho, amo nossas conversas, nossas brincadeiras e até as coisas mais bobas que a gente faz juntos.

eu espero que esse novo ano da sua vida seja lindo. que você seja muito feliz, que consiga realizar tudo o que deseja e que nunca esqueça o quanto é amado.

eu quero continuar aqui. quero acompanhar seus próximos aniversários, suas conquistas, seus dias bons e até os difíceis.

eu te amo, meu moreno.

feliz aniversário, meu amor.`;


/* ========== /EDITÁVEL ========== */


const falas = [

    "OI, MORENO LINDOOOO!",

    "Hoje é o dia do meu garoto.",

    "Feliz aniversário, meu amor.",

    "Eu queria muito poder estar aí com você hoje.",

    "Mas já que não posso, resolvi fazer uma coisinha diferente.",

    "Pode não ser o maior presente do mundo...",

    "Mas eu fiz tudo pensando em você.",

    "E espero que você goste, porque eu fiz com muito carinho.",

    "E eu espero que seu aniversário seja tão lindo quanto você.",

    "Porque hoje é o dia do meu Moreno.",

    "Do meu príncipe, do meu bebê, do meu neném.",

    "E eu queria poder estar aí pertinho de você pra te dar um beijo e um abraço bem apertado.",

    "Mas mesmo de longe, eu queria fazer alguma coisinha pra deixar seu dia mais especial.",

    "Eu te amo muito, meu amor.",

    "Feliz aniversário, Moreno."

];


function caminhoMusica(pasta, arquivo) {

    return "imagens/" +
        encodeURIComponent(pasta) +
        "/" +
        encodeURIComponent(arquivo);

}


musicaExploracao.src = caminhoMusica(

    "música Miguel",

    "ytmp3free.cc_laufey-visual-playlist-w-lyrics-pov-youre-falling-in-love-in-lisbon-youtubemp3free.org (1).mp3"

);


musicaFinal.src = caminhoMusica(

    "música Miguel",

    "ytmp3free.cc_vem-ca-pele-milflows-prod-volp-rafa-valle-youtubemp3free.org (1).mp3"

);


/* =====================================================
   PRESENTE / INTRODUÇÃO
===================================================== */

presente.addEventListener("click", () => {

    if (estado !== "presente" || clicado) return;

    clicado = true;

    presente.classList.add("clicado");

    criarConfetes();


    setTimeout(() => {

        presente.style.opacity = "0";

        presente.style.pointerEvents = "none";

    }, 150);


    setTimeout(() => {

        tela.classList.add("cena-cinza");


        confetesFundoIntervalo = setInterval(() => {

            criarConfeteFundo();

        }, 350);


        setTimeout(() => {

            tela.classList.add("npc-aparecendo");


            setTimeout(() => {

                tela.classList.add("npc-flutuando");

            }, 1000);


            setTimeout(() => {

                tela.classList.add("caixa-visivel");

                iniciarDialogo();

            }, 1000);

        }, 500);

    }, 1200);

});


function iniciarDialogo() {

    if (dialogoIniciado) return;

    dialogoIniciado = true;

    estado = "dialogo";

    falaAtual = 0;

    mostrarFala();

}


function mostrarFala() {

    textoFala.textContent = falas[falaAtual];

    iniciarAnimacaoBoca();


    if (falaAtual === falas.length - 1) {

        estado = "transicao";

        setTimeout(iniciarTransicao, 2400);

    }

}


tela.addEventListener("click", () => {

    if (estado !== "dialogo") return;


    if (falaAtual < falas.length - 1) {

        falaAtual++;

        mostrarFala();

    }

});


/* =====================================================
   BOCA DO NPC
===================================================== */

function iniciarAnimacaoBoca() {

    pararAnimacaoBoca();

    let estadoBoca = 0;

    npc.src = "imagens/npc_fechada.png";


    bocaIntervalo = setInterval(() => {

        estadoBoca++;


        if (estadoBoca % 3 === 0) {

            npc.src = "imagens/npc_fechada.png";

        } else if (estadoBoca % 2 === 0) {

            npc.src = "imagens/npc_boca1.png";

        } else {

            npc.src = "imagens/npc_boca2.png";

        }

    }, 140);

}


function pararAnimacaoBoca() {

    if (bocaIntervalo !== null) {

        clearInterval(bocaIntervalo);

        bocaIntervalo = null;

    }

}


/* =====================================================
   TRANSIÇÃO PARA O QUARTO
===================================================== */

function pararConfetesFundo() {

    if (confetesFundoIntervalo !== null) {

        clearInterval(confetesFundoIntervalo);

        confetesFundoIntervalo = null;

    }

    confetesFundo.innerHTML = "";

}


function iniciarTransicao() {

    if (estado !== "transicao") return;

    pararAnimacaoBoca();

    npc.src = "imagens/npc_fechada.png";

    tela.classList.remove("caixa-visivel");

    tela.classList.remove("npc-flutuando");

    npc.classList.add("sumindo");

    tela.classList.add("escurecendo");

    pararConfetesFundo();


    setTimeout(() => {

        tela.classList.add("espera-visivel");


        setTimeout(() => {

            tela.classList.remove("espera-visivel");


            setTimeout(() => {

                abrirQuarto();

            }, 700);

        }, 1400);

    }, 1000);

}


function abrirQuarto() {

    estado = "quarto";

    cenaQuarto.hidden = false;

    btnMusica.hidden = false;

    tocarMusica(musicaExploracao);

    atualizarInventario();

}


/* =====================================================
   MÚSICA
===================================================== */

function tocarMusica(audio) {

    if (musicaAtual && musicaAtual !== audio) {

        musicaAtual.pause();

        musicaAtual.currentTime = 0;

    }


    musicaAtual = audio;


    if (musicaPausada) {

        btnMusica.textContent = "som";

        return;

    }


    if (audio === musicaFinal) {

        audio.currentTime = 47;

    }


    const play = audio.play();


    if (play && typeof play.catch === "function") {

        play.catch(() => {});

    }


    btnMusica.textContent = "mudo";

}


btnMusica.addEventListener("click", (evento) => {

    evento.stopPropagation();


    if (!musicaAtual) return;


    if (musicaAtual.paused) {

        musicaPausada = false;

        tocarMusica(musicaAtual);

    } else {

        musicaPausada = true;

        musicaAtual.pause();

        btnMusica.textContent = "som";

    }

});


/* =====================================================
   INVENTÁRIO
===================================================== */

function atualizarInventario() {

    const pecas = [];


    if (progresso.temChave) {

        pecas.push(
            '<span class="inventario-item">[ CHAVE ]</span>'
        );

    }


    if (progresso.caixaAberta) {

        pecas.push(
            '<span class="inventario-item">[ FINAL_FILE ]</span>'
        );

    }


    inventarioItens.innerHTML = pecas.join("") || "";

}


/* =====================================================
   DIÁLOGOS DO QUARTO
===================================================== */

function mostrarFalasJogo(linhas, aoFim) {

    filaFalas = linhas.slice();

    indiceFila = 0;

    aoTerminarFala = aoFim || null;

    overlayFala.hidden = false;

    textoJogo.textContent = filaFalas[0];

}


overlayFala.addEventListener("click", () => {

    if (overlayFala.hidden) return;


    if (indiceFila < filaFalas.length - 1) {

        indiceFila++;

        textoJogo.textContent = filaFalas[indiceFila];

        return;

    }


    overlayFala.hidden = true;

    filaFalas = [];


    if (typeof aoTerminarFala === "function") {

        const fim = aoTerminarFala;

        aoTerminarFala = null;

        fim();

    }

});


/* =====================================================
   HOTSPOTS
===================================================== */

document
    .querySelectorAll("#cena-quarto .hotspot")
    .forEach((botao) => {

        botao.addEventListener("click", (evento) => {

            evento.stopPropagation();


            if (
                estado !== "quarto" ||
                !overlayFala.hidden
            ) {
                return;
            }


            botao.classList.add("tocado");


            setTimeout(() => {

                botao.classList.remove("tocado");

            }, 220);


            usarObjeto(botao.dataset.obj);

        });

    });


function usarObjeto(nome) {

    /* ================= CAMA ================= */

    if (nome === "cama") {

        if (
            progresso.secretLiberado &&
            !progresso.temChave
        ) {

            progresso.temChave = true;

            atualizarInventario();

            mostrarChave();


            mostrarFalasJogo([

                "Você encontrou uma chave.",

                "Mas ela não parece ser do computador."

            ]);


            return;

        }


        if (!progresso.viuCama) {

            progresso.viuCama = true;


            mostrarFalasJogo([

                "Só uma cama.",

                "...por enquanto."

            ]);


            return;

        }


        mostrarFalasJogo([

            "Não tem mais nada aqui."

        ]);


        return;

    }


    /* ================= JANELA ================= */

    if (nome === "janela") {

        quartoStage.classList.toggle("luz-alterada");

        progresso.janelaTocada = true;


        mostrarFalasJogo([

            "Lá fora está tudo normal.",

            "Aqui dentro é que importa."

        ]);


        return;

    }


    /* ================= ESTANTE ================= */

    if (nome === "estante") {

        progresso.pistaEstante = true;


        mostrarFalasJogo([

            "Você encontrou alguma coisa.",

            "3 - 1 - 4"

        ]);


        return;

    }


    /* ================= CAIXA ================= */

    if (nome === "caixa") {

        const caixaHotspot =
            document.querySelector(".hotspot-caixa");


        if (!progresso.temChave) {

            mostrarFalasJogo([

                "Está trancada.",

                "Talvez exista uma chave por aqui."

            ]);


            return;

        }


        if (!progresso.caixaAberta) {

            progresso.caixaAberta = true;

            atualizarInventario();


            if (caixaHotspot) {

                caixaHotspot.classList.add(
                    "caixa-aberta-flash"
                );

            }


            mostrarFalasJogo([

                "A caixa abriu.",

                "UMA ÚLTIMA COISA",

                "CHAVE DA SURPRESINHA FINAL"

            ]);


            return;

        }


        mostrarFalasJogo([

            "Já não resta nada dentro."

        ]);


        return;

    }


    /* ================= PORTA ================= */

    if (nome === "porta") {

        if (
            !progresso.temChave ||
            !progresso.caixaAberta
        ) {

            mostrarFalasJogo([

                "Trancada.",

                "Você provavelmente ainda não deveria sair."

            ]);


            return;

        }


        mostrarFalasJogo(

            [

                "A chave encaixou."

            ],

            abrirAreaFinal

        );


        return;

    }


    /* ================= COMPUTADOR ================= */

    if (nome === "computador") {

        abrirComputador();

    }

}


/* =====================================================
   CHAVE
===================================================== */

function mostrarChave() {

    const aviso = document.createElement("div");

    aviso.className = "chave-flash";

    aviso.textContent = "[ CHAVE ]";

    document.body.appendChild(aviso);


    setTimeout(() => {

        aviso.remove();

    }, 1100);

}


/* =====================================================
   COMPUTADOR
===================================================== */

function abrirComputador() {

    estado = "computador";

    cenaPc.hidden = false;

    fecharJanelaPc();

}


function fecharComputador() {

    if (estado !== "computador") return;

    cenaPc.hidden = true;

    fecharJanelaPc();

    estado = "quarto";

}


document
    .getElementById("pc-fechar")
    .addEventListener(
        "click",
        fecharComputador
    );


document
    .getElementById("pc-janela-fechar")
    .addEventListener(
        "click",
        fecharJanelaPc
    );


function fecharJanelaPc() {

    pcJanela.hidden = true;

    pcJanelaCorpo.innerHTML = "";

}


function abrirJanelaPc(titulo, html) {

    pcJanelaTitulo.textContent = titulo;

    pcJanelaCorpo.innerHTML = html;

    pcJanela.hidden = false;

}


/* =====================================================
   ARQUIVOS DO COMPUTADOR
===================================================== */

document
    .getElementById("pc-arquivos")
    .addEventListener(
        "click",
        (evento) => {

            const botao =
                evento.target.closest(".pc-arquivo");


            if (
                !botao ||
                estado !== "computador"
            ) {
                return;
            }


            const arquivo =
                botao.dataset.arquivo;


            /* ---------- BIRTHDAY ---------- */

            if (arquivo === "birthday") {

                abrirJanelaPc(

                    "birthday.txt",

                    [

                        '<p class="pc-linha-sistema">birthday.txt</p>',

                        "<p>feliz aniversário, meu amor.</p>",

                        "<p>eu te amo muito, sabia?</p>",

                        "<p>eu fiz isso tudo pensando em você e queria muito poder estar aí hoje pra comemorar seu aniversário com você, te abraçar, te encher de beijo e ficar pertinho de você.</p>",

                        "<p>espero que você goste também, moreno.</p>",

                        "<p>eu amo você demais.</p>",

                        "<p>feliz aniversário, meu amor.</p>"

                    ].join("")

                );


                return;

            }


            /* ---------- README ---------- */

            if (arquivo === "readme") {

                abrirJanelaPc(

                    "readme.txt",

                    [

                        '<p class="pc-linha-sistema">README</p>',

                        "<p>oi meu amor, feliz aniversário. muitos e muitos anos de vida pra vc.</p>",

                        "<p>eu espero de verdade que seu dia seja maravilhoso e que sua vida seja sempre muito abençoada. te desejo tudo de bom que existe, que vc consiga realizar tudo que deseja e que nunca falte motivo pra vc sorrir.</p>",

                        "<p>espero que a vida não tenha sido muito dura com vc até aqui. e mesmo que tenha sido, quero que vc saiba que eu sempre vou estar aqui pra vc. nos dias bons, nos dias ruins, quando vc estiver feliz, quando estiver mal, quando quiser conversar ou quando só quiser ficar quietinho.</p>",

                        "<p>eu quero poder estar do seu lado em tudo que vier pela frente. quero ver vc conquistar suas coisas, realizar seus sonhos e ficar muito orgulhosa com cada coisinha que vc conseguir.</p>",

                        "<p>eu sou muito feliz por ter vc na minha vida.</p>",

                        "<p>eu espero que esse novo ano da sua vida seja cheio de coisas boas, momentos felizes e pessoas que te façam bem. espero que vc se sinta amado, cuidado e importante, porque vc é tudo isso pra mim.</p>",

                        "<p>e eu espero também que eu possa continuar fazendo parte da sua vida por muito, muito tempo.</p>",

                        "<p>eu te amo demais, meu moreno. mais do que eu consigo explicar direito.</p>",

                        "<p>aproveita muito seu dia, porque hoje é o seu dia.</p>",

                        "<p>feliz aniversário, meu amor.</p>"

                    ].join("")

                );


                return;

            }


            /* ---------- MEMORIES ---------- */

            if (arquivo === "memories") {

                abrirJanelaPc(

                    "memories.dat",

                    htmlMemorias()

                );


                return;

            }


            /* ---------- SECRET ---------- */

            if (arquivo === "secret") {

                abrirSecretLock();

            }

        }

    );


/* =====================================================
   MEMÓRIAS
===================================================== */

function htmlMemoria(memoria, id) {

    const foto = memoria.foto

        ? '<img src="' +
          memoria.foto +
          '" alt="' +
          id +
          '">'

        : "<span>[ FOTO ]</span>";


    return [

        '<article class="memoria-slot" id="' +
        id +
        '">',

        "<h3>" +
        memoria.titulo +
        "</h3>",

        '<div class="memoria-foto">' +
        foto +
        "</div>",

        "<p>" +
        memoria.data +
        "</p>",

        "<p>" +
        memoria.texto +
        "</p>",

        "</article>"

    ].join("");

}


function htmlMemorias() {

    return [

        '<div class="memoria-lista">',

        htmlMemoria(
            MEMORIA_1,
            "MEMORIA_1"
        ),

        htmlMemoria(
            MEMORIA_2,
            "MEMORIA_2"
        ),

        htmlMemoria(
            MEMORIA_3,
            "MEMORIA_3"
        ),

        "</div>"

    ].join("");

}


/* =====================================================
   SECRET.LOCK
===================================================== */

function abrirSecretLock() {

    senhaDigitada = "";


    abrirJanelaPc(

        "secret.lock",

        [

            '<div class="pc-senha">',

            '<p class="pc-linha-sistema">ACCESS DENIED</p>',

            "<p>A senha provavelmente está escondida em algum lugar.</p>",

            '<div class="pc-senha-tela" id="pc-senha-tela"></div>',

            '<div class="pc-teclado" id="pc-teclado"></div>',

            "</div>"

        ].join("")

    );


    const teclado =
        document.getElementById("pc-teclado");


    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        .forEach((n) => {

            const tecla =
                document.createElement("button");


            tecla.type = "button";

            tecla.className = "pc-tecla";

            tecla.textContent = String(n);


            tecla.addEventListener("click", () => {

                if (senhaDigitada.length >= 6) {
                    return;
                }


                senhaDigitada += String(n);

                atualizarTelaSenha();

            });


            teclado.appendChild(tecla);

        });


    const ok =
        document.createElement("button");


    ok.type = "button";

    ok.className = "pc-ok";

    ok.textContent = "entrar";

    ok.addEventListener(
        "click",
        tentarSenha
    );


    teclado.appendChild(ok);

    atualizarTelaSenha();

}


function atualizarTelaSenha() {

    const telaSenha =
        document.getElementById("pc-senha-tela");


    if (telaSenha) {

        telaSenha.textContent =
            senhaDigitada.replace(/./g, "·") ||
            "---";

    }

}


function tentarSenha() {

    const normalizada =
        senhaDigitada.replace(/\D/g, "");


    if (normalizada === SENHA_SECRETA) {

        progresso.secretLiberado = true;


        abrirJanelaPc(

            "secret.lock",

            [

                '<p class="pc-linha-sistema">ACCESS GRANTED.</p>',

                "<p>não esta na hora de dormir?</p>"

            ].join("")

        );


        return;

    }


    senhaDigitada = "";

    atualizarTelaSenha();


    const aviso =
        pcJanelaCorpo.querySelector(
            ".pc-linha-sistema"
        );


    if (aviso) {

        aviso.textContent =
            "Senha incorreta.";

    }

}


/* =====================================================
   FINAL
===================================================== */

function abrirAreaFinal() {

    estado = "final";


    cenaPc.hidden = true;

    cenaQuarto.hidden = true;


    montarFinal();


    cenaFinal.hidden = false;


    musicaPausada = false;

    tocarMusica(musicaFinal);

}


function montarFinal() {

    const foto =
        document.getElementById("final-foto");


    const mensagem =
        document.getElementById("final-mensagem");


    mensagem.textContent =
        MENSAGEM_FINAL;


    if (FOTO_FINAL) {

        foto.innerHTML =
            '<img src="' +
            FOTO_FINAL +
            '" alt="Uma foto nossa">';

    } else {

        foto.innerHTML =
            "<span>[FOTO_FINAL]</span>";

    }

}


/* =====================================================
   CONFETES
===================================================== */

function criarConfetes() {

    const quantidade = 100;


    const rect =
        presente.getBoundingClientRect();


    const origemX =
        rect.left +
        rect.width / 2;


    const origemY =
        rect.top +
        rect.height / 2;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const confete =
            document.createElement("div");


        confete.classList.add("confete");


        confete.style.left =
            origemX + "px";


        confete.style.top =
            origemY + "px";


        const x =
            (Math.random() - 0.5) * 500;


        const y =
            (Math.random() - 0.5) * 500;


        const rotacao =
            (Math.random() - 0.5) * 720;


        confete.style.setProperty(
            "--x",
            x + "px"
        );


        confete.style.setProperty(
            "--y",
            y + "px"
        );


        confete.style.setProperty(
            "--rotacao",
            rotacao + "deg"
        );


        const cores = [

            "#ff4f81",

            "#ffd166",

            "#6ecbff",

            "#9b7bff",

            "#ffffff",

            "#ff8c42"

        ];


        confete.style.background =
            cores[
                Math.floor(
                    Math.random() *
                    cores.length
                )
            ];


        confetes.appendChild(confete);


        setTimeout(() => {

            confete.remove();

        }, 1200);

    }

}


function criarConfeteFundo() {

    const confete =
        document.createElement("div");


    confete.classList.add(
        "confete-fundo"
    );


    confete.style.left =
        Math.random() * 100 + "%";


    const tamanho =
        5 + Math.random() * 5;


    confete.style.width =
        tamanho + "px";


    confete.style.height =
        tamanho * 1.6 + "px";


    const movimento =
        (Math.random() - 0.5) * 160;


    const rotacao =
        (Math.random() - 0.5) * 720;


    const duracao =
        5 + Math.random() * 5;


    confete.style.setProperty(
        "--movimento",
        movimento + "px"
    );


    confete.style.setProperty(
        "--rotacao",
        rotacao + "deg"
    );


    confete.style.setProperty(
        "--duracao",
        duracao + "s"
    );


    const cores = [

        "#ff6f91",

        "#ffd166",

        "#7bdff2",

        "#b8a1ff",

        "#ffffff",

        "#ff9f68"

    ];


    confete.style.background =
        cores[
            Math.floor(
                Math.random() *
                cores.length
            )
        ];


    confetesFundo.appendChild(confete);


    setTimeout(() => {

        confete.remove();

    }, duracao * 1000);

}