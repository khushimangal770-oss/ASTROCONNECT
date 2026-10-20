export const PRODUCT_CATEGORIES = ["All", "Rudraksha", "Gemstone", "Yantra", "Puja Kit", "Idol"]

// `image` is a REAL, genuine photo of the actual item (sourced from Wikimedia
// Commons, openly licensed) wherever one could be reliably found and confirmed.
// Where a confirmed genuine match wasn't found, `image` is left unset on
// purpose — ProductImage.jsx then shows the category emoji instead of a wrong
// or generic stock photo. See the README for how to fill these in properly
// (your own product photos, or a stock-photo API like Pexels/Pixabay).
export const products = [
  { id: 'p1', name: '5 Mukhi Rudraksha', category: 'Rudraksha', price: 349, glyph: '🕉️', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQAufKN7tAu-TrDBhGVtPmaJAUc1hibWUojSZKRA6hgFO9M?e=tyAYoJ ', desc: 'For focus and calm. Lab-certified, comes with a red thread.' },
  { id: 'p2', name: 'Original Yellow Sapphire (Pukhraj)', category: 'Gemstone', price: 4499, glyph: '💎', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQAX3EzW3fv_SJ66JB3vQjE-AW3-LzSIFHGbn-DPH3EqMq0?e=dEDEgC', desc: 'For Jupiter strength — career and wisdom. Certified, 5-carat.' },
  { id: 'p3', name: 'Sri Yantra (Brass)', category: 'Yantra', price: 899, glyph: '✡️', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQAYzc5w2rhGSof4z__n9h0YAUvbTllx1Q98uJ2nFqyRSvI?e=wsJyVb', desc: 'For prosperity and harmony at home or your workspace.' },
  { id: 'p4', name: 'Navgraha Puja Kit', category: 'Puja Kit', price: 599, glyph: '🪔', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQBNxBOYKfKERbhhEVn0q4ebASj17kPImQUjGI74LrucW_k?e=JW5XFP', desc: 'Everything for a 9-planet puja: samagri, thread, diya, incense.' },
  { id: 'p5', name: 'Ganesha Idol (Brass, 6 inch)', category: 'Idol', price: 1299, glyph: '🪷', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQBnfCx4E4GCQJpVvIeQXcr1AWGC_Qqw9kf5EQufY7s8Gr0?e=SM38sQ', desc: 'Hand-finished brass idol for new beginnings.' },
  { id: 'p6', name: 'Red Coral (Moonga)', category: 'Gemstone', price: 2199, glyph: '💎', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQCqY9iwswjtQ6AMd3dshkO0AQftvfs_uhF3mQi0727RTyk?e=JDM9ga', desc: 'For Mars strength — confidence and courage. Certified.' },
  { id: 'p7', name: '7 Mukhi Rudraksha', category: 'Rudraksha', price: 549, glyph: '🕉️', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQC0MwKJk3EPQ5bdX5XsPGutAW2jRtSL1mIyMIyS0rqFSgg?e=3WEsN4', desc: 'Associated with Goddess Lakshmi — for stability and wealth.' },
  { id: 'p8', name: 'Shree Yantra Locket', category: 'Yantra', price: 349, glyph: '✡️', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQBjIdqjQzQNT5BzAY48B8svAbeBfxMWWPGx1ZlIKxRXkyY?e=a0vbYk', desc: 'Wearable version, gold-polished, for everyday protection.' },
  { id: 'p9', name: 'Satyanarayan Puja Kit', category: 'Puja Kit', price: 749, glyph: '🪔', image: 'https://1drv.ms/i/c/514f75e51fcee654/IQCGql25-bqfQbX22TY4JBcjAWqBCHAa_J7AIzcbmg4tIco?e=x2lSEZ', desc: 'Complete kit for Satyanarayan puja at home.' },
]
