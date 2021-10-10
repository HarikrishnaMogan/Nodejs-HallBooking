# Nodejs-HallBooking
## For creating Rooms
- use the link https://hallbooking437.herokuapp.com/createrooms with post method
- the req body should be like below
```Javascript
{  
  "roomname" : "Non-Ac Room",
	"seats" : 20,
	"amenties" : "Ac,Speaker,projector,screen,computer,mic",
	"price(1hr)" : "6000"
}
```
## For booking rooms
 - use the link with post method https://hallbooking437.herokuapp.com/bookrooms/{insertedid} (https://hallbooking437.herokuapp.com/bookrooms/6162d9e2a585ecb7c6fad0da)
 - you will get an insertedid when you create a room replace that id with insertedid
 - the req body should be like below
 ```javascript
 {
    "customerName" : "Harikrishna",
	"date" : "10/11/2021",
	"startTime" : 10,
	"endTime" : 11  		
}
 ```
 ## For getting Rooms with customer details
 - use the link with get method https://hallbooking437.herokuapp.com/bookrooms/rooms
 
 ## For getting customers with their booked rooms
 - use the link with get method https://hallbooking437.herokuapp.com/bookrooms/customers
 
