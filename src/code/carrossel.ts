document.addEventListener("DOMContentLoaded", function () {
    const carousel: Element = document.querySelector(".carousel")!;
    const prevBtn: HTMLElement = document.getElementById("prevBtn")!;
    const nextBtn: HTMLElement = document.getElementById("nextBtn")!;
    const dotsContainer: Element = document.querySelector(".carousel-dots")!;
    const imageWidth: number = carousel.firstElementChild!.clientWidth + 150;
    const visibleImages: number = 4;
    let currentPosition: number = 0;
    let currentPage: number = 0;

    // Função para atualizar os pontos (indicadores de página)
    function updateDots() {
        const dots: NodeListOf<Element> = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot: Element, index: number): void => {
            dot.classList.toggle("active-dot", index === currentPage);
        });
    }

    // Função para mover o carrossel para a esquerda (anterior)
    function moveCarouselLeft(): void {
        if (currentPosition > 0) {
            currentPosition -= imageWidth;
            currentPage--;
        } else {
            // Se estiver na primeira imagem, ir para a última
            currentPosition = imageWidth * (8 - visibleImages); // 8 é o número total de imagens
            currentPage = 8 - visibleImages;
        }
        (carousel as HTMLElement).style.transform = `translateX(-${currentPosition}px)`;
        updateDots();
    }

    // Função para mover o carrossel para a direita (próximo)
    function moveCarouselRight(): void {
        if (currentPosition < imageWidth * (8 - visibleImages)) {
            currentPosition += imageWidth;
            currentPage++;
        } else {
            // Se estiver na última imagem, ir para a primeira
            currentPosition = 0;
            currentPage = 0;
        }
        (carousel as HTMLElement).style.transform = `translateX(-${currentPosition}px)`;
        updateDots();
    }

    // Adicionar ouvintes de eventos aos botões
    prevBtn.addEventListener("click", moveCarouselLeft);
    nextBtn.addEventListener("click", moveCarouselRight);

    // Criar os pontos (indicadores de página)
    for (let i: number = 0; i < 5; i++) {
        const dot: HTMLDivElement = document.createElement("div");
        dot.className = "dot";
        dot.addEventListener("click", (): void => {
            currentPosition = i * imageWidth;
            currentPage = i;
            (carousel as HTMLElement).style.transform = `translateX(-${currentPosition}px)`;
            updateDots();
        });
        dotsContainer.appendChild(dot);
    }

    // Atualizar os pontos iniciais
    updateDots();
});
