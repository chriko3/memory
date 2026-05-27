function returnCardTemplate(cardValue:any) {
    return `
        <div class="card" data-pair="${cardValue}">
            <div class="card-inner">
                <div class="card-front">
                    <img src="" alt="">
                </div>
                <div class="card-back">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    `;
}
(window as any).returnCardTemplate = returnCardTemplate;