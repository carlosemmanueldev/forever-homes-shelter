document.addEventListener("DOMContentLoaded", function () {
    const carousel2: Element = document.querySelector(".donations-carousel")!;
    const carouselImages2: NodeListOf<Element> = carousel2.querySelectorAll(".donations-carousel-img");
    const prevBtn2: HTMLElement = document.getElementById("prevBtnDonations")!;
    const nextBtn2: HTMLElement = document.getElementById("nextBtnDonations")!;
    const dotsContainer2: Element = document.querySelector(".donations-carousel-dots")!;
    let visibleImages2: number = 1;
    let currentPosition2: number = 0;
    let currentPage2: number = 0;
    let imageWidth2: number = carousel2.firstElementChild!.clientWidth + 40;
    let carouselDots2: number = 5;

    // Função para atualizar os pontos (indicadores de página)
    function updateDots2() {
        const dots2: NodeListOf<Element> = dotsContainer2.querySelectorAll(".dot");
        dots2.forEach((dot2: Element, index: number): void => {
            dot2.classList.toggle("active-dot", index === currentPage2);
        });
    }

    // Função para mover o carrossel para a esquerda
    function moveCarouselLeft2(): void {
        if (currentPosition2 > 0) {
            currentPosition2 -= imageWidth2;
            currentPage2--;
        } else {
            // Se estiver na primeira imagem, ir para a última
            currentPosition2 = imageWidth2 * (5 - visibleImages2);
            currentPage2 = 5 - visibleImages2;
        }
        (carousel2 as HTMLElement).style.transform = `translateX(-${currentPosition2}px)`;
        updateDots2();
    }

    // Função para mover o carrossel para a direita
    function moveCarouselRight2(): void {
        if (currentPosition2 < imageWidth2 * (5 - visibleImages2)) {
            currentPosition2 += imageWidth2;
            currentPage2++;
        } else {
            // Se estiver na última imagem, ir para a primeira
            currentPosition2 = 0;
            currentPage2 = 0;
        }
        (carousel2 as HTMLElement).style.transform = `translateX(-${currentPosition2}px)`;
        updateDots2();
    }

    prevBtn2.addEventListener("click", moveCarouselLeft2);
    nextBtn2.addEventListener("click", moveCarouselRight2);

    // Criar os pontos (indicadores de página)
    if (window.innerWidth < 1280) {
        for (let i: number = 0; i < carouselDots2; i++) {
            const dot2: HTMLDivElement = document.createElement("div");
            dot2.className = "dot";
            dot2.addEventListener("click", (): void => {
                currentPosition2 = i * imageWidth2;
                currentPage2 = i;
                (carousel2 as HTMLElement).style.transform = `translateX(-${currentPosition2}px)`;
                updateDots2();
            });
            dotsContainer2.appendChild(dot2);
        }
    }

    // Atualizar os pontos iniciais
    updateDots2();
});