/*
 * ================================================
 * NAVARRO FURNITURE - INVENTORY CONFIGURATION
 * ================================================
 * 
 * HOW TO ADD A NEW COUCH:
 * 1. Drop your couch photo into the "images" folder
 * 2. Add a new entry to the COUCHES array below
 * 3. Save this file - the website updates automatically!
 * 
 * EXAMPLE:
 * {
 *     id: "couch-5",
 *     name: "Your Couch Name",
 *     price: 299,
 *     image: "images/your-photo.jpg",
 *     dimensions: "80\" W × 36\" D × 32\" H",
 *     available: true,
 *     deliveryNote: "Delivery available this week"
 * }
 * 
 */

const PHONE_NUMBER = "267-265-9284";

const COUCHES = [
    {
        id: "couch-1",
        name: "Modern Gray Sectional",
        price: 450,
        image: "images/couch-1.jpg",
        dimensions: '110" W × 85" D × 34" H',
        available: true,
        deliveryNote: "Delivery available this week"
    },
    {
        id: "couch-2",
        name: "Classic Brown Leather Sofa",
        price: 375,
        image: "images/couch-2.jpg",
        dimensions: '84" W × 38" D × 35" H',
        available: true,
        deliveryNote: "Delivery available this week"
    },
    {
        id: "couch-3",
        name: "Navy Blue Velvet Loveseat",
        price: 285,
        image: "images/couch-3.jpg",
        dimensions: '62" W × 34" D × 33" H',
        available: true,
        deliveryNote: "Delivery available this week"
    },
    {
        id: "couch-4",
        name: "Cozy Beige Fabric Sofa",
        price: 325,
        image: "images/couch-4.jpg",
        dimensions: '88" W × 40" D × 36" H',
        available: true,
        deliveryNote: "Delivery available this week"
    }

    // =====================================
    // ADD YOUR NEW COUCHES BELOW THIS LINE
    // =====================================

];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COUCHES, PHONE_NUMBER };
}
