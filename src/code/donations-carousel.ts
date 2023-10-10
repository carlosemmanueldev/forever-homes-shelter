document.addEventListener("DOMContentLoaded", function () {
    const carousel: Element = document.querySelector(".donations-carousel")!;
    const carouselImages: NodeListOf<Element> = carousel.querySelectorAll(".donations-carousel-img");
    const prevBtn: HTMLElement = document.getElementById("prevBtnDonations")!;
    const nextBtn: HTMLElement = document.getElementById("nextBtnDonations")!;
    const dotsContainer: Element = document.querySelector(".donations-carousel-dots")!;
    let visibleImages: number = 1;
    let currentPosition: number = 0;
    let currentPage: number = 0;
    let imageWidth: number = carousel.firstElementChild!.clientWidth + 40;
    let carouselDots: number = 5;

    // Função para atualizar os pontos (indicadores de página)
    function updateDots() {
        const dots: NodeListOf<Element> = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot: Element, index: number): void => {
            dot.classList.toggle("active-dot", index === currentPage);
        });
    }

    // Função para mover o carrossel para a esquerda
    function moveCarouselLeft(): void {
        if (currentPosition > 0) {
            currentPosition -= imageWidth;
            currentPage--;
        } else {
            // Se estiver na primeira imagem, ir para a última
            currentPosition = imageWidth * (5 - visibleImages);
            currentPage = 5 - visibleImages;
        }
        (carousel as HTMLElement).style.transform = `translateX(-${currentPosition}px)`;
        updateDots();
    }

    // Função para mover o carrossel para a direita
    function moveCarouselRight(): void {
        if (currentPosition < imageWidth * (5 - visibleImages)) {
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

    prevBtn.addEventListener("click", moveCarouselLeft);
    nextBtn.addEventListener("click", moveCarouselRight);

    // Criar os pontos (indicadores de página)
    if (window.innerWidth < 1280) {
        for (let i: number = 0; i < carouselDots; i++) {
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
    }

    // Atualizar os pontos iniciais
    updateDots();
});