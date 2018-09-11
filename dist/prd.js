var PRD = (function () {
    'use strict';

    /**
     * Minimal performance optimization
     * This keeps us from accessing Math object again and again
     */
    let abs = Math.abs,
        min = Math.min,
        ceil = Math.ceil,
        rand = Math.random;

    const EPSILON = 0.0000001;


    /**
     * Calculate for P(C)
     * @param {Number} c - The C constant
     */
    function PfromC(c){
        let ppon = 0., ppbn = 0.;
        let sum = 0.;

        /**
         * Calculate max fails
         */
        let fails = ceil(1./c);

        /**
         * Simulate n successions
         */
        for(let n = 1; n <= fails; n++){
            ppon = min(1., n*c)*(1. - ppbn);
            ppbn += ppon;

            sum += (n*ppon);
        }

        return 1/sum;
    }

    function CfromP(p){
        let hi = p,
            lo = 0.,
            mid = 0.,
            p1 = 0., p2 = 1.;

        while(1){
            mid = (hi + lo)*0.5;
            p1 = PfromC(mid);
            if(abs(p1 - p2) <= EPSILON) break;

            if(p1 > p){
                hi = mid;
            } else {
                lo = mid; 
            }

            p2 = p1;
        }

        return mid;
    }

    class PRD{
        /**
         * 
         * @param {Number} chance - must be in [0.0, 1.0]
         */
        constructor(chance){
            this.chance = chance;
            this.C = CfromP(chance);
            /**
             * Keeps track of the progress
             */
            this.progress = 1;
        }

        /**
         * Gets the next success from the PRD
         * @returns Boolean
         */
        next(){
            // Roll
            let r = rand();

            // Check for the random success
            if(r < this.progress*this.C){
                // Reset progress
                this.progress = 1;
                return true;
            }

            // Increment progress
            this.progress++;
            return false;
        }

        reset(){
            this.progress = 1;
        }
    }

    return PRD;

}());
