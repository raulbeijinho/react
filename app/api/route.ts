fetch('https://deisishop.pythonanywhere.com/products')
.then(res => res.json())
.then(data => Response.json(data))