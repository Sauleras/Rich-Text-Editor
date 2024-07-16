// Seletores de elementos
const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButtons = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

// Lista de fontes
const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Inicialização
const initializer = () => {
  // Chama a função para destacar botões
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Cria opções para os nomes das fontes
  fontList.forEach((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontName.appendChild(option);
  });

  // Cria opções para o tamanho da fonte (1 a 7)
  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    fontSizeRef.appendChild(option);
  }

  // Define o tamanho padrão da fonte
  fontSizeRef.value = 3;
};

// Função principal para modificar o texto
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// Para operações básicas que não necessitam de valor
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Para opções que requerem valor (ex: cores, fontes)
advancedOptionButtons.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Adiciona link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (userLink) {
    if (!/^https?:\/\//i.test(userLink)) {
      userLink = "http://" + userLink;
    }
    modifyText(linkButton.id, false, userLink);
  }
});

// Destacar botão clicado
const highlighter = (buttons, needsRemoval) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        const alreadyActive = button.classList.contains("active");
        highlighterRemover(buttons);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Remove destaque dos botões
const highlighterRemover = (buttons) => {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
};

// Inicializa o editor quando a página carrega
window.onload = initializer;
