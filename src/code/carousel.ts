document.addEventListener("DOMContentLoaded", function () {
    const carousel: Element = document.querySelector(".carousel")!;
    const carouselImages: NodeListOf<Element> = carousel.querySelectorAll(".carousel-img");
    const prevBtn: HTMLElement = document.getElementById("prevBtn")!;
    const nextBtn: HTMLElement = document.getElementById("nextBtn")!;
    const dotsContainer: Element = document.querySelector(".carousel-dots")!;
    let visibleImages: number = 0;
    let currentPosition: number = 0;
    let currentPage: number = 0;
    let imageWidth: number;
    let carouselDots: number = 5;

    if(window.innerWidth >= 1920) {
        visibleImages = 4;
        imageWidth = carousel.firstElementChild!.clientWidth + 20;
    } else if (window.innerWidth >= 1280) {
        visibleImages = 4;
        imageWidth = carousel.firstElementChild!.clientWidth + 20;
    } else {
        visibleImages = 1;
        carouselDots = 8;
        imageWidth = carousel.firstElementChild!.clientWidth + 10;
    }


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
            currentPosition = imageWidth * (8 - visibleImages);
            currentPage = 8 - visibleImages;
        }
        (carousel as HTMLElement).style.transform = `translateX(-${currentPosition}px)`;
        updateDots();
    }

    // Função para mover o carrossel para a direita
    function moveCarouselRight(): void {
        console.log(imageWidth)

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

    prevBtn.addEventListener("click", moveCarouselLeft);
    nextBtn.addEventListener("click", moveCarouselRight);

    // Criar os pontos (indicadores de página)
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

    // Atualizar os pontos iniciais
    updateDots();
});


