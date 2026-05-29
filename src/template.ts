/**
 * creates html for a card
 * uses cardValue, img and theme to build the card
 */
function returnCardTemplate(cardValue: number, img: string, theme: string[]) {
    return `
        <div class="card" data-pair="${cardValue}">
            <div class="card-inner">
                <div class="card-front">
                    <img src="${theme[0]}"/> 
                </div>
                <div class="card-back">
                    <img src="${img}" />
                </div>
            </div>
        </div>
    `;
}
(window as any).returnCardTemplate = returnCardTemplate;