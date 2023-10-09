function handlerModal(elementId: string): void {
    let modal: HTMLDialogElement = <HTMLDialogElement>document.getElementById(elementId);

    if (modal.open) {
        modal.close();
    } else {
        modal.showModal();
    }
}

function moneyMask(value: string): string {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options:{minimumFractionDigits: number} = {minimumFractionDigits: 2}
    const result: string = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    )

    return 'R$ ' + result
}

const moneyInput: HTMLInputElement = document.querySelector('#money') as HTMLInputElement
moneyInput.addEventListener('keyup', (e: KeyboardEvent): void => {
    moneyInput.value = moneyMask(moneyInput.value)
})

const radioButtons: NodeListOf<Element> = document.querySelectorAll('input[type="radio"]');
const divsRadio: NodeListOf<Element> = document.querySelectorAll('.donate-modal-radio-button');

radioButtons.forEach((radioButton:Element, index:number):void => {
    radioButton.addEventListener('change', function ():void {
        divsRadio.forEach((divRadio:Element, divIndex:number):void => {
            if (index - 1 === divIndex) {
                (divRadio as HTMLElement).style.backgroundColor = (radioButton as HTMLInputElement).checked ? '#3F96FC' : 'white';
                const labelRadio:HTMLLabelElement = divRadio.querySelector('label')!;
                labelRadio.style.color = 'white';
            } else {
                (divRadio as HTMLElement).style.backgroundColor = 'white';
                const labelRadio: HTMLLabelElement = divRadio.querySelector('label')!;
                labelRadio.style.color = '#37383F';
            }
        });
    });
});

function redirectSuccessPage(form: HTMLFormElement): void {
    window.location.href = "success-page.html";
}

const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('form');
forms.forEach(function(form: HTMLFormElement): void {
    form.addEventListener("submit", function(event: SubmitEvent): void {
        event.preventDefault();
        redirectSuccessPage(this);
    });
});