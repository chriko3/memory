function returnCardTemplate() {
    return `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="" alt="">
                    </div>
                    <div class="card-back">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
    ` ;
}
(window as any).returnCardTemplate = returnCardTemplate;