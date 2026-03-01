 export let priceFormatter= (PriceString)=>{
        PriceString =`${PriceString}`
        return PriceString.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        }