# Mini-Online-Shop

I have built a mini online shop using HTML, CSS and JavaScript. This is a simple, public, non-authenticated application.

The website has the following five pages:

1. Home Page
2. Product Catalog Page
3. All Products Page
4. Cart Page
5. Checkout Page

1. Home Page
Intro section: “Welcome to the Mini Online Shop – your go-to place for Electronics, Clothing, and Watches.”
Navigation buttons/links to:
=> Home
=> Product Catalog
=> All Products
=> Cart

2. Product Catalog Page
Display all products with:
=> ID
=> Name
=> Image
=> Category (Electronics, Clothing, Watches)
=> Price
=> ➕ Add to Cart button
=> ➖ Remove from Cart button

3. All Products Page
Show all products
Features:
=> Dropdown filter by category
=> Search bar to find product by ID
=> ➕ Add to Cart and ➖ Remove from Cart buttons for each item

4. Cart Page
Display all added products:
=> Name
=> Price
=> Quantity
=> ➕ Button to increase quantity
=> ➖ Button to decrease quantity
=> Show total price
=> Button: “Proceed to Checkout”

 5. Checkout Page
Show cart summary and total
=> Choose payment method:
=> Online Payment
=> Cash on Delivery
=> Button: Place Order (dummy – no real transaction)


Additional Notes:
=> No login/authentication required
=> No real payment processing — dummy confirmation
=> Cart is global (shared session, not per user)
=> All product data stored in an in-memory JavaScript array
