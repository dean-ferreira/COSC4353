class Pricing {
    constructor(amtOfGallons, status, state){
        this.amntOfGallons = amtOfGallons
        this.status = status
        this.state = state
    }
    
    getGalFactor(){
        var galFactor 

        if(this.amountOfGallons > 1000){
            galFactor = 0.02
        }
        else{
            galFactor = 0.03
        }

        console.log(galFactor)
        return galFactor
    }

    getLocFactor(){
        var locFactor 

        if(this.state == 'TX'){
            locFactor = 0.02
        }
        else{
            locFactor = 0.04
        }

        console.log(locFactor)
        return locFactor
    }

    getRateHist(){
        var hist 

        if(this.status == true){
            hist = 0.01
        }
        else{
            hist = 0
        }
        
        console.log(hist)
        return hist
    }

    getPrice(){
        var currentPrice = 1.5
        var compProfit = 0.1

        this.calcPrice = ((this.getLocFactor() - this.getRateHist() + this.getGalFactor + compProfit) * currentPrice)
        this.calcPrice = currentPrice + this.calcPrice

        return this.calcPrice
    }

    getTotalAmountDue(){
        var total = (this.amountOfGallons * this.getPrice())
        return total
    }
}